import { Input, Textarea } from '@heroui/input';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

import type { FormData } from '@/lib/schemas';

interface BasicInfoSectionProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export function BasicInfoSection({ register, errors }: BasicInfoSectionProps) {
  return (
    <div className='w-full flex flex-col gap-4 rounded-lg border p-4'>
      <h2 className='text-xl font-semibold'>Basic Information</h2>
      <Input
        label='ID'
        placeholder='Enter ID'
        {...register('_id')}
        errorMessage={errors._id?.message}
        isInvalid={!!errors._id}
      />
      <Input
        label='Slug'
        placeholder='Enter slug'
        {...register('slug')}
        errorMessage={errors.slug?.message}
        isInvalid={!!errors.slug}
      />
      <Input
        label='Title'
        placeholder='Enter title'
        {...register('title')}
        errorMessage={errors.title?.message}
        isInvalid={!!errors.title}
      />
      <Textarea
        label='Description'
        placeholder='Enter description'
        minRows={3}
        {...register('description')}
        errorMessage={errors.description?.message}
        isInvalid={!!errors.description}
      />
    </div>
  );
}

