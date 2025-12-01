/**
 * Form field types supported by the widget
 */
export type FieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'textarea';

/**
 * Validation rules for form fields
 */
export interface ValidationRule {
  /**
   * Field is required
   */
  required?: boolean;

  /**
   * Minimum length (for text fields)
   */
  minLength?: number;

  /**
   * Maximum length (for text fields)
   */
  maxLength?: number;

  /**
   * Minimum value (for number fields)
   */
  min?: number;

  /**
   * Maximum value (for number fields)
   */
  max?: number;

  /**
   * Regular expression pattern
   */
  pattern?: string;

  /**
   * Custom error message
   */
  message?: string;
}

/**
 * Option for select/radio fields
 */
export interface FieldOption {
  label: string;
  value: string | number;
}

/**
 * Form field definition
 */
export interface FormField {
  /**
   * Unique field identifier
   */
  id: string;

  /**
   * Field type
   */
  type: FieldType;

  /**
   * Field label
   */
  label: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Help text displayed below the field
   */
  helpText?: string;

  /**
   * Default value
   */
  defaultValue?: string | number | boolean;

  /**
   * Validation rules
   */
  validation?: ValidationRule;

  /**
   * Options for select/radio fields
   */
  options?: FieldOption[];

  /**
   * Field width in grid (1-12)
   */
  width?: number;

  /**
   * Field is disabled
   */
  disabled?: boolean;
}

/**
 * Form schema definition
 */
export interface FormSchema {
  /**
   * Form title
   */
  title: string;

  /**
   * Form description
   */
  description?: string;

  /**
   * Form fields
   */
  fields: FormField[];

  /**
   * Submit button text
   */
  submitButtonText?: string;
}

/**
 * Form data (key-value pairs)
 */
export type FormData = Record<string, string | number | boolean>;

/**
 * Form validation errors
 */
export type FormErrors = Record<string, string>;
