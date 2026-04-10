# Juana PWA UI — Software Design Document (SDD)

**Version:** 0.1.0  
**Status:** Draft tecnico  
**Project:** Juana IA v2 (Frontend)  
**Author:** Gemini CLI (Architect)  
**Date:** 2026-04-10

---

## 1. Purpose

`juana-pwd-ui` is a Progressive Web Application (PWA) designed to provide a modern, responsive, and secure interface for the Juana IA v2 platform. It serves as the primary touchpoint for users to interact with the conversational AI and manage their knowledge base.

## 2. System Objectives

### 2.1 Functional Objectives

- **Real-time Chat:** Seamless conversational interaction with Juana via `soul-service`.
- **Knowledge Management:** Upload and manage personal knowledge (text and files) via `memory-service`.
- **Memory Review:** View and manage personal long-term memories retrieved by the system.
- **Progressive Web App:** Installable on mobile and desktop, supporting offline manifests and asset caching.
- **Multilingual Support:** Interface available in multiple languages (starting with Spanish).
- **Identity Management:** Integration with the platform's authentication flow via Gateway.

### 2.2 Non-Functional Objectives

- **Performance:** Optimized bundle size and fast initial load using Vite.
- **Responsiveness:** Mobile-first design using Tailwind CSS, supporting multiple form factors.
- **Security:** Strict adherence to the Gateway entrypoint; no direct communication with internal services.
- **Maintainability:** Modular architecture following feature-based organization.
- **Reliability:** Decoupled development using MSW for consistent API mocking.
- **Testability:** High coverage of business logic and UI components using Vitest.

---

## 3. Architecture

### 3.1 Technology Stack

- **Framework:** React 19 (TypeScript)
- **Build Tool:** Vite
- **State Management:** Redux Toolkit (RTK) & RTK Query
- **Routing:** React Router 7
- **Styling:** Tailwind CSS + Framer Motion
- **Form Management:** React Hook Form + Zod
- **I18n:** react-i18next
- **PWA:** vite-plugin-pwa
- **Mocking:** MSW (Mock Service Worker)
- **Testing:** Vitest + React Testing Library

### 3.2 Directory Structure (src/)

```text
src/
  app/              # Root component, global providers, and app-level logic
  common/           # Shared components, hooks, and utilities
    components/     # UI primitives (buttons, inputs, etc.)
    hooks/          # Generic hooks (useAppDispatch, useAppSelector)
    utils/          # Helper functions (cn, formatters)
  features/         # Domain-specific modules (Feature-based architecture)
    auth/           # Identity, login, and callback pages
    chat/           # Conversational interface and message history
    knowledge/      # Document ingestion and job status tracking
    memory/         # Long-term memory review
    profile/        # User profile management
    shell/          # Layout, navigation, and global shell components
  i18n/             # Translations and locale configuration
  mocks/            # MSW handlers and browser worker setup
  router/           # Route definitions and ProtectedRoute guards
  store/            # Redux store configuration and API service definitions
  styles/           # Tailwind globals and CSS variables
  test/             # Test setup and global mocks
```

---

## 4. API Integration

The UI interacts exclusively with the `gateway-server`. It does not have visibility of the internal Python or Java service network.

### 4.1 Consumed Public Endpoints

| Feature | Method | Route | Target Service |
|---|---|---|---|
| Auth bootstrap | `GET` | `/auth/session` | `gateway-server` |
| Auth login | `GET` | `/auth/login` | `gateway-server` |
| Auth logout | `GET` | `/auth/logout` | `gateway-server` |
| Chat | `POST` | `/api/v1/soul/chat` | `soul-service` |
| Knowledge (Text) | `POST` | `/api/v1/knowledge/documents/text` | `memory-service` |
| Knowledge (File) | `POST` | `/api/v1/knowledge/documents/files` | `memory-service` |
| Knowledge (Jobs) | `GET` | `/api/v1/knowledge/jobs/{job_id}` | `memory-service` |

### 4.2 Data Fetching Strategy

- **RTK Query:** Used for all API interactions to manage caching, loading states, and automatic re-fetching.
- **Mock Service Worker (MSW):** Intercepts network requests during development and testing, providing deterministic responses based on the API contract.

---

## 5. Security

### 5.1 Identity Propagation

The UI does not manage sensitive credentials directly. It relies on the Gateway to:
1. Authenticate the user.
2. Issue and validate the `JUANA_SESSION` cookie.
3. Return `csrf_token` from `GET /auth/session` for browser-side mutation requests.
4. Inject the `X-User-Context` header into downstream requests.

### 5.2 CSRF and Browser Session Handling

- Browser requests use `credentials: 'include'` and never persist OAuth tokens in application state or storage.
- The UI keeps `csrf_token` only in Redux memory and sends it back in the canonical `X-CSRF-Token` header for state-changing requests and logout.
- During local development, Vite proxies `/auth` and `/api/v1` to `gateway-server` so the browser still exercises the BFF contract instead of calling internal services directly.

### 5.3 Input Validation

- **Client-side:** Zod schemas are used in `react-hook-form` to ensure data integrity before submission.
- **Sanitization:** The UI treats all retrieved content (memories, AI responses) as untrusted, using standard React protections against XSS.

---

## 6. Development & Quality

### 6.1 Testing Strategy

- **Unit Tests:** Business logic in hooks and utilities (Vitest).
- **Component Tests:** Interaction and rendering (React Testing Library).
- **Integration Tests:** Feature-level flows using MSW to mock API responses.

### 6.2 PWA Capabilities

- **Manifest:** Defined in `vite.config.ts` for app installation.
- **Service Worker:** Managed by `vite-plugin-pwa` for asset caching and offline support.
- **Updates:** Automatic prompt for users when a new version is available.
