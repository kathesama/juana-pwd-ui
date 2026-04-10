import { expect, test } from '@playwright/test'

const username = process.env.E2E_KEYCLOAK_USERNAME
const password = process.env.E2E_KEYCLOAK_PASSWORD

test.describe('gateway bff auth flow', () => {
  test.skip(!username || !password, 'Set E2E_KEYCLOAK_USERNAME and E2E_KEYCLOAK_PASSWORD to run the auth E2E.')

  test('logs in through keycloak bootstrap and logs out with csrf protection', async ({ page, context }) => {
    await page.goto('/login')

    await expect(page.getByRole('heading', { name: 'Iniciar sesion' })).toBeVisible()
    await page.getByRole('button', { name: 'Continuar al workspace' }).click()

    await page.waitForURL(/keycloak\.local:7080/)
    await page.locator('#username').fill(username!)
    await page.locator('#password').fill(password!)
    await page.locator('#kc-login').click()

    await page.waitForURL(/localhost:5173/)
    await expect(page.getByRole('heading', { name: 'Progressive interface shell' })).toBeVisible()

    const sessionResponse = await page.request.get('http://localhost:5173/auth/session', {
      headers: {
        Cookie: (await context.cookies('http://localhost:5173'))
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join('; '),
      },
    })

    await expect(sessionResponse.ok()).toBeTruthy()
    const sessionBody = (await sessionResponse.json()) as {
      authenticated: boolean
      csrf_token?: string
      user?: { user_id: string; roles: string[] }
    }

    expect(sessionBody.authenticated).toBe(true)
    expect(sessionBody.csrf_token).toBeTruthy()
    expect(sessionBody.user?.user_id).toBeTruthy()
    expect(sessionBody.user?.roles).toContain('JUANA_ADMIN')
    await expect(page.getByText(sessionBody.user!.user_id, { exact: true })).toBeVisible()

    const sessionCookie = await context.cookies('http://localhost:5173')
    expect(sessionCookie.some((cookie) => cookie.name === 'JUANA_SESSION')).toBe(true)

    await page.getByRole('button', { name: 'Cerrar sesion' }).click()
    await page.waitForURL(/\/login$/)
    await expect(page.getByRole('heading', { name: 'Iniciar sesion' })).toBeVisible()

    const clearedCookies = await context.cookies('http://localhost:5173')
    expect(clearedCookies.some((cookie) => cookie.name === 'JUANA_SESSION')).toBe(false)
  })
})
