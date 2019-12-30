<template>
  <div class="queue-modal modal-base scrollWrapper">
    <queue-song
      v-for="(song, index) in queue"
      :track="song"
      :index="parseInt(index) + 1"
      :key="song.id"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import QueueSong from '@/components/QueueSong';

export default {
  name: 'QueueItems',
  components: { QueueSong },
  data() {
    return {
      queueItems: [],
    };
  },
  computed: {
    ...mapState('player', {
      queue: (state) => state.queue,
      queuePosition: (state) => state.queuePosition,
    }),
  },
  mounted() {
    this.queueItems = this.queue;
  },
  watch: {
    queue: function() {
      console.log('shuffle');
      this.queueItes = this.queue;
    },
  },
};
</script>
