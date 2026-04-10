# juana-pwd-ui

Frontend React/Vite para la UI progresiva de Juana. En desarrollo local puede trabajar con auth mock o contra el BFF real de `gateway-server`.

## Scripts

- `npm run dev`
- `npm run typecheck`
- `npm run test:run`
- `npm run test:e2e`
- `npm run test:e2e:headed`

## Variables utiles

```env
VITE_DEV_AUTH_ENABLED=false
E2E_KEYCLOAK_USERNAME=kathy
E2E_KEYCLOAK_PASSWORD=ChangeMeImmediately!
```

## E2E de autenticacion

El smoke E2E usa Playwright y ejecuta el flujo real:

1. abre `/login`
2. redirige a Keycloak por `/auth/login`
3. completa credenciales
4. vuelve a la UI con `JUANA_SESSION`
5. valida bootstrap de sesion
6. ejecuta logout con `X-CSRF-Token`

Ejemplo:

```bash
$env:VITE_DEV_AUTH_ENABLED='false'
$env:E2E_KEYCLOAK_USERNAME='kathy'
$env:E2E_KEYCLOAK_PASSWORD='ChangeMeImmediately!'
npm run test:e2e
```
