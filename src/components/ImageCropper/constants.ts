import { AspectRatio } from '../../types';

export const ACCEPTED_IMAGE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp']
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ASPECT_RATIOS: AspectRatio[] = [
  { value: 1 / 1, label: 'Square (1:1)' },
  { value: 16 / 9, label: 'Landscape (16:9)' },
  { value: 4 / 3, label: 'Standard (4:3)' },
  { value: 3 / 4, label: 'Portrait (3:4)' },
  { value: 2 / 3, label: 'Profile (2:3)' }
];