<template>
  <form action="" class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
            <span class="card-title">
              Register
            </span>
      <div class="input-field col l12 ">
        <input
          id="Login"
          type="text"
          class="validate"
          v-model="email"
        >
        <label for="Login" class="">Email</label>
        <small v-if='$v.email.$dirty && !$v.email.required' class="helper-text invalid">Email не может быть пустым</small>
        <small v-else-if='$v.email.$dirty && !$v.email.email' class="helper-text invalid">Email должен быть корректным</small>
      </div>
      <div class="input-field col l12 ">
        <input
          id="password"
          type="text"
          class="validate"
          v-model="password"
        >
        <label for="password" class="">Password</label>
        <small v-if='$v.password.$dirty && !$v.password.required' class="helper-text invalid">Пароль не должен быть пустым</small>
        <small v-else-if='$v.password.$dirty && !$v.password.minLength' class="helper-text invalid">
           Длина пароля должна быть более {{$v.password.$params.minLength.min}} символов
        </small>
      </div>
      <div class="input-field col l12 ">
        <input
          id="Name"
          type="text"
          class="validate"
          v-model="name"
        >

        <label for="Name" class="">Name</label>
        <small v-if='$v.name.$dirty && !$v.name.required' class="helper-text invalid">Имя не должно быть пустым</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          type="submit"
          style="width: 100%"
          class="center btn waves-effect waves-light auth-submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Есть аккаунт? <router-link :to="'/login'">Войти</router-link>
      </p>
    </div>
  </form>
</template>
<script>
  import {email, required, minLength} from 'vuelidate/lib/validators'
  export default {
    data: () => ({
      email: '',
      password: '',
      name: ''
    }),
    validations: {
      email: {email, required},
      password: {required, minLength: minLength(6)},
      name:{required}
    },
    methods: {
      async onSubmit() {
        if(this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        const formData = {
          email: this.email,
          password: this.password,
          name: this.name
        };
        try {
          await this.$store.dispatch('register', formData);
          this.$router.push('/')
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>
<style scoped>
  .helper-text.invalid{color:#f44336}
  .empty-layout{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding-top:5rem;height:100vh}
  .auth-card{width:500px}
  .card-title {
    padding-top: 0rem;
  }
</style>
