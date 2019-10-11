<template>
    <div>
        <Navbar/>
        <router-view></router-view>

    </div>
</template>
<script>
  import Navbar from '@/components/app/Navbar';
	export default {
    components: {
      Navbar
    },
    async mounted() {
      if(!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
      }
    }
	}
</script>
