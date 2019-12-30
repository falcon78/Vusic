import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'playMixin',

  computed: {
    ...mapState('player', {
      shuffle: (state) => state.shuffle,
      songsBeforeShuffle: (state) => state.songsBeforeShuffle,
    }),
  },

  methods: {
    swal(type, title, text) {
      this.$swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        type,
        title,
        text,
      });
    },
    ...mapActions('player', {
      play: 'play',
    }),
    ...mapMutations('player', {
      setSongsBeforeShuffle: 'setSongsBeforeShuffle',
    }),

    async playAlbumOrPlaylist(playParams) {
      const music = MusicKit.getInstance();
      await music.setQueue({ [playParams.kind]: playParams.id });
      await music.player.play();
    },

    shuffleSongs(songList) {
      let randomNumber, currentLoopIndexItem;
      for (let i = songList.length - 1; i > 0; i--) {
        randomNumber = Math.floor(Math.random() * (i + 1));
        currentLoopIndexItem = songList[i];
        songList[i] = songList[randomNumber];
        songList[randomNumber] = currentLoopIndexItem;
      }
      return songList;
    },
    async unShuffleCurrentQueue() {
      if (!this.songsBeforeShuffle) return;
      await MusicKit.getInstance().setQueue({ items: this.songsBeforeShuffle });
    },
    async playSongFromItems(items, startItem) {
      const music = MusicKit.getInstance();
      try {
        await music.setQueue(items);
        await music.player.changeToMediaItem(startItem.id);
        /*if (this.shuffle === 1) {
          let queueItems = JSON.parse(JSON.stringify(items));
          this.setSongsBeforeShuffle([...queueItems]);
          const playItem = queueItems[startPosition];
          queueItems.splice(startPosition, 1);
          queueItems = this.shuffleSongs(queueItems);

          await music.setQueue({ items: [playItem] });

          await music.player.queue.append({ items: queueItems });
          music.player.play();
        } else {
          await music.setQueue({ items });
          // use change to media item
          await music.player.changeToMediaAtIndex(startPosition);
          // music.player.play();
        }*/
      } catch (e) {
        this.swal('error', e.name, e.title);
      }
    },

    changeToIndex(startPosition) {
      try {
        MusicKit.getInstance().player.changeToMediaAtIndex(startPosition);
      } catch (e) {
        this.swal('error', e.name, e.message);
      }
    },

    changeToMediaItem(item) {
      try {
        MusicKit.getInstance().player.changeToMediaItem(item);
      } catch (e) {
        this.swal('error', e.name, e.message);
      }
    },
  },
};
