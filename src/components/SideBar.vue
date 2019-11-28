<template>
  <aside class="menu side-bar scrollbar">
    <template v-for="(category, index) in categories">
      <p class="menu-label" :key="index">{{ category.category }}</p>
      <ul class="menu-list" :key="index">
        <li>
          <ul>
            <li v-for="(label, index) in category.labels" :key="index">
              <a
                href="#"
                :class="{
                  'is-active': category.category === active.category && label === active.label,
                }"
                >{{ label }}</a
              >
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </aside>
</template>

<script>
export default {
  name: 'side-bar',
  data() {
    return {
      active: {
        category: 'apple music',
        label: 'Members',
      },
      categories: [
        {
          category: 'apple music',
          labels: ['For You', 'Browse'],
        },
        {
          category: 'library',
          labels: ['Recently Added', 'Artists', 'Albums', 'Songs', 'Playlists'],
        },
        {
          category: 'playlist',
          labels: ['Members', 'Plugins', 'Add a member'],
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@import '../assets/sideBar';
</style>
