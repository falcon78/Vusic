<template>
  <div class="home ">
    <sidebar />
    <div class="main-view ">
      <transition>
        <router-view id="main-body" />
      </transition>
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
