# Credit Scoring SDK 🏦

SDK B2B de credit scoring con Web Component embebible para bancos y entidades financieras.

## 🚀 Características

- **Web Component con Lit**: Framework-agnostic, funciona con cualquier stack
- **Configuración Remota**: Portal de administración para configurar widgets sin code
- **Formularios Dinámicos**: Basados en JSON Schema, totalmente configurables
- **Theming Completo**: Colores, fuentes, logos personalizables
- **Shadow DOM**: Aislamiento CSS completo
- **TypeScript**: Tipado fuerte en todo el proyecto
- **Monorepo**: Organizado con pnpm workspaces

## 📦 Estructura del Proyecto

```
sdk-credit-risk/
├── packages/
│   ├── web-component/      # Widget embebible (Lit + TypeScript)
│   ├── admin-portal/       # Portal de administración (Next.js)
│   └── shared/             # Types compartidos
├── examples/
│   ├── vanilla/            # Ejemplo HTML puro
│   └── react/              # Ejemplo React + TypeScript
└── pnpm-workspace.yaml
```

## 🛠️ Instalación y Setup

### Prerrequisitos

- Node.js >= 18
- pnpm >= 8

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd sdk-credit-risk

# Instalar todas las dependencias
pnpm install

# Build de todos los packages
pnpm build
```

## 🎯 Quick Start

### 1. Desarrollo del Web Component

```bash
cd packages/web-component
pnpm dev
```

### 2. Desarrollo del Admin Portal

```bash
cd packages/admin-portal
pnpm dev
```

### 3. Probar los ejemplos

#### Vanilla HTML
```bash
# 1. Build del web component
cd packages/web-component
pnpm build

# 2. Abrir examples/vanilla/index.html en tu navegador
```

#### React
```bash
cd examples/react
pnpm install
pnpm dev
```

## 📖 Uso del Widget

### Integración en HTML

```html
<!-- 1. Importar el script -->
<script type="module" src="https://cdn.tu-dominio.com/credit-scoring-widget.js"></script>

<!-- 2. Usar el Web Component -->
<credit-scoring-widget config-id="tu-config-id"></credit-scoring-widget>
```

### Integración en React

```tsx
import { useEffect, useRef } from 'react';
import '@credit-scoring/web-component';

function App() {
  const widgetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    // Escuchar eventos
    const handleSuccess = (e: Event) => {
      console.log('Formulario enviado:', (e as CustomEvent).detail);
    };

    widget.addEventListener('submit-success', handleSuccess);
    return () => widget.removeEventListener('submit-success', handleSuccess);
  }, []);

  return (
    <credit-scoring-widget
      ref={widgetRef}
      config-id="demo-001"
    />
  );
}
```

### Integración en Vue

```vue
<template>
  <credit-scoring-widget
    :config-id="configId"
    @submit-success="handleSuccess"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import '@credit-scoring/web-component';

const configId = ref('demo-001');

const handleSuccess = (e: CustomEvent) => {
  console.log('Formulario enviado:', e.detail);
};
</script>
```

### Integración en Angular

```typescript
// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@credit-scoring/web-component';

