<template>
  <div id="app">
    <component :is='component'>
      <router-view/>
    </component>
  </div>
</template>
<script>
  import EmptyLayout from '@/layouts/EmptyLayout';
  import MainLayout from '@/layouts/MainLayout';
  export default {
    computed: {
      component() {
        return (this.$route.meta.layout || 'empty') + '-layout'
      }
    },
    components: {
      EmptyLayout,
      MainLayout
    }
  }
</script>
<style>
  @import '~materialize-css/dist/css/materialize.min.css';
</style>
