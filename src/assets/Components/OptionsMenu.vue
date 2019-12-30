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
  data() {
    return {
      item: null,
      menuWidth: null,
      menuHeight: null,
    };
  },
  methods: {
    showMenu(event, item) {
      this.item = item;
      let menu = document.getElementById('options');
      if (!menu) {
        return;
      }
      if (!this.menuWidth || !this.menuHeight) {
        menu.style.visibility = 'hidden';
        menu.style.display = 'block';
        this.menuWidth = menu.offsetWidth;
        this.menuHeight = menu.offsetHeight;
        menu.removeAttribute('style');
      }
      if (this.menuWidth + event.pageX >= window.innerWidth) {
        menu.style.left = event.pageX - this.menuWidth + 2 + 'px';
      } else {
        menu.style.left = event.pageX - 2 + 'px';
      }
      if (this.menuHeight + event.pageY >= window.innerHeight) {
        menu.style.top = event.pageY - this.menuHeight + 2 + 'px';
      } else {
        menu.style.top = event.pageY - 2 + 'px';
      }
      menu.classList.add('vue-simple-context-menu--active');
    },
    hideContextMenu() {
      let element = document.getElementById(this.elementId);
      if (element) {
        element.classList.remove('vue-simple-context-menu--active');
      }
    },
    onClickOutside() {
      this.hideContextMenu();
    },
    optionClicked(option) {
      this.hideContextMenu();
      this.$emit('option-clicked', {
        item: this.item,
        option: option,
      });
    },
  },
  mounted() {
    document.body.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        this.hideContextMenu();
      }
    });
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.hideContextMenu());
  },
};
</script>
