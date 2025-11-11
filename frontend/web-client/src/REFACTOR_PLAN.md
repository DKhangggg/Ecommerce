# REFACTOR_PLAN — Web Client (React + TypeScript)

This document summarizes a proposed refactor to move the project towards a clean architecture, improve styling structure and maintainability, and recommend incremental steps. It pairs with `src/refactor/refactorPlan.ts` which contains programmatic tasks and move suggestions.

## Goals

- Introduce a layered architecture (presentation, domain, data/infrastructure, shared).

## High-level layers

- presentation: React components, pages, UI-only hooks, and layout components. (e.g., `src/components`, `src/pages`, `src/presentation/hooks`)

## Quick repository scan notes

- API clients exist at `src/api/apiClient.ts` and `src/api/privateApiClient.ts`. These should move to `src/infrastructure/http`.

## Concrete tasks (prioritized)

1. Extract API clients to infrastructure layer (High, 3h)
   - Move `src/api/apiClient.ts` and `src/api/privateApiClient.ts` to `src/infrastructure/http`.
   - Create a standardized interface: `IHttpClient { get<T>(), post<T>(), put<T>(), delete<T>() }`.
   - Add a typed wrapper `httpClient` returning `ApiResponse<T>`.
2. Create domain services (High, 8h)

   - Consolidate `src/services/*` into `src/domain/services/`.

3. Add presentation hooks (Medium, 6h)

   - Create `src/presentation/hooks/useProducts.ts`, `useAuth.ts`, etc.

4. Consolidate types (High, 4h)

   - Add `src/types/dtos` and `src/types/models` or adopt a naming convention: `ProductDTO`, `ProductModel`.

5. Styling cleanup (Medium, 6h)

   - Replace global CSS with CSS Modules or Tailwind utility classes where appropriate.

6. Testing and linting (Medium, ongoing)

   - Add unit tests for domain services and hooks.

## Migration patterns and small examples

Below is a small DI example for an HTTP client and how to use it in domain services and hooks.

