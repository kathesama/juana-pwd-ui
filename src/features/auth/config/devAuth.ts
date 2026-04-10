import type { AuthUser } from '../types'

const parseBoolean = (value: string | undefined, fallback: boolean) => {
  if (value === undefined) {
    return fallback
  }

  return value.toLowerCase() === 'true'
}

const parseRoles = (value: string | undefined) => {
  if (!value) {
    return ['JUANA_USER', 'JUANA_ADMIN']
  }

  return value
    .split(',')
    .map((role) => role.trim())
    .filter(Boolean)
}

export const devAuthEnabled = parseBoolean(import.meta.env.VITE_DEV_AUTH_ENABLED, true)

export const devAuthUser: AuthUser = {
  user_id: import.meta.env.VITE_DEV_AUTH_ID || 'dev-user',
  username: import.meta.env.VITE_DEV_AUTH_USERNAME || 'kathy',
  roles: parseRoles(import.meta.env.VITE_DEV_AUTH_ROLES),
  capabilities: [],
}
