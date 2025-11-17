import { Button } from '@heroui/button';
import { Checkbox as HerouiCheckbox } from '@heroui/checkbox';
import { Input } from '@heroui/input';
import { UseFormRegister, FieldErrors, UseFieldArrayReturn, Control, useController } from 'react-hook-form';

import type { FormData } from '@/lib/schemas';

interface CheckboxProps {
  control: Control<FormData>;
  name: `roles.${number}.required` | `roles.${number}.editable`;
  label: string;
}

function Checkbox({ control, name, label }: CheckboxProps) {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
  });

  return (
    <HerouiCheckbox isSelected={value} onValueChange={onChange} size='sm'>
      <span className='text-sm'>{label}</span>
    </HerouiCheckbox>
  );
}

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
          <div className='flex gap-4'>
            <Checkbox
              control={control}
              name={`roles.${index}.required`}
              label='Required'
            />
            <Checkbox
              control={control}
              name={`roles.${index}.editable`}
              label='Editable'
            />
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <Input
              label='ID'
              placeholder='Enter role ID'
              {...register(`roles.${index}.id`)}
              errorMessage={errors.roles?.[index]?.id?.message}
              isInvalid={!!errors.roles?.[index]?.id}
            />
            <Input
              label='Label'
              placeholder='Enter label'
              {...register(`roles.${index}.label`)}
              errorMessage={errors.roles?.[index]?.label?.message}
              isInvalid={!!errors.roles?.[index]?.label}
            />
          </div>
          <Input
            label='Video Description Fallback'
            placeholder='Enter video description'
            {...register(`roles.${index}.videoDescriptionFallback`)}
            errorMessage={errors.roles?.[index]?.videoDescriptionFallback?.message}
            isInvalid={!!errors.roles?.[index]?.videoDescriptionFallback}
          />
          <Input
            label='Order'
            type='number'
            placeholder='Enter order'
            {...register(`roles.${index}.order`, { valueAsNumber: true })}
            errorMessage={errors.roles?.[index]?.order?.message}
            isInvalid={!!errors.roles?.[index]?.order}
          />
        </div>
      ))}
      {errors.roles && <p className='text-xs text-danger'>{errors.roles.message}</p>}
    </div>
  );
}

