const musicMixin = {
  methods: {
    milliToMinutes(millis) {
      return MusicKit.formatMediaTime(millis / 1000);
    },
    async findAlbums(albumName, artistName) {
      let albums;
      await MusicKit.getInstance()
        .api.search(`${artistName} ${albumName}`)
        .then((result) => {
          result = Object.assign(result);
          albums = result.albums.data;
        })
        .catch(() => {
          albums = false;
        });
      return albums;
    },
    async routeToAlbum(artistName, albumName, songId = null) {
      const music = MusicKit.getInstance().api;
      this.$swal({
        type: 'info',
        title: 'Searching for album....',
        showConfirmButton: false,
      });

      const albums = await this.findAlbums(artistName, albumName);
      if (!albums) return false;
      let albumLists = [];
      let id = null;

      albums.forEach((album) => {
        if (album.attributes.artistName !== artistName) return;
        if (album.attributes.name !== albumName) return;
        albumLists.push(album);
      });

      if (songId) {
        outer: for (const album of albums) {
          const response = await music.album(album.id);
          const songs = response.relationships.tracks.data;
          for (let i = 0; i < songs.length; i++) {
            if (songs[i].id === songId) {
              id = response.id;
              break outer;
            }
          }
        }
      } else if (albumLists.length === 1) {
        id = albumLists.pop().id;
      } else if (albumLists.length > 1) {
        let finalAlbum = albumLists.pop();
        albumLists.forEach((album) => {
          if (album.attributes.contentRating === 'explicit') {
            finalAlbum = album;
          }
        });
        id = finalAlbum.id;
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
      await this.$router.push({
        name: 'album',
        params: { id },
      });
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
