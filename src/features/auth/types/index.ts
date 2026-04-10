export interface AuthUser {
  user_id: string
  roles: string[]
  capabilities: string[]
  username?: string
}

export interface AuthSessionResponse {
  authenticated: boolean
  user?: AuthUser
  csrf_token?: string
}
