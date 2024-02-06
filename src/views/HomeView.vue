<script setup lang="ts">
import MenuComponent from '@/components/Menu/MenuComponent.vue'
import { ref, onMounted, computed } from 'vue'
import { useLoginStore } from '@/stores/loginStore/login'
import type { CurrentUser } from '@/types/userType';

const store = useLoginStore()
const currentUser = computed<CurrentUser | null>(() => store.currentUser);

onMounted(async () => {
  // Puedes realizar cualquier lógica adicional al montar el componente
})
</script>

<template>
  <div>
    <MenuComponent />
    <main>
      <h1 class="text-5xl font-bold underline">
        Hello world! {{ currentUser?.first_name }}
      </h1>
    </main>
  </div>
</template>
