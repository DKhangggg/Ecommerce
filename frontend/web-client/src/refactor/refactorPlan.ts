/*
  Refactor helper utilities for the web-client project
  - Provides small actionable TypeScript helpers and type definitions
  - This file is intended as a programmatic companion to REFACTOR_PLAN.md
  - It is not meant to be executed directly, but can be imported by codemods or scripts
*/

export type Layer =
  | "presentation"
  | "domain"
  | "data"
  | "infrastructure"
  | "shared";

export interface RefactorTask {
  id: string;
  title: string;
  description: string;
  layer: Layer;
  priority: "high" | "medium" | "low";
  estimatedHours?: number;
  filesAffected?: string[];
}

export const recommendedTasks: RefactorTask[] = [
  {
    id: "1-move-api-clients",
    title: "Extract API clients to infrastructure layer",
    description:
      "Move `src/api/apiClient.ts` and `src/api/privateApiClient.ts` into a new `src/infrastructure/http` folder and standardize the client interface (get/post/put/delete). Add a typed wrapper `apiService` that returns typed responses using `types/ApiResponse`.",
    layer: "infrastructure",
    priority: "high",
    estimatedHours: 3,
    filesAffected: ["src/api/apiClient.ts", "src/api/privateApiClient.ts"],
  },
  {
    id: "2-create-domain-services",
    title: "Create domain services for business logic",
    description:
      "Introduce services in `src/domain/services` (e.g., `productService`, `orderService`, `authService`) that orchestrate API calls and map DTOs to domain models. Keep components thin and move side effects out of React components into services or hooks.",
    layer: "domain",
    priority: "high",
    estimatedHours: 8,
    filesAffected: ["src/services/*", "src/components/*"],
  },
  {
    id: "3-introduce-hooks",
    title: "Add custom hooks for data fetching and state",
    description:
      "Create `src/presentation/hooks` with hooks like `useProducts`, `useAuth`, `useCart`. These hooks call domain services and provide memoization, error handling, and loading state. Replace direct service calls from components with these hooks.",
    layer: "presentation",
    priority: "medium",
    estimatedHours: 6,
    filesAffected: ["src/components/**", "src/pages/**"],
  },
  {
    id: "4-unify-types",
    title: "Consolidate and centralize TypeScript types",
    description:
      "Audit `src/types` and ensure consistent naming (DTO vs Domain). Add `src/types/dtos` and `src/types/models` if needed, and add mapping functions in domain layer.",
    layer: "shared",
    priority: "high",
    estimatedHours: 4,
    filesAffected: ["src/types/**"],
  },
];

export function summarizeTasks(tasks: RefactorTask[]) {
  return tasks.map((t) => `${t.id}: ${t.title} [${t.priority}]`).join("\n");
}

// Small utility to suggest file moves (not executed here)
export interface MoveInstruction {
  from: string;
  to: string;
  reason?: string;
}

export const suggestedMoves: MoveInstruction[] = [
  {
    from: "src/api/apiClient.ts",
    to: "src/infrastructure/http/apiClient.ts",
    reason: "Keep HTTP clients in infrastructure layer",
  },
  {
    from: "src/services/apiService.ts",
    to: "src/domain/services/apiService.ts",
    reason: "Domain orchestration belongs to domain/services",
  },
];

export default { recommendedTasks, summarizeTasks, suggestedMoves };
