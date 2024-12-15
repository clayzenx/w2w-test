import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import medicsData from '../assets/medics.json';

export type Medic = {
  id: number, name: string, department: string, grade: string, isChief: boolean
}
type Action = { name: string, action: (...args: any[]) => any }

export const useMedicsStore = defineStore('medics', () => {
  const medics = ref(medicsData as any as Medic[] || []);

  const docs = computed(() => medics.value.filter(({ grade }) => grade === 'doc'))
  const nurses = computed(() => medics.value.filter(({ grade }) => grade === 'nurse'))

  const setChief = (id: number, department: string) => {
    medics.value = medics.value.map((medic) => {
      if(medic.grade === 'doc' && medic.department === department) {
        if(medic.id === id) medic.isChief = true;
        else medic.isChief = false;
      }
      return medic
    })
  }

  const add = (name: string, department: string) => {
    medics.value = [...medics.value, { id: medics.value.length + 1, name, department, grade: 'nurse', isChief: false }];
  }

  const fire = (id: number) => {
    medics.value = medics.value.filter((medic) => medic.id !== id);
  }

  const graduate = (id: number) => {
    medics.value = medics.value.map((medic) => {
      if(medic.id === id) medic.grade = 'doc';
      return medic
    });
  }

  const getActions = ({ grade, isChief }: Medic) => {
    const actions: Action[] = [
      { name: 'Уволить', action: fire }
    ];

    if (grade === 'nurse')
      actions.push({
        name: 'Перевести к врачам',
        action: graduate
      })

    if (grade === 'doc' && !isChief)
      actions.push({
        name: 'Сделать главным',
        action: setChief
      })
    return actions;
  }

  const fetchMedics = async () => {
    try {
      const response = await import('../assets/medics.json');
      medics.value = response.default as any as Medic[];
    } catch (error) {
      console.error('Failed to fetch medics data:', error);
    }
  };

  return { medics, docs, nurses, fetchMedics, getActions, add };
});


