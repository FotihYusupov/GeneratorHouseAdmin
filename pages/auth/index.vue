<template>
  <div class="flex items-center justify-center h-screen">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 transition-transform transform hover:scale-105" @submit="login">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" id="loginUserName" type="text" placeholder="Enter your username"/>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" id="loginPassword" type="password" placeholder="Enter your password"/>
      </div>
      <div class="flex items-center justify-between">
        <button @click.prevent="login" class="w-full bg-blue-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105">Sign In</button>
      </div>
      <a class="block mt-2" href="tel:+998944125626">Texnik Yordam: +998 (94) 412-56-26</a>
    </form>
  </div>
</template>

<script setup>
  import axios from "axios";

  const error = ref('')

  onMounted(async() => {
      const token = await JSON.parse(localStorage.getItem('token'))
      if(token) {
          await navigateTo('/');
      }
  })

  const login = async (e) => {
        e.preventDefault();
        const userData = {
          userName: loginUserName.value,
          password: loginPassword.value
        };
        const response = await axios.post('https://api.generatorhouse.uz/api/login', userData);
        if (response.status === 200) {
            localStorage.setItem('token', JSON.stringify(response.data))
            await navigateTo('/');
        } else {
          alert("User name yoki parol xato kiritildi iltimos qaytadan urinib ko'ring!")
        }
    };

</script>