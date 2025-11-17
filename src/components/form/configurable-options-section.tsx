import { Button } from '@heroui/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { UseFormWatch, UseFormSetValue } from 'react-hook-form';

import { ASPECT_RATIO_OPTIONS, QUALITY_OPTIONS, STYLE_OPTIONS } from '@/lib/constants/form';
import type { FormData } from '@/lib/schemas';

interface ConfigurableOptionsSectionProps {
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
}

export function ConfigurableOptionsSection({ watch, setValue }: ConfigurableOptionsSectionProps) {
  return (
    <div className='w-full flex flex-col gap-4 rounded-lg border p-4'>
      <h2 className='text-xl font-semibold'>Configurable Options</h2>

      <div className='flex flex-col gap-3 rounded-lg border p-4'>
        <h3 className='font-medium'>Aspect Ratio</h3>
        <Dropdown>
          <DropdownTrigger>
            <Button variant='bordered' className='w-full justify-between'>
              {watch('configurableOptions.aspectRatio.default') || 'Select aspect ratio'}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Aspect Ratio Options'
            selectedKeys={
              watch('configurableOptions.aspectRatio.default')
                ? new Set([watch('configurableOptions.aspectRatio.default')])
                : new Set()
            }
            selectionMode='single'
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              if (selected) {
                setValue('configurableOptions.aspectRatio.default', selected, {
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
      </div>

      <div className='flex flex-col gap-3 rounded-lg border p-4'>
        <h3 className='font-medium'>Style</h3>
        <Dropdown>
          <DropdownTrigger>
            <Button variant='bordered' className='w-full justify-between'>
              {watch('configurableOptions.style.default') || 'Select style'}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Style Options'
            selectedKeys={
              watch('configurableOptions.style.default')
                ? new Set([watch('configurableOptions.style.default')])
                : new Set()
            }
            selectionMode='single'
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              if (selected) {
                setValue('configurableOptions.style.default', selected, {
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
        <h3 className='font-medium'>Quality</h3>
        <Dropdown>
          <DropdownTrigger>
            <Button variant='bordered' className='w-full justify-between'>
              {watch('configurableOptions.quality.default') || 'Select quality'}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Quality Options'
            selectedKeys={
              watch('configurableOptions.quality.default')
                ? new Set([watch('configurableOptions.quality.default')])
                : new Set()
            }
            selectionMode='single'
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              if (selected) {
                setValue('configurableOptions.quality.default', selected, {
                  shouldValidate: true,
                });
              }
            }}
          >
            {QUALITY_OPTIONS.map((option) => (
              <DropdownItem key={option}>{option}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}

