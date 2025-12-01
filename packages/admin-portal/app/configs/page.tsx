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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading configurations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Widget Configurations</h1>
            <p className="text-gray-600 mt-2">Manage your credit scoring widget configurations</p>
          </div>
          <Link
            href="/configs/new"
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            + New Configuration
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
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No configurations yet</h3>
            <p className="text-gray-600 mb-6">Create your first widget configuration to get started</p>
            <Link
              href="/configs/new"
              className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Create Configuration
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {configs.map((config) => (
              <div
                key={config.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div
                  className="h-2"
                  style={{ backgroundColor: config.theme.primaryColor }}
                ></div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {config.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    ID: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{config.id}</code>
                  </p>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span className="font-medium">Fields:</span>
                      <span>{config.formSchema.fields.length}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium">Theme:</span>
                      <div className="flex gap-1">
                        <div
                          className="w-4 h-4 rounded border border-gray-300"
                          style={{ backgroundColor: config.theme.primaryColor }}
                          title="Primary"
                        ></div>
                        <div
                          className="w-4 h-4 rounded border border-gray-300"
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
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-primary-500 hover:text-primary-600 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
