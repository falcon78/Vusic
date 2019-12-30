import { mapActions, mapMutations, mapState } from 'vuex';
import { getAppleMusicConfig } from '../../../apiKeys';

export default {
  name: 'playMixin',

  computed: {
    ...mapState('player', {
      shuffle: (state) => state.shuffle,
      songsBeforeShuffle: (state) => state.songsBeforeShuffle,
    }),
  },

  methods: {
    swal(type, title = '', text = '') {
      this.$swal.close();
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
      try {
        const music = MusicKit.getInstance();
        await music.setQueue({ [playParams.kind]: playParams.id });
        await music.player.play();
      } catch (e) {
        this.swal('error', e.name, e.message);
      }
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
    async pause() {
      return await MusicKit.getInstance().player.pause();
    },

    addToLibrary(items, title) {
      const api = MusicKit.getInstance().api;
      return new Promise(async (resolve, reject) => {
        try {
          console.log(items);
          if (!items || !items.type || !items.id) {
            throw new Error('Cant find Item');
          }
          await api.addToLibrary({ songs: items });
          this.swal('info', `Added ${title} to library`, '');
          resolve();
        } catch (e) {
          this.swal('error', e.name, e.message);
          reject();
        }
      });
    },
    playNext(playParams) {
      try {
        const player = MusicKit.getInstance().player;
        player.queue.prepend(playParams);
        this.swal('info', 'Added to queue');
      } catch (e) {
        this.swal('error', e.name, e.message);
      }
    },
    playLater(playParams) {
      try {
        const player = MusicKit.getInstance().player;
        player.queue.append(playParams);
        this.swal('info', 'Added to queue');
      } catch (e) {
        this.swal('error', e.name, e.message);
      }
    },

    rateItem(item, rating = 1) {
      return new Promise(async (resolve, reject) => {
        try {
          let res = await fetch(
            `https://api.music.apple.com/v1/me/ratings/${item.type}/${item.id}`,
            {
              method: 'PUT',
              headers: getAppleMusicConfig(),
              body: JSON.stringify({
                type: 'rating',
                attributes: {
                  value: rating,
                },
              }),
            },
          );

          if (res.status === 200) {
            resolve(true);
          } else {
            this.swal('error', 'Server Error');
          }
          if (rating === 1) {
            this.swal('info', `Added ${item.attributes.name} to Loved`);
          } else {
            this.swal('info', `Disliked ${item.attributes.name}`);
          }
        } catch (err) {
          this.swal('error', err.name, err.message);
          reject(err);
        }
      });
    },
  },
};
