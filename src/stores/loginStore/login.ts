import { onBeforeMount, ref } from 'vue'
import { defineStore } from 'pinia'
import type { NewUser, ExistingUser, CurrentUser } from '@/types/userType'
import { getCurrentUserApi, loginApi, createApi } from '@/api/apiLogin'
import { showToast } from '@/helpers/notifications'

export const useLoginStore = defineStore('login', () => {
  const currentUser =  ref<CurrentUser | null>(null);
  const isLoading = ref<boolean>(false);

  const handleApiError = (error: any, iconToast:string, message:string): void => {
    console.error(error);
    isLoading.value = false;
    showToast(3000, iconToast, message);
  };

  const create = async (credentials: NewUser) => {
    isLoading.value = true;
    try {
      const response = await createApi(credentials);
      // console.log(response);
      const { token } = response.data;
      localStorage.setItem("tokenAuth", token);
      await getCurrentUser(token);

      isLoading.value = false;
    } catch (error:any) {
      const {message} = error.response.data || 'An error occurred';
      handleApiError(error, 'error', message)
    }
  };

  const login = async (credentials: ExistingUser) => {
    isLoading.value = true;
    try {
      const response = await loginApi(credentials);
      // console.log(response);
      const { token } = response.data;
      localStorage.setItem("tokenAuth", token);
      await getCurrentUser(token);

      isLoading.value = false;
    } catch (error:any ) {
      handleApiError(error, 'error', 'incorrect username or password');
    }
  };
  const getCurrentUser = async (token:string) => {
    try {
      isLoading.value = true;
      if (!token) {
        console.error("Token not found");
        return null;
      }
      const response = await getCurrentUserApi(token);
      currentUser.value = response[0];
      console.log(currentUser)
    } catch (error) {
      console.error(error);
      isLoading.value = false;
    }
  };
  const logout = (): void => {
    localStorage.removeItem("tokenAuth");
  }

    // Ejecutar getCurrentUser al montar el componente
  onBeforeMount(() => {
    const token = localStorage.getItem("tokenAuth");
    if (token) {
      getCurrentUser(token);
    }
  });

  return { currentUser, isLoading, create, login, getCurrentUser, logout }
})
