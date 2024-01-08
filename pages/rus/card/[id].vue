<template>
    <div class="mt-3">
        <div class="fixed z-[10000] w-[80%] bg-white top-0 p-5 flex justify-between">
            <NuxtLink to="/rus/" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600">Главная Страница</NuxtLink>
            <p v-if="categories.filter(e => e._id === id)[0]" class="text-3xl">{{ categories.filter(e => e._id === id)[0].category_name }}</p>
            <NuxtLink :to="'/rus/add/' + id" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600">Добавить Продукт</NuxtLink>
        </div>
        <div v-show="actions.loading"><loading/></div>
        <p class="mt-24 text-3xl text-center" v-if="products?.length == 0">Нет продуктов в этой категории.</p>
        <ul class="mt-24 flex flex-wrap  justify-around">
            <li
                v-for="product in products"
                :key="product._id"
                :data-id="product._id"
                id="item"
                class="max-w-xs w-72 ml-4 flex flex-col  bg-white shadow-lg rounded-lg overflow-hidden mb-5 border transition-transform transform p-3"
            >
                <img
                    class="object-contain rounded-t-lg bg-gray-400 mb-2 w-64 h-48"
                    :src="product.product_img[0]"
                    width="300"
                    height="200"
                />
                <div class="h-[100%]">
                    <h2 class="text-2xl truncate"><b>{{ product.product_title }}</b></h2>
                    <p v-if="product.product_price > 0"><b>Цена:</b> {{ product.product_price }} сум</p>
                    <p>{{ product.new_price > 0 ? `Скидка: ${product.new_price} сум` : '' }}</p>
                    <p class="text-sm font-medium line-clamp-3">{{ product.product_desc }}</p>
                </div>
                <div class="place-content-end place-self-end  w-full">
                    <NuxtLink :to="'/rus/edit/' + product._id" :id="product._id" class="block text-center font-bold w-full rounded cursor-pointer mt-auto p-2 text-white bg-blue-600">Изменить</NuxtLink>
                    <span :id="product._id" @click="deleteProduct" class="block text-center font-bold w-full rounded cursor-pointer mt-2 p-2 text-white bg-red-600" >Удалить</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
    import axios from 'axios'
    import Modal from "~/components/Modal.vue";

    const token = ref('')

    const categories = ref([])

    const getCategories = async () => {
        const response = await axios.get('https://api.generatorhouse.uz/api/ru/categories');
        categories.value = response.data;
    }
    getCategories()

    onMounted(async() => {
        token.value = await JSON.parse(localStorage.getItem('token'))
        if(!token) {
            await navigateTo('/auth');
        }
    })

    const { id } = useRoute().params;

    const counter = ref(0);

    const products = ref()

    const actions = ref({
        loading: false,
        error: false
    })
    async function getData() {
        try {
            actions.value.loading = true
            const response = await axios.get(`https://api.generatorhouse.uz/api/ru/category/${id}`);
            if(response.status == 200) {
                response.data.map(e => e.link = `/card/${e._id}`)
                products.value = response.data
                actions.value.loading = false
            } else {
                actions.value.error = true
            }
        } catch (error) {
            console.error(error);
        }
    };
    getData()

    const deleteProduct = async (e) => {
        actions.value.loading = true;
        await axios.delete(`https://api.generatorhouse.uz/api/ru/delete/${e.target.id}`,  {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        })
        getData()
    };

</script>

<style>
    @import 'card.css'
</style>
