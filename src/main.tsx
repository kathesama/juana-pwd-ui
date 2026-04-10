import '@styles/globals.css'

import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import '@i18n/index'
import { App } from '@app/App'
import { worker } from '@mocks/browser'
import { store } from '@store/index'

const DEV_SW_RESET_KEY = 'juana-dev-sw-reset'

function renderApp() {
  const root = document.getElementById('root')

  if (!root) {
    throw new Error('Root element not found')
  }

  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  )
}

async function resetDevelopmentServiceWorkers(): Promise<boolean> {
  if (!import.meta.env.DEV || !('serviceWorker' in navigator)) {
    return false
  }

  const registrations = await navigator.serviceWorker.getRegistrations()
  const staleRegistrations = registrations.filter((registration) => {
    const scriptUrl =
      registration.active?.scriptURL ?? registration.installing?.scriptURL ?? registration.waiting?.scriptURL ?? ''

    return scriptUrl !== '' && !scriptUrl.includes('mockServiceWorker.js')
  })

  if (staleRegistrations.length === 0) {
    sessionStorage.removeItem(DEV_SW_RESET_KEY)
    return false
  }

  await Promise.all(staleRegistrations.map((registration) => registration.unregister()))

  if (!sessionStorage.getItem(DEV_SW_RESET_KEY)) {
    sessionStorage.setItem(DEV_SW_RESET_KEY, '1')
    window.location.reload()
    return true
  }

  sessionStorage.removeItem(DEV_SW_RESET_KEY)
  return false
}

async function enableMocking(): Promise<void> {
  if (!import.meta.env.DEV) {
    return
  }

  try {
    await worker.start({ onUnhandledRequest: 'bypass' })
  } catch (error) {
    console.warn('MSW failed to start. Continuing without request mocking.', error)
  }
}

async function bootstrap() {
  const restartedForWorkerCleanup = await resetDevelopmentServiceWorkers()

  if (restartedForWorkerCleanup) {
    return
  }

  await enableMocking()
  renderApp()
}

void bootstrap()
