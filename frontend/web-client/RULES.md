````markdown
## Automated CSS → Tailwind Migration Rules (ENGLISH)

These rules define how the automated CSS-to-Tailwind migration engine should behave. Follow them strictly to avoid layout regressions.

Rule 1 — Inventory & Mapping (Scope discovery)

- Scan the entire project for CSS and styling-related files: all `.tsx`, `.jsx`, `.css`, `.scss`, plus relevant config files (especially `tailwind.config.js`).
- Classify styles into three categories:
  - Global CSS: files imported at the app root that affect the whole project (e.g., `index.css`, `main.css`, `App.css`).
  - Component-Scoped CSS: CSS files imported directly inside a component (e.g., `Button.css`).
  - CSS Modules: files using local mappings (e.g., `Button.module.css`) where classes are referenced as `styles.someClass`.
- Build a mapping of component -> stylesheet usage. Example map format:
  - `App.tsx` -> `App.css` (Global)
  - `Button.tsx` -> `Button.module.css` (CSS Module)
  - `Card.tsx` -> uses `className="card-container"` (affected by Global CSS)

Rule 2 — CSS Property Extraction (Parse CSS to structured data)

- Parse each CSS file and extract selectors and their properties into a JSON/object structure.
- Example input CSS:

  .card-container {
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  Output JSON object:

  {
  ".card-container": {
  "padding": "16px",
  "border-radius": "8px",
  "box-shadow": "0 4px 6px rgba(0, 0, 0, 0.1)"
  }
  }

Rule 3 — Translation Engine (Core mapping rules: CSS → Tailwind)

- The engine must map CSS properties to Tailwind classes conservatively.
- Absolute mappings (examples):
  - `padding: 16px` → `p-4`
  - `border-radius: 8px` → `rounded-lg`
  - `display: flex` → `flex`
- Arbitrary / custom values: If a CSS value has no exact Tailwind token (or is not listed in `tailwind.config.js`), do NOT round or approximate. Use Tailwind arbitrary values instead.
  - e.g. `padding: 17px` → `p-[17px]`
  - `color: #123456` → `text-[#123456]`
  - `box-shadow: 0 4px 6px rgba(0,0,0,0.1)` → `shadow-[0_4px_6px_rgba(0,0,0,0.1)]`
- Respect the project's `tailwind.config.js` theme extensions when mapping named tokens.

Rule 4 — Code Transformation (Apply translations to `.tsx` files)

- Scan `.tsx` files for `className` usages and transform according to the classification from Rule 1.

  CSS Modules:

  - If `className={styles.cardContainer}` is used, look up `.cardContainer` in the corresponding CSS Module file, translate the properties using Rule 3, and replace the usage:
    - Before: `className={styles.cardContainer}`
    - After: `className="p-4 rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)]"`

  Static Global className:

  - If `className="card-container"` is used, find `.card-container` in global CSS, translate, and replace similarly.

  Dynamic / conditional className:

  - For dynamic expressions like `className={`card ${isActive ? "active" : ""}`}`, translate each class separately and recombine using a helper (`clsx` or `cn`). Example:
    - Before: `className={`card ${isActive ? "active" : ""}`}`
    - After: `className={cn("p-4 rounded-lg", isActive && "bg-blue-500")}`

Rule 5 — Exception Handling (What NOT to translate)

- Do NOT translate CSS that uses complex or structural selectors, or rules that cannot be reliably expressed as Tailwind utilities.

  No-Translate flag (examples to keep as-is and flag for manual review):

  - `@keyframes` and animation definitions.
  - Complex pseudo-elements with `content` (`::before`, `::after`) or advanced selectors that rely on DOM structure.
  - Structural selectors like `div > p`, `nav + main`, or selectors relying on sibling/child relations.

  Action: When such rules are detected, preserve the original CSS file (or the affected selector block) and add a migration flag in the report for manual review.

Execution notes and priorities

- Start by building the inventory map (Rule 1) and extracting CSS into structured JSON (Rule 2). This reduces false positives when transforming components.
- Use `tailwind.config.js` to determine which values are canonical tokens vs arbitrary values.
- Prefer minimal, reviewable changes: transform individual components incrementally and surface a migration report listing files changed and selectors flagged for manual review.

Migration report format (suggested):

- `migrated`: list of components changed with from/to className snippets.
- `flags`: list of selectors or files that require manual attention with a reason code (keyframes, structural-selector, pseudo-content).

---

# Project Rules and Conventions

# Project Rules and Conventions

Tech stack baseline: TypeScript + React 18 + Vite + Tailwind CSS (priority 9/10). All rules below aim for consistency, maintainability, and a clean UX.

---

## 1) Architecture and Project Structure

Target structure (feature-first, incremental adoption). Keep current files but align new code and refactors to this shape.

```
src/
  app/
    App.tsx
    routes/                 # Router config and route objects
      index.tsx
      protectedRoute.tsx
    providers/              # App-level providers (Auth, Query, Theme, MSW init)
  components/
    layout/                 # Header, Footer, Sidebar, Layouts
    ui/                     # Reusable UI primitives (button, input, avatar)
  features/
    seller/
      pages/                # Dashboard, Orders, Products, Inventory, Mess
      components/
      hooks/
      services/
    profile/
      pages/
      components/
      hooks/
    chat/
      pages/
      components/
  services/                 # API clients (apiService, productService, orderService, authService)
  mocks/                    # Mock API (see section 6)
  types/                    # TS types only
  hooks/                    # Shared hooks
  lib/                      # Utilities/helpers (formatters, status mapping)
  styles/                   # Global styles (main.css, tokens)
  mocks/                    # Mock handlers if using MSW or local mocks
  assets/
```

Notes:

- Pages are thin route entrypoints; most logic lives in `features/*`.
- Use absolute imports via `@/` alias.
- Co-locate CSS modules with their components when using CSS files.

---

## 2) Routing Rules

- All route paths are lowercase (e.g., `/login`, `/register`, `/seller/dashboard`).
- Use nested routes with a layout component (`<Outlet />`).
- Keep `ProtectedRoute` strict: redirect unauthenticated users to `/login`. Check roles for seller routes.
- Avoid importing `.tsx` extensions in router imports. Prefer `import LoginPage from "@/pages/LoginPage"`.
- Route components are lazy-loaded where practical to enable code-splitting.

---

## 3) Layout and Sidebar Rules (CRITICAL)

- Tailwind controls layout; CSS files are for visual polish (colors, animations) only.
- Desktop (≥1024px): Use a 2-column layout where the sidebar is on the left and narrow; main content takes the remaining width.
  - Recommended grid: `lg:grid-cols-[240px_1fr]` (or 220–280px as needed).
  - Sidebar column is sticky under the header: `sticky top-[var(--header-height,112px)]`.
  - Main content container includes `min-w-0` to prevent overflow and allow flex shrink.
- Mobile (<1024px): Render the sidebar block above the content (no overlay by default).
- Pages rendered inside layout MUST NOT set their own `min-h-screen`, global background, or outer padding that conflicts with the layout’s content wrapper. They should use `w-full` and rely on the layout panel spacing.

---

## 4) Styling Rules (Tailwind-first)

- Use Tailwind for all layout, spacing, and responsive concerns.
- CSS files may style:
  - Animations
  - Tokens (colors, brand gradients)
  - Component skins (e.g., ornamental borders)
- Do not shadow Tailwind utility names in custom CSS (e.g., don’t create `.overflow-x-auto` with different behavior).
- No inline styles for layout (flex, gap, width, padding). Inline styles only for dynamic, computed values that Tailwind cannot express.
- Load Google Fonts ONCE globally (e.g., `index.html`). Don’t import fonts per component.
- Prefer utility composition; use `clsx` (or `classnames`) when conditional classes are needed.

---

## 5) Sidebar Component Rules

- Mobile overlay behavior is allowed only under `@media (max-width: 1023px)`.
- Desktop reset MUST ensure the sidebar never overlays content:
  - `@media (min-width: 1024px) { .sidebar-card { position: static; transform: none; opacity: 1; pointer-events: auto; } }`
- Avoid `:has()` CSS selector for active state (inconsistent browser support). Use `NavLink` to set an `.active` class and target that.

---

## 6) Mock API Rules (dev vs dev:mock)

Two supported modes:

- `dev`: real API; no mock server.
- `dev:mock`: mock API; no real network calls.

Environment:

- Use `.env.development` for `dev` and `.env.mock` for `dev:mock`.
- Example variables:
  - `VITE_USE_MOCK=true` (in `.env.mock`)
  - `VITE_API_BASE_URL=https://api.example.com` (in `.env.development`)

Bootstrapping in `main.tsx` (or `app/providers`):

```ts
if (import.meta.env.VITE_USE_MOCK) {
  const { setupMocks } = await import("@/mocks");
  await setupMocks();
}
```

MSW example (recommended):

- `src/mocks/browser.ts`: `setupWorker(...handlers)`
- `src/mocks/handlers/*.ts`: per-domain handlers
- `src/mocks/index.ts`:

```ts
export async function setupMocks() {
  const { worker } = await import("./browser");
  await worker.start({ onUnhandledRequest: "bypass" });
}
```

Alternative (no MSW):

- Create `src/mocks/services/*.ts` with functions that mirror real services. In runtime, choose between real and mock by `VITE_USE_MOCK`.

Imports in services:

```ts
const USE_MOCK = Boolean(import.meta.env.VITE_USE_MOCK);
const baseUrl = import.meta.env.VITE_API_BASE_URL;
// Select client based on USE_MOCK
```

---

## 7) TypeScript Rules

- `"strict": true`; no `any` unless justified and isolated.
- Use absolute imports (`@/*`). Keep path mappings in TS + Vite in sync.
- Prefer named exports for shared modules; default export for pages/components is acceptable if conventional.
- Component names: PascalCase. Hooks: `use*`. Types live in `src/types` and are re-used across features.
- Centralize enums/mappings (e.g., status mapping) in `src/lib` to avoid duplication.

---

## 8) UI Libraries and Consistency

- Avoid mixing Material UI and Ant Design on the same page. Prefer one per domain area.
- Global AntD reset (`antd/dist/reset.css`) should be imported ONCE globally (e.g., `main.tsx` or `main.css`).
- Keep design tokens consistent (colors, border radius). Prefer Tailwind theme extensions for theming.

---

## 9) Performance & Accessibility

- Lazy-load non-critical routes.
- Use `React.Suspense` with reasonable fallbacks.
- Optimize images (dimensions + loading="lazy").
- Ensure interactive controls have accessible names/labels; use semantic tags.

---

## 10) Linting, Formatting, and Commit Quality

- ESLint: include `eslint-plugin-react`, `eslint-plugin-react-hooks`, and TypeScript rules.
- Formatting via Prettier; align with ESLint using `eslint-config-prettier`.
- Optional pre-commit: `husky` + `lint-staged` to run lint/format on touched files.

---

## 11) Success Criteria Checklist

- Sidebar always left on desktop; main content occupies the remaining width.
- Child pages don’t fight the layout (no `min-h-screen`/outer backgrounds).
- Tailwind utilities are the single source of truth for layout.
- Mock mode is switchable via `dev` vs `dev:mock` without code edits.
- Routes lowercase; protected routes and role checks behave as expected.
- Fonts loaded once; no global overrides of Tailwind utility class names.

---

## 12) Examples

Desktop layout snippet:

```tsx
<div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 w-full">
  <aside className="hidden lg:block sticky top-[112px]">
    <Sidebar /* ... */ />
  </aside>
  <section className="min-w-0">
    <div className="bg-white rounded-lg border border-gray-100 p-6 md:p-8">
      <Outlet />
    </div>
  </section>
</div>
```

Conditional mock bootstrap:

```ts
if (import.meta.env.VITE_USE_MOCK) {
  const { setupMocks } = await import("@/mocks");
  await setupMocks();
}
```

Status mapping centralization:

```ts
// lib/status.ts
export function mapInventoryStatus(s: string) {
  switch (s) {
    case "IN_STOCK":
      return "In Stock";
    case "LOW_STOCK":
      return "Low Stock";
    case "OUT_OF_STOCK":
      return "Out of Stock";
    default:
      return "In Stock";
  }
}
```
````
