<template>
  <div class="artist-name">
    <p :title="artist.attributes.name">{{ artist.attributes.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'artist-profile',
  props: {
    artist: Object,
  },
};
</script>
