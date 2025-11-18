'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Textarea } from '@heroui/input';
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

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mentionPopupRef = useRef<HTMLDivElement>(null);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);

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

  // Filter roles based on query
  const filteredRoles = roles
    .filter((role) => role.label && role.label.trim() !== '')
    .filter((role) => role.label.toLowerCase().includes(mentionQuery.toLowerCase()));

  // Handle text change and detect @ mentions
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const cursorPos = e.target.selectionStart;

    onChange(newValue);
    setCursorPosition(cursorPos);

    // Check if we're typing after an @
    const textBeforeCursor = newValue.substring(0, cursorPos);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    if (lastAtIndex !== -1) {
      // Check if there's a space or newline after @ (meaning mention is complete)
      const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1);
      const hasSpaceOrNewline = /[\s\n]/.test(textAfterAt);

      if (!hasSpaceOrNewline) {
        // We're in a mention
        const query = textAfterAt;
        setMentionQuery(query);
        setShowMentions(true);
        setSelectedIndex(0);
      } else {
        setShowMentions(false);
      }
    } else {
      setShowMentions(false);
    }
  };

  // Insert mention into text
  const insertMention = useCallback(
    (roleLabel: string) => {
      const textBeforeCursor = stringValue.substring(0, cursorPosition);
      const textAfterCursor = stringValue.substring(cursorPosition);
      const lastAtIndex = textBeforeCursor.lastIndexOf('@');

      if (lastAtIndex !== -1) {
        const textBeforeAt = textBeforeCursor.substring(0, lastAtIndex);
        const newValue = `${textBeforeAt}@${roleLabel} ${textAfterCursor}`;
        onChange(newValue);
        setShowMentions(false);
        setMentionQuery('');

        // Set cursor position after the mention
        setTimeout(() => {
          if (textareaRef.current) {
            const newCursorPos = lastAtIndex + roleLabel.length + 2; // +2 for @ and space
            textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
            textareaRef.current.focus();
          }
        }, 0);
      }
    },
    [stringValue, cursorPosition, onChange]
  );

  // Handle keyboard navigation in mentions popover
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showMentions && filteredRoles.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredRoles.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredRoles.length) % filteredRoles.length);
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        const selectedRole = filteredRoles[selectedIndex];
        if (selectedRole) {
          insertMention(selectedRole.label);
        }
      } else if (e.key === 'Escape') {
        setShowMentions(false);
      }
    }
  };

  // Render text with mentions highlighted
  const renderTextWithMentions = (text: string) => {
    const parts: Array<{ text: string; isMention: boolean }> = [];
    const mentionRegex = /@(\w+)/g;
    let lastIndex = 0;
    let match;

    while ((match = mentionRegex.exec(text)) !== null) {
      // Add text before mention
      if (match.index > lastIndex) {
        parts.push({ text: text.substring(lastIndex, match.index), isMention: false });
      }

      // Check if this is a valid role mention
      const roleLabel = match[1];
      const isValidMention = roles.some((role) => role.label === roleLabel);

      if (isValidMention) {
        parts.push({ text: `@${roleLabel}`, isMention: true });
      } else {
        parts.push({ text: match[0], isMention: false });
      }

      lastIndex = mentionRegex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({ text: text.substring(lastIndex), isMention: false });
    }

    return parts.length > 0 ? parts : [{ text, isMention: false }];
  };

  // Calculate popup position
  const updatePopupPosition = useCallback(() => {
    if (!textareaRef.current || !mentionPopupRef.current || !showMentions) return;

    const textarea = textareaRef.current;
    const popup = mentionPopupRef.current;
    const rect = textarea.getBoundingClientRect();
    const scrollTop = textarea.scrollTop;

    // Get cursor position
    const textBeforeCursor = stringValue.substring(0, cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    
    if (lastAtIndex === -1) return;

    const textBeforeAt = textBeforeCursor.substring(0, lastAtIndex);
    const lines = textBeforeAt.split('\n');
    const lineNumber = lines.length - 1;
    const lineText = lines[lineNumber] || '';

    // Measure text width
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      const font = window.getComputedStyle(textarea).font;
      context.font = font;
      const textWidth = context.measureText(lineText).width;
      
      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight) || 20;
      const paddingTop = 40; // Approximate label height
      
      popup.style.top = `${paddingTop + (lineNumber * lineHeight) + lineHeight + 5}px`;
      popup.style.left = `${textWidth + 20}px`;
    }
  }, [stringValue, cursorPosition, showMentions]);

  // Update position when mentions show
  useEffect(() => {
    if (showMentions) {
      updatePopupPosition();
      const interval = setInterval(updatePopupPosition, 100);
      return () => clearInterval(interval);
    }
  }, [showMentions, updatePopupPosition]);

  return (
    <div className={`relative ${className || ''}`}>
      <Textarea
        ref={textareaRef}
        label={label}
        placeholder={placeholder}
        minRows={minRows}
        value={stringValue}
        onChange={handleChange as any}
        onKeyDown={handleKeyDown as any}
        onBlur={() => {
          // Delay hiding to allow click on mention option
          setTimeout(() => setShowMentions(false), 200);
        }}
        errorMessage={errorMessage}
        isInvalid={isInvalid}
        className="w-full"
      />
      
      {showMentions && filteredRoles.length > 0 && (
        <div
          ref={mentionPopupRef}
          className="absolute z-50 bg-content1 border border-default-200 rounded-lg shadow-lg max-h-48 overflow-y-auto min-w-[200px]"
        >
          {filteredRoles.map((role, index) => (
            <div
              key={role.id}
              className={`px-3 py-2 cursor-pointer hover:bg-default-100 transition-colors ${
                index === selectedIndex ? 'bg-default-100' : ''
              }`}
              onClick={() => insertMention(role.label)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <span className="text-sm font-medium text-primary">@</span>
              <span className="text-sm ml-1">{role.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Display preview with mentions highlighted in blue */}
      {stringValue && (
        <div className="mt-2 p-2 bg-default-50 rounded border border-default-200 text-sm">
          <div className="whitespace-pre-wrap text-foreground">
            {renderTextWithMentions(stringValue).map((part, index) =>
              part.isMention ? (
                <span key={index} className="text-primary font-medium">
                  {part.text}
                </span>
              ) : (
                <span key={index}>{part.text}</span>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
