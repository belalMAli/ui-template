import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';

import { DynamicForm, type FieldConfig } from '@/components/form/dynamic-form';
import { ASPECT_RATIO_OPTIONS, STYLE_OPTIONS } from '@/lib/constants/form';
import type { FormData } from '@/lib/schemas';

interface ModelsSectionProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
}

export function ModelsSection({ register, errors, watch, setValue }: ModelsSectionProps) {
  const textToImageFields: FieldConfig[] = [
    {
      type: 'input',
      name: 'models.textToImage.modelName',
      label: 'Model Name',
      placeholder: 'Enter model name',
      width: 'full',
    },
    {
      type: 'input',
      name: 'models.textToImage.modelId',
      label: 'Model ID',
      placeholder: 'Enter model ID',
      width: 'full',
    },
    {
      type: 'dropdown',
      name: 'models.textToImage.modelParams.aspectRatio',
      label: 'Aspect Ratio',
      placeholder: 'Select aspect ratio',
      options: [...ASPECT_RATIO_OPTIONS],
      watch,
      setValue,
      width: 'full',
    },
    {
      type: 'input',
      name: 'models.textToImage.modelParams.seed',
      label: 'Seed',
      placeholder: 'Enter seed',
      inputType: 'number',
      valueAsNumber: true,
      width: 'full',
    },
    {
      type: 'dropdown',
      name: 'models.textToImage.modelParams.style',
      label: 'Style',
      placeholder: 'Select style',
      options: [...STYLE_OPTIONS],
      watch,
      setValue,
      width: 'full',
    },
  ];

  const imageToVideoFields: FieldConfig[] = [
    {
      type: 'input',
      name: 'models.imageToVideo.modelName',
      label: 'Model Name',
      placeholder: 'Enter model name',
      width: 'full',
    },
    {
      type: 'input',
      name: 'models.imageToVideo.modelId',
      label: 'Model ID',
      placeholder: 'Enter model ID',
      width: 'full',
    },
    {
      type: 'input',
      name: 'models.imageToVideo.modelParams.duration',
      label: 'Duration',
      placeholder: 'Enter duration',
      inputType: 'number',
      valueAsNumber: true,
      width: 'full',
    },
  ];

  return (
    <div className='w-full flex flex-col gap-4 rounded-lg border p-4'>
      <h2 className='text-xl font-semibold'>Models</h2>
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col gap-3 rounded-lg border p-4'>
          <h3 className='font-medium'>Text to Image</h3>
          <DynamicForm fields={textToImageFields} register={register} errors={errors} />
        </div>
        <div className='flex flex-col gap-3 rounded-lg border p-4'>
          <h3 className='font-medium'>Image to Video</h3>
          <DynamicForm fields={imageToVideoFields} register={register} errors={errors} />
        </div>
      </div>
    </div>
  );
}

