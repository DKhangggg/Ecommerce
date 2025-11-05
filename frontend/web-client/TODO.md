# Project TODO and Structure Guide

This document lists clear, actionable tasks to bring the codebase in line with best practices and a suggested structure. No code changes are performed by this document.

## High Priority (correctness & UX)

- [ ] Normalize auth routes to lowercase

  - What: Change router paths to `/login` and `/register` (lowercase) and ensure `ProtectedRoute` redirects to `/login`.
  - Why: Current redirect uses lowercase but routes are defined with uppercase; users can hit 404 after redirect.
  - Acceptance: Navigating to protected routes while unauthenticated redirects to `/login` and renders the page correctly.

- [ ] Ensure seller sidebar never overlays content on desktop

  - What: In `src/components/Sidebar/sidebar.css`, add a desktop-only reset block:
    - `@media (min-width: 1024px) { .sidebar-card { position: static; transform: none; opacity: 1; pointer-events: auto; } }`
  - Why: Mobile overlay styles must not leak into desktop.
  - Acceptance: On ≥1024px, sidebar is left column, never overlays content.

- [ ] Remove page-level layout conflicts on Seller pages

  - What: In Seller pages (Dashboard/Orders/Products/Inventory/Mess), don’t set `min-h-screen`, outer background, or large padding that the layout already provides.
  - Why: Avoid layout fighting that causes double scroll and mismatched backgrounds.
  - Acceptance: Pages render within the layout’s content card with consistent spacing and background.

- [ ] Stop shadowing Tailwind utility names
  - What: In `src/main.css`, rename the custom rule `.overflow-x-auto { max-width: 100%; }` to a project-specific class (e.g., `.max-w-container`).
  - Why: Overriding Tailwind utility classes causes unexpected behavior app-wide.
  - Acceptance: Tailwind’s `overflow-x-auto` behaves as documented everywhere; no regressions.

## Medium Priority (consistency & maintainability)

- [ ] Replace inline layout styles with Tailwind

  - What: In `ProfileLayout.tsx`, `SellerLayout.tsx`, `UserLayout.tsx`, remove inline `style={...}` for flex/width/gap; use Tailwind utilities instead.
  - Why: Single source of truth, easier maintenance, fewer style drifts.
  - Acceptance: Same UI result with no inline layout styles (only Tailwind classes).

- [ ] Consolidate the content wrapper styles

  - What: Ensure only one source of truth for the white content card (either Tailwind utilities or a shared CSS class) across Profile/Seller layouts.
  - Why: Prevent duplicate definitions and animation differences.
  - Acceptance: One shared pattern for the content wrapper; consistent padding, border, and animation.

- [ ] Import Ant Design reset once globally

  - What: Move `import 'antd/dist/reset.css'` to `src/main.tsx` (or `src/main.css`) and remove it from individual Seller pages.
  - Why: Avoid repeated CSS imports and ensure consistent base styles.
  - Acceptance: AntD components render correctly across pages with a single global import.

- [ ] Unify UI library usage per domain

  - What: Choose a primary UI library for Seller pages (e.g., MUI) and avoid mixing with AntD on the same page; keep AntD where it’s already dominant elsewhere or migrate gradually.
  - Why: Reduce bundle size, avoid CSS priority clashes, keep design consistent.
  - Acceptance: Each page uses one UI library consistently; no visual regressions.

- [ ] Load Google Fonts once

  - What: Remove `@import` of fonts from `Header.css`, `Footer.css`, `Sidebar/sidebar.css`; load fonts in `index.html` or a single global stylesheet.
  - Why: Fewer duplicate network requests, avoid FOUC.
  - Acceptance: Typography remains the same with a single global font load.

- [ ] Replace `:has()` selector for active sidebar state
  - What: In `Sidebar/sidebar.css`, don’t rely on `:has(.sidebar-link-active)`; instead toggle a parent `.active` class via `NavLink` and target that in CSS.
  - Why: Wider browser support (Firefox) and predictable styling.
  - Acceptance: Active state styling works in all modern browsers.

