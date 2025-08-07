# Watchify E-commerce 🍿

**Watchify** es una tienda de merchandising oficial de Netflix construida con Next.js, TypeScript, Radix UI y Tailwind CSS.

## Resumen Ejecutivo

- **Descripción**: Aplicación de e-commerce para merchandising de series de Netflix.
- **Stack**: Next.js 13.5.1, TypeScript, Radix UI, Tailwind CSS.
- **Arquitectura**: Next.js App Router, Static Site Generation (SSG), Context API para estado.
- **Features**: Navegación por colecciones, carrito persistente (localStorage), búsqueda.
- **Estado Actual**: Prototipo funcional sin backend (datos estáticos).

## Arquitectura

- **Renderizado**: SSG (`output: 'export'`) con renderizado del lado del cliente para interactividad.
- **Rutas Principales**:
  - `/`: Inicio
  - `/products`: Catálogo de productos
  - `/collections`: Listado de colecciones
  - `/collection/[slug]`: Productos por colección
  - `/product/[id]`: Detalle de producto
  - `/cart`: Carrito de compras
- **Gestión de Estado**: React Context (`CartContext`) con `localStorage` para persistencia.
- **Datos**: Información de productos y colecciones hardcodeada en `lib/data.ts`.

## Mapa de Carpetas y Componentes

| Ruta/Componente             | Descripción                                            | Archivo Principal           |
| --------------------------- | ------------------------------------------------------ | --------------------------- |
| `app/layout.tsx`            | Layout principal con `CartProvider` y metadatos SEO.   | `app/layout.tsx`            |
| `components/ui/header.tsx`  | Cabecera con navegación, búsqueda y acceso al carrito. | `components/ui/header.tsx`  |
| `app/page.tsx`              | Página de inicio.                                      | `app/page.tsx`              |
| `app/products/page.tsx`     | Página de catálogo de productos.                       | `app/products/page.tsx`     |
| `app/product/[id]/page.tsx` | Página de detalle de producto.                         | `app/product/[id]/page.tsx` |
| `contexts/cart-context.tsx` | Contexto global para el estado del carrito.            | `contexts/cart-context.tsx` |
| `lib/data.ts`               | Datos estáticos (productos, colecciones).              | `lib/data.ts`               |
| `types/index.ts`            | Definiciones de tipos de TypeScript.                   | `types/index.ts`            |

## Flujo de Datos

El flujo de datos es completamente del lado del cliente:

1.  **Carga Inicial**: Los datos se cargan desde el archivo estático `lib/data.ts`.
2.  **Renderizado**: Las páginas se pre-renderizan como estáticas (SSG).
3.  **Interactividad**:
    - El usuario añade un producto al carrito.
    - La acción llama a `addToCart` del `CartContext`.
    - El `cartReducer` actualiza el estado del carrito.
    - Un `useEffect` en `CartProvider` sincroniza el estado con `localStorage`.

## Servicios y Dependencias Externas

- **Radix UI**: Para componentes de UI accesibles.
- **Tailwind CSS**: Para estilizado.
- **Lucide React**: Para iconografía.
- **Pexels**: Para imágenes de muestra (no para producción).

## Puntos de Extensión y Mejoras

### Corto Plazo

- **Nuevos Productos/Colecciones**: Añadir nuevos objetos a los arrays en `lib/data.ts`.
- **Nuevas Secciones en Home**: Crear un nuevo componente en `components/ui` y añadirlo a `app/page.tsx`.

### Mediano Plazo

- **Backend y Base de Datos**: Reemplazar `lib/data.ts` con llamadas a una API real (e.g., Next.js API Routes + Prisma + PostgreSQL).
- **Autenticación**: Integrar un sistema de autenticación como NextAuth.js.
- **Pasarela de Pagos**: Añadir Stripe para procesar pagos.

## Riesgos Técnicos y Mitigación

- **Datos Estáticos**: No escalable. **Solución**: Migrar a un backend con base de datos.
- **Imágenes Externas**: URLs de Pexels pueden romperse. **Solución**: Usar un CDN propio como Cloudinary o AWS S3.
- **Sin Persistencia de Usuario**: El carrito se limita al navegador. **Solución**: Guardar carritos en la base de datos para usuarios autenticados.

## Cómo Empezar

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/watchify-ecommerce.git
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Ejecuta el servidor de desarrollo:
    ```bash
    npm run dev
    ```
4.  Abre [http://localhost:3000](http://localhost:3000) en tu navegador.
