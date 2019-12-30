<template>
  <div class="home ">
    <sidebar />

    <div class="main-view ">
      <router-view id="main-body" />

      <Modal class="queue" v-if="queueModal" @clicked="setQueueModal()" :titleName="'Queue Items'">
        <queue-items />
      </Modal>

      <Modal
        class="youtube"
        v-if="youtubeModal"
        @clicked="setYoutubeModal()"
        :titleName="'Music Video'"
      >
        <YoutubeModal />
      </Modal>
    </div>

    <LyricsModal v-if="lyricsModal" />
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import { mapMutations, mapState } from 'vuex';
import LyricsModal from '@/components/LyricsModal';
import Modal from '@/components/Modal';
import QueueItems from '@/views/Library/QueueItems';
import YoutubeModal from '@/components/YoutubeModal';

export default {
  name: 'home',
  components: { YoutubeModal, QueueItems, Modal, LyricsModal, Sidebar },
  computed: {
    ...mapState('modals', {
      lyricsModal: (state) => state.lyricsModal,
      youtubeModal: (state) => state.youtubeModal,
      queueModal: (state) => state.queueModal,
    }),
  },
  methods: {
    ...mapMutations('modals', {
      setLyricsModal: 'setLyricsModal',
      setQueueModal: 'setQueueModal',
      setYoutubeModal: 'setYoutubeModal',
    }),
  },
};
</script>