## Low Priority (DX, performance, polish)

- [ ] Centralize backend → frontend status mapping

  - What: Create a helper (e.g., `src/lib/status.ts`) to map backend inventory/order statuses to UI strings; use it across pages.
  - Why: Single mapping source avoids drift and typos.
  - Acceptance: All status conversions reference the shared helper.

- [ ] Extract large inline `<style>` blocks

  - What: Move styles in `SellerProductsPage.tsx` into a CSS module or Tailwind utilities.
  - Why: Better caching, purging, and consistency.
  - Acceptance: Visual parity with extracted styles.

- [ ] Standardize import style for routes/components

  - What: Remove explicit `.tsx` in imports (e.g., `RegisterPage.tsx` → `RegisterPage`).
  - Why: Consistency and cleaner imports.
  - Acceptance: Build succeeds; imports are extensionless for React components.

- [ ] Tailwind plugins (optional)

  - What: Consider `@tailwindcss/forms` for consistent inputs and `@tailwindcss/typography` for rich content.
  - Why: Faster, consistent styling of common elements.
  - Acceptance: Plugins installed and used where appropriate.

- [ ] ESLint and formatting

  - What: Add `eslint-plugin-react` recommended config alongside hooks/refresh; add Prettier and an ESLint-Prettier config.
  - Why: Better lint coverage, consistent formatting.
  - Acceptance: `npm run lint` and `prettier` run clean in CI.

- [ ] Commit hygiene (optional)
  - What: Add Husky + lint-staged to run lint/format on commit.
  - Why: Keeps the main branch clean.
  - Acceptance: Pre-commit hooks run and block on errors.

## Suggested project structure (incremental)

Keep current structure but align towards a feature-oriented layout over time. Don’t move everything at once—migrate when touching related code.

```
src/
  app/                      # App shell and providers
    App.tsx
    routes/                 # Router config and route objects
      index.tsx
      protectedRoute.tsx
    providers/              # Context providers wiring (Auth, Query, Theme)
  features/
    seller/
      pages/                # Route screens (Dashboard, Orders, Products, Inventory, Mess)
      components/           # Seller-specific components
      hooks/
      services/             # Seller-only client logic (if needed)
    profile/
      pages/
      components/
      hooks/
    chat/
      pages/
      components/
  components/
    layout/                 # Header, Footer, Sidebar, Layouts (SellerLayout, ProfileLayout, UserLayout)
    ui/                     # Reusable primitives (button, input, avatar)
  services/                 # API clients (apiService, productService, orderService, authService)
  types/                    # All TypeScript types
  hooks/                    # Shared hooks
  context/                  # Shared context (AuthContext)
  lib/                      # Utilities/helpers (status mapping, formatters)
  styles/                   # Global styles (main.css, tokens.css, Tailwind base)
  mocks/                    # Mock data for local dev
```

Routing: keep `pages/` as simple route entrypoints that re-export from `features/*/pages` if you prefer a `pages` convention. Alternatively, let `features/*/pages` be routed directly.

## Migration plan (order of execution)

1. Fix auth route casing and verify redirects.
2. Add desktop reset for sidebar; verify no overlay on ≥1024px.
3. Clean Seller pages of `min-h-screen`/outer backgrounds.
4. Remove Tailwind utility overrides in `main.css` and rename custom class.
5. Move AntD reset import to global and remove per-page imports.
6. Replace inline layout styles with Tailwind utilities in layouts.
7. Consolidate content wrapper visuals to one source.
8. Optional rounds: unify UI library per page, fonts once, replace `:has()`, extract inline `<style>`, centralize status mapping.

## Notes

- When adjusting layout, test on mobile (≤1023px) and desktop (≥1024px).
- Prefer structural fixes (Tailwind layout) over global overflow clamps.
- Make changes in small PRs with quick visual checks to reduce risk.
