<template>
  <div class="home ">
    <sidebar />
    <div class="main-view ">
      <router-view id="main-body" />
    </div>
    <div class="test">Test content</div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'home',
  components: { Sidebar },
};
</script>

<style lang="scss">
.test {
  width: 350px;
  height: 100vh;
  flex-shrink: 0;
}
</style>
