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
              Manage your credit scoring widget configurations
            </p>
          </div>

          {/* Welcome Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Welcome to the Admin Portal
            </h2>
            <p className="text-gray-600 mb-6">
              From here you can create, edit, and manage the configurations for embeddable widgets
              that your clients will integrate into their websites.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
                <div className="text-3xl mb-2">⚙️</div>
                <h3 className="font-semibold text-gray-900 mb-2">Configurations</h3>
                <p className="text-sm text-gray-600">
                  Create and manage widget configurations
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
                <div className="text-3xl mb-2">🎨</div>
                <h3 className="font-semibold text-gray-900 mb-2">Theming</h3>
                <p className="text-sm text-gray-600">
                  Customize colors, fonts, and logos
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
                <div className="text-3xl mb-2">📋</div>
                <h3 className="font-semibold text-gray-900 mb-2">Forms</h3>
                <p className="text-sm text-gray-600">
                  Define custom fields and validations
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Quick Actions
            </h3>

            <div className="space-y-4">
              <Link
                href="/configs/new"
                className="block w-full px-6 py-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-center font-medium"
              >
                ➕ Create New Configuration
              </Link>

              <Link
                href="/configs"
                className="block w-full px-6 py-4 bg-white border-2 border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors text-center font-medium"
              >
                📂 View All Configurations
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Simple Integration
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Your clients only need one line of code to integrate the widget:
              </p>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                {`<credit-scoring-widget config-id="abc123" />`}
              </pre>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                CSS Isolation
              </h4>
              <p className="text-sm text-gray-600">
                The widget uses Shadow DOM to ensure your client's styles
                don't interfere with the widget design.
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center text-sm text-gray-500">
            <p>
              This is a development project. Portal features are being implemented progressively.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
