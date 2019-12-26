<template>
  <div
    @click="$router.push({ name: 'library-artist-items', params: { id: artist.id } })"
    class="artist-name"
    :class="$route.params.id === artist.id && 'active-artist'"
  >
    <p :title="artist.attributes.name">
      {{ artist.attributes.name }}
    </p>
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
