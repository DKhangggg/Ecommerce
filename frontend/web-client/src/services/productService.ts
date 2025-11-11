import { createProductService } from "../domain/services/productService";
import { PrivateHttpClient } from "../infrastructure/http/httpClient";

export type BackendStatus =
  | "IN_STOCK"
  | "OUT_OF_STOCK"
  | "LOW_STOCK"
  | "DISCONTINUED"
  | "RESERVED";

// Back-compat service instance used across the app. Internally delegates
// to the domain service which accepts an IHttpClient. This keeps the
// rest of the codebase working while enabling tests and DI later.
export const productService = createProductService(PrivateHttpClient);
