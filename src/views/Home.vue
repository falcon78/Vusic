<template>
  <div class="home icon-buttons">
    <sidebar />

    <div class="main-view ">
      <router-view id="main-body" />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'home',
  components: { Sidebar },
};
</script>
