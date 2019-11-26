<template>
  <div class="columns is-vcentered is-mobile home">
    <side-bar class="column" />

    <div class="column main-view">
      <div id="player">
        <p>player</p>
      </div>
      <div id="main-body" class="test scrollbar">
        <div class="cl" v-for="i in 50" :key="i">
          <p>Artist</p>
        </div>
      </div>
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
.test {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  img {
    width: 120px;
    height: 120px;
    border-radius: 8px;
  }
  .cl {
    transition: transform 0.2s;
    transition-timing-function: cubic-bezier(0, 0, 0.58, 1);
    border-radius: 4px;
    box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.2);
  }
  .cl:hover {
    transform: scale(1.05);
    box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.2);
  }

  .cl {
    p {
      margin-top: 4px;
      margin-bottom: 0;
      padding: 0;
    }
    margin: 10px;
    border-radius: 1em;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    width: 140px;
    height: 170px;
  }
}
</style>
