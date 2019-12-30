<template>
  <div class="home ">
    <sidebar />

    <div class="main-view ">
      <router-view id="main-body" />
      <Modal v-if="queueModal" @clicked="setQueueModal()" :titleName="'Queue Items'">
        <queue-items />
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

export default {
  name: 'home',
  components: { QueueItems, Modal, LyricsModal, Sidebar },
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
    }),
  },
};
</script>
