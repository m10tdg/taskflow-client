# TaskFlow Frontend — File Set

Drop the contents of `src/` into your existing Vercel-deployed Vite project, then follow these steps.

## 1. Install dependencies
```bash
npm install react-router-dom axios lucide-react
npm install -D tailwindcss @tailwindcss/vite
```

## 2. Wire up Tailwind
- Copy `tailwind.config.js` into your project root (merge if you already customized one).
- Make sure `vite.config.js` includes the Tailwind plugin:
```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

## 3. Copy files
Copy everything under `src/` into your project's `src/` folder, overwriting `App.jsx`, `main.jsx`, and `index.css`.

## 4. Environment variable
Create `.env` (and add the same in Vercel's project settings → Environment Variables):
```
VITE_API_URL=http://localhost:4000/api
```
Update this to your deployed backend URL once the backend is live.

## 5. Run it
```bash
npm run dev
```
You should be able to reach `/login` and `/register` immediately — they'll fail to actually log in until the backend exists (next phase), but the UI, validation, and routing are fully testable right now.

## What's included
- **Auth**: Login, Register pages + AuthContext (JWT stored in localStorage, auto-redirect on 401)
- **Projects**: list, create, edit, delete (with confirm dialog)
- **Tasks**: Kanban board (drag-and-drop between To Do / In Progress / Done), create/edit modal, detail modal, delete with confirm
- **Filters**: status, priority, assignee, free-text search
- **Dashboard**: task counts per status, overdue task list
- **Responsive**: sidebar collapses to a slide-over drawer under `md` breakpoint; board stacks to 1 column on mobile
- **Design tokens**: see `tailwind.config.js` — status/priority colors are centralized in `src/utils/constants.js` so your Visual Analysis agent has one source of truth to check against

## What it expects from the backend (next phase)
- `POST /auth/register`, `POST /auth/login` → `{ token, user }`
- `GET/POST /projects`, `GET/PUT/DELETE /projects/:id` (project responses include a `members` array and `taskCount`)
- `GET/POST /projects/:id/tasks` (GET accepts `status`, `priority`, `assigneeId`, `q` query params)
- `PUT /tasks/:id`, `PATCH /tasks/:id/status`, `DELETE /tasks/:id`
