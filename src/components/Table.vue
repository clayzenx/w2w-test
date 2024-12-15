<script setup lang="ts">
defineProps<{
  columns: Array<{
    name: string;
    key: string;
  }>;
  rows: Array<Record<string, any>>;
}>();
</script>

<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead class="bg-white border-b">
              <tr>
                <th
                  v-for="(column, index) in columns"
                  :key="index"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  {{ column.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, rowIndex) in rows"
                :key="rowIndex"
                class="border-b"
                :class="rowIndex % 2 ? 'bg-white' : 'bg-gray-100'"
              >
                <td
                  v-for="column in columns"
                  :key="column.key"
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  <slot name="col" v-bind="{ row, column }">
                    <span>{{ row[column.key] }}</span>
                  </slot>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
