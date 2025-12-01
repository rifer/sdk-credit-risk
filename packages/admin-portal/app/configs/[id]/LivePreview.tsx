'use client';

import { useEffect, useRef } from 'react';
import { WidgetConfig } from '@credit-scoring/shared';

interface LivePreviewProps {
  config: WidgetConfig;
}

export default function LivePreview({ config }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    // Generate preview HTML
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Widget Preview</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: #f9fafb;
    }
  </style>
  <script type="module">
    // Mock Web Component for preview
    class CreditScoringWidget extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
      }

      connectedCallback() {
        this.render();
      }

      render() {
        const config = ${JSON.stringify(config)};
        const theme = config.theme;
        const formSchema = config.formSchema;

        this.shadowRoot.innerHTML = \`
          <style>
            :host {
              display: block;
              font-family: \${theme.fontFamily};
              font-size: \${theme.fontSize};
              color: \${theme.textColor};
              background-color: \${theme.backgroundColor};
              padding: \${theme.spacing};
              border-radius: \${theme.borderRadius};
              box-sizing: border-box;
            }

            * {
              box-sizing: border-box;
            }

            .widget-header {
              margin-bottom: calc(\${theme.spacing} * 1.5);
            }

            .widget-logo {
              max-width: \${theme.logoMaxWidth || '200px'};
              height: auto;
              margin-bottom: \${theme.spacing};
            }

            .widget-title {
              font-size: 1.5em;
              font-weight: 600;
              margin: 0 0 0.5em 0;
              color: \${theme.textColor};
            }

            .widget-description {
              color: \${theme.secondaryColor};
              margin: 0 0 1em 0;
            }

            .form {
              display: flex;
              flex-direction: column;
              gap: \${theme.spacing};
            }

            .form-field {
              display: flex;
              flex-direction: column;
            }

            .form-label {
              font-weight: 500;
              margin-bottom: 0.5em;
              color: \${theme.textColor};
            }

            .form-label-required::after {
              content: ' *';
              color: \${theme.errorColor};
            }

            .form-input,
            .form-select,
            .form-textarea {
              padding: 0.75em;
              border: 1px solid \${theme.borderColor};
              border-radius: \${theme.borderRadius};
              font-family: inherit;
              font-size: inherit;
              color: inherit;
              background-color: \${theme.backgroundColor};
            }

            .form-textarea {
              min-height: 100px;
              resize: vertical;
            }

            .form-help-text {
              font-size: 0.875em;
              color: \${theme.secondaryColor};
              margin-top: 0.25em;
            }

            .form-checkbox-label {
              display: flex;
              align-items: center;
              gap: 0.5em;
              cursor: pointer;
            }

            .form-submit {
              padding: 0.75em 1.5em;
              background-color: \${theme.primaryColor};
              color: white;
              border: none;
              border-radius: \${theme.borderRadius};
              font-family: inherit;
              font-size: inherit;
              font-weight: 500;
              cursor: pointer;
            }

            .branding {
              text-align: center;
              font-size: 0.75em;
              color: \${theme.secondaryColor};
              margin-top: calc(\${theme.spacing} * 1.5);
            }
          </style>

          <div class="widget-container">
            <div class="widget-header">
              \${theme.logoUrl ? \`<img src="\${theme.logoUrl}" alt="Logo" class="widget-logo" />\` : ''}
              <h2 class="widget-title">\${formSchema.title}</h2>
              \${formSchema.description ? \`<p class="widget-description">\${formSchema.description}</p>\` : ''}
            </div>

            <form class="form">
              \${formSchema.fields.map(field => {
                const isRequired = field.validation?.required ? 'form-label-required' : '';

                if (field.type === 'textarea') {
                  return \`
                    <div class="form-field">
                      <label class="form-label \${isRequired}">\${field.label}</label>
                      <textarea class="form-textarea" placeholder="\${field.placeholder || ''}"></textarea>
                      \${field.helpText ? \`<div class="form-help-text">\${field.helpText}</div>\` : ''}
                    </div>
                  \`;
                } else if (field.type === 'select') {
                  return \`
                    <div class="form-field">
                      <label class="form-label \${isRequired}">\${field.label}</label>
                      <select class="form-select">
                        \${(field.options || []).map(opt => \`<option value="\${opt.value}">\${opt.label}</option>\`).join('')}
                      </select>
                      \${field.helpText ? \`<div class="form-help-text">\${field.helpText}</div>\` : ''}
                    </div>
                  \`;
                } else if (field.type === 'checkbox') {
                  return \`
                    <div class="form-field">
                      <label class="form-checkbox-label">
                        <input type="checkbox" />
                        <span class="\${isRequired}">\${field.label}</span>
                      </label>
                      \${field.helpText ? \`<div class="form-help-text">\${field.helpText}</div>\` : ''}
                    </div>
                  \`;
                } else {
                  return \`
                    <div class="form-field">
                      <label class="form-label \${isRequired}">\${field.label}</label>
                      <input class="form-input" type="\${field.type}" placeholder="\${field.placeholder || ''}" />
                      \${field.helpText ? \`<div class="form-help-text">\${field.helpText}</div>\` : ''}
                    </div>
                  \`;
                }
              }).join('')}

              <button type="submit" class="form-submit">
                \${formSchema.submitButtonText || 'Submit'}
              </button>
            </form>

            \${config.showBranding ? \`
              <div class="branding">
                Powered by Credit Scoring SDK
              </div>
            \` : ''}
          </div>
        \`;
      }
    }

    customElements.define('credit-scoring-widget', CreditScoringWidget);
  </script>
</head>
<body>
  <credit-scoring-widget></credit-scoring-widget>
</body>
</html>
    `;

    // Write to iframe
    const iframeDoc = iframeRef.current.contentDocument;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(html);
      iframeDoc.close();
    }
  }, [config]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">👁️ Live Preview</h2>
        <div className="text-xs text-gray-500">Updates in real-time</div>
      </div>

      <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <iframe
          ref={iframeRef}
          className="w-full h-[600px] bg-white"
          title="Widget Preview"
        />
      </div>

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Integration Code</h3>
        <pre className="text-xs text-blue-800 overflow-x-auto">
          {`<script type="module" src="https://cdn.your-domain.com/credit-scoring-widget.js"></script>\n<credit-scoring-widget config-id="${config.id}"></credit-scoring-widget>`}
        </pre>
      </div>
    </div>
  );
}
