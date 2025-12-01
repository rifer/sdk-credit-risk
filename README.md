# Credit Scoring SDK 🏦

B2B credit scoring SDK with embeddable Web Component for banks and financial institutions.

## 🚀 Features

- **Web Component with Lit**: Framework-agnostic, works with any stack
- **Remote Configuration**: Admin portal to configure widgets without code
- **Dynamic Forms**: Based on JSON Schema, fully configurable
- **Complete Theming**: Customizable colors, fonts, and logos
- **Shadow DOM**: Complete CSS isolation
- **TypeScript**: Strong typing throughout the project
- **Monorepo**: Organized with pnpm workspaces

## 📦 Project Structure

```
sdk-credit-risk/
├── packages/
│   ├── web-component/      # Embeddable widget (Lit + TypeScript)
│   ├── admin-portal/       # Admin portal (Next.js)
│   └── shared/             # Shared types
├── examples/
│   └── vanilla/            # Vanilla HTML example
└── pnpm-workspace.yaml
```

## 🛠️ Installation and Setup

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd sdk-credit-risk

# Install all dependencies
pnpm install

# Build all packages
pnpm build
```

## 🎯 Quick Start

### 1. Web Component Development

```bash
cd packages/web-component
pnpm dev
```

### 2. Admin Portal Development

```bash
cd packages/admin-portal
pnpm dev
```

### 3. Try the Example

```bash
# 1. Build the web component
cd packages/web-component
pnpm build

# 2. Open examples/vanilla/index.html in your browser
```

## 📖 Widget Usage

### Basic Integration

```html
<!-- 1. Import the script -->
<script type="module" src="https://cdn.your-domain.com/credit-scoring-widget.js"></script>

<!-- 2. Use the Web Component -->
<credit-scoring-widget config-id="your-config-id"></credit-scoring-widget>
```

### Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Credit Scoring Widget</title>
</head>
<body>
  <!-- The widget -->
  <credit-scoring-widget config-id="demo-001"></credit-scoring-widget>

  <!-- Import the script -->
  <script type="module" src="./dist/credit-scoring-widget.js"></script>

  <script>
    const widget = document.querySelector('credit-scoring-widget');

    // Listen to events
    widget.addEventListener('submit-success', (e) => {
      console.log('Form submitted:', e.detail);
    });

    widget.addEventListener('submit-error', (e) => {
      console.error('Error:', e.detail);
    });
  </script>
</body>
</html>
```

## 🎨 Customization

### Theming with CSS Variables

```javascript
const widget = document.querySelector('credit-scoring-widget');

// Customize colors
widget.style.setProperty('--cs-primary-color', '#ff0000');
widget.style.setProperty('--cs-secondary-color', '#00ff00');
widget.style.setProperty('--cs-background-color', '#ffffff');
widget.style.setProperty('--cs-text-color', '#333333');

// Customize fonts
widget.style.setProperty('--cs-font-family', 'Arial, sans-serif');
widget.style.setProperty('--cs-font-size', '18px');

// Customize borders and spacing
widget.style.setProperty('--cs-border-radius', '8px');
widget.style.setProperty('--cs-spacing', '20px');
```

### Available CSS Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--cs-primary-color` | `#0066cc` | Primary color |
| `--cs-secondary-color` | `#6c757d` | Secondary color |
| `--cs-background-color` | `#ffffff` | Background color |
| `--cs-text-color` | `#212529` | Text color |
| `--cs-error-color` | `#dc3545` | Error color |
| `--cs-success-color` | `#28a745` | Success color |
| `--cs-border-color` | `#ced4da` | Border color |
| `--cs-font-family` | System fonts | Text font |
| `--cs-font-size` | `16px` | Base font size |
| `--cs-border-radius` | `4px` | Border radius |
| `--cs-spacing` | `16px` | Base spacing |
| `--cs-logo-max-width` | `200px` | Maximum logo width |

## 📡 Events

The widget emits custom events:

