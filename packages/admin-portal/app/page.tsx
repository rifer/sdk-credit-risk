import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              🏦 Credit Scoring Admin Portal
            </h1>
            <p className="text-xl text-gray-600">
              Gestiona las configuraciones de tus widgets de credit scoring
            </p>
          </div>

          {/* Welcome Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Bienvenido al Portal de Administración
            </h2>
            <p className="text-gray-600 mb-6">
              Desde aquí podrás crear, editar y gestionar las configuraciones de los widgets
              embebibles que tus clientes integrarán en sus sitios web.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
                <div className="text-3xl mb-2">⚙️</div>
                <h3 className="font-semibold text-gray-900 mb-2">Configuraciones</h3>
                <p className="text-sm text-gray-600">
                  Crea y gestiona configuraciones de widgets
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
                <div className="text-3xl mb-2">🎨</div>
                <h3 className="font-semibold text-gray-900 mb-2">Theming</h3>
                <p className="text-sm text-gray-600">
                  Personaliza colores, fuentes y logos
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
                <div className="text-3xl mb-2">📋</div>
                <h3 className="font-semibold text-gray-900 mb-2">Formularios</h3>
                <p className="text-sm text-gray-600">
                  Define campos y validaciones personalizadas
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Acciones Rápidas
            </h3>

            <div className="space-y-4">
              <Link
                href="/configs/new"
                className="block w-full px-6 py-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-center font-medium"
              >
                ➕ Crear Nueva Configuración
              </Link>

              <Link
                href="/configs"
                className="block w-full px-6 py-4 bg-white border-2 border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors text-center font-medium"
              >
                📂 Ver Todas las Configuraciones
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Integración Simple
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Tus clientes solo necesitan una línea de código para integrar el widget:
              </p>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                {`<credit-scoring-widget config-id="abc123" />`}
              </pre>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                Aislamiento CSS
              </h4>
              <p className="text-sm text-gray-600">
                El widget usa Shadow DOM para garantizar que los estilos de tu cliente
                no interfieran con el diseño del widget.
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center text-sm text-gray-500">
            <p>
              Este es un proyecto en desarrollo. Las funcionalidades del portal se
              implementarán progresivamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
