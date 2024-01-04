<template>
    <div class="mt-3">
        <div class="flex justify-between">
            <button @click="openModal" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600">Mahsulot Qo'shish</button>
            <NuxtLink to="/" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600">Asosiy Sahifa</NuxtLink>
        </div>
        <div v-show="actions.loading"><loading/></div>
        <p class="mt-24 text-3xl text-center" v-if="products?.length == 0">Bu kategoriya bo'yicha praductlar mavjud emas.</p>
        <ul class="mt-5 flex flex-wrap justify-around items-start">
            <li
                v-for="product in products"
                :key="product._id"
                :data-id="product._id"
                id="item"
                class="max-w-xs w-72 ml-4 bg-white shadow-lg rounded-lg overflow-hidden mb-5 border transition-transform transform p-3"
            >
                <img
                    class="object-contain rounded-t-lg bg-gray-400 mb-2 w-64 h-48"
                    :src="product.product_img[0]"
                    width="300"
                    height="200"
                />
                <h2 class="text-2xl truncate"><b>{{ product.product_title }}</b></h2>
                <p v-if="product.product_price > 0"><b>Narxi:</b> {{ product.product_price }} so'm</p>
                <p>{{ product.new_price > 0 ? `Chegirma: ${product.new_price} so'm` : '' }}</p>
                <p class="text-sm font-medium line-clamp-3">{{ product.product_desc }}</p>
                <form v-if="product.product_img.length < 4" id="add" @submit="addImg" class="mt-3">
                    <input
                        class="block mb-2 w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-600"
                        name="images"
                        type="file"
                        id="inputFile"
                        accept=".png"
                        required
                    />
                    <button class="btn block w-full focus:outline-none text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-blue-900">Rasm qo'shish</button>
                </form>
                <button @click="offerFormBtn(product._id)" v-show="!product.offer" v-if="product.product_price > 0" :id="'offerFormBtn_' + product._id" class="block w-full focus:outline-none text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-blue-900">Chegirma qilish</button>
                <button @click="removeOffer(product._id)" v-show="product.offer" v-if="product.product_price > 0" :id="'offerFormBtn_' + product._id" class="block w-full focus:outline-none text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-blue-900">Chegirmani Ochirish</button>
                <div :id="'offerForm_' + product._id" :data-id="product._id" class="hidden">
                    <form @submit="offerProduct" :data-id="product._id" class="offerForm">
                        <input class="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" placeholder="Chegirma narxi" :id="'inp_' + product._id" type="number"/>
                        <button class="block w-full focus:outline-none text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-blue-900">Chegirma Qilish</button>
                    </form>
                </div>
                <span :id="product._id" @click="deleteProduct" class="hover:opacity-80 block w-12 rounded absolute top-0 right-0 cursor-pointer p-3 px-3 bg-red-600" ><svg class="pointer-events-none" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 448 512"><path opacity="1" fill="white" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg></span>
                <span :id="product._id" @click="findProduct" class="hover:opacity-80 block w-12 rounded absolute top-0 right-12 cursor-pointer p-3 px-3 bg-blue-600" ><svg class="pointer-events-none" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512"><path opacity="1" fill="white" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg></span>
            </li>
        </ul>

    <div v-show="isModalOpen" class="modal">
        <div class="modal-content">
            <div class="flex justify-between">
                <h1 class="text-xl font-bold mb-4">Mahsulot Qo'shish</h1>
                <img @click="closeModal" class="cursor-pointer mb-2" src="~/public/x.svg" width="26" heigh="26">
            </div>
            <form class="w-96" id="form"  @submit="addGenerator">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="productTitle">Mahsulot nomi</label>
                <input class="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" name="productTitle" id="productTitle" required/>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="productDesc">Qo'shimcha ma'lumotlar</label>
                <input class="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" type="text" name="productDesc" id="productDesc" required/>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="productDesc">Kategoryalar</label>
                <select class="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-white focus:shadow-outline focus:border-blue-600" name="category" id="category" required>
                    <option selected disabled>Kategoriyani Tanlang</option>
                    <option class="bg-white block p-5" v-for="category in categories" :key="category._id" :value="category._id">{{ category.category_name }}</option>
                </select>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="productDesc">Brand</label>
                <select class="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-white focus:shadow-outline focus:border-blue-600" name="category" id="brand" required>
                    <option selected disabled>Brandni Tanlang</option>
                    <option class="bg-white block p-5" v-for="brand in brands" :key="brand._id" :value="brand._id">{{ brand.brand_name }}</option>
                </select>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="productDesc">Product Narxi</label>
                <input class="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" id="productPrice" type="number" name="productPrice"/>
                <input class="block mb-2 w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-600 file:text-white
                    hover:file:bg-violet-100"
                    type="file"
                    required
                    name="images"
                    id="productImg"
                    accept=".png"
                    multiple
                />
                <div class="flex justify-between items-center mb-2" @click="addElement('add')">
                    <p class="block w-10 z-10 m-0 cursor-pointer">Qo'shimcha</p>
                    <span><svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path opacity="1" fill="#1E3050" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></span>
                </div>
                <div id="inputsWrapper">
                </div>
                <button class="bg-blue-600 w-full text-white py-2 px-4 rounded-md hover:bg-blue-600">Qo'shish</button>
            </form>
        </div>
    </div>

    <div v-show="isEditModalOpen" class="modal">
        <div class="modal-content">
            <div class="flex justify-between">
                <h1 class="text-xl font-bold mb-4">Edit Product</h1>
                <img @click="closeEditModal" class="cursor-pointer mb-2" src="~/public/x.svg" width="26" heigh="26">
            </div>
            <form class="w-96" id="form" @submit="updateProduct">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="productTitle">Product Title</label>
                <input class="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" name="productTitle" id="editProductTitle" required/>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="productDesc">Product Description</label>
                <input class="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" name="productDesc" id="editProductDesc" required/>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="productDesc">Select Category</label>
                <select class="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-white focus:shadow-outline focus:border-blue-600" name="category" id="editCategory">
                    <option selected disabled>Kategoriyani Tanlang</option>
                    <option class="bg-white block p-5" v-for="category in categories" :key="category._id" :value="category._id">{{ category.category_name }}</option>
                </select>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="productDesc">Select Brand</label>
                <select class="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-white focus:shadow-outline focus:border-blue-600" name="category" id="editBrand">
                    <option selected disabled>Brandni Tanlang</option>
                    <option class="bg-white block p-5" v-for="brand in brands" :key="brand._id" :value="brand._id">{{ brand.brand_name }}</option>
                </select>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="productDesc">Product Price</label>
                <input class="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" id="editProductPrice" type="number" name="productPrice"/>
                <h2 class="block text-gray-700 text-sm font-bold mb-2">Images</h2>
                <div v-for="img in findImages">
                    <span class="flex justify-between border-b-2 p-2">
                        <a :href="img" target="_blank">{{ getImgName(img) }}</a>
                        <p @click="removeImage" :id="img" class="text-red-600 cursor-pointer">O'chirish</p>
                    </span>
                </div>
                <div id="inputsWrapperEdit" class="mt-2">
                    <div class="flex justify-between items-center mb-2" @click="addElement('edit')">
                        <p class="block w-10 z-10 m-0 cursor-pointer">Qo'shimcha</p>
                        <span><svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path opacity="1" fill="#1E3050" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></span>
                    </div>
                </div>
                <button class="bg-blue-600 w-full text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
            </form>
        </div>
    </div>
    </div>
