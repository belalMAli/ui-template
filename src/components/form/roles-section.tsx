import { Button } from '@heroui/button';
import { UseFormRegister, FieldErrors, UseFieldArrayReturn, Control, Path } from 'react-hook-form';

import { DynamicForm, type FieldConfig } from '@/components/form/dynamic-form';
import type { FormData } from '@/lib/schemas';

interface RolesSectionProps {
  register: UseFormRegister<FormData>;
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  roleFields: UseFieldArrayReturn<FormData, 'roles'>['fields'];
  appendRole: UseFieldArrayReturn<FormData, 'roles'>['append'];
  removeRole: UseFieldArrayReturn<FormData, 'roles'>['remove'];
}

export function RolesSection({
  register,
  control,
  errors,
  roleFields,
  appendRole,
  removeRole,
}: RolesSectionProps) {
  const getRoleFields = (index: number): FieldConfig[] => [
    {
      type: 'checkbox',
      name: `roles.${index}.required` as Path<FormData>,
      label: 'Required',
      control,
      width: 'half',
    },
    {
      type: 'checkbox',
      name: `roles.${index}.editable` as Path<FormData>,
      label: 'Editable',
      control,
      width: 'half',
    },
    {
      type: 'input',
      name: `roles.${index}.id` as Path<FormData>,
      label: 'ID',
      placeholder: 'Enter role ID',
      width: 'half',
    },
    {
      type: 'input',
      name: `roles.${index}.label` as Path<FormData>,
      label: 'Label',
      placeholder: 'Enter label',
      width: 'half',
    },
    {
      type: 'input',
      name: `roles.${index}.videoDescriptionFallback` as Path<FormData>,
      label: 'Video Description Fallback',
      placeholder: 'Enter video description',
      width: 'full',
    },
    {
      type: 'input',
      name: `roles.${index}.order` as Path<FormData>,
      label: 'Order',
      placeholder: 'Enter order',
      inputType: 'number',
      valueAsNumber: true,
      width: 'full',
    },
  ];

  return (
    <div className='w-full flex flex-col gap-4 rounded-lg border p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>Roles</h2>
        <Button
          type='button'
          size='sm'
          color='primary'
          onPress={() =>
            appendRole({
              id: '',
              label: '',
              required: true,
              editable: true,
              videoDescriptionFallback: '',
              order: roleFields.length,
            })
          }
        >
          Add Role
        </Button>
      </div>
      {roleFields.map((field, index) => (
        <div key={field.id} className='flex flex-col gap-3 rounded-lg border p-4'>
          <div className='flex items-center justify-between'>
            <h3 className='font-medium'>Role {index + 1}</h3>
            <Button
              type='button'
              size='sm'
              color='danger'
              variant='light'
              onPress={() => removeRole(index)}
            >
              Delete
            </Button>
          </div>
          <DynamicForm fields={getRoleFields(index)} register={register} errors={errors} />
        </div>
      ))}
      {errors.roles && <p className='text-xs text-danger'>{errors.roles.message}</p>}
    </div>
  );
}

