<template>
  <div class="sidebar">
    <nav class="scrollWrapper">
      <div class="padding-div" v-for="(category, index) in categories" :key="index">
        <h2 class="sidebar__category svg-container">
          <font-awesome-icon
            class="icon"
            v-if="category.icon === 'music'"
            icon="apple-alt"
            size="1x"
          />
          <font-awesome-icon class="icon" v-else icon="headphones" size="1x" />
          {{ category.category }}
        </h2>
        <ul class="sidebar__ul">
          <li
            v-for="(label, index) in category.labels"
            :key="index"
            class="sidebar__li"
            :class="{
              sidebar__li__isActive: isActive(label.routeName),
            }"
          >
            <div @click="routeTo(label.routeName)">{{ label.name }}</div>
          </li>
        </ul>
      </div>
    </nav>
    <div class="player">
      <MusicPlayer />
    </div>
  </div>
</template>

<script>
import routerConstants from '../router/routerConstants';
import MusicPlayer from '@/components/Player/MusicPlayer.vue';

export default {
  name: 'sidebar',
  components: {
    MusicPlayer,
  },
  data() {
    return {
      active: {
        name: 'apple',
        category: 'apple',
        label: 'for-you',
      },
      categories: routerConstants,
      playlists: ['BeatsTrumental', 'Hiphops', 'New Releases'],
    };
  },
  methods: {
    routeTo(name) {
      if (this.$route.name === name) return;
      this.$router.push({ name });
    },
    isActive(name) {
      return this.$route.name === name;
    },
  },
};
</script>
