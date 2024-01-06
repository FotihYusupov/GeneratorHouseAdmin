<template>
    <div v-if="findProduct">
        <div class="flex flex-wrap justify-between mt-5">
            <NuxtLink :to="'/card/' + findProduct.category._id" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600">Asosiy Sahifa</NuxtLink>
            <h1 class="text-4xl font-bold">Mahsulotni O'zgartirish</h1>
            <span></span>
        </div>
        <h2 class="text-2xl mt-16 mb-2"><b>{{ findProduct.product_title }}</b> mahsulotini o'zgartirish.</h2>
        <hr class="mb-8"/>
        <div>
            <form @submit="updateProduct">
                <div class="flex flex-wrap justify-between">
                    <div class="w-80">
                        <label class="block text-gray-700 text-lg w-full font-bold mb-2" for="productTitle">Mahsulot nomi</label>
                        <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" id="productTitle" :value="findProduct.product_title" placeholder="Mahsulot nomi" required>
                        <label class="block text-gray-700 text-lg w-full font-bold mb-2" for="productPrice">Mahsulot Narxi (Majburiy emas)</label>
                        <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" id="productPrice"  :value="findProduct.product_price" placeholder="Mahsulot Narxi">
                        <div v-if="!findProduct.offer">
                            <p v-if="!openSale" @click="openSale = !openSale" class="m-0 mt-2 text-center ml-48 mb-1 p-1 rounded bg-blue-600 text-white w-18 cursor-pointer">Chegirma qilish</p>
                            <form @submit="addOffer" v-if="openSale" class="w-full mt-3 mb-2">
                                <label class="block text-gray-700 text-base w-full font-bold mb-2" for="sale">Mahsulotning chegirma narxini yozing.</label>
                                <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" id="sale" placeholder="Mahsulotning chegirma narxi" required>
                                <button class="w-full bg-blue-600 max-w-full text-white py-2 px-4 rounded-md hover:bg-blue-600">Chegirma qilish</button>
                            </form>
                        </div>
                        <div v-else>
                            <button @click="deleteOffer" class="m-0 mt-2 text-center ml-36 mb-1 p-1 rounded bg-blue-600 text-white w-44 cursor-pointer">Chegirmani o'chirish</button>
                        </div>
                        <label class="block text-gray-700 text-lg w-full font-bold mb-2" for="productPrice">Brandni Tanlang</label>
                        <select class="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-white focus:shadow-outline focus:border-blue-600" name="category" :value="findProduct.brand._id" id="brand" required>
                            <option selected disabled>Brandni Tanlang</option>
                            <option class="bg-white block p-5" v-for="brand in brands" :key="brand._id" :value="brand._id">{{ brand.brand_name }}</option>
                        </select>
                        <label class="block text-gray-700 text-base w-full font-bold mb-2" for="productDesc">Mahsulot haqida ma'lumot (Majburiy emas)</label>
                        <textarea class="shadow resize-none appearance-none h-40 border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" id="productDesc" :value="findProduct.product_desc" placeholder="Mahsulot haqida ma'lumot"></textarea>
                    </div>
                    <div class="w-80">
                        <label class="block text-gray-700 text-lg w-full font-bold m-0" for="productImage">Mahsulot rasmi</label>
                        <p class="block text-gray-700 text-sm w-full font-bold m-0 mb-2">Eng kamida 2 ta rasm yuklash shart!</p>
                        <span v-for="img, index in findProduct.product_img" class="w-full flex justify-between items-center mb-2">
                            <a :href="img" target="_blank">{{ getFileNameFromUrl(img) }}</a>
                            <img @click="deleteImg" :id="index" src="/trash-can-solid.svg" alt="" class="w-5 h-5 cursor-pointer">
                        </span>
                        <input v-if="!findProduct.product_img[0]" class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 mb-2 disabled:opacity-50 disabled:pointer-events-none file:border-0 file:bg-blue-100 file:me-4 file:py-2 file:px-4"
                            name="images"
                            id="productImage"
                            type="file"
                            accept=".png"
                            placeholder="Mahsulot rasmi"
                            required
                        >
                        <input v-if="!findProduct.product_img[1]" class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 mb-2 disabled:opacity-50 disabled:pointer-events-none file:border-0 file:bg-blue-100 file:me-4 file:py-2 file:px-4"
                            name="images"
                            type="file"
                            accept=".png"
                            placeholder="Mahsulot rasmi"
                            required
                        >
                        <input v-if="!findProduct.product_img[2]" class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 mb-2 disabled:opacity-50 disabled:pointer-events-none file:border-0 file:bg-blue-100 file:me-4 file:py-2 file:px-4"
                            name="images"
                            type="file"
                            accept=".png"
                            placeholder="Mahsulot rasmi"
                        >
                        <input v-if="!findProduct.product_img[3]" class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 mb-2 disabled:opacity-50 disabled:pointer-events-none file:border-0 file:bg-blue-100 file:me-4 file:py-2 file:px-4"
                            name="images"
                            type="file"
                            accept=".png"
                            placeholder="Mahsulot rasmi"
                        >
                    </div>
                    <div class="w-80">
                        <div @click="addElement" class="w-full flex justify-between items-center mt-1 mb-1">
                            <h3 class="text-gray-700 text-lg w-full font-bold">Qoshimcha</h3>
                            <span><svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path opacity="1" fill="#1E3050" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></span>
                        </div>
                        <div id="inputsWrapper">
                            <span v-for="product, index in findProduct.information" class="w-full flex justify-between items-center" id="wrapper-1">
                                <input class="w-36 shadow mb-2 appearance-none border-2 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" :value="product.key" :id="'key-' + (index + 1)" placeholder="Ta`rifi"/>
                                <input class="w-36 shadow mb-2 appearance-none border-2 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" :value="product.value" :id="'value-' + (index + 1)" placeholder="Qiymati"/>
                                <img @click="deleteElement" class="cursor-pointer" id="1" src="/trash-can-solid.svg">
                            </span>
                        </div>
                    </div>
                </div>
                <button class="float-right bg-blue-600 max-w-full w-56 text-white py-2 px-4 rounded-md hover:bg-blue-600">O'zgartirish</button>
            </form>
        </div>
    </div>

