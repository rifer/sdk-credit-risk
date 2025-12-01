/**
 * Theme configuration for the Credit Scoring widget
 */
export interface Theme {
  /**
   * Primary brand color
   */
  primaryColor: string;

  /**
   * Secondary brand color
   */
  secondaryColor: string;

  /**
   * Background color
   */
  backgroundColor: string;

  /**
   * Text color
   */
  textColor: string;

  /**
   * Error color for validation messages
   */
  errorColor: string;

  /**
   * Success color for positive feedback
   */
  successColor: string;

  /**
   * Border color for form elements
   */
  borderColor: string;

  /**
   * Font family for the widget
   */
  fontFamily: string;

  /**
   * Base font size
   */
  fontSize: string;

  /**
   * Border radius for form elements
   */
  borderRadius: string;

  /**
   * Spacing unit (used for padding/margin)
   */
  spacing: string;

  /**
   * Logo URL (optional)
   */
  logoUrl?: string;

  /**
   * Logo max width
   */
  logoMaxWidth?: string;
}

/**
 * Default theme values
 */
export const defaultTheme: Theme = {
  primaryColor: '#0066cc',
  secondaryColor: '#6c757d',
  backgroundColor: '#ffffff',
  textColor: '#212529',
  errorColor: '#dc3545',
  successColor: '#28a745',
  borderColor: '#ced4da',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontSize: '16px',
  borderRadius: '4px',
  spacing: '16px',
};