@Component({
  selector: 'app-root',
  template: `
    <credit-scoring-widget
      [attr.config-id]="configId"
      (submit-success)="handleSuccess($event)"
    ></credit-scoring-widget>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  configId = 'demo-001';

  handleSuccess(event: any) {
    console.log('Formulario enviado:', event.detail);
  }
}
```

## 🎨 Personalización

### Theming con CSS Variables

```javascript
const widget = document.querySelector('credit-scoring-widget');

// Personalizar colores
widget.style.setProperty('--cs-primary-color', '#ff0000');
widget.style.setProperty('--cs-secondary-color', '#00ff00');
widget.style.setProperty('--cs-background-color', '#ffffff');
widget.style.setProperty('--cs-text-color', '#333333');

// Personalizar fuentes
widget.style.setProperty('--cs-font-family', 'Arial, sans-serif');
widget.style.setProperty('--cs-font-size', '18px');

// Personalizar bordes y espaciado
widget.style.setProperty('--cs-border-radius', '8px');
widget.style.setProperty('--cs-spacing', '20px');
```

### Variables CSS Disponibles

| Variable | Default | Descripción |
|----------|---------|-------------|
| `--cs-primary-color` | `#0066cc` | Color primario |
| `--cs-secondary-color` | `#6c757d` | Color secundario |
| `--cs-background-color` | `#ffffff` | Color de fondo |
| `--cs-text-color` | `#212529` | Color del texto |
| `--cs-error-color` | `#dc3545` | Color de errores |
| `--cs-success-color` | `#28a745` | Color de éxito |
| `--cs-border-color` | `#ced4da` | Color de bordes |
| `--cs-font-family` | System fonts | Fuente del texto |
| `--cs-font-size` | `16px` | Tamaño de fuente base |
| `--cs-border-radius` | `4px` | Radio de bordes |
| `--cs-spacing` | `16px` | Espaciado base |
| `--cs-logo-max-width` | `200px` | Ancho máximo del logo |

## 📡 Eventos

El widget emite eventos personalizados:

```javascript
const widget = document.querySelector('credit-scoring-widget');

// Éxito en el envío
widget.addEventListener('submit-success', (e) => {
  console.log('Datos:', e.detail.data);
  // Redirigir, mostrar mensaje, etc.
});

// Error en el envío
widget.addEventListener('submit-error', (e) => {
  console.error('Error:', e.detail.error);
  // Mostrar mensaje de error, retry, etc.
});
```

## 🔧 Configuración del Widget

### Estructura de Configuración

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

### Ejemplo de Configuración

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
    "title": "Solicitud de Crédito",
    "description": "Complete el formulario",
    "fields": [
      {
        "id": "fullName",
        "type": "text",
        "label": "Nombre Completo",
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

## 🏗️ Desarrollo

### Scripts Disponibles

```bash
# Desarrollo de todos los packages en paralelo
pnpm dev

# Build de todos los packages
pnpm build

# Build de un package específico
pnpm build:web-component
pnpm build:admin-portal

# Linting
pnpm lint

# Type checking
pnpm type-check

# Limpiar todo
pnpm clean
```

### Estructura de Packages

#### `@credit-scoring/shared`
Types y utilidades compartidas entre packages.

#### `@credit-scoring/web-component`
Widget embebible construido con Lit. Exporta un Custom Element `<credit-scoring-widget>`.

#### `@credit-scoring/admin-portal`
Portal de administración construido con Next.js para gestionar configuraciones.

## 🚢 Deployment

### Web Component

```bash
cd packages/web-component
pnpm build

# Los archivos en dist/ están listos para CDN
# - dist/credit-scoring-widget.js (ESM)
# - dist/credit-scoring-widget.umd.js (UMD)
```

Subir a tu CDN preferido (Cloudflare, AWS CloudFront, etc.)

### Admin Portal

```bash
cd packages/admin-portal
pnpm build

# Desplegar en Vercel
vercel

# O en cualquier plataforma que soporte Next.js
```

## 📚 Documentación Adicional

- [Web Component README](./packages/web-component/README.md)
- [Admin Portal README](./packages/admin-portal/README.md)
- [Ejemplo Vanilla](./examples/vanilla/README.md)
- [Ejemplo React](./examples/react/README.md)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo licencia MIT. Ver archivo [LICENSE](./LICENSE) para más detalles.

## 🆘 Soporte

Para reportar bugs o solicitar features, abre un issue en el repositorio.

## 🎯 Roadmap

### Fase 1 - MVP ✅
- [x] Web Component básico con Lit
- [x] Sistema de theming
- [x] Formularios dinámicos
- [x] Ejemplos de integración
- [x] Admin portal estructura

### Fase 2 - Portal de Admin
- [ ] Sistema de autenticación
- [ ] CRUD de configuraciones
- [ ] Editor visual de temas
- [ ] Constructor de formularios
- [ ] Vista previa en tiempo real

### Fase 3 - Features Avanzadas
- [ ] Analytics y métricas
- [ ] Webhooks
- [ ] Multi-idioma (i18n)
- [ ] A/B testing
- [ ] Rate limiting
- [ ] CDN distribution

### Fase 4 - Enterprise
- [ ] White-labeling completo
- [ ] SSO/SAML
- [ ] Gestión de equipos
- [ ] Audit logs
- [ ] SLA monitoring

## 🏆 Casos de Uso

### Bancos
Integra formularios de solicitud de crédito en tu web sin desarrollo custom.

### Fintech
Ofrece evaluación de crédito como servicio a tus partners.

### Marketplaces
Añade scoring crediticio en tu flujo de checkout.

### Instituciones Financieras
Centraliza la gestión de formularios de evaluación crediticia.

---

Desarrollado con ❤️ para la industria financiera
