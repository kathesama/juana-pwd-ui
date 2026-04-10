export const ROUTES = {
  LOGIN: '/login',
  AUTH_CALLBACK: '/auth/callback',
  CHAT: '/',
  PROFILE: '/profile',
  KNOWLEDGE: '/knowledge',
  MEMORY: '/memory',
  NOTIFICATIONS: '/notifications',
  SETTINGS: '/settings',
  ADMIN: '/admin',
  TASKS: '/tasks',
  CONNECTORS: '/connectors',
  DASHBOARD: '/dashboard',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
