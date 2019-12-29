<template>
  <div class="search-page">
    <div class="search-buttons">
      <div class="button" :class="{ 'un-active': searchIsLibrary }" @click="setSearchType(false)">
        Apple Music
      </div>
      <div class="button " :class="{ 'un-active': !searchIsLibrary }" @click="setSearchType(true)">
        Library
      </div>
    </div>
    <label>
      <input type="text" placeholder="Search..." v-model="search" @focus="() => {}" />
    </label>
    <songs-albums-playlists
      v-if="searchResults"
      :songs="{ name: 'Songs', data: getSafe(() => searchResults.songs.data) }"
      :albums="{ name: 'Albums', data: getSafe(() => searchResults.albums.data) }"
      :playlists="{ name: 'Playlists', data: getSafe(() => searchResults.playlists.data) }"
    />
  </div>
</template>

<script>
import { debounce } from '@/store/helpers';
import SongsAlbumsPlaylists from '@/components/SongsAlbumsPlaylists';
import { mapMutations, mapState } from 'vuex';
import getSafeMixin from '@/components/Mixins/getSafeMixin';
export default {
  name: 'Search',
  components: { SongsAlbumsPlaylists },
  mixins: [getSafeMixin],
  methods: {
    ...mapMutations('music', {
      setSearch: 'setSearch',
      setSearchResults: 'setSearchResults',
      setSearchType: 'setSearchType',
    }),
    debounceSearch: debounce(async function() {
      if (!this.search) return;
      const music = this.searchIsLibrary
        ? MusicKit.getInstance().api.library
        : MusicKit.getInstance().api;
      try {
        if (this.searchIsLibrary) {
          const searchResult = await music.search(this.search, {
            types: ['library-albums', 'library-songs', 'library-playlists', 'library-artists'],
            limit: 20,
          });
          this.setSearchResults({
            ...searchResult,
            songs: searchResult['library-songs'] ? searchResult['library-songs'] : [],
            albums: searchResult['library-albums'] ? searchResult['library-albums'] : [],
            playlists: searchResult['library-playlists'] ? searchResult['library-playlists'] : [],
            artists: searchResult['library-artists'] ? searchResult['library-artists'] : [],
          });
        } else {
          const searchResult = await music.search(this.search, { limit: 20 });
          this.setSearchResults(searchResult);
        }
      } catch (e) {
        this.$swal({
          type: 'error',
          title: 'An Error Occurred...',
          text: e.message,
        });
      }
    }, 500),
  },

  computed: {
    ...mapState('music', {
      searchText: (state) => state.search,
      searchResults: (state) => state.searchResults,
      searchIsLibrary: (state) => state.searchIsLibrary,
    }),
    search: {
      get() {
        return this.searchText;
      },
      set(value) {
        this.setSearch(value);
      },
    },
  },

  watch: {
    search: function() {
      this.debounceSearch();
    },
    searchIsLibrary: function() {
      if (this.searchIsLibrary) {
        this.$router.push({ name: 'library-search' });
      } else {
        this.$router.push({ name: 'search' });
      }
      this.debounceSearch();
    },
  },

  mounted() {
    this.setSearchType(this.$route.name === 'library-search');
  },
};
</script>

<style scoped>
.button {
  min-width: 100px;
  width: max-content;
  margin: 1em 10px 10px 0;
  padding: 12px;
}
</style>
