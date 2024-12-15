<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
</script>


<template>
  <Popover>
    <PopoverButton>
      <slot name="trigger">click</slot>
    </PopoverButton>
    <PopoverPanel class="absolute z-10">
      <div class="flex flex-col bg-white border border-gray-200 rounded-md pt-2 pb-2">
        <slot name="actions"></slot>
      </div>
    </PopoverPanel>

  </Popover>
</template>
