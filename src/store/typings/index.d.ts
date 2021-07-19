import { Theme } from '@/typings'
import { RouteRecordName } from 'vue-router'

export interface RootStateProps {
  appModule: AppStateProps
  tagModule: TagStateProps
  settingModule: SettingStateProps
  todoModule: TodoStateProps
}

export interface AppStateProps {
  collapse: boolean
  fullscreen: boolean
  firstLoaded: boolean
}

export interface ViewListItemProps {
  name: string | RouteRecordName
  label: string
}

export interface TagStateProps {
  activeView: string | RouteRecordName
  viewList: ViewListItemProps[]
  cachedList: string[]
}

export interface SettingStateProps {
  theme: Theme
  showTagsView: boolean
  asideWidth: number
}

export interface TodoProps {
  name: string,
  status: boolean
}

export interface TodoListProps {
  day: string,
  todo: TodoProps[]
}

export interface TodoStateProps {
  todoList: TodoListProps[]
}
