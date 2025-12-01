/**
 * Credit Scoring SDK - Shared Types and Utilities
 */

// Theme types
export type { Theme } from './theme';
export { defaultTheme } from './theme';

// Form schema types
export type {
  FieldType,
  ValidationRule,
  FieldOption,
  FormField,
  FormSchema,
  FormData,
  FormErrors,
} from './form-schema';

// Config types
export type { WidgetConfig, ConfigResponse } from './config';

// Credit analysis types
export type {
  CreditRiskLevel,
  FinancialStatus,
  CreditFlags,
  CreditScoreBreakdown,
  CreditAnalysisResult,
  CreditAnalysisRequest,
  CreditAnalysisResponse,
} from './credit-analysis';
