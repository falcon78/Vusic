<template>
  <div
    id="options"
    class="options item-wrapper"
    :style="position"
    @mouseleave="$emit('mouse:leave')"
  >
    <div class="button" v-if="!isPlayer" @click="$emit('play:next') && $emit('mouse:leave')">
      Play Next
    </div>
    <div class="button" v-if="!isPlayer" @click="$emit('play:later') && $emit('mouse:leave')">
      Play Later
    </div>
    <div class="button" @click="$emit('add:library') && $emit('mouse:leave')">
      Add to Library
    </div>
    <div class="button" @click="$emit('love') && $emit('mouse:leave')">
      Love
    </div>
    <div class="button" @click="$emit('dislike') && $emit('mouse:leave')">
      Dislike
    </div>
  </div>
</template>

<script>
export default {
  name: 'OptionsMenu',
  props: {
    position: {
      type: String,
      default: '',
    },
    isPlayer: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