```ts
// httpClient.ts (infra)
export interface IHttpClient {
// productService.ts (domain)
export function createProductService(http: IHttpClient) {
   return {
// useProducts.ts (presentation)
export function useProducts() {
   const service = useMemo(() => createProductService(httpClient), []);
## File move suggestions

- `src/api/apiClient.ts` -> `src/infrastructure/http/apiClient.ts`
- `src/api/privateApiClient.ts` -> `src/infrastructure/http/privateApiClient.ts`
- `src/services/*` -> `src/domain/services/*`
- `src/lib/utils.ts` -> `src/shared/utils.ts` (or `src/lib` stays as shared)
## Contract and Edge Cases

- Inputs: components call hooks; hooks call domain services; services use http client.
- Outputs: typed domain models or errors.
- Error modes: network errors (retry/backoff), validation errors (return typed validation), auth errors (401 handling in http client).
Edge cases to handle:

- Missing/undefined data from API (null fields).
- Large lists/pagination and performance (infinite scroll caching).
- Concurrent updates and optimistic UI.
- Auth token refresh and request queuing.
## Suggested incremental first steps (what I can implement now)

- Move API clients to `src/infrastructure/http` and add a small typed `IHttpClient` wrapper.
- Create `src/domain/services/productService.ts` that wraps the existing `productService` logic.
If you want, I can implement the first incremental change now (move clients + create wrapper) and run type checking.

## Next steps

- Pick the first task to implement. I recommend extracting the HTTP client first.
- After extraction, update one domain service and one hook to use the new client. Then run tests/type-check.

---

File: `src/refactor/refactorPlan.ts` contains a machine-readable subset of the tasks.
# REFACTOR_PLAN — Web Client (React + TypeScript)

This document summarizes a proposed refactor to move the project towards a clean architecture, improve styling structure and maintainability, and recommend incremental steps. It pairs with `src/refactor/refactorPlan.ts` which contains programmatic tasks and move suggestions.

## Goals
- Introduce a layered architecture (presentation, domain, data/infrastructure, shared).
- Centralize API interactions and domain logic into services and hooks.
- Reduce coupling between UI components and side effects.
- Improve styling conventions (component-scoped CSS / CSS Modules / Tailwind utility consolidation).
- Make types explicit and consistent across DTOs and domain models.

## High-level layers
- presentation: React components, pages, UI-only hooks, and layout components. (e.g., `src/components`, `src/pages`, `src/presentation/hooks`)
- domain: Business logic and services that orchestrate API calls and map DTOs to domain models. (e.g., `src/domain/services`)
- infrastructure/data: HTTP clients, persistence, third-party integrations. (e.g., `src/infrastructure/http`)
- shared: Types, utils, UI primitives, design tokens. (e.g., `src/types`, `src/lib`, `src/theme`)

## Quick repository scan notes
- API clients exist at `src/api/apiClient.ts` and `src/api/privateApiClient.ts`. These should move to `src/infrastructure/http`.
- There are `src/services/*` files already which look like a good starting point for domain services; audit and migrate.
- `src/types` contains many domain types — unify DTO vs model naming and add mapping functions.
- Styling: project uses `main.css` and per-component CSS files (e.g., `Footer.css`, `product.css`, `sidebar.css`). Consider using CSS Modules, Tailwind components, or component-scoped styles to avoid global leakage.
- UI components in `src/components/ui` are numerous and can be grouped into `primitives` and `composites`.

## Concrete tasks (prioritized)
1. Extract API clients to infrastructure layer (High, 3h)
   - Move `src/api/apiClient.ts` and `src/api/privateApiClient.ts` to `src/infrastructure/http`.
   - Create a standardized interface: `IHttpClient { get<T>(), post<T>(), put<T>(), delete<T>() }`.
   - Add a typed wrapper `httpClient` returning `ApiResponse<T>`.

2. Create domain services (High, 8h)
   - Consolidate `src/services/*` into `src/domain/services/`.
   - Each service should be pure functions that accept the `httpClient` as a dependency (DI-friendly).
   - Add mapping functions to convert DTOs -> Models.

3. Add presentation hooks (Medium, 6h)
   - Create `src/presentation/hooks/useProducts.ts`, `useAuth.ts`, etc.
   - Hooks should return { data, error, loading, refetch } and use domain services.

4. Consolidate types (High, 4h)
   - Add `src/types/dtos` and `src/types/models` or adopt a naming convention: `ProductDTO`, `ProductModel`.
   - Add mapping helpers in domain layer.

5. Styling cleanup (Medium, 6h)
   - Replace global CSS with CSS Modules or Tailwind utility classes where appropriate.
   - Group global variables (colors, spacing) in `src/theme`.
   - Consider creating `ui/primitives` folder for base components with consistent props (className, style overrides).

6. Testing and linting (Medium, ongoing)
   - Add unit tests for domain services and hooks.
   - Ensure ESLint + TypeScript pass; add tests to CI.

## Migration patterns and small examples
- HTTP client DI example

  // httpClient.ts (infra)
  export interface IHttpClient { get<T>(url:string): Promise<T>; /* ... */ }

  // productService.ts (domain)
  export function createProductService(http: IHttpClient){
    return {
      async list(){
        return http.get<ProductDTO[]>('/products');
      }
    }
  }

  // useProducts.ts (presentation)
  export function useProducts(){
    const service = useMemo(() => createProductService(httpClient), []);
    const [data, setData] = useState<ProductModel[]>([]);
    useEffect(()=>{ service.list().then(map).then(setData); },[]);
    return { data };
  }

## File move suggestions
- `src/api/apiClient.ts` -> `src/infrastructure/http/apiClient.ts`
- `src/api/privateApiClient.ts` -> `src/infrastructure/http/privateApiClient.ts`
- `src/services/*` -> `src/domain/services/*`
- `src/lib/utils.ts` -> `src/shared/utils.ts` (or `src/lib` stays as shared)

