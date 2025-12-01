# React Example

Ejemplo de integración del Credit Scoring Widget en React.

## Instalación

```bash
pnpm install
```

## Desarrollo

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Integración en tu proyecto React

### 1. Instalar el paquete

```bash
npm install @credit-scoring/web-component
# o
pnpm add @credit-scoring/web-component
```

### 2. Declarar el tipo del custom element

Crea un archivo `vite-env.d.ts` (o añade a tus types):

```typescript
declare namespace JSX {
  interface IntrinsicElements {
    'credit-scoring-widget': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        'config-id'?: string;
        'api-url'?: string;
      },
      HTMLElement
    >;
  }
}
```

### 3. Usar el componente

```tsx
import { useEffect, useRef } from 'react';
import '@credit-scoring/web-component';

function MyComponent() {
  const widgetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    const handleSubmitSuccess = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Formulario enviado:', customEvent.detail);
    };

    widget.addEventListener('submit-success', handleSubmitSuccess);

    return () => {
      widget.removeEventListener('submit-success', handleSubmitSuccess);
    };
  }, []);

  return (
    <credit-scoring-widget
      ref={widgetRef}
      config-id="tu-config-id"
    />
  );
}
```

## Personalización de tema

```tsx
const widget = widgetRef.current;
if (widget) {
  widget.style.setProperty('--cs-primary-color', '#ff0000');
  widget.style.setProperty('--cs-font-family', 'Arial, sans-serif');
}
```

## Eventos

```tsx
useEffect(() => {
  const widget = widgetRef.current;
  if (!widget) return;

  const handleSubmitSuccess = (e: Event) => {
    console.log('Success:', (e as CustomEvent).detail);
  };

  const handleSubmitError = (e: Event) => {
    console.error('Error:', (e as CustomEvent).detail);
  };

  widget.addEventListener('submit-success', handleSubmitSuccess);
  widget.addEventListener('submit-error', handleSubmitError);

  return () => {
    widget.removeEventListener('submit-success', handleSubmitSuccess);
    widget.removeEventListener('submit-error', handleSubmitError);
  };
}, []);
```
