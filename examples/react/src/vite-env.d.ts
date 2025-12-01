/// <reference types="vite/client" />

// Declarar el custom element para React
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
