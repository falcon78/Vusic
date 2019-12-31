<template>
  <div class="login-container scrollWrapper">
    <div>
      <h2 class="browse-page-category">You need to Sign In to view your library</h2>
    </div>

    <a @click="login" class="button"><span>Sign In</span></a>
    <div>
      <h2>Or just browse ...</h2>
    </div>
    <a @click="$router.push('/browse')" class="button"><span>Browse</span></a>
    <div style="margin-top: 4em;"></div>
    <div style="text-align: center; width: 70%">
      <h4 class="browse-page-category">
        This site uses Apple MusicKitJS API to authenticate users. You login info is handled
        directly by Apple's API.
      </h4>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'login',
  methods: {
    login() {
      MusicKit.getInstance().authorize();
    },
  },
  computed: {
    ...mapState('music', {
      auth: (state) => state.auth.isAuthorized,
    }),
  },
  watch: {
    auth: function() {
      if (this.auth) {
        this.$router.push(this.$route.query.redirect);
      }
    },
  },
};
</script>
