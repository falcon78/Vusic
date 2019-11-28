<template>
  <div class="columns is-vcentered is-mobile home">
    <side-bar class="column" />

    <div class="column main-view scrollWrapper">
      <div id="player">
        <p>player</p>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';

export default {
  name: 'home',
  components: { SideBar },
};
</script>

<style lang="scss" scoped>
.home,
html {
  height: 100vh;
}
</style>
