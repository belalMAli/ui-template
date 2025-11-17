'use client';

import React from 'react';

import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

const roleSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  label: z.string().min(1, 'Label is required'),
  required: z.boolean(),
  editable: z.boolean(),
  videoDescriptionFallback: z.string().min(1, 'Video description is required'),
  order: z.number().int().min(0),
});

const modelParamsSchema = z.object({
  aspectRatio: z.string().optional(),
  seed: z.number().optional(),
  style: z.string().optional(),
  duration: z.number().optional(),
});

const modelSchema = z.object({
  modelName: z.string().min(1, 'Model name is required'),
  modelId: z.string().min(1, 'Model ID is required'),
  modelParams: modelParamsSchema,
});

const promptParamsSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
});

const shotTextToImageSchema = z.object({
  promptParams: promptParamsSchema,
});

const shotImageToVideoSchema = z.object({
  promptParams: promptParamsSchema,
});

const shotSchema = z.object({
  id: z.string().min(1, 'Shot ID is required'),
  order: z.number().int().min(0),
  type: z.enum(['SHOT_WITH_CAST', 'SHOT_WITHOUT_CAST']),
  title: z.string().min(1, 'Title is required'),
  storyline: z.string().min(1, 'Storyline is required'),
  textToImage: shotTextToImageSchema,
  imageToVideo: shotImageToVideoSchema,
});

const configurableOptionSchema = z.object({
  enabled: z.boolean(),
  options: z.array(z.string()),
  default: z.string(),
});

