<template>
  <div class="search-page">
    <div class="search-container">
      <div class="search-buttons">
        <div class="button" :class="{ 'un-active': searchIsLibrary }" @click="setSearchType(false)">
          Apple Music
        </div>
        <div
          class="button "
          :class="{ 'un-active': !searchIsLibrary }"
          @click="isAuthorized ? setSearchType(true) : nonAuthError()"
        >
          Library
        </div>
      </div>
      <label>
        <input
          type="text"
          placeholder="Search..."
          v-model="search"
          @focusin="setSearchTyping(true)"
          @focusout="setSearchTyping(false)"
        />
      </label>
    </div>

    <div class="scrollWrapper">
      <songs-albums-playlists
        v-if="searchResults"
        :songs="{ name: 'Songs', data: getSafe(() => searchResults.songs.data) }"
        :albums="{ name: 'Albums', data: getSafe(() => searchResults.albums.data) }"
        :playlists="{ name: 'Playlists', data: getSafe(() => searchResults.playlists.data) }"
      />

      <h2
        v-if="searchResults && searchResults.artists && searchResults.artists.data"
        class="browse-page-category"
      >
        Artists
      </h2>
      <div
        class="artists"
        v-if="searchResults && searchResults.artists && searchResults.artists.data"
      >
        <artist-profile
          v-for="artist in searchResults.artists.data"
          :artist="artist"
          :key="artist.id"
        />
      </div>
      <div class="margin"></div>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/store/helpers';
import SongsAlbumsPlaylists from '@/components/SongsAlbumsPlaylists';
import { mapMutations, mapState } from 'vuex';
import getSafeMixin from '@/components/Mixins/getSafeMixin';
import ArtistProfile from '@/components/ArtistProfile';
export default {
  name: 'Search',
  components: { ArtistProfile, SongsAlbumsPlaylists },
  mixins: [getSafeMixin],
  methods: {
    ...mapMutations('music', {
      setSearch: 'setSearch',
      setSearchResults: 'setSearchResults',
      setSearchType: 'setSearchType',
      setSearchTyping: 'setSearchTyping',
    }),
    debounceSearch: debounce(async function() {
      if (!this.search) return;
      this.$swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        type: 'info',
        title: 'Searching...',
      });
      const music = this.searchIsLibrary
        ? MusicKit.getInstance().api.library
        : MusicKit.getInstance().api;
      const route = this.searchIsLibrary ? 'library-search' : 'search';
      await this.$router.push({ name: route, query: { search: this.search } }).catch(() => {});
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
      } finally {
        this.$swal.close();
      }
    }, 500),
    nonAuthError() {
      this.$swal({
        type: 'error',
        title: 'Unauthenticated...',
        text: 'You need to login in to access your library',
      });
    },
  },
  computed: {
    ...mapState('music', {
      searchText: (state) => state.search,
      searchResults: (state) => state.searchResults,
      searchIsLibrary: (state) => state.searchIsLibrary,
      isAuthorized: (state) => state.auth.isAuthorized,
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
    '$route.query.search': function() {
      this.setSearch(this.$route.query.search);
    },
  },

  mounted() {
    if (this.search) {
      const route = this.searchIsLibrary ? 'library-search' : 'search';
      this.$router.push({ name: route, query: { search: this.search } });
    }
    this.setSearchType(this.$route.name === 'library-search');
    this.setSearch(this.$route.query.search);
    this.debounceSearch();
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
.margin {
  margin-bottom: 2em;
}
.artists {
  display: flex;
  flex-wrap: wrap;
}
</style>
