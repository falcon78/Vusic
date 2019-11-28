<template>
  <div id="main-body" class="test scrollWrapper">
    <thumbnail-and-title
      class="margin"
      v-for="i in 40"
      :key="i"
      :artist="'Artist'"
      :title="'Revenge of the thing'.substr(0, 10) + '...'"
      :artwork="'https://picsum.photos/200/200'"
    />
  </div>
</template>

<script>
import ThumbnailAndTitle from '@/components/ThumbnailAndTitle.vue';

export default {
  name: 'Test',
  components: {
    ThumbnailAndTitle,
  },
};
</script>

<style scoped lang="scss">
.margin {
  margin: 10px;
}
.test {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-content: flex-start;
}
</style>
