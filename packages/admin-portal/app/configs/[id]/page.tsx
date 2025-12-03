'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { WidgetConfig, FormField, defaultTheme } from '@credit-scoring/shared';
import ThemeEditor from './ThemeEditor';
import FormFieldsEditor from './FormFieldsEditor';
import LivePreview from './LivePreview';

export default function ConfigEditorPage() {
  const router = useRouter();
  const params = useParams();
  const configId = params.id as string;
  const isNew = configId === 'new';

  const [config, setConfig] = useState<WidgetConfig>({
    id: '',
    name: '',
    theme: defaultTheme,
    formSchema: {
      title: 'Credit Application',
      description: 'Complete the form below',
      submitButtonText: 'Submit Application',
      fields: [],
    },
    submitEndpoint: '/api/submit',
    successMessage: 'Application submitted successfully!',
    errorMessage: 'Error submitting application. Please try again.',
    showBranding: true,
  });

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isNew) {
      loadConfig();
    }
  }, [configId, isNew]);

  const loadConfig = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/configs/${configId}`);
      const data = await response.json();

      if (data.success) {
        setConfig(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to load configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config.id) {
      alert('Please enter a configuration ID');
      return;
    }

    if (!config.name) {
      alert('Please enter a configuration name');
      return;
    }

    try {
      setSaving(true);
      const url = isNew ? '/api/configs' : `/api/configs/${configId}`;
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      const data = await response.json();

      if (data.success) {
        alert('Configuration saved successfully!');
        if (isNew) {
          router.push(`/configs/${config.id}`);
        }
      } else {
        alert(`Failed to save: ${data.error}`);
      }
    } catch (err) {
      alert('Failed to save configuration');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="bg-white border-b border-neutral-200">
          <div className="container mx-auto px-6 py-4">
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
        <div className="container mx-auto px-6 py-12">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-neutral-600">Loading configuration...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Bar */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/configs')}
                className="text-neutral-600 hover:text-neutral-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-neutral-900">
                  {isNew ? 'Create New Configuration' : 'Edit Configuration'}
                </h1>
                <p className="text-sm text-neutral-600">{isNew ? 'Set up a new widget' : config.name}</p>
              </div>
            </div>
            <div className="flex gap-3">
              {!isNew && (
                <a
                  href={`http://localhost:8080/examples/vanilla/index.html?config=${config.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium shadow-sm flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Test Live
                </a>
              )}
              <button
                onClick={() => router.push('/configs')}
                className="px-5 py-2.5 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium disabled:opacity-50 shadow-sm"
              >
                {saving ? 'Saving...' : 'Save Configuration'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Editors */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Configuration ID *
                  </label>
                  <input
                    type="text"
                    value={config.id}
                    onChange={(e) => setConfig({ ...config, id: e.target.value })}
                    disabled={!isNew}
                    className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                    placeholder="e.g., demo-001"
                  />
                  {!isNew && (
                    <p className="mt-1.5 text-xs text-neutral-500">ID cannot be changed after creation</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Configuration Name *
                  </label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => setConfig({ ...config, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., Credit Application Form"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Form Title
                  </label>
                  <input
                    type="text"
                    value={config.formSchema.title}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        formSchema: { ...config.formSchema, title: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., Credit Application"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Form Description
                  </label>
                  <textarea
                    value={config.formSchema.description}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        formSchema: { ...config.formSchema, description: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    rows={2}
                    placeholder="Brief description of the form"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Submit Button Text
                  </label>
                  <input
                    type="text"
                    value={config.formSchema.submitButtonText}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        formSchema: { ...config.formSchema, submitButtonText: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., Submit Application"
                  />
                </div>
              </div>
            </div>

            {/* Theme Editor */}
            <ThemeEditor
              theme={config.theme}
              onChange={(theme) => setConfig({ ...config, theme })}
            />

            {/* Form Fields Editor */}
            <FormFieldsEditor
              fields={config.formSchema.fields}
              onChange={(fields) =>
                setConfig({
                  ...config,
                  formSchema: { ...config.formSchema, fields },
                })
              }
            />
          </div>

            {/* Right Column - Live Preview */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <LivePreview config={config} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
