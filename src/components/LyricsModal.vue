<template>
  <div class="lyrics-container">
    <iframe frameBorder="0" v-if="lyrics" id="lyrics-iframe" :srcdoc="lyrics + getStyle()"></iframe>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'LyricsModal',
  data() {
    return {
      error: null,
    };
  },
  methods: {
    fetchFromGenius() {},
    ...mapActions('modals', {
      fetchLyrics: 'fetchLyrics',
    }),
    ...mapMutations('modals', {
      setLyrics: 'setLyrics',
    }),
    getStyle() {
      return `
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
        <style>
          *{
              border: none transparent !important;
          }

          body, html {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Roboto', sans-serif;
                border: none !important;
          }
          body, html {
              overflow: auto;
              scrollbar-color: #FF7597;
              scrollbar-width: thin;
          }
          body::-webkit-scrollbar, html::-webkit-scrollbar {
              width: 3px;
              height: 3px;
              border-radius: 1px;
          }
          body::-webkit-scrollbar-track, html::-webkit-scrollbar-track {
              background: rgba(0, 0, 0, 0);
              border-radius: 1px;
          }
          body::-webkit-scrollbar-thumb, html::-webkit-scrollbar-thumb {
              background: #ff7597;
              border-radius: 1px;
              cursor: pointer;
          }
          body::-webkit-scrollbar-thumb:hover, html::-webkit-scrollbar-thumb:hover {
              background: #ff7597;
          }
          body:hover::-webkit-scrollbar-thumb, html:hover::-webkit-scrollbar-thumb {
              background: #ff8faa;
          }
          body::-webkit-scrollbar-corner, html::-webkit-scrollbar-corner {
              display: none;
          }

          .rg_embed_body * {
              border: none !important;
              background: #000000 !important;
              color: white !important;
          }

          .rg_embed_body a {
              background: rgba(255,117,151,0.4) !important;
          }

          .rg_embed_body a:hover {
              background: rgba(255,117,151,0.7) !important;
          }

          .rg_embed {
              background:  #000000;
              margin: 0;
              width: 100%;
          }
        </style>
      `;
    },
    getLyrics() {
      this.$swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        type: 'info',
        title: 'Fetching Lyrics...',
      });
      this.fetchLyrics({
        songName: this.currentlyPlaying.attributes.name,
        albumName: '',
        artistName: this.currentlyPlaying.attributes.artistName,
      })
        .then((res) => {
          this.setLyrics(res);
          return res;
        })
        .then(() => {
          const iframe = document.getElementById('lyrics-iframe');
          this.$swal.close();
          this.error = null;
        })
        .catch((error) => {
          this.error = `${error.name} : ${error.message}`;
          this.$swal({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            type: 'error',
            title: error.name,
            text: error.message,
          });
        });
    },
  },
  computed: {
    ...mapState('player', {
      currentlyPlaying: (state) => state.currentlyPlaying,
    }),
    ...mapState('modals', {
      lyrics: (state) => state.lyrics,
    }),
  },
  watch: {
    currentlyPlaying: function() {
      if (this.currentlyPlaying) this.getLyrics();
    },
  },
  mounted() {
    if (this.currentlyPlaying) this.getLyrics();
  },
};
</script>
