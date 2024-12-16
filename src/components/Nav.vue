<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Home</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <!-- Show Login and Register if user is NOT authenticated -->
                    <li class="nav-item" v-if="!useAuth.user">
                        <router-link class="nav-link " aria-current="page" to="/login">Login</router-link>
                    </li>
                    <li class="nav-item" v-if="!useAuth.user">
                        <router-link class="nav-link" to="/register">Register</router-link>
                    </li>

                    <!-- Show Logout if user IS authenticated -->
                    <li class="nav-item" v-if="useAuth.user">
                        <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { onMounted } from 'vue';
import { authStore } from '../stores/authstore';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const useAuth = authStore();
        const router = useRouter();

        const logout = async () => {
            await useAuth.logOut();
            router.push('/login');
        };

        onMounted(async () => {
            await useAuth.getUser();  // Ensure user is loaded on mount
        });

        return { useAuth, logout };
    }
};
</script>
