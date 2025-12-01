import { Theme } from './theme';
import { FormSchema } from './form-schema';

/**
 * Widget configuration
 */
export interface WidgetConfig {
  /**
   * Configuration ID
   */
  id: string;

  /**
   * Configuration name (for admin purposes)
   */
  name: string;

  /**
   * Theme configuration
   */
  theme: Theme;

  /**
   * Form schema
   */
  formSchema: FormSchema;

  /**
   * API endpoint to submit form data
   */
  submitEndpoint: string;

  /**
   * Success message after form submission
   */
  successMessage?: string;

  /**
   * Error message on form submission failure
   */
  errorMessage?: string;

  /**
   * Show powered by branding
   */
  showBranding?: boolean;

  /**
   * Enable analytics
   */
  enableAnalytics?: boolean;

  /**
   * Custom CSS (applied after theme)
   */
  customCss?: string;

  /**
   * Language/locale
   */
  locale?: string;
}

/**
 * API response for config fetch
 */
export interface ConfigResponse {
  success: boolean;
  data?: WidgetConfig;
  error?: string;
}
