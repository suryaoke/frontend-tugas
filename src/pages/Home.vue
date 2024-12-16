<template>
  <div v-if="useAuth.user">
     <h3 class="">Selamat datang, {{ useAuth.user.name }}!</h3>
  </div>
  <div v-else>
    <p>No Data</p>
  </div>

  <div class="container">
    <div class="col-md-10 shadow p-3 mt-2">
      <h1>Data Task</h1>

      <a href="">
        <button class="btn btn-primary" type="button">Create</button>
      </a>

      <table class="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Description</th>
            <th>user</th>
            <th>Tanggal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in tasks" :key="task.id">
            <td>{{ index + 1 }}</td>
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
            <td>{{ task.user.name }}</td>
              <td>{{ task.created_at }}</td>
            <td>
              <button   v-if="useAuth.user?.role === 'admin'"  class="btn btn-danger m-2" @click="deleteTask(task.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { authStore } from '../stores/authstore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const useAuth = authStore();  // Mendapatkan store setelah Pinia diinisialisasi
    const router = useRouter();   // Mendapatkan router untuk melakukan navigasi
    const tasks = ref([]);        // Menyimpan data task yang diambil dari API

    // Fungsi untuk mengambil data task dari API
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}` // Menambahkan token ke header
          }
        });
        tasks.value = response.data.data; // Update this line to extract only the 'data' array
      } catch (error) {
        console.error('Error fetching tasks:', error);
        if (error.response && error.response.status === 403) {
          console.log("User is not authorized");
        }
      }
    };

    // Fungsi untuk menghapus task
    const deleteTask = async (taskId) => {
      try {
        await axios.delete(`/api/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        tasks.value = tasks.value.filter(task => task.id !== taskId); // Menghapus task dari tampilan setelah dihapus
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };

    // Memastikan data user dimuat dan mengarahkan ke halaman login jika belum login
    onMounted(async () => {
      await useAuth.getUser();  // Memastikan data user dimuat setelah komponen dimuat
      if (!useAuth.user) {      // Jika user belum login, arahkan ke halaman login
        router.push('/login');
      } else {
        fetchTasks();  // Mengambil data task hanya setelah user berhasil login
      }
    });

    return { useAuth, tasks, deleteTask };
  }
};
</script>
