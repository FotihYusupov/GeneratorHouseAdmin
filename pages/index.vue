<!-- pages/CardSectionPage.vue -->
<template>
  <header class="mt-2 p-3 rounded flex justify-between" >
    <img src="../public/logo.png"/>
    <h1 class="text-4xl font-bold ">Admin panel</h1>
    <button @click="logOut" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Log Out</button>
  </header>
  <div class="mx-auto mt-8">
    <div class="flex justify-between mb-4">
      <h2 class="text-3xl font-bold mb-4">Kategoriyalar</h2>
      <NuxtLink class="text-3xl font-bold mb-4 hover:opacity-50 transition" to="/brands">Brandlar</NuxtLink>
    </div>
    <div class="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ul class="flex justify-between flex-wrap mb-20">
        <h2 v-show="cards.loading"><loading/></h2>
        <Card
          v-for="card in cards.data"
          :key="card._id"
          :title="card.category_name"
          :cardLink="card.link"
        />
      </ul>
    </div>
  </div>
  <div class="mb-16">
    <div class="w-96 ml-auto">
      <h2 class="text-2xl">"Generator Hause" admin paneli</h2>
      <p class="w-64 ml-auto"><a href="http://hyperNova.uz">"HyperNova.uz"</a> tomonidan yaratildi.</p>
    </div>
    <div class="mt-12 mb-6">
      <p class="text-xl"><b class="mr-2">Admin panelidagi login va parolni:</b>Hech qachon hech kimga bermang.</p>
      <p class="text-xl"><b class="mr-2">Qandaydir xatolik yuz bersa:</b><a href="http://hyperNova.uz" target="_blank">"HyperNova.uz"</a> bilan a'loqaga chiqing.</p>
    </div>
    <div>
      <p class="text-xl"><b class="mr-2">Texnik yordam: </b><a href="tel:+998944125626">+998 (94) 412-56-26</a></p>
      <p class="text-xl"><b class="mr-2">Telegram:</b><a href="https://t.me/HyperNova_PM">@HyperNova_PM</a></p>
    </div>
    <div>

    </div>
  </div>
</template>

<script setup>
  import axios from "axios";

  onMounted(async() => {
    const token = await JSON.parse(localStorage.getItem('token'))
    if(!token) {
        await navigateTo('/auth');
    }
  })

  const logOut = async (e) => {
    localStorage.removeItem('token')
    await navigateTo('/auth')
  }

  const cards = ref({
    loading: false,
    error: false,
    data: []
  })

  async function getData() {
    try {
      cards.value.loading = true;
      const response = await axios.get('https://gh-server-83lb.onrender.com/api/categories');
      if(response.status == 200) {
        response.data.map(e => e.link = `/card/${e._id}`)
        cards.value.data = response.data;
        cards.value.loading = false;
      } else {
        cards.error = true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  getData()

</script>
