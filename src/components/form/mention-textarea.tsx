'use client';

import React, { useMemo } from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import { useController, Control, Path, FieldErrors } from 'react-hook-form';
import type { FormData } from '@/lib/schemas';

interface MentionTextareaProps {
  name: Path<FormData>;
  label: string;
  placeholder?: string;
  minRows?: number;
  control: Control<FormData>;
  errors?: FieldErrors<FormData>;
  roles: Array<{ id: string; label: string }>;
  className?: string;
}

export function MentionTextarea({
  name,
  label,
  placeholder,
  minRows = 3,
  control,
  errors,
  roles,
  className,
}: MentionTextareaProps) {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
  });

  // Ensure value is always a string
  const stringValue = typeof value === 'string' ? value : '';

  // Get nested error message
  const getNestedError = (errs: FieldErrors<FormData> | undefined, path: string): string | undefined => {
    if (!errs) return undefined;
    const parts = path.split('.');
    let current: any = errs;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return undefined;
      }
    }
    return current?.message;
  };

  const errorMessage = getNestedError(errors, name);
  const isInvalid = !!errorMessage;

  // Transform roles to react-mentions format (expects { id, display })
  const mentionData = useMemo(
    () =>
      roles
        .filter((role) => role.label && role.label.trim() !== '')
        .map((role) => ({
          id: role.id,
          display: role.label,
        })),
    [roles]
  );

  // Handle change event from MentionsInput
  const handleChange = (event: any, newValue: string, newPlainTextValue: string, mentions: any[]) => {
    onChange(newPlainTextValue);
  };

  // Calculate min height based on minRows (approximately 24px per line)
  const minHeight = minRows * 24;

  // Get theme colors for better integration
  const borderColor = isInvalid 
    ? 'hsl(var(--heroui-danger))' 
    : 'hsl(var(--heroui-default-300))';

  return (
    <div className={`flex flex-col gap-1.5 ${className || ''}`}>
      {label && (
        <label className="text-sm font-medium text-foreground-700">
          {label}
        </label>
      )}
      <div className="relative">
        <MentionsInput
          value={stringValue}
          onChange={handleChange}
          placeholder={placeholder}
          style={{
            control: {
              backgroundColor: 'transparent',
              fontSize: '14px',
              fontWeight: 'normal',
              fontFamily: 'inherit',
            },
            '&multiLine': {
              control: {
                fontFamily: 'inherit',
                minHeight: `${minHeight}px`,
                lineHeight: '1.5',
              },
              highlighter: {
                padding: '12px',
                minHeight: `${minHeight}px`,
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
                fontFamily: 'inherit',
                fontSize: '14px',
                lineHeight: '1.5',
                overflow: 'hidden',
                boxSizing: 'border-box',
              },
              input: {
                padding: '12px',
                minHeight: `${minHeight}px`,
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
                fontFamily: 'inherit',
                fontSize: '14px',
                lineHeight: '1.5',
                resize: 'vertical',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.2s',
              },
            },
            suggestions: {
              list: {
                backgroundColor: 'hsl(var(--heroui-content1))',
                border: '1px solid hsl(var(--heroui-default-200))',
                borderRadius: '8px',
                fontSize: '14px',
                maxHeight: '192px',
                overflowY: 'auto',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                zIndex: 50,
              },
              item: {
                padding: '8px 12px',
                transition: 'background-color 0.15s',
                cursor: 'pointer',
                '&focused': {
                  backgroundColor: 'hsl(var(--heroui-default-100))',
                },
              },
            },
          }}
        >
          <Mention
            trigger="@"
            data={mentionData}
            displayTransform={(id, display) => `@${display}`}
            markup="@[__display__](__id__)"
            style={{
              color: '#2563eb',
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
              fontWeight: '500',
              padding: '2px 4px',
              borderRadius: '4px',
              zIndex: 1,
            }}
          />
        </MentionsInput>
      </div>
      {errorMessage && (
        <p className="text-xs text-danger mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
