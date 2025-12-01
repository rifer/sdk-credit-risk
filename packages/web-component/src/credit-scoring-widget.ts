import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type {
  WidgetConfig,
  FormData,
  FormErrors,
  FormField,
} from '@credit-scoring/shared';
import { defaultTheme } from '@credit-scoring/shared';

/**
 * Credit Scoring Widget - Embeddable Web Component
 *
 * @example
 * ```html
 * <credit-scoring-widget config-id="abc123"></credit-scoring-widget>
 * ```
 */
@customElement('credit-scoring-widget')
export class CreditScoringWidget extends LitElement {
  /**
   * Configuration ID to load from API
   */
  @property({ type: String, attribute: 'config-id' })
  configId = '';

  /**
   * API base URL (can be overridden)
   */
  @property({ type: String, attribute: 'api-url' })
  apiUrl = 'https://api.credit-scoring.example.com';

  /**
   * Widget configuration (loaded from API)
   */
  @state()
  private config: WidgetConfig | null = null;

  /**
   * Loading state
   */
  @state()
  private loading = false;

  /**
   * Error message
   */
  @state()
  private error: string | null = null;

  /**
   * Form data
   */
  @state()
  private formData: FormData = {};

  /**
   * Form validation errors
   */
  @state()
  private formErrors: FormErrors = {};

  /**
   * Form submission state
   */
  @state()
  private submitting = false;

  /**
   * Form submission success
   */
  @state()
  private submitSuccess = false;

  /**
   * Styles for the widget (scoped via Shadow DOM)
   */
  static styles = css`
    :host {
      display: block;
      font-family: var(--cs-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
      font-size: var(--cs-font-size, 16px);
      color: var(--cs-text-color, #212529);
      background-color: var(--cs-background-color, #ffffff);
      padding: var(--cs-spacing, 16px);
      border-radius: var(--cs-border-radius, 4px);
      box-sizing: border-box;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    .widget-container {
      max-width: 100%;
    }

    .widget-header {
      margin-bottom: calc(var(--cs-spacing, 16px) * 1.5);
    }

    .widget-logo {
      max-width: var(--cs-logo-max-width, 200px);
      height: auto;
      margin-bottom: var(--cs-spacing, 16px);
    }

    .widget-title {
      font-size: 1.5em;
      font-weight: 600;
      margin: 0 0 0.5em 0;
      color: var(--cs-text-color, #212529);
    }

    .widget-description {
      color: var(--cs-secondary-color, #6c757d);
      margin: 0 0 1em 0;
    }

    .loading-spinner {
      text-align: center;
      padding: calc(var(--cs-spacing, 16px) * 2);
      color: var(--cs-primary-color, #0066cc);
    }

    .error-message {
      background-color: #fee;
      color: var(--cs-error-color, #dc3545);
      padding: var(--cs-spacing, 16px);
      border-radius: var(--cs-border-radius, 4px);
      margin-bottom: var(--cs-spacing, 16px);
      border-left: 4px solid var(--cs-error-color, #dc3545);
    }

    .success-message {
      background-color: #efe;
      color: var(--cs-success-color, #28a745);
      padding: var(--cs-spacing, 16px);
      border-radius: var(--cs-border-radius, 4px);
      margin-bottom: var(--cs-spacing, 16px);
      border-left: 4px solid var(--cs-success-color, #28a745);
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: var(--cs-spacing, 16px);
    }

    .form-field {
      display: flex;
      flex-direction: column;
    }

    .form-label {
      font-weight: 500;
      margin-bottom: 0.5em;
      color: var(--cs-text-color, #212529);
    }

    .form-label-required::after {
      content: ' *';
      color: var(--cs-error-color, #dc3545);
    }

    .form-input,
    .form-select,
    .form-textarea {
      padding: 0.75em;
      border: 1px solid var(--cs-border-color, #ced4da);
      border-radius: var(--cs-border-radius, 4px);
      font-family: inherit;
      font-size: inherit;
      color: inherit;
      background-color: var(--cs-background-color, #ffffff);
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
      outline: none;
      border-color: var(--cs-primary-color, #0066cc);
      box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
    }

    .form-input.error,
    .form-select.error,
    .form-textarea.error {
      border-color: var(--cs-error-color, #dc3545);
    }

    .form-textarea {
      min-height: 100px;
      resize: vertical;
    }

    .form-help-text {
      font-size: 0.875em;
      color: var(--cs-secondary-color, #6c757d);
      margin-top: 0.25em;
    }

    .form-error {
      font-size: 0.875em;
      color: var(--cs-error-color, #dc3545);
      margin-top: 0.25em;
    }

    .form-checkbox-group,
    .form-radio-group {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }

    .form-checkbox-label,
    .form-radio-label {
      display: flex;
      align-items: center;
      gap: 0.5em;
      cursor: pointer;
    }

    .form-submit {
      padding: 0.75em 1.5em;
      background-color: var(--cs-primary-color, #0066cc);
      color: white;
      border: none;
      border-radius: var(--cs-border-radius, 4px);
      font-family: inherit;
      font-size: inherit;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.15s ease-in-out;
    }

    .form-submit:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--cs-primary-color, #0066cc) 85%, black);
    }

    .form-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .branding {
      text-align: center;
      font-size: 0.75em;
      color: var(--cs-secondary-color, #6c757d);
      margin-top: calc(var(--cs-spacing, 16px) * 1.5);
    }
  `;

