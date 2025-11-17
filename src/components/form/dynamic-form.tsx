import { Button } from '@heroui/button';
import { Checkbox as HerouiCheckbox } from '@heroui/checkbox';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { Input, Textarea } from '@heroui/input';
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
  Control,
  useController,
  Path,
} from 'react-hook-form';

import type { FormData } from '@/lib/schemas';

type FieldWidth = 'full' | 'half';

interface BaseFieldConfig {
  name: Path<FormData>;
  label: string;
  width?: FieldWidth;
  placeholder?: string;
}

interface InputFieldConfig extends BaseFieldConfig {
  type: 'input';
  inputType?: 'text' | 'number' | 'email' | 'password';
  valueAsNumber?: boolean;
}

interface TextareaFieldConfig extends BaseFieldConfig {
  type: 'textarea';
  minRows?: number;
}

interface DropdownFieldConfig extends BaseFieldConfig {
  type: 'dropdown';
  options: string[];
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  optionLabels?: Record<string, string>;
}

interface CheckboxFieldConfig extends BaseFieldConfig {
  type: 'checkbox';
  control: Control<FormData>;
}

export type FieldConfig =
  | InputFieldConfig
  | TextareaFieldConfig
  | DropdownFieldConfig
  | CheckboxFieldConfig;

interface DynamicFormProps {
  fields: FieldConfig[];
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

function FormField({
  field,
  register,
  errors,
}: {
  field: FieldConfig;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}) {
  const errorMessage = getNestedError(errors, field.name);
  const isInvalid = !!errorMessage;

  const widthClass = 'w-full';

  switch (field.type) {
    case 'input': {
      const inputField = field as InputFieldConfig;
      return (
        <Input
          label={field.label}
          placeholder={field.placeholder}
          type={inputField.inputType || 'text'}
          {...register(field.name, inputField.valueAsNumber ? { valueAsNumber: true } : undefined)}
          errorMessage={errorMessage}
          isInvalid={isInvalid}
          className={widthClass}
        />
      );
    }

    case 'textarea': {
      const textareaField = field as TextareaFieldConfig;
      return (
        <Textarea
          label={field.label}
          placeholder={field.placeholder}
          minRows={textareaField.minRows || 3}
          {...register(field.name)}
          errorMessage={errorMessage}
          isInvalid={isInvalid}
          className={widthClass}
        />
      );
    }

    case 'dropdown': {
      const dropdownField = field as DropdownFieldConfig;
      const currentValue = dropdownField.watch(field.name);
      const getDisplayLabel = (value: string) => dropdownField.optionLabels?.[value] || value;
      const displayValue = currentValue
        ? getDisplayLabel(String(currentValue))
        : field.placeholder || `Select ${field.label.toLowerCase()}`;
      return (
        <Dropdown>
          <DropdownTrigger>
            <Button variant='bordered' className={`${widthClass} justify-between`}>
              {displayValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label={`${field.label} Options`}
            selectedKeys={currentValue ? new Set([String(currentValue)]) : new Set()}
            selectionMode='single'
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              if (selected) {
                dropdownField.setValue(field.name, selected as any, {
                  shouldValidate: true,
                });
              }
            }}
          >
            {dropdownField.options.map((option) => (
              <DropdownItem key={option}>{getDisplayLabel(option)}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      );
    }

    case 'checkbox': {
      const checkboxField = field as CheckboxFieldConfig;
      return (
        <CheckboxField
          control={checkboxField.control}
          name={field.name}
          label={field.label}
          className={widthClass}
        />
      );
    }

    default:
      return null;
  }
}

function CheckboxField({
  control,
  name,
  label,
  className,
}: {
  control: Control<FormData>;
  name: Path<FormData>;
  label: string;
  className?: string;
}) {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
  });

  const booleanValue = typeof value === 'boolean' ? value : false;

  return (
    <HerouiCheckbox isSelected={booleanValue} onValueChange={onChange} size='sm' className={className}>
      <span className='text-sm'>{label}</span>
    </HerouiCheckbox>
  );
}

function getNestedError(errors: FieldErrors<FormData>, path: string): string | undefined {
  const parts = path.split('.');
  let current: any = errors;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  return current?.message;
}

export function DynamicForm({ fields, register, errors }: DynamicFormProps) {
  const rows: FieldConfig[][] = [];
  let currentRow: FieldConfig[] = [];

  fields.forEach((field) => {
    if (field.width === 'half') {
      currentRow.push(field);
      if (currentRow.length === 2) {
        rows.push([...currentRow]);
        currentRow = [];
      }
    } else {
      if (currentRow.length > 0) {
        rows.push([...currentRow]);
        currentRow = [];
      }
      rows.push([field]);
    }
  });

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return (
    <div className='w-full flex flex-col gap-4'>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={row.length === 2 ? 'grid grid-cols-2 gap-4' : 'flex flex-col gap-4'}
        >
          {row.map((field, fieldIndex) => (
            <FormField key={`${field.name}-${fieldIndex}`} field={field} register={register} errors={errors} />
          ))}
        </div>
      ))}
    </div>
  );
}

