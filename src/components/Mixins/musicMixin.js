import getSafeMixin from '@/components/Mixins/getSafeMixin';

const musicMixin = {
  mixins: [getSafeMixin],
  methods: {
    milliToMinutes(millis) {
      return this.getSafe(() => MusicKit.formatMediaTime(millis / 1000), 60);
    },
    async findAlbums(albumName, artistName = '') {
      let albums;
      try {
        await MusicKit.getInstance()
          .api.search(albumName + artistName)
          .then((result) => {
            result = Object.assign(result);
            albums = result.albums.data;
          })
          .catch(() => {
            albums = false;
          });
        return albums;
      } catch (e) {
        this.$swal({
          type: 'error',
          title: e.name,
          text: e.message,
        });
      }
    },
    async routeToAlbum(artistName, albumName, songId = null) {
      let id = null;
      try {
        const music = MusicKit.getInstance().api;
        this.$swal({
          type: 'info',
          title: 'Searching for album....',
          showConfirmButton: false,
        });
        const albums = await this.findAlbums(albumName);

        if (!albums) throw new Error('Album not found...');

        let albumLists = [];
        albums.forEach((album) => {
          if (album.attributes.name !== albumName) return;
          albumLists.push(album);
        });

        if (songId) {
          outer: for (let album of albumLists) {
            const response = await music.album(album.id);
            const songs = this.getSafe(() => response.relationships.tracks.data, []);
            for (let i = 0; i < songs.length; i++) {
              if (songs[i].id === songId) {
                id = response.id;
                break outer;
              }
            }
          }
        }
      } catch (e) {
        this.$swal.close();
        this.$swal({
          type: 'error',
          title: 'Error...',
          text: e.message,
        });
        return;
      }

      this.$swal.close();
      if (!id) {
        this.$swal({
          type: 'error',
          title: "Couldn't find album",
          text: 'Album not found in apple music...',
        });
        return;
      }
      this.$router
        .push({
          name: 'album',
          params: { id },
        })
        .catch((e) => {});
    },

    async routeToArtist() {},

    getApi() {
      return this.$route.meta.isLibrary
        ? MusicKit.getInstance().api.library
        : MusicKit.getInstance().api;
    },
  },
};

export default musicMixin;
