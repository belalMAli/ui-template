import { Button } from '@heroui/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { Input, Textarea } from '@heroui/input';
import { UseFormRegister, FieldErrors, UseFieldArrayReturn, UseFormWatch, UseFormSetValue } from 'react-hook-form';

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
          <div className='grid grid-cols-2 gap-3'>
            <Input
              label='ID'
              placeholder='Enter shot ID'
              {...register(`shots.${index}.id`)}
              errorMessage={errors.shots?.[index]?.id?.message}
              isInvalid={!!errors.shots?.[index]?.id}
            />
            <Input
              label='Order'
              type='number'
              placeholder='Enter order'
              {...register(`shots.${index}.order`, { valueAsNumber: true })}
              errorMessage={errors.shots?.[index]?.order?.message}
              isInvalid={!!errors.shots?.[index]?.order}
            />
          </div>
          <Dropdown>
            <DropdownTrigger>
              <Button variant='bordered' className='w-full justify-between'>
                {watch(`shots.${index}.type`) === 'SHOT_WITH_CAST'
                  ? 'Shot with Cast'
                  : watch(`shots.${index}.type`) === 'SHOT_WITHOUT_CAST'
                    ? 'Shot without Cast'
                    : 'Select type'}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label='Shot Type Options'
              selectedKeys={
                watch(`shots.${index}.type`)
                  ? new Set([watch(`shots.${index}.type`)])
                  : new Set()
              }
              selectionMode='single'
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                if (selected) {
                  setValue(`shots.${index}.type`, selected as 'SHOT_WITH_CAST' | 'SHOT_WITHOUT_CAST', {
                    shouldValidate: true,
                  });
                }
              }}
            >
              {SHOT_TYPES.map((type) => (
                <DropdownItem key={type}>
                  {type === 'SHOT_WITH_CAST' ? 'Shot with Cast' : 'Shot without Cast'}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Input
            label='Title'
            placeholder='Enter shot title'
            {...register(`shots.${index}.title`)}
            errorMessage={errors.shots?.[index]?.title?.message}
            isInvalid={!!errors.shots?.[index]?.title}
          />
          <Textarea
            label='Storyline'
            placeholder='Enter storyline'
            minRows={2}
            {...register(`shots.${index}.storyline`)}
            errorMessage={errors.shots?.[index]?.storyline?.message}
            isInvalid={!!errors.shots?.[index]?.storyline}
          />
          <div className='grid grid-cols-2 gap-3'>
            <Textarea
              label='Text to Image Prompt'
              placeholder='Enter prompt'
              minRows={3}
              {...register(`shots.${index}.textToImage.promptParams.prompt`)}
              errorMessage={errors.shots?.[index]?.textToImage?.promptParams?.prompt?.message}
              isInvalid={!!errors.shots?.[index]?.textToImage?.promptParams?.prompt}
            />
            <Textarea
              label='Image to Video Prompt'
              placeholder='Enter prompt'
              minRows={3}
              {...register(`shots.${index}.imageToVideo.promptParams.prompt`)}
              errorMessage={errors.shots?.[index]?.imageToVideo?.promptParams?.prompt?.message}
              isInvalid={!!errors.shots?.[index]?.imageToVideo?.promptParams?.prompt}
            />
          </div>
        </div>
      ))}
      {errors.shots && <p className='text-xs text-danger'>{errors.shots.message}</p>}
    </div>
  );
}

