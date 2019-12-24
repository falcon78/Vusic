import { mapActions, mapState } from 'vuex';

export default {
  name: 'playMixin',
  data() {
    return {
      songsBeforeShuffle: null,
    };
  },

  computed: {
    ...mapState('player', {
      shuffle: (state) => state.shuffle,
    }),
  },

  methods: {
    ...mapActions('player', {
      play: 'play',
    }),
    async playAlbumOrPlaylist(playParams) {
      const music = MusicKit.getInstance();
      await music.setQueue({ [playParams.kind]: playParams.id });
      await music.player.play();
    },
    shuffleSongs(songList) {
      this.songsBeforeShuffle = JSON.parse(JSON.stringify(songList));
      for (let i = songList.length - 1; i > 0; i--) {
        let randomNumber = Math.floor(Math.random() * (i + 1));
        let currentLoopIndexItem = songList[i];
        songList[i] = songList[randomNumber];
        songList[randomNumber] = currentLoopIndexItem;
      }
      return songList;
    },
    unshuffleCurrentQueue() {
      if (!this.songsBeforeShuffle) return;
      MusicKit.getInstance.setQueue({ items: this.songsBeforeShuffle });
    },
    async playSongFromItems(items, startPosition = 0) {
      const music = MusicKit.getInstance();
      if (this.shuffle === 1) {
        queueItems.splice(startPosition, 1);
        let queueItems = JSON.parse(JSON.stringify(items));
        const playItem = queueItems[startPosition];
        queueItems = this.shuffleSongs(queueItems);

        await music.setQueue({ items: [playItem] });

        await music.player.queue.append({ items: queueItems });
        console.log(music.player.queue.items);
        music.player.play();
      } else {
        await music.setQueue({ items });
        console.log(music.player.queue.items);
        await music.player.changeToMediaAtIndex(startPosition);
        music.player.play();
      }
    },
  },
};