## Contract and Edge Cases
Contract:
- Inputs: components call hooks; hooks call domain services; services use http client.
- Outputs: typed domain models or errors.
- Error modes: network errors (retry/backoff), validation errors (return typed validation), auth errors (401 handling in http client).

Edge cases to handle:
- Missing/undefined data from API (null fields).
- Large lists/pagination and performance (infinite scroll caching).
- Concurrent updates and optimistic UI.
- Auth token refresh and request queuing.

## Suggested incremental first steps (what I can implement now)
- Move API clients to `src/infrastructure/http` and add a small typed `IHttpClient` wrapper.
- Create `src/domain/services/productService.ts` that wraps the existing `productService` logic.

If you want, I can implement the first incremental change now (move clients + create wrapper) and run type checking.

## Next steps
- Pick the first task to implement. I recommend extracting the HTTP client first.
- After extraction, update one domain service and one hook to use the new client. Then run tests/type-check.

---

File: `src/refactor/refactorPlan.ts` contains a machine-readable subset of the tasks.
```

## CSS Inventory & Translation (automated scan results)

I ran an automated inventory and lightweight translation pass for the project's CSS (key files). The raw parsed output is in `src/refactor/css_inventory.json` and sample Tailwind translations are in `src/refactor/translation_examples.json`.

Summary of scanned files (representative):

- `src/main.css` (global) — loaded from `src/main.tsx`; contains CSS variables and global utilities.
- `src/components/Product/product.css` (component-scoped) — styles for product cards (.p-card, .p-imageWrap, .p-badge, ...).
- `src/components/Sidebar/sidebar.css` (component-scoped) — many structural selectors, `:has()` usages and pseudo elements (`::before`).
- `src/components/Header/Header.css` (component-scoped)
- `src/components/Footer/Footer.css` (component-scoped)
- `src/components/ui/notifications.css` (component-scoped) — contains `@keyframes` (flagged: NO-TRANSLATE)
- `src/components/layouts/ProfileLayout.css` (component-scoped) — contains `@keyframes` (flagged: NO-TRANSLATE)
- `src/pages/Profile/VouchersPage.css` (page-scoped)

Flags (needs manual review):

- Keyframes / animations: `src/components/ui/notifications.css`, `src/components/layouts/ProfileLayout.css` — preserved and flagged for review.
- Structural selectors and `:has()`: `src/components/Sidebar/sidebar.css` uses `:has()` and sibling/structural behaviors — these cannot be reliably translated to pure Tailwind and require component structure adjustments.
- Pseudo-elements with `content` or complex ::before/::after (many footer/ sidebar decorative rules) — keep in CSS and mark for manual migration.

What I translated automatically (sample):

- `.p-card` → `bg-white border border-[var(--brand-2)] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden w-[192px] grid p-2` (see `translation_examples.json`)
- `.p-imageWrap` → `relative aspect-square rounded-[12px] overflow-hidden bg-[#fafafa]`

Notes on translation choices:

- I used canonical Tailwind utilities when they map exactly (e.g., padding 8px → `p-2`).
- For values that are not exact Tailwind tokens (arbitrary sizes, complex box-shadows, gradients), I used Tailwind arbitrary syntax (e.g., `w-[192px]`, `shadow-[0_4px_12px_rgba(0,0,0,0.06)]`) as required by the rules.

Next automated steps I can run for you (pick one):

1. Full automated transformation (risky): apply translations across all components, produce diffs and flag list. I will NOT remove original CSS files but will replace `className` usages where safe. Manual review required for flagged items.
2. Incremental example transformation (recommended): pick 1 component (e.g., `src/components/Product/ProductCard.tsx`) — I'll replace CSS Module/class usages with Tailwind classes based on `translation_examples.json` and show the exact diff.
3. Generate a detailed migration report (JSON) listing: migrated components, changed className before/after, and flagged selectors requiring manual attention.

I recommend option 2 first (incremental) to validate visual parity and minimize regressions. Tell me which component/page to transform and I'll apply the change, run `npx tsc --noEmit`, and provide the diff + migration report.
