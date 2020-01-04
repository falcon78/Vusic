<template>
  <div class="album-playlist-items scrollWrapper">
    <full-page-loader v-if="!item" />
    <songs-list v-if="item" :item="item" />
  </div>
</template>

<script>
import SongsList from '@/components/SongsList';
import FullPageLoader from '@/components/FullPageLoader';
import getSafeMixin from './Mixins/getSafeMixin';
import musicMixin from '@/components/Mixins/musicMixin';
import { getAppleMusicConfig } from '../../apiKeys';
import swalMixin from './Mixins/swalMixin';

export default {
  name: 'album-or-playlist-items',
  props: {
    type: String,
  },
  components: {
    SongsList,
    FullPageLoader,
  },
  mixins: [getSafeMixin, musicMixin, swalMixin],
  watch: {
    '$route.params.id': function() {
      this.getItems();
    },
  },
  data() {
    return {
      item: null,
      isLibrary: this.getSafe(() => this.$route.meta.isLibrary, false),
    };
  },
  methods: {
    async getItems() {
      this.swal('info', 'Loading: ', '0 items loaded');
      try {
        const id = this.$route.params.id;
        const music = this.isLibrary
          ? MusicKit.getInstance().api.library
          : MusicKit.getInstance().api;

        this.item = await music[this.$route.meta.album ? 'album' : 'playlist'](id);
        let hasNext = this.getSafe(() => this.item.relationships.tracks.next, false);
        let loopCount = 0;

        this.swal(
          'info',
          'Loading: ',
          `${this.item.relationships.tracks.data.length} items loaded`,
        );

        while (hasNext && loopCount < 100) {
          let response = await fetch(`https://api.music.apple.com${hasNext}`, {
            method: 'GET',
            headers: getAppleMusicConfig(),
          });

          response = await response.json();
          hasNext = this.getSafe(() => response.next, false);
          const responseSongs = this.getSafe(() => response.data, []);

          this.item.relationships.tracks.data = [
            ...this.item.relationships.tracks.data,
            ...responseSongs,
          ];
          loopCount++;

          this.swal(
            'info',
            'Loading: ',
            `${this.item.relationships.tracks.data.length} items loaded`,
          );
        }
      } catch (e) {
        this.$swal({
          type: 'error',
          title: e.name,
          text: e.message,
        });
      }
    },
  },
  mounted() {
    this.getItems().then(() => {
      document.title = `${this.item.attributes.name} - ${this.$route.meta.title}`;
    });
  },
};
</script>