  /**
   * Load configuration when component is connected
   */
  connectedCallback() {
    super.connectedCallback();
    if (this.configId) {
      this.loadConfig();
    }
  }

  /**
   * Reload config if configId changes
   */
  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('configId') && this.configId) {
      this.loadConfig();
    }
  }

  /**
   * Load configuration from API
   */
  private async loadConfig() {
    this.loading = true;
    this.error = null;

    try {
      // Mock endpoint - in production this would call the real API
      const response = await this.fetchConfigMock();

      if (response.success && response.data) {
        this.config = response.data;
        this.applyTheme(response.data.theme);
      } else {
        this.error = response.error || 'Failed to load configuration';
      }
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to load configuration';
    } finally {
      this.loading = false;
    }
  }

  /**
   * Fetch configuration from API or fallback to mock
   */
  private async fetchConfigMock(): Promise<{ success: boolean; data?: WidgetConfig; error?: string }> {
    // Try to load from real API first
    try {
      const response = await fetch(`${this.apiUrl}/api/configs/${this.configId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          return { success: true, data: data.data };
        }
      }
    } catch (err) {
      console.warn('Failed to load from API, using mock data');
    }

    // Fallback to mock data
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock configuration
    const mockConfig: WidgetConfig = {
      id: this.configId,
      name: 'Credit Scoring Form - Demo',
      theme: {
        ...defaultTheme,
        primaryColor: '#0066cc',
        secondaryColor: '#6c757d',
        logoUrl: 'https://via.placeholder.com/200x60?text=Bank+Logo',
        logoMaxWidth: '180px',
      },
      formSchema: {
        title: 'Solicitud de Crédito',
        description: 'Complete el formulario para evaluar su solicitud de crédito',
        submitButtonText: 'Enviar Solicitud',
        fields: [
          {
            id: 'fullName',
            type: 'text',
            label: 'Nombre Completo',
            placeholder: 'Juan Pérez',
            validation: {
              required: true,
              minLength: 3,
              message: 'El nombre debe tener al menos 3 caracteres',
            },
            width: 12,
          },
          {
            id: 'email',
            type: 'email',
            label: 'Correo Electrónico',
            placeholder: 'juan@example.com',
            validation: {
              required: true,
              pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
              message: 'Ingrese un correo válido',
            },
            width: 6,
          },
          {
            id: 'phone',
            type: 'tel',
            label: 'Teléfono',
            placeholder: '+34 600 000 000',
            validation: {
              required: true,
              message: 'El teléfono es obligatorio',
            },
            width: 6,
          },
          {
            id: 'amount',
            type: 'number',
            label: 'Monto Solicitado (€)',
            placeholder: '10000',
            helpText: 'Monto entre 1.000€ y 50.000€',
            validation: {
              required: true,
              min: 1000,
              max: 50000,
              message: 'El monto debe estar entre 1.000€ y 50.000€',
            },
            width: 6,
          },
          {
            id: 'term',
            type: 'select',
            label: 'Plazo (meses)',
            validation: {
              required: true,
            },
            options: [
              { label: 'Seleccione un plazo', value: '' },
              { label: '12 meses', value: 12 },
              { label: '24 meses', value: 24 },
              { label: '36 meses', value: 36 },
              { label: '48 meses', value: 48 },
            ],
            width: 6,
          },
          {
            id: 'employment',
            type: 'select',
            label: 'Situación Laboral',
            validation: {
              required: true,
            },
            options: [
              { label: 'Seleccione una opción', value: '' },
              { label: 'Empleado por cuenta ajena', value: 'employee' },
              { label: 'Autónomo', value: 'self-employed' },
              { label: 'Jubilado', value: 'retired' },
              { label: 'Desempleado', value: 'unemployed' },
            ],
            width: 12,
          },
          {
            id: 'consent',
            type: 'checkbox',
            label: 'Acepto los términos y condiciones',
            validation: {
              required: true,
              message: 'Debe aceptar los términos y condiciones',
            },
            width: 12,
          },
        ],
      },
      submitEndpoint: '/api/submit',
      successMessage: '¡Solicitud enviada con éxito! Nos pondremos en contacto pronto.',
      errorMessage: 'Error al enviar la solicitud. Por favor, inténtelo de nuevo.',
      showBranding: true,
    };

    return {
      success: true,
      data: mockConfig,
    };
  }

  /**
   * Apply theme to CSS variables
   */
  private applyTheme(theme: WidgetConfig['theme']) {
    const style = this.style;
    style.setProperty('--cs-primary-color', theme.primaryColor);
    style.setProperty('--cs-secondary-color', theme.secondaryColor);
    style.setProperty('--cs-background-color', theme.backgroundColor);
    style.setProperty('--cs-text-color', theme.textColor);
    style.setProperty('--cs-error-color', theme.errorColor);
    style.setProperty('--cs-success-color', theme.successColor);
    style.setProperty('--cs-border-color', theme.borderColor);
    style.setProperty('--cs-font-family', theme.fontFamily);
    style.setProperty('--cs-font-size', theme.fontSize);
    style.setProperty('--cs-border-radius', theme.borderRadius);
    style.setProperty('--cs-spacing', theme.spacing);

    if (theme.logoMaxWidth) {
      style.setProperty('--cs-logo-max-width', theme.logoMaxWidth);
    }
  }

  /**
   * Handle form input change
   */
  private handleInputChange(fieldId: string, value: string | number | boolean) {
    this.formData = {
      ...this.formData,
      [fieldId]: value,
    };

    // Clear error for this field
    if (this.formErrors[fieldId]) {
      const { [fieldId]: _, ...rest } = this.formErrors;
      this.formErrors = rest;
    }
  }

  /**
   * Validate form field
   */
  private validateField(field: FormField, value: any): string | null {
    const validation = field.validation;
    if (!validation) return null;

    // Required validation
    if (validation.required && !value) {
      return validation.message || `${field.label} es obligatorio`;
    }

    // String validations
    if (typeof value === 'string') {
      if (validation.minLength && value.length < validation.minLength) {
        return validation.message || `${field.label} debe tener al menos ${validation.minLength} caracteres`;
      }

      if (validation.maxLength && value.length > validation.maxLength) {
        return validation.message || `${field.label} debe tener máximo ${validation.maxLength} caracteres`;
      }

      if (validation.pattern && !new RegExp(validation.pattern).test(value)) {
        return validation.message || `${field.label} no tiene el formato correcto`;
      }
    }

    // Number validations
    if (typeof value === 'number') {
      if (validation.min !== undefined && value < validation.min) {
        return validation.message || `${field.label} debe ser al menos ${validation.min}`;
      }

      if (validation.max !== undefined && value > validation.max) {
        return validation.message || `${field.label} debe ser máximo ${validation.max}`;
      }
    }

    return null;
  }

  /**
   * Handle form submission
   */
  private async handleSubmit(e: Event) {
    e.preventDefault();

    if (!this.config) return;

    // Validate all fields
    const errors: FormErrors = {};
    for (const field of this.config.formSchema.fields) {
      const value = this.formData[field.id];
      const error = this.validateField(field, value);
      if (error) {
        errors[field.id] = error;
      }
    }

    if (Object.keys(errors).length > 0) {
      this.formErrors = errors;
      return;
    }

    // Submit form
    this.submitting = true;
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.submitSuccess = true;
      this.formData = {};

      // Dispatch custom event
      this.dispatchEvent(new CustomEvent('submit-success', {
        detail: { data: this.formData },
        bubbles: true,
        composed: true,
      }));
    } catch (err) {
      this.error = this.config.errorMessage || 'Error al enviar el formulario';

      this.dispatchEvent(new CustomEvent('submit-error', {
        detail: { error: err },
        bubbles: true,
        composed: true,
      }));
    } finally {
      this.submitting = false;
    }
  }

  /**
   * Render form field
   */
  private renderField(field: FormField) {
    const value = this.formData[field.id] || field.defaultValue || '';
    const error = this.formErrors[field.id];
    const hasError = !!error;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
      case 'date':
        return html`
          <div class="form-field">
            <label class="form-label ${field.validation?.required ? 'form-label-required' : ''}">
              ${field.label}
            </label>
            <input
              class="form-input ${hasError ? 'error' : ''}"
              type="${field.type}"
              placeholder="${field.placeholder || ''}"
              .value="${value}"
              ?disabled="${field.disabled || this.submitting}"
              @input="${(e: Event) => {
                const target = e.target as HTMLInputElement;
                const val = field.type === 'number' ? parseFloat(target.value) : target.value;
                this.handleInputChange(field.id, val);
              }}"
            />
            ${field.helpText ? html`<div class="form-help-text">${field.helpText}</div>` : ''}
            ${error ? html`<div class="form-error">${error}</div>` : ''}
          </div>
        `;

      case 'textarea':
        return html`
          <div class="form-field">
            <label class="form-label ${field.validation?.required ? 'form-label-required' : ''}">
              ${field.label}
            </label>
            <textarea
              class="form-textarea ${hasError ? 'error' : ''}"
              placeholder="${field.placeholder || ''}"
              .value="${value}"
              ?disabled="${field.disabled || this.submitting}"
              @input="${(e: Event) => {
                const target = e.target as HTMLTextAreaElement;
                this.handleInputChange(field.id, target.value);
              }}"
            ></textarea>
            ${field.helpText ? html`<div class="form-help-text">${field.helpText}</div>` : ''}
            ${error ? html`<div class="form-error">${error}</div>` : ''}
          </div>
        `;

      case 'select':
        return html`
          <div class="form-field">
            <label class="form-label ${field.validation?.required ? 'form-label-required' : ''}">
              ${field.label}
            </label>
            <select
              class="form-select ${hasError ? 'error' : ''}"
              .value="${value}"
              ?disabled="${field.disabled || this.submitting}"
              @change="${(e: Event) => {
                const target = e.target as HTMLSelectElement;
                this.handleInputChange(field.id, target.value);
              }}"
            >
              ${field.options?.map(opt => html`
                <option value="${opt.value}">${opt.label}</option>
              `)}
            </select>
            ${field.helpText ? html`<div class="form-help-text">${field.helpText}</div>` : ''}
            ${error ? html`<div class="form-error">${error}</div>` : ''}
          </div>
        `;

      case 'checkbox':
        return html`
          <div class="form-field">
            <label class="form-checkbox-label">
              <input
                type="checkbox"
                .checked="${value}"
                ?disabled="${field.disabled || this.submitting}"
                @change="${(e: Event) => {
                  const target = e.target as HTMLInputElement;
                  this.handleInputChange(field.id, target.checked);
                }}"
              />
              <span class="${field.validation?.required ? 'form-label-required' : ''}">
                ${field.label}
              </span>
            </label>
            ${field.helpText ? html`<div class="form-help-text">${field.helpText}</div>` : ''}
            ${error ? html`<div class="form-error">${error}</div>` : ''}
          </div>
        `;

      case 'radio':
        return html`
          <div class="form-field">
            <label class="form-label ${field.validation?.required ? 'form-label-required' : ''}">
              ${field.label}
            </label>
            <div class="form-radio-group">
              ${field.options?.map(opt => html`
                <label class="form-radio-label">
                  <input
                    type="radio"
                    name="${field.id}"
                    value="${opt.value}"
                    .checked="${value === opt.value}"
                    ?disabled="${field.disabled || this.submitting}"
                    @change="${() => this.handleInputChange(field.id, opt.value)}"
                  />
                  <span>${opt.label}</span>
                </label>
              `)}
            </div>
            ${field.helpText ? html`<div class="form-help-text">${field.helpText}</div>` : ''}
            ${error ? html`<div class="form-error">${error}</div>` : ''}
          </div>
        `;

      default:
        return html``;
    }
  }

  /**
   * Render the widget
   */
  render() {
    // Loading state
    if (this.loading) {
      return html`
        <div class="widget-container">
          <div class="loading-spinner">Cargando...</div>
        </div>
      `;
    }

    // Error state
    if (this.error && !this.config) {
      return html`
        <div class="widget-container">
          <div class="error-message">${this.error}</div>
        </div>
      `;
    }

    // No config
    if (!this.config) {
      return html`
        <div class="widget-container">
          <div class="error-message">
            No se especificó un ID de configuración válido
          </div>
        </div>
      `;
    }

    const { formSchema, theme, successMessage, showBranding } = this.config;

    // Success state
    if (this.submitSuccess) {
      return html`
        <div class="widget-container">
          <div class="success-message">
            ${successMessage || '¡Formulario enviado con éxito!'}
          </div>
        </div>
      `;
    }

    // Form
    return html`
      <div class="widget-container">
        <div class="widget-header">
          ${theme.logoUrl ? html`
            <img src="${theme.logoUrl}" alt="Logo" class="widget-logo" />
          ` : ''}
          <h2 class="widget-title">${formSchema.title}</h2>
          ${formSchema.description ? html`
            <p class="widget-description">${formSchema.description}</p>
          ` : ''}
        </div>

        ${this.error ? html`
          <div class="error-message">${this.error}</div>
        ` : ''}

        <form class="form" @submit="${this.handleSubmit}">
          ${formSchema.fields.map(field => this.renderField(field))}

          <button
            type="submit"
            class="form-submit"
            ?disabled="${this.submitting}"
          >
            ${this.submitting ? 'Enviando...' : (formSchema.submitButtonText || 'Enviar')}
          </button>
        </form>

        ${showBranding ? html`
          <div class="branding">
            Powered by Credit Scoring SDK
          </div>
        ` : ''}
      </div>
    `;
  }
}

// Declare the custom element for TypeScript
declare global {
  interface HTMLElementTagNameMap {
    'credit-scoring-widget': CreditScoringWidget;
  }
}