</template>

<script setup>
    import axios from 'axios'
    import Modal from "~/components/Modal.vue";

    const token = ref('')

    onMounted(async() => {
        token.value = await JSON.parse(localStorage.getItem('token'))
        if(!token) {
            await navigateTo('/auth');
        }
    })

    const { id } = useRoute().params;

    const counter = ref(0);

    const getImgName = (url) => {
        const firstDotIndex = url.indexOf('.');
        const result = url.substring(firstDotIndex + 1);
        return result

    }

    const addElement = (param) => {
        counter.value += 1
        const key = document.createElement('input')
        key.classList.add('w-1/2', 'shadow', 'mb-2', 'appearance-none', 'border-2', 'rounded', 'py-2', 'px-3', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:shadow-outline', 'focus:border-blue-600')
        key.placeholder = 'Key'
        key.id = `key-${counter.value}`
        key.required = true
        const value = document.createElement('input')
        value.classList.add('w-1/2', 'shadow', 'mb-2', 'appearance-none', 'border-2', 'rounded', 'py-2', 'px-3', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:shadow-outline', 'focus:border-blue-600')
        value.placeholder = 'Value'
        value.id = `value-${counter.value}`
        value.required = true
        if(param == 'add') {
            inputsWrapper.appendChild(key)
            inputsWrapper.appendChild(value)
        } else if( param == 'edit') {
            inputsWrapperEdit.appendChild(key)
            inputsWrapperEdit.appendChild(value)
        }
    }

    const isModalOpen = ref(false);
    const openModal = () => {
        isModalOpen.value = true;
    };
    const closeModal = () => {
        isModalOpen.value = false;
    };

    const isEditModalOpen = ref(false);
    const openEditModal = () => {
        isEditModalOpen.value = true;
    };
    const closeEditModal = () => {
        isEditModalOpen.value = false;
    };

    const products = ref()
    const categories = ref([])

    const getCategories = async () => {
        const response = await axios.get('https://api.generatorhouse.uz/api/categories');
        categories.value = response.data;
    }
    getCategories()

    const actions = ref({
        loading: false,
        error: false
    })
    async function getData() {
        try {
            actions.value.loading = true
            const response = await axios.get(`https://api.generatorhouse.uz/api/category/${id}`);
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

    const addGenerator = async (e) => {
        e.preventDefault();
        actions.value.loading = true;
        const information = []

        try {
            for (let i = 1; i < counter.value + 1; i++) {
                const key = document.querySelector(`#key-${i}`).value
                const value = document.querySelector(`#value-${i}`).value
                information.push({key: key, value: value})
            }
            const data = {}
            data.productTitle = productTitle.value
            data.productDesc = productDesc.value
            data.category = category.value
            data.brand = brand.value
            data.information = information
            if(productPrice.value.length > 0) {
                data.productPrice = productPrice.value
            }
            const response = await axios.post(`https://api.generatorhouse.uz/api/add-product`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.value}`,
                },
            });
            const formData = new FormData(e.target);
            const res = await axios.put(`https://api.generatorhouse.uz/api/add-img/${response.data._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            counter.value = 0
            e.target.reset();
            inputsWrapper.innerHTML = ''
            getData()

            closeModal();
        } catch (error) {
            console.error(error);
        }
    };

    const addImg = async (event) => {
        event.preventDefault();
        actions.value.loading = true;
        const form = event.target.closest('form');
        const formData = new FormData(form);
        const listItem = event.target.closest('#item');
        const dataId = listItem.getAttribute('data-id');
        try {
            const response = await axios.put(`https://api.generatorhouse.uz/api/add-img/${dataId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            window.location.reload()
            getData();
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    const deleteProduct = async (e) => {
        actions.value.loading = true;
        await axios.delete(`https://api.generatorhouse.uz/api/delete/${e.target.id}`,  {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        })
        getData()
    };

    const updateProductId = ref(null)

    const findImages = ref([])
    const findProduct = async (e) => {
        updateProductId.value = e.target.id
        openEditModal()
        const id = e.target.closest('#item').getAttribute('data-id')
        const product = await axios.get(`https://api.generatorhouse.uz/api/product/${id}`, {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        })
        editProductTitle.value = product.data.product_title;
        editProductDesc.value = product.data.product_desc;
        editCategory.value = product.data.category._id;
        editBrand.value = product.data.brand._id;
        editProductPrice.value = product.data.product_price;
        counter.value = product.data.information.length
        for(let i = 0; i < product.data.information.length; i++) {
            const key = document.createElement('input')
            key.classList.add('w-1/2', 'shadow', 'mb-2', 'appearance-none', 'border-2', 'rounded', 'py-2', 'px-3', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:shadow-outline', 'focus:border-blue-600')
            key.placeholder = 'Key'
            key.id = `key-${i + 1}`
            key.value = product.data.information[i].key
            key.required = true
            const value = document.createElement('input')
            value.classList.add('w-1/2', 'shadow', 'mb-2', 'appearance-none', 'border-2', 'rounded', 'py-2', 'px-3', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:shadow-outline', 'focus:border-blue-600')
            value.placeholder = 'Value'
            value.id = `value-${i + 1}`
            value.value = product.data.information[i].value
            key.required = true
            inputsWrapperEdit.appendChild(key)
            inputsWrapperEdit.appendChild(value)
        }
        findImages.value = product.data.product_img
    }

    const removeImage = (event) => {
        if(findImages.value.length > 2) {
            findImages.value = findImages.value.filter(e => e !== event.target.id)
        }
    }

    const updateProduct = async (e) => {
        e.preventDefault()
        actions.value.loading = true;
        try {
            const information = []
            for (let i = 1; i < counter.value + 1; i++) {
                const key = document.querySelector(`#key-${i}`).value
                const value = document.querySelector(`#value-${i}`).value
                information.push({key: key, value: value})
            }
            const data = {}
            data.productTitle = editProductTitle.value
            data.productDesc = editProductDesc.value
            data.category = editCategory.value
            data.brand = editBrand.value
            data.productImg = findImages.value
            data.information = information
            if(editProductPrice.value.length > 0) {
                data.productPrice = editProductPrice.value
            }
            const response = await axios.put(`https://api.generatorhouse.uz/api/update-product/${updateProductId.value}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.value}`,
                },
            })
            closeEditModal()
            getData()
        } catch (err) {
            console.log("Error" ,err)
        }
    }

    const offerFormBtn = async (id) => {
        document.querySelector(`#offerForm_${id}`).classList.remove('hidden')
        document.querySelector(`#offerFormBtn_${id}`).classList.add('hidden')
    }

    const offerProduct = async (e) => {
        e.preventDefault()
        actions.value.loading = true;
        const id = e.target.getAttribute('data-id')
        const newPrice = document.querySelector(`#inp_${id}`).value
        const res = await axios.put(`https://api.generatorhouse.uz/api/offer/${id}`, {
            newPrice: newPrice
        },
        {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token.value}`,
            }
        }
        )
        document.querySelector(`#offerForm_${id}`).classList.add('hidden')
        document.querySelector(`#offerFormBtn_${id}`).classList.remove('hidden')
        getData()
    }

    const removeOffer = async (id) => {
        actions.value.loading = true;
        const res = await axios.put(`https://api.generatorhouse.uz/api/delete-offer/${id}`, [],
        {
            headers: {
                Authorization: `Bearer ${token.value}`,
            }
        }
        )
        console.log(res);
        getData()
    }

</script>

<style>
    @import 'card.css'
</style>