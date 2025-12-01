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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {isNew ? 'Create Configuration' : 'Edit Configuration'}
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/configs')}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Configuration'}
              </button>
            </div>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Editors */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Configuration ID *
                  </label>
                  <input
                    type="text"
                    value={config.id}
                    onChange={(e) => setConfig({ ...config, id: e.target.value })}
                    disabled={!isNew}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="e.g., demo-001"
                  />
                  {!isNew && (
                    <p className="mt-1 text-xs text-gray-500">ID cannot be changed after creation</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Configuration Name *
                  </label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => setConfig({ ...config, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Credit Application Form"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
  );
}
