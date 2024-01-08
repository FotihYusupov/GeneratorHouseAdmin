<template>
    <div v-if="categories.length > 0" class="mt-4">
        <div class="flex justify-between">
            <NuxtLink :to="'/rus/card/' + id" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600">Главная Страница</NuxtLink>
            <h1 class="text-4xl font-bold">{{ categories.filter(e => e._id === id)[0].category_name }}</h1>
            <span></span>
        </div>
        <h2 class="text-2xl mt-16 mb-2 font-bold">{{ categories.filter(e => e._id === id)[0].category_name }} категории для добавления продукта.</h2>
        <hr class="mb-8"/>
        <div>
            <form @submit="addProduct">
                <div class="flex justify-between">
                    <div class="w-80">
                        <label class="block text-gray-700 text-lg w-full font-bold mb-2" for="productTitle">Название продукта</label>
                        <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" id="productTitle" placeholder="Название продукта" required>
                        <label class="block text-gray-700 text-lg w-full font-bold mb-2" for="productPrice">Цена продукта (необязательно)</label>
                        <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" id="productPrice" placeholder="Цена продукта">
                        <label class="block text-gray-700 text-lg w-full font-bold mb-2" for="brand">Выберите бренд</label>
                        <select class="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-white focus:shadow-outline focus:border-blue-600" name="brand" id="brand" required>
                            <option selected disabled>Выберите бренд</option>
                            <option class="bg-white block p-5" v-for="brand in brands" :key="brand._id" :value="brand._id">{{ brand.brand_name }}</option>
                        </select>
                        <label class="block text-gray-700 text-base w-full font-bold mb-2" for="productDesc">Информация о продукте (необязательно)</label>
                        <textarea class="shadow resize-none appearance-none h-40 border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" id="productDesc" placeholder="Информация о продукте"></textarea>
                    </div>
                    <div class="w-80">
                        <label class="block text-gray-700 text-lg w-full font-bold m-0" for="productImage">Изображение продукта</label>
                        <p class="block text-gray-700 text-sm w-full font-bold m-0 mb-2">Не менее 2-х изображений требуется!</p>
                        <input class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 mb-2 disabled:opacity-50 disabled:pointer-events-none file:border-0 file:bg-blue-100 file:me-4 file:py-2 file:px-4"
                            name="images"
                            id="productImage"
                            type="file"
                            accept=".png"
                            placeholder="Изображение продукта"
                            required
                        >
                        <input class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 mb-2 disabled:opacity-50 disabled:pointer-events-none file:border-0 file:bg-blue-100 file:me-4 file:py-2 file:px-4"
                            name="images"
                            type="file"
                            accept=".png"
                            placeholder="Изображение продукта"
                            required
                        >
                        <input class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 mb-2 disabled:opacity-50 disabled:pointer-events-none file:border-0 file:bg-blue-100 file:me-4 file:py-2 file:px-4"
                            name="images"
                            type="file"
                            accept=".png"
                            placeholder="Изображение продукта"
                        >
                        <input class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 mb-2 disabled:opacity-50 disabled:pointer-events-none file:border-0 file:bg-blue-100 file:me-4 file:py-2 file:px-4"
                            name="images"
                            type="file"
                            accept=".png"
                            placeholder="Изображение продукта"
                        >
                    </div>
                    <div class="w-80">
                        <div @click="addElement" class="w-full flex justify-between items-center mt-1 mb-1">
                            <h3 class="text-gray-700 text-lg w-full font-bold">Дополнительно</h3>
                            <span><svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path opacity="1" fill="#1E3050" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></span>
                        </div>
                        <div id="inputsWrapper"></div>
                    </div>
                </div>
                <button id="addProductBtn" class="float-right bg-blue-600 max-w-full w-56 text-white py-2 px-4 rounded-md hover:bg-blue-600">Добавить</button>
            </form>
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios'

    const { id } = useRoute().params;
    const counter = ref(0)
    const token = ref(null)

    const addElement = () => {
        counter.value += 1
        const wrapper = document.createElement('span')
        wrapper.classList.add('w-full', 'flex', 'justify-between', 'items-center')
        wrapper.id = `wrapper-${counter.value}`

        const key = document.createElement('input')
        key.classList.add('w-36', 'shadow', 'mb-2', 'appearance-none', 'border-2', 'rounded', 'py-2', 'px-3', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:shadow-outline', 'focus:border-blue-600')
        key.placeholder = 'Описание'
        key.id = `key-${counter.value}`
        
        const value = document.createElement('input')
        value.classList.add('w-36', 'shadow', 'mb-2', 'appearance-none', 'border-2', 'rounded', 'py-2', 'px-3', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:shadow-outline', 'focus:border-blue-600')
        value.placeholder = 'Значение'
        value.id = `value-${counter.value}`

        const del = document.createElement('img')
        del.classList.add('cursor-pointer')
        del.id = counter.value
        del.onclick = deleteElement
        del.src = '/trash-can-solid.svg'

        wrapper.appendChild(key)
        wrapper.appendChild(value)
        wrapper.appendChild(del)
        inputsWrapper.appendChild(wrapper)
    }

    onMounted(async() => {
        token.value = await JSON.parse(localStorage.getItem('token'))
        if(!token) {
            await navigateTo('/auth');
        }
        setTimeout(() => {
            addElement()
        }, 400)
    })

    const categories = ref([])
    const getCategories = async () => {
        const response = await axios.get('https://api.generatorhouse.uz/api/ru/categories');
        categories.value = response.data;
    }
    getCategories()

    const brands = ref([])
    const getBrands = async () => {
        try {
            const res = await axios.get('https://api.generatorhouse.uz/api/brands')
            if(res.status === 200) {
                brands.value = res.data
            }
        } catch (err) {
            console.log(err)
        }
    }
    getBrands()

    const deleteElement = (e) => {
        const id = e.target.id
        const wrapper = document.getElementById(`wrapper-${id}`)
        wrapper.remove()
    }

    const addProduct = async (e) => {
        e.preventDefault()
        addProductBtn.disabled = true
        const formData = new FormData()
        const information = []
        try {
            for (let i = 1; i < counter.value + 1; i++) {
                const key = document.querySelector(`#key-${i}`)
                const value = document.querySelector(`#value-${i}`)
                if(key || value) {
                    console.log(key.value, value.value)
                    if(key.value.length > 0 || value.value.length > 0) {
                        information.push({ key: key.value, value: value.value })
                    }
                }
            }
            const data = {}
            data.productTitle = productTitle.value
            data.productDesc = productDesc.value
            data.category = id
            data.brand = brand.value
            data.information = information
            if(productPrice.value.length > 0) {
                data.productPrice = productPrice.value
            }
            const response = await axios.post(`https://api.generatorhouse.uz/api/ru/add-product`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.value}`,
                },
            });
            const formData = new FormData(e.target);
            const res = await axios.put(`https://api.generatorhouse.uz/api/ru/add-img/${response.data._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            counter.value = 0
            e.target.reset();
            inputsWrapper.innerHTML = ''
            addElement()
            addProductBtn.disabled = false
            await navigateTo(`/rus/card/${id}`)
        } catch (error) {
            console.log(error)
        }
    }
</script>
