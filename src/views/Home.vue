<template>
  <div class="home ">
    <sidebar />

    <div class="main-view ">
      <router-view id="main-body" />
    </div>

    <LyricsModal v-if="lyricsModal" />
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import { mapState } from 'vuex';
import LyricsModal from '@/components/LyricsModal';

export default {
  name: 'home',
  components: { LyricsModal, Sidebar },
  computed: {
    ...mapState('modals', {
      lyricsModal: (state) => state.lyricsModal,
      youtubeModal: (state) => state.youtubeModal,
    }),
  },
};
</script>
