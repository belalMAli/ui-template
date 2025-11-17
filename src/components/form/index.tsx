'use client';

import React from 'react';

import { Button } from '@heroui/button';
import { Form } from '@heroui/form';

import { BasicInfoSection } from '@/components/form/basic-info-section';
import { ConfigurableOptionsSection } from '@/components/form/configurable-options-section';
import { ModelsSection } from '@/components/form/models-section';
import { RolesSection } from '@/components/form/roles-section';
import { ShotsSection } from '@/components/form/shots-section';
import { useFormData } from '@/lib/hooks/use-form-data';
import type { FormData } from '@/lib/schemas';

export function TemplateForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
    roleFields,
    appendRole,
    removeRole,
    shotFields,
    appendShot,
    removeShot,
  } = useFormData();

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', JSON.stringify(data, null, 2));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='flex w-full max-w-4xl flex-col gap-6'>
    <BasicInfoSection register={register} errors={errors} />

    <RolesSection
        register={register}
        control={control}
        errors={errors}
        roleFields={roleFields}
        appendRole={appendRole}
        removeRole={removeRole}
    />

    <ModelsSection register={register} errors={errors} watch={watch} setValue={setValue} />

    <ShotsSection
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
        shotFields={shotFields}
        appendShot={appendShot}
        removeShot={removeShot}
    />

    <ConfigurableOptionsSection watch={watch} setValue={setValue} register={register} errors={errors} />

    <Button type='submit' color='primary' size='lg' className='w-full'>
        Submit
    </Button>
    </Form>
  );
}
