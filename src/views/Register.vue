<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              (this.$v.email.$dirty && !this.$v.email.required) ||
              (this.$v.email.$dirty && !this.$v.email.email),
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="(this.$v.email.$dirty && !this.$v.email.required)"
        >
          Поле Email не должно быть пустым!
        </small>
        <small
          class="helper-text invalid"
          v-else-if=" (this.$v.email.$dirty && !this.$v.email.email)"
        >
          Введите корректный email!
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              (this.$v.password.$dirty && !this.$v.password.required) ||
              (this.$v.password.$dirty && !this.$v.password.minLength),
          }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="(this.$v.password.$dirty && !this.$v.password.required)"
        >
          Введите пароль!
        </small>
        <small
          class="helper-text invalid"
          v-else-if="this.$v.password.$dirty && !this.$v.password.minLength"
        >
          Пароль должен содержать больше 6 символов! Сейчас он
          {{ password.length }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: this.$v.name.$dirty && !this.$v.name.required }"
        />
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="(this.$v.name.$dirty && !this.$v.name.required)"
        >
          Введите Ваше Имя!
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  metaInfo(){
    return {
      title :this.$title('Register')
    }
  },
  name: 'Register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
  }),
  validations: {
    email: {
      email,
      required,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    name: { required },
    agree: { checked: (v) => v },
  },
  methods: {
    async submitHandler() {
      console.log(this.$v.$invalid)
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {}
    },
  },
}
</script>

<style scoped></style>
