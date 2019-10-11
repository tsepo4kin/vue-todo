<template>
  <div>
    <nav class="mb20">
      <div class="nav-wrapper light-blue">
        <div class="brand-logo">
          <a href="#" class="" style="margin-left: 10px;">Vue-todo</a>
          <span class="black-text" style="font-size: 22px;">
          <span class="hide-on-med-and-down">dd.mm.yy</span> hh:mm:ss
        </span>
        </div>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <router-link
            tag='li'
            active-class='active'
            v-for="link in links"
            :to="link.url"
            :exact='link.exact'
          ><a>{{link.title}}</a></router-link>
          <li><a class="dropdown-trigger" ref="dropdown" data-target="dropdown1">{{name}}<i class="material-icons right">arrow_drop_down</i></a></li>
          <ul id="dropdown1" class="dropdown-content">
            <li><router-link :to="'/profile'">Profile</router-link></li>
            <li class="divider"></li>
            <li><a href="#" @click.prevent="logout">Logout</a></li>
          </ul>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
  export default {
    data: () => ({
      links: [
        {title: 'Todo list', url: '/', exact: true},
        {title: 'Add task', url: '/AddTask'}
      ],
      dropdown: null
    }),
    mounted() {
      this.dropdown = M.Dropdown.init(this.$refs.dropdown), {
        constrainWidth: false
      }

    },
    computed: {
      name() {
        return this.$store.getters.info.name
      }
    },
    methods: {
      async logout() {
        await this.$store.dispatch('logout');
        this.$router.push('/login?message=logout')
      }
    },
    beforeDestroy() {
      if(this.dropdown && this.dropdown.destroy) {
        this.dropdown.destroy();
      }
    }
  }
</script>
<style scoped>
  .helper-text.invalid{color:#f44336}
  .auth-card{width:500px}
  .card-title {
    padding-top: 0rem;
  }
  .router-link-exact-active {

  }
</style>
