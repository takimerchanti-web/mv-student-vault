export type ViewId = 'dashboard' | 'agenda' | 'notes' | 'tasks' | 'habits' | 'files' | 'code' | 'logic' | 'circuits' | 'slides' | 'settings'
export type ThemeName = 'ivory' | 'paper' | 'lavender' | 'sage' | 'ocean' | 'sandstone' | 'rose' | 'midnight' | 'graphite' | 'amoled' | 'forest' | 'aubergine' | 'espresso' | 'nord'
export type Priority = 'low' | 'medium' | 'high'

export interface Profile { name: string; course: string; year: string; goals: string }
export interface Task { id: string; title: string; subject: string; due: string; priority: Priority; completed: boolean; createdAt: string }
export interface Note { id: string; title: string; body: string; subject: string; updatedAt: string }
export interface ClassItem { id: string; subject: string; day: number; start: string; end: string; room: string; color: string }
export interface Habit { id: string; name: string; emoji: string; streak: number; checks: Record<string, boolean> }
export interface FileItem { id: string; name: string; size: number; type: string; subject: string; dataUrl: string; createdAt: string }
export interface CodeProject { id: string; name: string; source: string; updatedAt: string }
export interface LogicNode { id: string; type: string; label: string; x: number; y: number; inputCount?: number; value?: boolean }
export interface LogicWire { id: string; from: string; to: string }
export interface LogicProject { nodes: LogicNode[]; wires: LogicWire[] }
export interface CircuitPart { id: string; type: string; label: string; x: number; y: number; value: string; visualOnly?: boolean; terminals: number }
export interface CircuitProject { parts: CircuitPart[]; wires: { id: string; from: string; to: string }[] }
export interface SlideElement { id: string; type: 'text' | 'shape' | 'table' | 'chart'; x: number; y: number; w: number; h: number; text?: string; color?: string; data?: number[] }
export interface Slide { id: string; title: string; elements: SlideElement[] }
export interface PresentationProject { slides: Slide[]; active: number }

export interface VaultState {
  profile: Profile | null
  tasks: Task[]
  notes: Note[]
  classes: ClassItem[]
  habits: Habit[]
  files: FileItem[]
  codeProjects: CodeProject[]
  logic: LogicProject
  circuits: CircuitProject
  presentation: PresentationProject
  pomodoro: { focusMinutes: number; breakMinutes: number }
  lastOpened: string
}

export const emptyVault = (): VaultState => ({
  profile: null,
  tasks: [], notes: [], classes: [], files: [], codeProjects: [],
  habits: [
    { id: 'habit-1', name: 'Deep work block', emoji: '◒', streak: 0, checks: {} },
    { id: 'habit-2', name: 'Review class notes', emoji: '✦', streak: 0, checks: {} },
    { id: 'habit-3', name: 'Move for 20 minutes', emoji: '↗', streak: 0, checks: {} },
  ],
  logic: { nodes: [], wires: [] },
  circuits: { parts: [], wires: [] },
  presentation: { active: 0, slides: [{ id: 'slide-1', title: 'Untitled slide', elements: [{ id: 'el-1', type: 'text', x: 10, y: 18, w: 80, h: 18, text: 'A clear idea starts here.', color: '#6c5ce7' }] }] },
  pomodoro: { focusMinutes: 25, breakMinutes: 5 },
  lastOpened: new Date().toISOString(),
})
