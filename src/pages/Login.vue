<template>
    <section class="vh-100">
        <div class="container-fluid h-custom">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        class="img-fluid" alt="Sample image">
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form @submit.prevent="submitLogin">
                        <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                            <p class="lead fw-normal mb-0 me-3">Login</p>
                        </div>
                        <div class="divider d-flex align-items-center my-4"></div>
                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="email" id="form3Example3" class="form-control form-control-lg"
                                placeholder="Enter a valid email address" v-model="form.email" />
                            <label class="form-label" for="form3Example3">Email address</label>
                        </div>
                        <div data-mdb-input-init class="form-outline mb-3">
                            <input type="password" id="form3Example4" class="form-control form-control-lg"
                                placeholder="Enter password" v-model="form.password" />
                            <label class="form-label" for="form3Example4">Password</label>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="form-check mb-0">
                                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                <label class="form-check-label" for="form2Example3">Remember me</label>
                            </div>
                      
                        </div>
                        <div class="text-center text-lg-start mt-4 pt-2">
                            <button type="submit" data-mdb-button-init data-mdb-ripple-init
                                class="btn btn-primary btn-lg"
                                style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
                         
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div
            class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
            <div class="text-white mb-3 mb-md-0">Copyright © 2020. All rights reserved.</div>
            <div>
                <a href="#!" class="text-white me-4"><i class="fab fa-facebook-f"></i></a>
                <a href="#!" class="text-white me-4"><i class="fab fa-twitter"></i></a>
                <a href="#!" class="text-white me-4"><i class="fab fa-google"></i></a>
                <a href="#!" class="text-white"><i class="fab fa-linkedin-in"></i></a>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

import { authStore } from '../stores/authstore';

const router = useRouter();
const useAuth= authStore();

const form = ref({
    email: '',
    password: ''
});


const submitLogin = async () => {
    await useAuth.getToken();
    try {
        // Mengirimkan kredensial login
        const response = await axios.post('/api/auth/login', {
            email: form.value.email,
            password: form.value.password
        });

        // Menyimpan token akses
        localStorage.setItem('access_token', response.data.access_token);

        // Redirect ke halaman home setelah login berhasil
        router.push('/');
    } catch (error) {
        console.error('Login error:', error);
        // Tangani kesalahan di sini
    }
};

</script>
<style>
.divider:after,
.divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
}

.h-custom {
    height: calc(100% - 73px);
}

@media (max-width: 450px) {
    .h-custom {
        height: 100%;
    }
}
</style>
