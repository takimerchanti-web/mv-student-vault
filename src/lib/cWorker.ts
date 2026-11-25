type Msg = { type: 'run'; source: string; stdin: string } | { type: 'stop' }
let stopped = false

const tokenize = (input: string) => input.match(/\s*(\d+(?:\.\d+)?|[A-Za-z_]\w*|==|!=|<=|>=|&&|\|\||[+\-*/%<>()!])/g)?.map((v) => v.trim()).filter(Boolean) ?? []

function expression(input: string, vars: Record<string, number>): number {
  const tokens = tokenize(input)
  let i = 0
  const peek = () => tokens[i]
  const take = () => tokens[i++]
  const primary = (): number => {
    const token = take()
    if (token === '(') { const value = compare(); take(); return value }
    if (token === '-') return -primary()
    if (token === '!') return primary() ? 0 : 1
    if (!token) throw new Error('Expected an expression')
    if (/^\d/.test(token)) return Number(token)
    if (/^[A-Za-z_]/.test(token)) return vars[token] ?? 0
    throw new Error(`Unexpected token “${token}”`)
  }
  const product = (): number => { let value = primary(); while (['*', '/', '%'].includes(peek() || '')) { const op = take(); const right = primary(); if (op === '*') value *= right; else if (op === '/') { if (right === 0) throw new Error('Division by zero'); value /= right } else value %= right } return value }
  const sum = (): number => { let value = product(); while (['+', '-'].includes(peek() || '')) { const op = take(); const right = product(); value = op === '+' ? value + right : value - right } return value }
  const compare = (): number => { let value = sum(); while (['==', '!=', '<', '>', '<=', '>=', '&&', '||'].includes(peek() || '')) { const op = take(); const right = sum(); if (op === '==') value = value === right ? 1 : 0; else if (op === '!=') value = value !== right ? 1 : 0; else if (op === '<') value = value < right ? 1 : 0; else if (op === '>') value = value > right ? 1 : 0; else if (op === '<=') value = value <= right ? 1 : 0; else if (op === '>=') value = value >= right ? 1 : 0; else if (op === '&&') value = value && right ? 1 : 0; else value = value || right ? 1 : 0 } return value }
  const result = compare()
  if (i < tokens.length) throw new Error(`Unsupported expression near “${tokens[i]}”`)
  return result
}

function cleanSource(source: string) {
  const normalized = source.replace(/#include\s*<stdio\.h>/g, '')
  if (/#include|struct|pointer|malloc|switch|case|do\s*{|->|::/.test(normalized)) throw new Error('Unsupported syntax. This educational subset does not include libraries, structs, pointers, switch/case, or dynamic memory.')
  return normalized.replace(/\/\/.*$/gm, '').replace(/\/\*[^]*?\*\//g, '').replace(/\r/g, '').trim()
}

function run(source: string, stdin: string) {
  stopped = false
  const text = cleanSource(source)
  if (!/main\s*\(\s*\)/.test(text)) throw new Error('Add a main() function to run this program.')
  const vars: Record<string, number> = {}
  const input = stdin.trim().split(/\s+/).filter(Boolean)
  let inputIndex = 0
  let output = ''
  let instructions = 0
  const lines = text.split('\n').map((line) => line.trim()).filter((line) => line && !/^#/.test(line) && !/^int\s+main/.test(line) && line !== '{' && line !== '}')
  const runLine = (line: string) => {
    if (stopped) throw new Error('Execution stopped.')
    instructions += 1
    if (instructions > 10000) throw new Error('Instruction limit reached (10,000).')
    if (output.length > 12000) throw new Error('Output limit reached (12 KB).')
    let match = line.match(/^(?:int|float|double)\s+([A-Za-z_]\w*)\s*(?:=\s*(.*?))?;?$/)
    if (match) { vars[match[1]] = match[2] ? expression(match[2].replace(/;$/, ''), vars) : 0; return }
    match = line.match(/^([A-Za-z_]\w*)\s*=\s*(.*?);?$/)
    if (match) { if (!(match[1] in vars)) throw new Error(`Variable “${match[1]}” is not declared.`); vars[match[1]] = expression(match[2].replace(/;$/, ''), vars); return }
    match = line.match(/^printf\s*\(\s*"([\s\S]*?)"(?:\s*,\s*(.*?))?\s*\)\s*;?$/)
    if (match) { let fmt = match[1].replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/%%/g, '__PERCENT__'); const args = match[2] ? match[2].split(',').map((arg) => expression(arg.trim(), vars)) : []; let idx = 0; fmt = fmt.replace(/%[df]/g, () => String(args[idx++] ?? 0)).replace(/__PERCENT__/g, '%'); output += fmt; return }
    match = line.match(/^scanf\s*\(\s*"%d(?:\s+%d)?"\s*,\s*(.*)\)\s*;?$/)
    if (match) { const names = match[1].split(',').map((v) => v.trim().replace(/^&/, '')); for (const name of names) { if (!(name in vars)) throw new Error(`Variable “${name}” is not declared.`); if (inputIndex >= input.length) throw new Error('scanf is waiting for more stdin values.'); vars[name] = Number(input[inputIndex++]); } return }
    match = line.match(/^(?:while|if)\s*\((.*?)\)\s*\{?$/)
    if (match) throw new Error('Put simple statements on separate lines; block control flow is supported in the example runner but nested blocks are intentionally limited.')
    if (/^return\s+0\s*;?$/.test(line) || line === '{' || line === '}') return
    throw new Error(`Unsupported statement: ${line}`)
  }
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (/^for\s*\(/.test(line) || /^while\s*\(/.test(line)) {
      const match = line.match(/^(?:for|while)\s*\((.*?)\)\s*\{?$/)
      if (!match) throw new Error('Invalid loop syntax.')
      const body: string[] = []
      index += 1
      while (index < lines.length && lines[index] !== '}') body.push(lines[index++])
      let guard = 0
      while (expression(match[1].split(';')[1] || match[1], vars) && guard < 1000) { for (const bodyLine of body) runLine(bodyLine); guard += 1; if (stopped) break }
      if (guard >= 1000) throw new Error('Loop limit reached (1,000 iterations).')
    } else if (/^if\s*\(/.test(line)) {
      const match = line.match(/^if\s*\((.*?)\)\s*\{?$/); if (!match) throw new Error('Invalid if syntax.'); const body: string[] = []; index += 1; while (index < lines.length && lines[index] !== '}') body.push(lines[index++]); if (expression(match[1], vars)) for (const bodyLine of body) runLine(bodyLine)
    } else runLine(line)
  }
  return { output: output || '(program finished with no output)', variables: vars, instructions }
}

self.onmessage = (event: MessageEvent<Msg>) => {
  if (event.data.type === 'stop') { stopped = true; return }
  try { self.postMessage({ type: 'result', ...run(event.data.source, event.data.stdin) }) }
  catch (error) { self.postMessage({ type: 'error', message: error instanceof Error ? error.message : 'Interpreter error' }) }
}