</template>

<script setup>
    import axios from 'axios'

    const { id } = useRoute().params;
    const token = ref(null)
    const counter = ref(0)
    const findProduct = ref(null)

    const addElement = () => {
        counter.value += 1
        const wrapper = document.createElement('span')
        wrapper.classList.add('w-full', 'flex', 'justify-between', 'items-center')
        wrapper.id = `wrapper-${counter.value}`

        const key = document.createElement('input')
        key.classList.add('w-36', 'shadow', 'mb-2', 'appearance-none', 'border-2', 'rounded', 'py-2', 'px-3', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:shadow-outline', 'focus:border-blue-600')
        key.placeholder = 'Ta`rifi'
        key.id = `key-${counter.value}`
        
        const value = document.createElement('input')
        value.classList.add('w-36', 'shadow', 'mb-2', 'appearance-none', 'border-2', 'rounded', 'py-2', 'px-3', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:shadow-outline', 'focus:border-blue-600')
        value.placeholder = 'Qiymati'
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

    const deleteElement = (e) => {
        const id = e.target.id
        const wrapper = document.getElementById(`wrapper-${id}`)
        wrapper.remove()
    }

    function getFileNameFromUrl(url) {
        var index = url.lastIndexOf(":") + 1;
        var filename = url.substr(index);
        return filename;
    }

    onMounted(async() => {
        token.value = await JSON.parse(localStorage.getItem('token'))
        if(!token) {
            await navigateTo('/auth');
        }
        const res = await axios.get(`https://api.generatorhouse.uz/api/product/${id}`)
        findProduct.value = res.data
        counter.value = findProduct.value.information.length
    })

    const deleteImg = (e) => {
        const index = e.target.id
        const img = findProduct.value.product_img[index]
        findProduct.value.product_img = findProduct.value.product_img.filter(element => element !== img)
    }

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

    const updateProduct = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        const information = []
        try {
            for (let i = 1; i < counter.value + 1; i++) {
                const key = document.querySelector(`#key-${i}`)
                const value = document.querySelector(`#value-${i}`)
                if(key || value) {
                    if(key.value.length > 0 || value.value.length > 0) {
                        information.push({ key: key.value, value: value.value })
                    }
                }
            }
            const data = {}
            data.productTitle = productTitle.value
            data.productDesc = productDesc.value
            data.category = findProduct.value.category._id
            data.productImg = findProduct.value.product_img
            data.brand = brand.value
            data.information = information
            if(productPrice.value.length > 0) {
                data.productPrice = productPrice.value
            }
            const response = await axios.put(`https://api.generatorhouse.uz/api/update-product/${id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.value}`,
                },
            });
            const formData = new FormData(e.target);
            const res = await axios.put(`https://api.generatorhouse.uz/api/add-img/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            counter.value = 0
            e.target.reset();
            inputsWrapper.innerHTML = ''
            addElement()
            await navigateTo(`/card/${findProduct.value.category._id}`)
        } catch (err) {
            console.log(err)
        }
    }

    const openSale = ref(false)
    const addOffer = async (e) => {
        e.preventDefault();
        const data = {}
        data.newPrice = sale.value
        const res = await axios.put(`https://api.generatorhouse.uz/api/offer/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.value}`,
            },
        }) 
        openSale.value = !openSale.value
        await navigateTo(`/card/${findProduct.value.category._id}`)
    }
    const data = {}
    const deleteOffer = async () => {
        const res = await axios.put(`https://api.generatorhouse.uz/api/delete-offer/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.value}`,
            }
        })
        openSale.value = !openSale.value
        await navigateTo(`/card/${findProduct.value.category._id}`)
    }

</script>