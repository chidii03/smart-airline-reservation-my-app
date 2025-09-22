import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

// Generic modal props type
type ModalProps = Record<string, unknown> | null

interface ModalState {
  type: string | null
  props: ModalProps
}

interface UIState {
  sidebarOpen: boolean
  searchPanelOpen: boolean
  modal: ModalState
  notifications: Notification[]
  loading: {
    global: boolean
    search: boolean
    booking: boolean
    payment: boolean
  }
  theme: 'light' | 'dark'
  language: string
  currency: string
}

const initialState: UIState = {
  sidebarOpen: false,
  searchPanelOpen: false,
  modal: {
    type: null,
    props: null
  },
  notifications: [],
  loading: {
    global: false,
    search: false,
    booking: false,
    payment: false
  },
  theme: 'light',
  language: 'en',
  currency: 'USD'
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    toggleSearchPanel: (state) => {
      state.searchPanelOpen = !state.searchPanelOpen
    },
    openModal: (state, action: PayloadAction<{ type: string; props?: ModalProps }>) => {
      state.modal = {
        type: action.payload.type,
        props: action.payload.props ?? null
      }
    },
    closeModal: (state) => {
      state.modal = {
        type: null,
        props: null
      }
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const id = Math.random().toString(36).substr(2, 9)
      state.notifications.push({ ...action.payload, id })
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    setLoading: (state, action: PayloadAction<{ key: keyof UIState['loading']; value: boolean }>) => {
      state.loading[action.payload.key] = action.payload.value
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    }
  }
})

export const {
  toggleSidebar,
  toggleSearchPanel,
  openModal,
  closeModal,
  addNotification,
  removeNotification,
  clearNotifications,
  setLoading,
  setGlobalLoading,
  setTheme,
  setLanguage,
  setCurrency,
  toggleTheme
} = uiSlice.actions

export default uiSlice
