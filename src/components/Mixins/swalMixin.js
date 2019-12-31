export default {
  name: 'swal-mixin',
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
  },
};
