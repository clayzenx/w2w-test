<script setup lang="ts">
import { ref } from 'vue';
import Table from '@/components/Table.vue';
import Selector from '@/components/Selector.vue';
import ContextMenu from '@/components/ContextMenu.vue';
import type { Medic } from '@/stores/medics';
import { useMedicsStore } from '@/stores/medics.ts'

const columns = [
  { name: 'ФИО', key: 'name' },
  { name: 'Отделение', key: 'department' },
];

const options = [
  { name: 'кардиологическое' },
  { name: 'хирургическое' },
]

const newIntern = ref('');
const internDeparment = ref(options[0]);
const add = () => store.add(newIntern.value, internDeparment.value.name);

const store = useMedicsStore();
</script>

<template>
  <div class="flex gap-2 mt-2 mb-2">
    <input placeholder='Новый интерн' class="border border-gray-200 rounded-lg px-4 py-2" type="text" v-model="newIntern">
    <Selector :options v-model="internDeparment"></Selector>
    <button :disabled="newIntern.length === 0" class="bg-green-500 disabled:bg-gray-400 text-white rounded-lg px-4 py-2" @click="add">Добавить</button>
  </div>
  <Table :columns :rows="store.nurses">
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
