export interface Task {
  id: string
  title: string
  date: string
  description: string
  files: File[] | null
  status: string
}

export interface BaseButton {
  color: string
  text: string
}

export interface PropsCalendar {
  modelValue?: any
  startDate?: any
  display?: 'month' | 'year' | 'week' | 'day'
}
