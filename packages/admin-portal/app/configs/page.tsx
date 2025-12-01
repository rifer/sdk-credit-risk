'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { WidgetConfig } from '@credit-scoring/shared';

export default function ConfigsPage() {
  const [configs, setConfigs] = useState<WidgetConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/configs');
      const data = await response.json();

      if (data.success) {
        setConfigs(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to load configurations');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this configuration?')) {
      return;
    }

    try {
      const response = await fetch(`/api/configs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setConfigs(configs.filter(c => c.id !== id));
      } else {
        alert('Failed to delete configuration');
      }
    } catch (err) {
      alert('Failed to delete configuration');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="bg-white border-b border-neutral-200">
          <div className="container mx-auto px-6 py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral-900">Credit Scoring Platform</h1>
                <p className="text-sm text-neutral-600">Admin Portal</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="container mx-auto px-6 py-12">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-neutral-600">Loading configurations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Bar */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-900">Credit Scoring Platform</h1>
              <p className="text-sm text-neutral-600">Admin Portal</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900">Widget Configurations</h2>
              <p className="text-neutral-600 mt-2">Manage your embeddable credit scoring widgets</p>
            </div>
            <Link
              href="/configs/new"
              className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium shadow-sm flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Configuration
            </Link>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Configurations List */}
          {configs.length === 0 ? (
            <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">No configurations yet</h3>
              <p className="text-neutral-600 mb-6">Create your first widget configuration to get started</p>
              <Link
                href="/configs/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Configuration
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {configs.map((config) => (
                <div
                  key={config.id}
                  className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:border-primary-300 hover:shadow-lg transition-all"
                >
                  <div
                    className="h-3"
                    style={{ backgroundColor: config.theme.primaryColor }}
                  ></div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      {config.name}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-4">
                      <code className="bg-neutral-100 px-2 py-1 rounded text-xs font-mono">{config.id}</code>
                    </p>

                    <div className="space-y-2 mb-5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600">Form Fields</span>
                        <span className="font-medium text-neutral-900">{config.formSchema.fields.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600">Theme Colors</span>
                        <div className="flex gap-1">
                          <div
                            className="w-5 h-5 rounded border-2 border-white shadow-sm"
                            style={{ backgroundColor: config.theme.primaryColor }}
                            title="Primary"
                          ></div>
                          <div
                            className="w-5 h-5 rounded border-2 border-white shadow-sm"
                            style={{ backgroundColor: config.theme.secondaryColor }}
                            title="Secondary"
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/configs/${config.id}`}
                        className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-center text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(config.id)}
                        className="px-4 py-2 bg-neutral-100 text-neutral-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
