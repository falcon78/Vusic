<template>
  <div class="sidebar scrollWrapper">
    <div v-for="(category, index) in categories" :key="index">
      <h2 class="sidebar__category">{{ category.category }}</h2>
      <ul class="sidebar__ul">
        <li
          v-for="(label, index) in category.labels"
          :key="index"
          class="sidebar__li"
          :class="{
            sidebar__li__isActive:
              category.routeName === active.category && label.routeName === active.label,
          }"
        >
          <router-link :to="label.routeName">{{ label.name }}</router-link>
        </li>
      </ul>
    </div>
    <div>
      <h2 class="sidebar__category">Playlist</h2>
      <ul class="sidebar__ul">
        <li
          v-for="(label, index) in playlists"
          :key="index"
          class="sidebar__li"
          :class="{
            sidebar__li__isActive: 'Playlist' === active.category && label === active.label,
          }"
        >
          <router-link to="/">{{ label }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import routerConstants from '../router/routerConstants';

export default {
  name: 'sidebar',
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
};
</script>
