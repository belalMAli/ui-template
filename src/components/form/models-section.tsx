import { Button } from '@heroui/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { Input } from '@heroui/input';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';

import { ASPECT_RATIO_OPTIONS, STYLE_OPTIONS } from '@/lib/constants/form';
import type { FormData } from '@/lib/schemas';

interface ModelsSectionProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
}

export function ModelsSection({ register, errors, watch, setValue }: ModelsSectionProps) {
  const aspectRatio = watch('models.textToImage.modelParams.aspectRatio');
  const style = watch('models.textToImage.modelParams.style');

  return (
    <div className='w-full flex flex-col gap-4 rounded-lg border p-4'>
      <h2 className='text-xl font-semibold'>Models</h2>
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col gap-3 rounded-lg border p-4'>
          <h3 className='font-medium'>Text to Image</h3>
          <Input
            label='Model Name'
            placeholder='Enter model name'
            {...register('models.textToImage.modelName')}
            errorMessage={errors.models?.textToImage?.modelName?.message}
            isInvalid={!!errors.models?.textToImage?.modelName}
          />
          <Input
            label='Model ID'
            placeholder='Enter model ID'
            {...register('models.textToImage.modelId')}
            errorMessage={errors.models?.textToImage?.modelId?.message}
            isInvalid={!!errors.models?.textToImage?.modelId}
          />
          <Dropdown>
            <DropdownTrigger>
              <Button variant='bordered' className='w-full justify-between'>
                {aspectRatio || 'Select aspect ratio'}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label='Aspect Ratio Options'
              selectedKeys={aspectRatio ? new Set([aspectRatio]) : new Set()}
              selectionMode='single'
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                if (selected) {
                  setValue('models.textToImage.modelParams.aspectRatio', selected, {
                    shouldValidate: true,
                  });
                }
              }}
            >
              {ASPECT_RATIO_OPTIONS.map((option) => (
                <DropdownItem key={option}>{option}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Input
            label='Seed'
            type='number'
            placeholder='Enter seed'
            {...register('models.textToImage.modelParams.seed', { valueAsNumber: true })}
          />
          <Dropdown>
            <DropdownTrigger>
              <Button variant='bordered' className='w-full justify-between'>
                {style || 'Select style'}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label='Style Options'
              selectedKeys={style ? new Set([style]) : new Set()}
              selectionMode='single'
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                if (selected) {
                  setValue('models.textToImage.modelParams.style', selected, {
                    shouldValidate: true,
                  });
                }
              }}
            >
              {STYLE_OPTIONS.map((option) => (
                <DropdownItem key={option}>{option}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className='flex flex-col gap-3 rounded-lg border p-4'>
          <h3 className='font-medium'>Image to Video</h3>
          <Input
            label='Model Name'
            placeholder='Enter model name'
            {...register('models.imageToVideo.modelName')}
            errorMessage={errors.models?.imageToVideo?.modelName?.message}
            isInvalid={!!errors.models?.imageToVideo?.modelName}
          />
          <Input
            label='Model ID'
            placeholder='Enter model ID'
            {...register('models.imageToVideo.modelId')}
            errorMessage={errors.models?.imageToVideo?.modelId?.message}
            isInvalid={!!errors.models?.imageToVideo?.modelId}
          />
          <Input
            label='Duration'
            type='number'
            placeholder='Enter duration'
            {...register('models.imageToVideo.modelParams.duration', { valueAsNumber: true })}
          />
        </div>
      </div>
    </div>
  );
}