const formSchema = z.object({
  _id: z.string().min(1, 'ID is required'),
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  roles: z.array(roleSchema).min(1, 'At least one role is required'),
  models: z.object({
    textToImage: modelSchema,
    imageToVideo: modelSchema,
  }),
  shots: z.array(shotSchema).min(1, 'At least one shot is required'),
  configurableOptions: z.object({
    aspectRatio: configurableOptionSchema,
    style: configurableOptionSchema,
    quality: configurableOptionSchema,
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function HomePage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: '',
      slug: '',
      title: '',
      description: '',
      roles: [],
      models: {
        textToImage: {
          modelName: '',
          modelId: '',
          modelParams: {},
        },
        imageToVideo: {
          modelName: '',
          modelId: '',
          modelParams: {},
        },
      },
      shots: [],
      configurableOptions: {
        aspectRatio: {
          enabled: true,
          options: [],
          default: '',
        },
        style: {
          enabled: true,
          options: [],
          default: '',
        },
        quality: {
          enabled: true,
          options: [],
          default: '',
        },
      },
    },
  });

  const {
    fields: roleFields,
    append: appendRole,
    remove: removeRole,
  } = useFieldArray({
    control,
    name: 'roles',
  });

  const {
    fields: shotFields,
    append: appendShot,
    remove: removeShot,
  } = useFieldArray({
    control,
    name: 'shots',
  });

  const {
    fields: aspectRatioOptionFields,
    append: appendAspectRatioOption,
    remove: removeAspectRatioOption,
  } = useFieldArray({
    control,
    // @ts-expect-error - react-hook-form has type limitations with deeply nested arrays
    name: 'configurableOptions.aspectRatio.options',
  });

  const {
    fields: styleOptionFields,
    append: appendStyleOption,
    remove: removeStyleOption,
  } = useFieldArray({
    control,
    // @ts-expect-error - react-hook-form has type limitations with deeply nested arrays
    name: 'configurableOptions.style.options',
  });

  const {
    fields: qualityOptionFields,
    append: appendQualityOption,
    remove: removeQualityOption,
  } = useFieldArray({
    control,
    // @ts-expect-error - react-hook-form has type limitations with deeply nested arrays
    name: 'configurableOptions.quality.options',
  });

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', JSON.stringify(data, null, 2));
  };

  return (
    <main className='flex h-full w-full flex-col items-center justify-center p-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex w-full max-w-4xl flex-col gap-6'>
        {/* Basic Information */}
        <div className='flex flex-col gap-4 rounded-lg border p-4'>
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
          <div>
            <label className='mb-2 block text-sm font-medium'>Description</label>
            <textarea
              className='w-full rounded-lg border border-default-200 bg-default-50 px-3 py-2 text-sm focus:border-primary focus:outline-none'
              placeholder='Enter description'
              rows={3}
              {...register('description')}
            />
            {errors.description && (
              <p className='mt-1 text-xs text-danger'>{errors.description.message}</p>
            )}
          </div>
        </div>

        {/* Roles */}
        <div className='flex flex-col gap-4 rounded-lg border p-4'>
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
              <div className='flex gap-4'>
                <label className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    {...register(`roles.${index}.required`)}
                    className='rounded border-default-300'
                  />
                  <span className='text-sm'>Required</span>
                </label>
                <label className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    {...register(`roles.${index}.editable`)}
                    className='rounded border-default-300'
                  />
                  <span className='text-sm'>Editable</span>
                </label>
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

        {/* Models */}
        <div className='flex flex-col gap-4 rounded-lg border p-4'>
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
              <Input
                label='Aspect Ratio'
                placeholder='e.g., 16:9'
                {...register('models.textToImage.modelParams.aspectRatio')}
              />
              <Input
                label='Seed'
                type='number'
                placeholder='Enter seed'
                {...register('models.textToImage.modelParams.seed', { valueAsNumber: true })}
              />
              <Input
                label='Style'
                placeholder='Enter style'
                {...register('models.textToImage.modelParams.style')}
              />
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

        {/* Shots */}
        <div className='flex flex-col gap-4 rounded-lg border p-4'>
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
              <div>
                <label className='mb-2 block text-sm font-medium'>Type</label>
                <select
                  className='w-full rounded-lg border border-default-200 bg-default-50 px-3 py-2 text-sm focus:border-primary focus:outline-none'
                  {...register(`shots.${index}.type`)}
                >
                  <option value='SHOT_WITH_CAST'>Shot with Cast</option>
                  <option value='SHOT_WITHOUT_CAST'>Shot without Cast</option>
                </select>
              </div>
              <Input
                label='Title'
                placeholder='Enter shot title'
                {...register(`shots.${index}.title`)}
                errorMessage={errors.shots?.[index]?.title?.message}
                isInvalid={!!errors.shots?.[index]?.title}
              />
              <div>
                <label className='mb-2 block text-sm font-medium'>Storyline</label>
                <textarea
                  className='w-full rounded-lg border border-default-200 bg-default-50 px-3 py-2 text-sm focus:border-primary focus:outline-none'
                  placeholder='Enter storyline'
                  rows={2}
                  {...register(`shots.${index}.storyline`)}
                />
                {errors.shots?.[index]?.storyline && (
                  <p className='mt-1 text-xs text-danger'>{errors.shots[index]?.storyline?.message}</p>
                )}
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label className='mb-2 block text-sm font-medium'>Text to Image Prompt</label>
                  <textarea
                    className='w-full rounded-lg border border-default-200 bg-default-50 px-3 py-2 text-sm focus:border-primary focus:outline-none'
                    placeholder='Enter prompt'
                    rows={3}
                    {...register(`shots.${index}.textToImage.promptParams.prompt`)}
                  />
                  {errors.shots?.[index]?.textToImage?.promptParams?.prompt && (
                    <p className='mt-1 text-xs text-danger'>
                      {errors.shots[index]?.textToImage?.promptParams?.prompt?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className='mb-2 block text-sm font-medium'>Image to Video Prompt</label>
                  <textarea
                    className='w-full rounded-lg border border-default-200 bg-default-50 px-3 py-2 text-sm focus:border-primary focus:outline-none'
                    placeholder='Enter prompt'
                    rows={3}
                    {...register(`shots.${index}.imageToVideo.promptParams.prompt`)}
                  />
                  {errors.shots?.[index]?.imageToVideo?.promptParams?.prompt && (
                    <p className='mt-1 text-xs text-danger'>
                      {errors.shots[index]?.imageToVideo?.promptParams?.prompt?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {errors.shots && <p className='text-xs text-danger'>{errors.shots.message}</p>}
        </div>

        {/* Configurable Options */}
        <div className='flex flex-col gap-4 rounded-lg border p-4'>
          <h2 className='text-xl font-semibold'>Configurable Options</h2>

          {/* Aspect Ratio */}
          <div className='flex flex-col gap-3 rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <h3 className='font-medium'>Aspect Ratio</h3>
              <Button
                type='button'
                size='sm'
                color='primary'
                onPress={() => appendAspectRatioOption('' as never)}
              >
                Add Option
              </Button>
            </div>
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                {...register('configurableOptions.aspectRatio.enabled')}
                className='rounded border-default-300'
              />
              <span className='text-sm'>Enabled</span>
            </label>
            {aspectRatioOptionFields.map((field, index) => (
              <div key={field.id} className='flex gap-2'>
                <Input
                  placeholder='Enter option (e.g., 16:9)'
                  {...register(`configurableOptions.aspectRatio.options.${index}`)}
                  className='flex-1'
                />
                <Button
                  type='button'
                  size='sm'
                  color='danger'
                  variant='light'
                  onPress={() => removeAspectRatioOption(index)}
                >
                  Delete
                </Button>
              </div>
            ))}
            <Input
              label='Default'
              placeholder='Enter default value'
              {...register('configurableOptions.aspectRatio.default')}
            />
          </div>

          {/* Style */}
          <div className='flex flex-col gap-3 rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <h3 className='font-medium'>Style</h3>
              <Button
                type='button'
                size='sm'
                color='primary'
                onPress={() => appendStyleOption('' as never)}
              >
                Add Option
              </Button>
            </div>
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                {...register('configurableOptions.style.enabled')}
                className='rounded border-default-300'
              />
              <span className='text-sm'>Enabled</span>
            </label>
            {styleOptionFields.map((field, index) => (
              <div key={field.id} className='flex gap-2'>
                <Input
                  placeholder='Enter option'
                  {...register(`configurableOptions.style.options.${index}`)}
                  className='flex-1'
                />
                <Button
                  type='button'
                  size='sm'
                  color='danger'
                  variant='light'
                  onPress={() => removeStyleOption(index)}
                >
                  Delete
                </Button>
              </div>
            ))}
            <Input
              label='Default'
              placeholder='Enter default value'
              {...register('configurableOptions.style.default')}
            />
          </div>

          {/* Quality */}
          <div className='flex flex-col gap-3 rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <h3 className='font-medium'>Quality</h3>
              <Button
                type='button'
                size='sm'
                color='primary'
                onPress={() => appendQualityOption('' as never)}
              >
                Add Option
              </Button>
            </div>
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                {...register('configurableOptions.quality.enabled')}
                className='rounded border-default-300'
              />
              <span className='text-sm'>Enabled</span>
            </label>
            {qualityOptionFields.map((field, index) => (
              <div key={field.id} className='flex gap-2'>
                <Input
                  placeholder='Enter option'
                  {...register(`configurableOptions.quality.options.${index}`)}
                  className='flex-1'
                />
                <Button
                  type='button'
                  size='sm'
                  color='danger'
                  variant='light'
                  onPress={() => removeQualityOption(index)}
                >
                  Delete
                </Button>
              </div>
            ))}
            <Input
              label='Default'
              placeholder='Enter default value'
              {...register('configurableOptions.quality.default')}
            />
          </div>
        </div>

        <Button type='submit' color='primary' size='lg' className='w-full'>
          Submit
        </Button>
      </form>
    </main>
  );
}
