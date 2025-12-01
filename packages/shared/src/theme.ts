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
 * Default theme values - Professional Equifax-inspired design
 */
export const defaultTheme: Theme = {
  primaryColor: '#ED1C24',  // Equifax-inspired red
  secondaryColor: '#4A5568',  // Professional gray
  backgroundColor: '#FFFFFF',
  textColor: '#1A202C',  // Dark gray for better readability
  errorColor: '#E53E3E',  // Modern red for errors
  successColor: '#38A169',  // Professional green
  borderColor: '#E2E8F0',  // Light gray borders
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontSize: '16px',
  borderRadius: '8px',  // More modern rounded corners
  spacing: '20px',
};
