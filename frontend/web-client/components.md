# UI Components Catalog

This document lists the available UI components in `src/components/ui`, grouped by purpose, with import examples and usage notes.

All components are authored in TypeScript + React and styled with Tailwind. Some wrappers integrate Radix UI primitives or Ant Design where noted. Prefer Tailwind utilities for layout; keep one UI library per page to avoid conflicts (see RULES.md).

Base import pattern:

```ts
// Example
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
```

Note: Some files export multiple subcomponents (e.g., `Dialog`, `DialogContent`, `DialogTrigger`). Check the file for the exact named exports.

---

## Forms & Inputs

- `button.tsx` — Primary and variant buttons.
- `input.tsx` — Text input field.
- `textarea.tsx` — Multi-line text input.
- `select.tsx` — Headless/primitive select component.
- `radio-group.tsx` — Radio group and items.
- `checkbox.tsx` — Checkbox control.
- `switch.tsx` — Toggle switch.
- `slider.tsx` — Range slider.
- `input-otp.tsx` — One-time-password / PIN input.
- `label.tsx` — Accessible label.
- `form.tsx` — Form helpers (composition utilities).
- `date-picker.tsx` — Date selection control.
- `calendar.tsx` — Calendar display component.
- `rate.tsx` — Rating stars control.
- `steps.tsx` — Stepper for multi-step flows.
- `pagination.tsx` — Pagination controls.
- `ant-select.tsx` — Ant Design select wrapper.
- `ant-pagination.tsx` — Ant Design pagination wrapper.

Import examples:

```ts
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
```

---

## Feedback & Status

- `alert.tsx` — Informational and error alerts.
- `alert-dialog.tsx` — Destructive/confirm dialog.
- `toast.tsx`, `toaster.tsx` — Toast system; mount `Toaster` once near app root.
- `sonner.tsx` — Alternative toast/notification provider.
- `message.tsx` — Inline message component.
- `notifications.tsx`, `notifications.css` — Notification list/center.
- `progress.tsx` — Progress bar/indicator.
- Result variants:
  - `result-success.tsx`
  - `result-warning.tsx`
  - `result-error.tsx`
  - `result-info.tsx`
  - `result-403.tsx`, `result-404.tsx`, `result-500.tsx`
  - `results.tsx` — aggregator/helper
- `empty.tsx` — Empty state.
- `skeleton.tsx` — Loading skeleton placeholders.

Import example:

```ts
import { Alert } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/toaster";
```

---

## Overlays & Popovers

- `dialog.tsx` — Modal dialog primitives.
- `drawer.tsx` — Slide-in drawer.
- `sheet.tsx` — Bottom/top sheet overlay.
- `popover.tsx` — Popover layer.
- `tooltip.tsx` — Tooltip.
- `hover-card.tsx` — Hover card.
- `alert-dialog.tsx` — (also in Feedback)
- Menus:
  - `dropdown-menu.tsx`
  - `context-menu.tsx`
  - `navigation-menu.tsx`
  - `menubar.tsx`

Import example:

```ts
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
```

---

## Layout, Navigation & Structure

- `breadcrumb.tsx` — Breadcrumb navigation.
- `tabs.tsx` — Tabs.
- `collapsible.tsx` — Collapsible content area.
- `accordion.tsx` — Accordion disclosure.
- `command.tsx` — Command palette UI.
- `sidebar.tsx` — Sidebar primitive (pair with layout rules: sidebar left, main content grows).
- `separator.tsx` — Horizontal/vertical rule.
- `scroll-area.tsx` — Scrollable container with custom scrollbars.
- `resizable.tsx` — Resizable panels/splitter.
- `aspect-ratio.tsx` — Maintain media aspect ratio.

Import example:

```ts
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
```

---

## Data Display & Media

- `avatar.tsx`, `AvatarDemo.tsx` — Avatar and demo usage.
- `badge.tsx` — Badge/label.
- `card.tsx`, `CardCredit.tsx` — Card containers; credit-card styled variant.
- `table.tsx` — Table primitives.
- `chart.tsx` — Chart container/helpers.
- `qr-code.tsx` — QR code generator/display.
- `carousel.tsx` — Carousel/slider.
- `ant-carousel.tsx` — Ant Design carousel wrapper.

Import example:

```ts
import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
```

---

## Ant Design Wrappers

- `ant-components.tsx` — Shared AntD wrappers/utilities.
- `ant-select.tsx`, `ant-pagination.tsx`, `ant-carousel.tsx` — Specific AntD component wrappers.

Usage notes:

- Prefer a single UI library per page to avoid style collisions.
- Import `antd/dist/reset.css` ONCE globally (e.g., in `main.tsx`), not per component.

---

## Utilities

- `use-toast.ts` — Hook for toast system.

---

## Guidelines & Best Practices

- Layout: On desktop, the sidebar sits on the left with a fixed column (~240px). Main content takes the remaining width. On mobile, sidebar appears above content. Avoid page-level `min-h-screen` that fights layout cards.
- Styling: Tailwind-first for layout and spacing; CSS only for animations/polish. Do not override Tailwind utility names.
- Imports: Use `@/components/ui/<name>` absolute imports. Avoid importing file extensions.
- Accessibility: Provide labels/aria attributes; prefer semantic elements.
- Performance: Lazy-load heavy overlays and charts; mount `Toaster` once.

---

## Quick Reference (by filename)

accordion • alert • alert-dialog • ant-carousel • ant-components • ant-pagination • ant-select • aspect-ratio • avatar • AvatarDemo • badge • breadcrumb • button • calendar • card • CardCredit • carousel • chart • checkbox • collapsible • command • context-menu • date-picker • dialog • drawer • dropdown-menu • empty • form • hover-card • input • input-otp • label • menubar • message • navigation-menu • notifications • pagination • popover • progress • qr-code • radio-group • rate • resizable • result-\* • results • scroll-area • select • separator • sheet • sidebar • skeleton • slider • sonner • steps • switch • table • tabs • textarea • toast • toaster • toggle • toggle-group • tooltip • use-toast
