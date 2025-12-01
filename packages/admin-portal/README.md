# Credit Scoring Admin Portal

Portal de administración para gestionar las configuraciones de los widgets de Credit Scoring.

## Características

- 🎨 **Editor de Temas**: Personaliza colores, fuentes y logos
- 📋 **Constructor de Formularios**: Define campos dinámicos con validaciones
- ⚙️ **Gestión de Configuraciones**: Crea, edita y elimina configuraciones
- 👁️ **Vista Previa en Tiempo Real**: Visualiza los cambios antes de publicar
- 📊 **Analytics**: Monitorea el uso de tus widgets (próximamente)

## Desarrollo

```bash
# Instalar dependencias
pnpm install

# Modo desarrollo
pnpm dev

# Build para producción
pnpm build

# Iniciar servidor de producción
pnpm start
```

## Estructura

```
admin-portal/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   └── globals.css        # Estilos globales
├── components/            # Componentes React (próximamente)
├── lib/                   # Utilidades y helpers (próximamente)
└── public/               # Assets estáticos
```

## Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Types**: @credit-scoring/shared

## Roadmap

### Fase 1 (Actual)
- [x] Estructura básica del proyecto
- [x] Página de bienvenida
- [ ] Sistema de autenticación
- [ ] CRUD de configuraciones

### Fase 2
- [ ] Editor visual de temas
- [ ] Constructor de formularios drag & drop
- [ ] Vista previa en tiempo real
- [ ] Generación de código de integración

### Fase 3
- [ ] Analytics y métricas
- [ ] Webhooks para eventos
- [ ] Gestión de clientes
- [ ] API REST completa

## API Routes (Próximamente)

```
GET    /api/configs          # Listar configuraciones
POST   /api/configs          # Crear configuración
GET    /api/configs/:id      # Obtener configuración
PUT    /api/configs/:id      # Actualizar configuración
DELETE /api/configs/:id      # Eliminar configuración
```

## Integración con el Widget

Las configuraciones creadas en este portal se exponen a través de una API que el widget consume:

```typescript
// El widget hace fetch de la configuración
const config = await fetch(`${apiUrl}/api/configs/${configId}`);
```
