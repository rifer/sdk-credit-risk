'use client';

import { Theme } from '@credit-scoring/shared';

interface ThemeEditorProps {
  theme: Theme;
  onChange: (theme: Theme) => void;
}

const FONT_OPTIONS = [
  { value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', label: 'System Default' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: '"Times New Roman", serif', label: 'Times New Roman' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
  { value: '"Courier New", monospace', label: 'Courier New' },
  { value: 'Impact, sans-serif', label: 'Impact' },
];

export default function ThemeEditor({ theme, onChange }: ThemeEditorProps) {
  const updateTheme = (updates: Partial<Theme>) => {
    onChange({ ...theme, ...updates });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">🎨 Theme Customization</h2>

      <div className="space-y-4">
        {/* Colors */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Colors</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Primary Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Secondary Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.secondaryColor}
                  onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.secondaryColor}
                  onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Background Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.backgroundColor}
                  onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.backgroundColor}
                  onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Text Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.textColor}
                  onChange={(e) => updateTheme({ textColor: e.target.value })}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.textColor}
                  onChange={(e) => updateTheme({ textColor: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Error Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.errorColor}
                  onChange={(e) => updateTheme({ errorColor: e.target.value })}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.errorColor}
                  onChange={(e) => updateTheme({ errorColor: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Success Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.successColor}
                  onChange={(e) => updateTheme({ successColor: e.target.value })}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.successColor}
                  onChange={(e) => updateTheme({ successColor: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Typography</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Font Family
              </label>
              <select
                value={theme.fontFamily}
                onChange={(e) => updateTheme({ fontFamily: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {FONT_OPTIONS.map(font => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Font Size
              </label>
              <input
                type="text"
                value={theme.fontSize}
                onChange={(e) => updateTheme({ fontSize: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="16px"
              />
            </div>
          </div>
        </div>

        {/* Layout */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Layout</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Border Radius
              </label>
              <input
                type="text"
                value={theme.borderRadius}
                onChange={(e) => updateTheme({ borderRadius: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="4px"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Spacing
              </label>
              <input
                type="text"
                value={theme.spacing}
                onChange={(e) => updateTheme({ spacing: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="16px"
              />
            </div>
          </div>
        </div>

        {/* Logo */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Branding</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Logo URL
              </label>
              <input
                type="text"
                value={theme.logoUrl || ''}
                onChange={(e) => updateTheme({ logoUrl: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Logo Max Width
              </label>
              <input
                type="text"
                value={theme.logoMaxWidth || ''}
                onChange={(e) => updateTheme({ logoMaxWidth: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="200px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
