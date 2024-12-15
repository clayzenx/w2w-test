<script setup lang="ts">
import Table from '@/components/Table.vue';
import ContextMenu from '@/components/ContextMenu.vue';
import type { Medic } from '@/stores/medics';
import { useMedicsStore } from '@/stores/medics.ts'

const columns = [
  { name: 'ФИО', key: 'name' },
  { name: 'Отделение', key: 'department' },
];

const store = useMedicsStore();
</script>

<template>
  <Table :columns :rows="store.docs">
    <template #col="{ row, column }">
      <ContextMenu>
        <template #trigger>
          <span>{{ row[column.key] }}</span>
          <span v-if="column.key === 'name' && row.isChief"
            class="cursor-pointer rounded-full px-4 py-1 ml-2 bg-green-500 text-white">Заведующий</span>
        </template>

        <template #actions>
          <span class="cursor-pointer p-2 hover:bg-gray-200" v-for="{ name, action } in store.getActions(row as Medic)" :key="name"
            @click="() => action(row.id, row.department)">
            {{ name }}
          </span>
        </template>
      </ContextMenu>
    </template>
  </Table>
</template>
