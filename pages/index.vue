<!-- pages/CardSectionPage.vue -->
<template>
  <header class="mt-2 p-3 rounded flex justify-between" >
    <img src="../public/logo.png"/>
    <h1 class="text-4xl font-bold ">Admin panel</h1>
    <div class="flex items-center">
      <button @click="logOut" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Log Out</button>
      <NuxtLink to="/rus" class="ml-2" @click="lang = !lang">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
          <mask id="mask0_247_8597" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
            <circle cx="10.9766" cy="10" r="10" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_247_8597)">
            <path d="M26.2202 6.82337H-5.02344V0.538708C-5.02344 0.241222 -4.78221 0 -4.48473 0H25.6815C25.979 0 26.2202 0.241222 26.2202 0.538708L26.2202 6.82337Z" fill="#F5F5F5"/>
            <path d="M25.6815 20.47H-4.48473C-4.78221 20.47 -5.02344 20.2288 -5.02344 19.9313V13.6467H26.2202V19.9313C26.2202 20.2288 25.9789 20.47 25.6815 20.47Z" fill="#FF4B55"/>
            <path d="M26.2202 6.82337H-5.02344V13.6467H26.2202V6.82337Z" fill="#41479B"/>
          </g>
        </svg>
      </NuxtLink>
    </div>
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


  <footer class="mb-16">
    <div class="w-96 ml-auto">
      <h2 class="text-2xl">"Generator House" admin paneli</h2>
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
  </footer>
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
