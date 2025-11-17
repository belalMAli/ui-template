import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';

import { DynamicForm, type FieldConfig } from '@/components/form/dynamic-form';
import { ASPECT_RATIO_OPTIONS, QUALITY_OPTIONS, STYLE_OPTIONS } from '@/lib/constants/form';
import type { FormData } from '@/lib/schemas';

interface ConfigurableOptionsSectionProps {
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export function ConfigurableOptionsSection({ watch, setValue, register, errors }: ConfigurableOptionsSectionProps) {
  const aspectRatioFields: FieldConfig[] = [
    {
      type: 'dropdown',
      name: 'configurableOptions.aspectRatio.default',
      label: 'Aspect Ratio',
      placeholder: 'Select aspect ratio',
      options: [...ASPECT_RATIO_OPTIONS],
      watch,
      setValue,
      width: 'full',
    },
  ];

  const styleFields: FieldConfig[] = [
    {
      type: 'dropdown',
      name: 'configurableOptions.style.default',
      label: 'Style',
      placeholder: 'Select style',
      options: [...STYLE_OPTIONS],
      watch,
      setValue,
      width: 'full',
    },
  ];

  const qualityFields: FieldConfig[] = [
    {
      type: 'dropdown',
      name: 'configurableOptions.quality.default',
      label: 'Quality',
      placeholder: 'Select quality',
      options: [...QUALITY_OPTIONS],
      watch,
      setValue,
      width: 'full',
    },
  ];

  return (
    <div className='w-full flex flex-col gap-4 rounded-lg border p-4'>
      <h2 className='text-xl font-semibold'>Configurable Options</h2>

      <div className='flex flex-col gap-3 rounded-lg border p-4'>
        <h3 className='font-medium'>Aspect Ratio</h3>
        <DynamicForm fields={aspectRatioFields} register={register} errors={errors} />
      </div>

      <div className='flex flex-col gap-3 rounded-lg border p-4'>
        <h3 className='font-medium'>Style</h3>
        <DynamicForm fields={styleFields} register={register} errors={errors} />
      </div>

      <div className='flex flex-col gap-3 rounded-lg border p-4'>
        <h3 className='font-medium'>Quality</h3>
        <DynamicForm fields={qualityFields} register={register} errors={errors} />
      </div>
    </div>
  );
}

