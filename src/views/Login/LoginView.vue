
<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import { useLoginStore } from '@/stores/loginStore/login';
import { showToast } from '@/helpers/notifications';
import SpinnerComponent from "@/components/loaders/SpinnerComponent.vue"


const store = useLoginStore();
const document_number = ref('');
const password = ref('');

const login = async() => {
  await store.login({
    document_number: document_number.value,
    password: password.value
  });
  if (localStorage.getItem("tokenAuth")){
    showToast(3000, "success", "Signed in successfully");
  router.push('/dashboard'); // Redirige a la página de inicio
}
};
</script>

<template>
  <div v-if="store.isLoading">
    <SpinnerComponent/>
  </div>
  <section class="bg-insalud">
    <div>
      <div class="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="flex justify-center pt-8">
            <img class="h-14" src="../../assets/img/insalud-logo.webp" alt="logo">
          </div>  
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Acceda a su cuenta
                </h1>
                <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="login">
                    <div>
                        <label for="document_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
                        <input v-model="document_number" type="text" name="document_number" id="document_number" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="12345678" >
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                        <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <button type="submit" class="w-full text-white bg-primaryinsalud-100 hover:bg-primaryinsalud-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Iniciar sesión</button>
                  </form>
            </div>
        </div>
    </div>
    </div>
  </section>
</template>

<style scoped>
.bg-insalud{
  background-image: url("../../assets/img/background-insalud.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.dark .bg-insalud {
  /* Define el color de fondo oscuro en modo oscuro */
  background-color: rgba(0, 0, 0, 0.4); /* Cambia el valor alpha según el nivel de oscurecimiento deseado */
}
</style>