<template>
  <div class="home ">
    <sidebar />
    <div class="main-view ">
      <keep-alive>
        <router-view id="main-body" />
      </keep-alive>
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
