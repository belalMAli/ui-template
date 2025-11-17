import { Button } from '@heroui/button';
import { UseFormRegister, FieldErrors, UseFieldArrayReturn, UseFormWatch, UseFormSetValue, Path } from 'react-hook-form';

import { DynamicForm, type FieldConfig } from '@/components/form/dynamic-form';
import { SHOT_TYPES } from '@/lib/constants/form';
import type { FormData } from '@/lib/schemas';

interface ShotsSectionProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  shotFields: UseFieldArrayReturn<FormData, 'shots'>['fields'];
  appendShot: UseFieldArrayReturn<FormData, 'shots'>['append'];
  removeShot: UseFieldArrayReturn<FormData, 'shots'>['remove'];
}

export function ShotsSection({
  register,
  errors,
  watch,
  setValue,
  shotFields,
  appendShot,
  removeShot,
}: ShotsSectionProps) {
  const getShotFields = (index: number): FieldConfig[] => [
    {
      type: 'input',
      name: `shots.${index}.id` as Path<FormData>,
      label: 'ID',
      placeholder: 'Enter shot ID',
      width: 'half',
    },
    {
      type: 'input',
      name: `shots.${index}.order` as Path<FormData>,
      label: 'Order',
      placeholder: 'Enter order',
      inputType: 'number',
      valueAsNumber: true,
      width: 'half',
    },
    {
      type: 'dropdown',
      name: `shots.${index}.type` as Path<FormData>,
      label: 'Type',
      placeholder: 'Select type',
      options: [...SHOT_TYPES],
      watch,
      setValue,
      optionLabels: {
        SHOT_WITH_CAST: 'Shot with Cast',
        SHOT_WITHOUT_CAST: 'Shot without Cast',
      },
      width: 'full',
    },
    {
      type: 'input',
      name: `shots.${index}.title` as Path<FormData>,
      label: 'Title',
      placeholder: 'Enter shot title',
      width: 'full',
    },
    {
      type: 'textarea',
      name: `shots.${index}.storyline` as Path<FormData>,
      label: 'Storyline',
      placeholder: 'Enter storyline',
      minRows: 2,
      width: 'full',
    },
    {
      type: 'textarea',
      name: `shots.${index}.textToImage.promptParams.prompt` as Path<FormData>,
      label: 'Text to Image Prompt',
      placeholder: 'Enter prompt',
      minRows: 3,
      width: 'half',
    },
    {
      type: 'textarea',
      name: `shots.${index}.imageToVideo.promptParams.prompt` as Path<FormData>,
      label: 'Image to Video Prompt',
      placeholder: 'Enter prompt',
      minRows: 3,
      width: 'half',
    },
  ];

  return (
    <div className='w-full flex flex-col gap-4 rounded-lg border p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>Shots</h2>
        <Button
          type='button'
          size='sm'
          color='primary'
          onPress={() =>
            appendShot({
              id: `shot-${shotFields.length}`,
              order: shotFields.length,
              type: 'SHOT_WITHOUT_CAST',
              title: '',
              storyline: '',
              textToImage: {
                promptParams: {
                  prompt: '',
                },
              },
              imageToVideo: {
                promptParams: {
                  prompt: '',
                },
              },
            })
          }
        >
          Add Shot
        </Button>
      </div>
      {shotFields.map((field, index) => (
        <div key={field.id} className='flex flex-col gap-3 rounded-lg border p-4'>
          <div className='flex items-center justify-between'>
            <h3 className='font-medium'>Shot {index + 1}</h3>
            <Button
              type='button'
              size='sm'
              color='danger'
              variant='light'
              onPress={() => removeShot(index)}
            >
              Delete
            </Button>
          </div>
          <DynamicForm fields={getShotFields(index)} register={register} errors={errors} />
        </div>
      ))}
      {errors.shots && <p className='text-xs text-danger'>{errors.shots.message}</p>}
    </div>
  );
}

