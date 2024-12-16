<template>
  <div class="container">
    <div class="col-md-10 shadow p-3 mt-2">
      <h1>Data Task</h1>

      <!-- Form untuk membuat task baru -->
      <form @submit.prevent="submitcreate">
        <div class="form-group">
          <label for="title">Title</label>
          <input v-model="form.title" type="text" class="form-control" id="title" placeholder="Enter task title" required />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea v-model="form.description" class="form-control" id="description" placeholder="Enter task description" required></textarea>
        </div>

        <div class="form-group">
          <label for="user_id">Select User</label>
          <select v-model="form.user_id" class="form-control" id="user_id" required>
            <option value="" disabled>Select a user</option>
            <option value="1">User 1</option>
            <option value="2">User 2</option>
            <option value="3">User 3</option>
          </select>
        </div>

        <button type="submit" class="btn btn-success mt-3">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();  // Mendapatkan instance router
    const form = ref({
      title: '',
      description: '',
      user_id: '',
    });

    // Fungsi untuk menangani pengiriman form
    const submitcreate = async () => {
      try {
        // Kirim data form ke API (sesuaikan URL dengan API Anda)
        const response = await axios.post('/api/tasks', form.value, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Sertakan token otentikasi
          },
        });
        console.log('Task created successfully:', response.data);
        
        // Reset form setelah berhasil
        form.value = { title: '', description: '', user_id: '' };
        
        // Pindahkan ke halaman utama setelah sukses
        router.push('/');  // Navigasi ke route home ("/")

      } catch (error) {
        console.error('Error creating task:', error);
      }
    };

    return {
      form,
      submitcreate,
    };
  },
};
</script>
