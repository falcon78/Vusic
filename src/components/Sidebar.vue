<template>
  <div class="sidebar scrollWrapper">
    <nav>
      <div class="padding-div" v-for="(category, index) in categories" :key="index">
        <h2 class="sidebar__category svg-container">
          <MusicIcon v-if="category.icon === 'music'" size="1.5" class="svg" />
          <DiscIcon v-else size="1.5" class="svg" />
          {{ category.category }}
        </h2>
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
    </nav>
    <div class="player">
      <p>
        player
      </p>
    </div>
  </div>
</template>

<script>
import { MusicIcon, DiscIcon } from 'vue-feather-icons';
import routerConstants from '../router/routerConstants';

export default {
  name: 'sidebar',
  components: {
    MusicIcon,
    DiscIcon,
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
};
</script>
