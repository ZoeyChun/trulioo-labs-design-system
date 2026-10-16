# Portal 2.0 — Demo 3

Returning-customer journey with redesigned sidebar and left-aligned TruAI chat.

Figma: [Demo 3](https://www.figma.com/design/qtvqgc1fWEw0znhl4b8xPF/Portal-2.0-Design---2026?node-id=1274-15402)

## Run

From repo root (`trulioo-labs-ds`):

```bash
python3 -m http.server 8765
```

Open: http://127.0.0.1:8765/portal-2.0/demo-3/  
(or `demo-3/sign-in/` — unsigned visits redirect there)

## Flow

1. **Sign in** — standalone Figma page (`sign-in/`, same as [Demo 1 sign-in](https://zoeychun.github.io/trulioo-labs-design-system/portal-2.0/Demo%201/sign-in/))
2. **Loading** — returning-customer lines after a fresh sign-in
3. **Homepage** — Welcome back + composer + briefing cards
4. **Sidebar** — Home · Agent hub · History · Chats · Settings · Account
5. **Left chat** — dedicated AI panel per agent (KYB, TX, KYC, Org Admin)

Session key: `d3-signed-in` (does not share Demo 1 session).

## Notes

Built as a fork of Demo 1 under `demo-3/`. Demo 1 and demo-2 are untouched.
