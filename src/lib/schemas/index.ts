import { z } from 'zod';

export const roleSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  label: z.string().min(1, 'Label is required'),
  required: z.boolean(),
  editable: z.boolean(),
  videoDescriptionFallback: z.string().min(1, 'Video description is required'),
  order: z.number().int().min(0),
});

export const modelParamsSchema = z.object({
  aspectRatio: z.string().optional(),
  seed: z.number().optional(),
  style: z.string().optional(),
  duration: z.number().optional(),
});

export const modelSchema = z.object({
  modelName: z.string().min(1, 'Model name is required'),
  modelId: z.string().min(1, 'Model ID is required'),
  modelParams: modelParamsSchema,
});

export const promptParamsSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
});

export const shotTextToImageSchema = z.object({
  promptParams: promptParamsSchema,
});

export const shotImageToVideoSchema = z.object({
  promptParams: promptParamsSchema,
});

export const shotSchema = z.object({
  id: z.string().min(1, 'Shot ID is required'),
  order: z.number().int().min(0),
  type: z.enum(['SHOT_WITH_CAST', 'SHOT_WITHOUT_CAST']),
  title: z.string().min(1, 'Title is required'),
  storyline: z.string().min(1, 'Storyline is required'),
  textToImage: shotTextToImageSchema,
  imageToVideo: shotImageToVideoSchema,
});

export const configurableOptionSchema = z.object({
  enabled: z.boolean(),
  options: z.array(z.string()),
  default: z.string(),
});

export const formSchema = z.object({
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

export type FormData = z.infer<typeof formSchema>;

