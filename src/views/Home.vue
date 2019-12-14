<template>
  <div class="home ">
    <sidebar />
    <div class="main-view ">
      <transition>
        <keep-alive>
          <router-view id="main-body"></router-view>
        </keep-alive>
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
