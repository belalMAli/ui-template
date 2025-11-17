import type { FormData } from '@/lib/schemas';

export const ASPECT_RATIO_OPTIONS = ['9:16', '16:9', '1:1', '21:9', '2:3'] as const;
export const STYLE_OPTIONS = ['THREE_D_ANIMATION'] as const;
export const QUALITY_OPTIONS = ['standard', 'high'] as const;

export const SHOT_TYPES = ['SHOT_WITH_CAST', 'SHOT_WITHOUT_CAST'] as const;

export const getDefaultFormValues = (): FormData => ({
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
      options: [...ASPECT_RATIO_OPTIONS],
      default: '16:9',
    },
    style: {
      enabled: true,
      options: [...STYLE_OPTIONS],
      default: 'THREE_D_ANIMATION',
    },
    quality: {
      enabled: true,
      options: [...QUALITY_OPTIONS],
      default: 'high',
    },
  },
});

