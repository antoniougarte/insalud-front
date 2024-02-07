<script setup lang="ts">
import MenuComponent from '@/components/Menu/MenuComponent.vue'
import AsideComponent from '@/components/Aside/AsideComponent.vue'
import { ref, onMounted, computed } from 'vue'
import { useLoginStore } from '@/stores/loginStore/login'
import type { CurrentUser } from '@/types/userType';


import UsersView from '@/views/Dashboard/Sections/Users/UsersView.vue'
import ProductsView from '@/views/Dashboard/Sections/Products/ProductsView.vue'

const store = useLoginStore()
const currentUser = computed<CurrentUser | null>(() => store.currentUser);



const isAsideOpen = ref(false)
const toggleAside = ()=>{
   isAsideOpen.value = !isAsideOpen.value
}

onMounted(async () => {
  // Puedes realizar cualquier lógica adicional al montar el componente
})

</script>

<template>
<MenuComponent
   :currentUser="currentUser!"
   @toggleAside="toggleAside"
/>
<AsideComponent
   :toggleAside="isAsideOpen"
/>


<ProductsView />

</template>
