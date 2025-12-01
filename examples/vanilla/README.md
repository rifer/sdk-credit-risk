# Vanilla HTML Example

Credit Scoring Widget integration example in vanilla HTML.

## Usage

1. First, build the Web Component:

```bash
cd ../../packages/web-component
pnpm install
pnpm build
```

2. Open `index.html` in your browser

## Integration

```html
<!-- Import the widget script -->
<script type="module" src="https://cdn.example.com/credit-scoring-widget.js"></script>

<!-- Use the Web Component -->
<credit-scoring-widget config-id="your-config-id"></credit-scoring-widget>
```

## Configuration Options

```html
<credit-scoring-widget
  config-id="abc123"
  api-url="https://api.your-domain.com"
></credit-scoring-widget>
```

## Theme Customization

You can override the theme using CSS variables:

```javascript
const widget = document.querySelector('credit-scoring-widget');
widget.style.setProperty('--cs-primary-color', '#ff0000');
widget.style.setProperty('--cs-font-family', 'Arial, sans-serif');
```

## Events

The widget emits custom events:

```javascript
widget.addEventListener('submit-success', (e) => {
  console.log('Form submitted:', e.detail);
});

widget.addEventListener('submit-error', (e) => {
  console.error('Error:', e.detail);
});
```
