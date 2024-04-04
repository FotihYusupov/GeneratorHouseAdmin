<template>
    <header class="mt-2 p-3 rounded flex justify-between items-center" >
        <img src="/logo.png" width="54" height="54">
        <h1 class="text-3xl font-bold ">User Name va Parolni o'zgartirish</h1>
        <div class="flex items-center">
            <NuxtLink to="/" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Asosiy Sahifa</NuxtLink>
        </div>
    </header>
    <div class="flex flex-col items-center justify-center h-screen -mt-20">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 transition-transform transform hover:scale-105" @submit="login">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" id="loginUserName" type="text" placeholder="Enter your username"/>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Parol</label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" id="loginPassword" type="password" placeholder="Enter your password"/>
        </div>
        <div class="flex items-center justify-between">
          <button @click.prevent="login" class="w-full bg-blue-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105">Kirish</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
    import axios from "axios";

    const error = ref('')

    const token = ref('')
    onMounted(() => {
        token.value = JSON.parse(localStorage.getItem('token'))
    })

    const login = async (e) => {
          e.preventDefault();
          const userData = {
            userName: loginUserName.value,
            password: loginPassword.value
          };
          const response = await axios.post('https://generator2.hypernova.uz/api/update-user', userData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.value}`,
            }
          });
          if (response.status === 200) {
            console.log(response.data);
              localStorage.setItem('token', JSON.stringify(response.data))
              await navigateTo('/');
          } else {
            alert("Qandaydir xatolik yuz berdi iltimos qaytadan urinib ko'ring!")
          }
      };
  
  </script>