import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Bar */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral-900">Credit Scoring Platform</h1>
                <p className="text-sm text-neutral-600">Admin Portal</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">
              Widget Configuration Management
            </h2>
            <p className="text-lg text-neutral-600">
              Create and manage embeddable credit scoring widgets for your clients
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Link
              href="/configs/new"
              className="group bg-white border-2 border-neutral-200 rounded-xl p-8 hover:border-primary-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                  <svg className="w-6 h-6 text-primary-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Create Configuration</h3>
                  <p className="text-neutral-600">Set up a new widget configuration with custom themes and forms</p>
                </div>
              </div>
            </Link>

            <Link
              href="/configs"
              className="group bg-white border-2 border-neutral-200 rounded-xl p-8 hover:border-primary-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                  <svg className="w-6 h-6 text-neutral-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">View Configurations</h3>
                  <p className="text-neutral-600">Browse and manage all existing widget configurations</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="bg-white rounded-xl border border-neutral-200 p-8 mb-8">
            <h3 className="text-xl font-semibold text-neutral-900 mb-6">Platform Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">Custom Theming</h4>
                <p className="text-sm text-neutral-600">
                  Customize colors, fonts, logos and spacing to match your brand identity
                </p>
              </div>

              <div>
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">Dynamic Forms</h4>
                <p className="text-sm text-neutral-600">
                  Build custom forms with validation rules and multiple field types
                </p>
              </div>

              <div>
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">Secure Integration</h4>
                <p className="text-sm text-neutral-600">
                  Shadow DOM isolation ensures styles don't conflict with client websites
                </p>
              </div>
            </div>
          </div>

          {/* Integration Example */}
          <div className="bg-neutral-900 rounded-xl p-8">
            <h3 className="text-lg font-semibold text-white mb-4">Simple Integration</h3>
            <p className="text-neutral-400 mb-4 text-sm">
              Clients need just two lines of code to embed the widget:
            </p>
            <pre className="bg-neutral-800 p-4 rounded-lg text-sm text-neutral-200 overflow-x-auto">
              {`<script type="module" src="https://cdn.example.com/widget.js"></script>\n<credit-scoring-widget config-id="your-config-id"></credit-scoring-widget>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
