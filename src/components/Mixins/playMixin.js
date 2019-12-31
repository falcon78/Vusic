import { mapActions, mapMutations, mapState } from 'vuex';
import { getAppleMusicConfig } from '../../../apiKeys';
import swalMixin from '@/components/Mixins/swalMixin';

export default {
  name: 'playMixin',
  mixins: [swalMixin],
  computed: {
    ...mapState('player', {
      shuffle: (state) => state.shuffle,
      songsBeforeShuffle: (state) => state.songsBeforeShuffle,
    }),
  },

  methods: {
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
    async playSongFromItems(playParams, startItem = null) {
      const music = MusicKit.getInstance();
      try {
        await music.setQueue(playParams);
        startItem && (await music.player.changeToMediaItem(startItem.id));
        await music.player.play();
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

    alertNonAuth() {
      this.$swal({
        type: 'error',
        title: 'Unauthenticated: Please Login',
      });
    },

    addToLibrary(items, title) {
      const api = MusicKit.getInstance().api;
      return new Promise(async (resolve, reject) => {
        try {
          if (!items) {
            throw new Error('Cant find Item');
          }
          await api.addToLibrary({ songs: items });
          this.swal('info', `Added ${title} to library`, '');
          resolve();
        } catch (e) {
          this.swal('error', e.name, e.message);
          if (e === 'Invalid tokens') {
            this.alertNonAuth();
          }
          reject();
        }
      });
    },
    async playNext(playParams) {
      try {
        const player = MusicKit.getInstance().player;
        if (this.getSafe(() => !player.queue.length)) {
          await this.playSongFromItems(playParams);
        }
        player.queue.prepend(playParams);
        this.swal('info', 'Added to queue');
      } catch (e) {
        this.swal('error', e.name, e.message);
      }
    },
    async playLater(playParams) {
      try {
        const player = MusicKit.getInstance().player;
        if (this.getSafe(() => !player.queue.length)) {
          await this.playSongFromItems(playParams);
        }
        await player.queue.append(playParams);
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
          } else if (res.status === 403) {
            this.alertNonAuth();
            return reject(403);
          } else {
            this.swal('error', 'Server Error');
            return reject(new Error(res.status.toString()));
          }
          if (rating === 1) {
            this.swal('info', `Loved:  ${item.attributes.name} `);
          } else if (rating === -1) {
            this.swal('info', `Disliked:  ${item.attributes.name}`);
          }
        } catch (err) {
          this.swal('error', err.name, err.message);
        }
      });
    },
  },
};
