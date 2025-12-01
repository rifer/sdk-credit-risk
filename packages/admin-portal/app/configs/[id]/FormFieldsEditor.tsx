'use client';

import { useState } from 'react';
import { FormField, FieldType } from '@credit-scoring/shared';

interface FormFieldsEditorProps {
  fields: FormField[];
  onChange: (fields: FormField[]) => void;
}

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'email', label: 'Email' },
  { value: 'tel', label: 'Phone' },
  { value: 'number', label: 'Number' },
  { value: 'select', label: 'Select' },
  { value: 'radio', label: 'Radio' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'date', label: 'Date' },
  { value: 'textarea', label: 'Textarea' },
];

export default function FormFieldsEditor({ fields, onChange }: FormFieldsEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingField, setEditingField] = useState<FormField | null>(null);

  const addField = () => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type: 'text',
      label: 'New Field',
      placeholder: '',
      validation: {},
    };
    setEditingField(newField);
    setEditingIndex(fields.length);
  };

  const saveField = () => {
    if (!editingField) return;

    const newFields = [...fields];
    if (editingIndex !== null) {
      if (editingIndex < newFields.length) {
        newFields[editingIndex] = editingField;
      } else {
        newFields.push(editingField);
      }
    }
    onChange(newFields);
    setEditingField(null);
    setEditingIndex(null);
  };

  const deleteField = (index: number) => {
    if (confirm('Delete this field?')) {
      onChange(fields.filter((_, i) => i !== index));
    }
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= fields.length) return;

    const newFields = [...fields];
    [newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]];
    onChange(newFields);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">📋 Form Fields</h2>
        <button
          onClick={addField}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
        >
          + Add Field
        </button>
      </div>

      {/* Fields List */}
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-900">{field.label}</div>
              <div className="text-xs text-gray-500">
                {field.type} • {field.id}
                {field.validation?.required && ' • Required'}
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => moveField(index, 'up')}
                disabled={index === 0}
                className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                title="Move up"
              >
                ↑
              </button>
              <button
                onClick={() => moveField(index, 'down')}
                disabled={index === fields.length - 1}
                className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                title="Move down"
              >
                ↓
              </button>
              <button
                onClick={() => {
                  setEditingField({ ...field });
                  setEditingIndex(index);
                }}
                className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteField(index)}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No fields yet. Click "Add Field" to create one.
          </div>
        )}
      </div>

      {/* Field Editor Modal */}
      {editingField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingIndex !== null && editingIndex < fields.length ? 'Edit Field' : 'Add Field'}
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Field ID *
                    </label>
                    <input
                      type="text"
                      value={editingField.id}
                      onChange={(e) => setEditingField({ ...editingField, id: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Field Type *
                    </label>
                    <select
                      value={editingField.type}
                      onChange={(e) => setEditingField({ ...editingField, type: e.target.value as FieldType })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {FIELD_TYPES.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Label *
                  </label>
                  <input
                    type="text"
                    value={editingField.label}
                    onChange={(e) => setEditingField({ ...editingField, label: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Placeholder
                  </label>
                  <input
                    type="text"
                    value={editingField.placeholder || ''}
                    onChange={(e) => setEditingField({ ...editingField, placeholder: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Help Text
                  </label>
                  <input
                    type="text"
                    value={editingField.helpText || ''}
                    onChange={(e) => setEditingField({ ...editingField, helpText: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingField.validation?.required || false}
                      onChange={(e) =>
                        setEditingField({
                          ...editingField,
                          validation: { ...editingField.validation, required: e.target.checked },
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">Required field</span>
                  </label>
                </div>

                {(editingField.type === 'text' || editingField.type === 'textarea') && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Min Length
                      </label>
                      <input
                        type="number"
                        value={editingField.validation?.minLength || ''}
                        onChange={(e) =>
                          setEditingField({
                            ...editingField,
                            validation: {
                              ...editingField.validation,
                              minLength: e.target.value ? parseInt(e.target.value) : undefined,
                            },
                          })
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max Length
                      </label>
                      <input
                        type="number"
                        value={editingField.validation?.maxLength || ''}
                        onChange={(e) =>
                          setEditingField({
                            ...editingField,
                            validation: {
                              ...editingField.validation,
                              maxLength: e.target.value ? parseInt(e.target.value) : undefined,
                            },
                          })
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {editingField.type === 'number' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Minimum Value
                      </label>
                      <input
                        type="number"
                        value={editingField.validation?.min || ''}
                        onChange={(e) =>
                          setEditingField({
                            ...editingField,
                            validation: {
                              ...editingField.validation,
                              min: e.target.value ? parseFloat(e.target.value) : undefined,
                            },
                          })
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Maximum Value
                      </label>
                      <input
                        type="number"
                        value={editingField.validation?.max || ''}
                        onChange={(e) =>
                          setEditingField({
                            ...editingField,
                            validation: {
                              ...editingField.validation,
                              max: e.target.value ? parseFloat(e.target.value) : undefined,
                            },
                          })
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {(editingField.type === 'select' || editingField.type === 'radio') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Options (one per line: label|value)
                    </label>
                    <textarea
                      value={editingField.options?.map(o => `${o.label}|${o.value}`).join('\n') || ''}
                      onChange={(e) => {
                        const options = e.target.value.split('\n').filter(l => l.trim()).map(line => {
                          const [label, value] = line.split('|');
                          return { label: label.trim(), value: value?.trim() || label.trim() };
                        });
                        setEditingField({ ...editingField, options });
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
                      rows={4}
                      placeholder="Option 1|value1&#10;Option 2|value2"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setEditingField(null);
                    setEditingIndex(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveField}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Save Field
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
