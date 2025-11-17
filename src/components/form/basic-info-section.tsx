import { UseFormRegister, FieldErrors } from 'react-hook-form';

import { DynamicForm, type FieldConfig } from '@/components/form/dynamic-form';
import type { FormData } from '@/lib/schemas';

interface BasicInfoSectionProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export function BasicInfoSection({ register, errors }: BasicInfoSectionProps) {
  const fields: FieldConfig[] = [
    {
      type: 'input',
      name: '_id',
      label: 'ID',
      placeholder: 'Enter ID',
      width: 'full',
    },
    {
      type: 'input',
      name: 'slug',
      label: 'Slug',
      placeholder: 'Enter slug',
      width: 'full',
    },
    {
      type: 'input',
      name: 'title',
      label: 'Title',
      placeholder: 'Enter title',
      width: 'full',
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Description',
      placeholder: 'Enter description',
      minRows: 3,
      width: 'full',
    },
  ];

  return (
    <div className='w-full flex flex-col gap-4 rounded-lg border p-4'>
      <h2 className='text-xl font-semibold'>Basic Information</h2>
      <DynamicForm fields={fields} register={register} errors={errors} />
    </div>
  );
}

