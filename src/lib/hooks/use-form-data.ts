import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

import { getDefaultFormValues } from '@/lib/constants/form';
import { formSchema, type FormData } from '@/lib/schemas';

export function useFormData() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues(),
  });

  const {
    fields: roleFields,
    append: appendRole,
    remove: removeRole,
  } = useFieldArray({
    control: form.control,
    name: 'roles',
  });

  const {
    fields: shotFields,
    append: appendShot,
    remove: removeShot,
  } = useFieldArray({
    control: form.control,
    name: 'shots',
  });

  return {
    ...form,
    roleFields,
    appendRole,
    removeRole,
    shotFields,
    appendShot,
    removeShot,
  };
}

