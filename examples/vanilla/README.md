# Vanilla HTML Example

Ejemplo de integración del Credit Scoring Widget en HTML puro.

## Uso

1. Primero, compila el Web Component:

```bash
cd ../../packages/web-component
pnpm install
pnpm build
```

2. Abre `index.html` en tu navegador

## Integración

```html
<!-- Importar el script del widget -->
<script type="module" src="https://cdn.example.com/credit-scoring-widget.js"></script>

<!-- Usar el Web Component -->
<credit-scoring-widget config-id="tu-config-id"></credit-scoring-widget>
```

## Opciones de configuración

```html
<credit-scoring-widget
  config-id="abc123"
  api-url="https://api.tu-dominio.com"
></credit-scoring-widget>
```

## Personalización de tema

Puedes sobrescribir el tema usando CSS variables:

```javascript
const widget = document.querySelector('credit-scoring-widget');
widget.style.setProperty('--cs-primary-color', '#ff0000');
widget.style.setProperty('--cs-font-family', 'Arial, sans-serif');
```

## Eventos

El widget emite eventos personalizados:

```javascript
widget.addEventListener('submit-success', (e) => {
  console.log('Formulario enviado:', e.detail);
});

widget.addEventListener('submit-error', (e) => {
  console.error('Error:', e.detail);
});
```
