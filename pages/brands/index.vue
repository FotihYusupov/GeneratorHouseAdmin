<template>
    <div class="flex justify-between items-center mt-5 mb-5">
        <button @click="openAddModal()" class="bg-blue-600 text-white py-4 px-6 rounded-md hover:bg-blue-600">Brand Qo'shish</button>
        <NuxtLink to="/" class="bg-blue-600 text-white py-4 px-6 rounded-md hover:bg-blue-700">Home</NuxtLink>
    </div>
    <div class="mt-2">
        <ul class="flex flex-wrap justify-between">
            <li v-for="brand in brands" :key="brand._id" class="max-w-xs bg-blue-600 shadow-lg rounded-lg overflow-hidden mb-4 p-4 border transition-transform transform hover:scale-105 w-96">
                <p class="text-white font-bold text-2xl w-full">{{ brand.brand_name }}</p>
                <span :id="brand._id" @click="e => deleteBrand(e.target.id)" class="hover:opacity-80 block w-12 rounded absolute top-2 right-2 cursor-pointer p-3 px-3" ><svg class="pointer-events-none" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 448 512"><path opacity="1" fill="white" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg></span>
                <span :id="brand._id" @click="e => openEditModal(e.target.id)" class="hover:opacity-80 block w-12 rounded absolute top-2 right-12 cursor-pointer p-3 px-3 bg-blue-600" ><svg class="pointer-events-none" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512"><path opacity="1" fill="white" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg></span>
            </li>
        </ul>
    </div>

    <Modal :showModal="isAddModalOpen" @close="closeAddModal">
        <h2 class="text-2xl">Add Brand</h2>
        <form @submit="addBrand" class="w-96 mt-5">
            <input class="shadow mb-2 appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" id="brandName" placeholder="Brand Title"/>
            <button class="bg-blue-600 w-full text-white py-3 px-5 rounded-md hover:bg-blue-600">Submit</button>
        </form>
    </Modal>
    
    <Modal :showModal="isEditModalOpen" @close="closeEditModal">
        <h2 class="text-2xl">Edit Brand</h2>
        <form @submit="editBrand" class="w-96 mt-5">
            <input class="shadow mb-2 appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" id="editBrandName" placeholder="Brand Title"/>
            <button class="bg-blue-600 w-full text-white py-3 px-5 rounded-md hover:bg-blue-600">Submit</button>
        </form>
    </Modal>
</template>

<script setup>
    import axios from "axios";
    const brands = ref([]);
    const getData = async () => {
        const res = await axios.get('https://api.generatorhouse.uz/api/brands')
        brands.value = res.data;
    };
    getData();

    const isAddModalOpen = ref(false);
    const openAddModal = () => {
        isAddModalOpen.value = true;
    };

    const closeAddModal = () => {
        isAddModalOpen.value = false;
    };

    const findBrandId = ref(null)
    const isEditModalOpen = ref(false);
    const openEditModal = (id) => {
        findBrandId.value = id
        isEditModalOpen.value = true;
    };

    const closeEditModal = () => {
        isEditModalOpen.value = false;
    };

    const deleteBrand = async (id) => {
        try {
            const res = await axios.delete(`https://api.generatorhouse.uz/api/delete-brand/${id}`)
            if(res.status === 200) {
                getData()
            }
        } catch(err) {
            return res.json('Error: ', err)
        }
    }

    const addBrand = async (e) => {
        e.preventDefault();
        try {
            const data = {}
            data.brandName = brandName.value
            console.log(data)
            const res = await axios.post('https://api.generatorhouse.uz/api/add-brand', data, {
                header: {
                    'Content-type': 'application/json'
                }
            })
            if(res.status === 200) {
                getData()
                closeAddModal()
            }
        } catch (err) {
            console.log(err)
        }
    }

    const editBrand = async (e) => {
        e.preventDefault();
        try {
            const data = {}
            data.brandName = editBrandName.value
            console.log(data)
            const res = await axios.put(`https://api.generatorhouse.uz/api/update-brand/${findBrandId.value}`, data, {
                header: {
                    'Content-type': 'application/json'
                }
            })
            if(res.status === 200) {
                getData()
                closeEditModal()
            }
        } catch (err) {
            console.log(err)
        }
    }
</script>