```javascript
const widget = document.querySelector('credit-scoring-widget');

// Submit success
widget.addEventListener('submit-success', (e) => {
  console.log('Data:', e.detail.data);
  // Redirect, show message, etc.
});

// Submit error
widget.addEventListener('submit-error', (e) => {
  console.error('Error:', e.detail.error);
  // Show error message, retry, etc.
});
```

## 🔧 Widget Configuration

### Configuration Structure

```typescript
interface WidgetConfig {
  id: string;
  name: string;
  theme: Theme;
  formSchema: FormSchema;
  submitEndpoint: string;
  successMessage?: string;
  errorMessage?: string;
  showBranding?: boolean;
  enableAnalytics?: boolean;
  customCss?: string;
  locale?: string;
}
```

### Configuration Example

```json
{
  "id": "demo-001",
  "name": "Credit Scoring Form - Demo",
  "theme": {
    "primaryColor": "#0066cc",
    "secondaryColor": "#6c757d",
    "backgroundColor": "#ffffff",
    "textColor": "#212529",
    "logoUrl": "https://example.com/logo.png"
  },
  "formSchema": {
    "title": "Credit Application",
    "description": "Complete the form",
    "fields": [
      {
        "id": "fullName",
        "type": "text",
        "label": "Full Name",
        "validation": {
          "required": true,
          "minLength": 3
        }
      }
    ]
  },
  "submitEndpoint": "/api/submit"
}
```

## 🏗️ Development

### Available Scripts

```bash
# Development of all packages in parallel
pnpm dev

# Build all packages
pnpm build

# Build a specific package
pnpm build:web-component
pnpm build:admin-portal

# Linting
pnpm lint

# Type checking
pnpm type-check

# Clean everything
pnpm clean
```

### Package Structure

#### `@credit-scoring/shared`
Shared types and utilities between packages.

#### `@credit-scoring/web-component`
Embeddable widget built with Lit. Exports a Custom Element `<credit-scoring-widget>`.

#### `@credit-scoring/admin-portal`
Admin portal built with Next.js to manage configurations.

## 🚢 Deployment

### Web Component

```bash
cd packages/web-component
pnpm build

# Files in dist/ are ready for CDN
# - dist/credit-scoring-widget.mjs (ESM)
# - dist/credit-scoring-widget.umd.js (UMD)
```

Upload to your preferred CDN (Cloudflare, AWS CloudFront, etc.)

### Admin Portal

```bash
cd packages/admin-portal
pnpm build

# Deploy to Vercel
vercel

# Or any platform that supports Next.js
```

## 📚 Additional Documentation

- [Web Component README](./packages/web-component/README.md)
- [Admin Portal README](./packages/admin-portal/README.md)
- [Vanilla Example](./examples/vanilla/README.md)

## 🤝 Contributing

Contributions are welcome. Please:

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is under MIT license. See [LICENSE](./LICENSE) file for more details.

## 🆘 Support

To report bugs or request features, open an issue in the repository.

## 🎯 Roadmap

### Phase 1 - MVP ✅
- [x] Basic Web Component with Lit
- [x] Theming system
- [x] Dynamic forms
- [x] Integration example
- [x] Admin portal structure

### Phase 2 - Admin Portal
- [ ] Authentication system
- [ ] Configuration CRUD
- [ ] Visual theme editor
- [ ] Form builder
- [ ] Real-time preview

### Phase 3 - Advanced Features
- [ ] Analytics and metrics
- [ ] Webhooks
- [ ] Multi-language (i18n)
- [ ] A/B testing
- [ ] Rate limiting
- [ ] CDN distribution

### Phase 4 - Enterprise
- [ ] Complete white-labeling
- [ ] SSO/SAML
- [ ] Team management
- [ ] Audit logs
- [ ] SLA monitoring

## 🏆 Use Cases

### Banks
Integrate credit application forms on your website without custom development.

### Fintech
Offer credit evaluation as a service to your partners.

### Marketplaces
Add credit scoring to your checkout flow.

### Financial Institutions
Centralize management of credit evaluation forms.

---

Built with ❤️ for the financial industry
