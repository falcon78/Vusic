<template>
  <div class="login-container">
    <div>
      <h2>Sign In to view your library</h2>
    </div>
    <div class="login-image">
      <img src="../assets/Images/login.png" alt="" />
    </div>
    <a @click="login" class="button"><span>Sign In</span></a>
    <div>
      <h2>Or just browse ...</h2>
    </div>
    <a @click="$router.push('/browse')" class="button"><span>Browse</span></a>
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
