<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input id="name"
               type="text"
               v-model.trim="name"
               :class="{ invalid: this.$v.name.$dirty && !this.$v.name.required }"
        />
        <label for="name">{{'Name' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="(this.$v.name.$dirty && !this.$v.name.required)"
        >
          {{'Message_EnterName' | localize}}
        </small>
      </div>

      <!-- Switch -->
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
       {{'Update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import {required} from 'vuelidate/lib/validators'
  import {mapGetters, mapActions} from 'vuex'
  import localeFilter from '../filters/localize.filter'
export default {
    metaInfo(){
      return {
        title :this.$title('ProfileTitle')
      }
    },
  name: 'Profile',
  data: ()=>({
    name: '',
    isRuLocale: true
  }),
  computed:{
    ...mapGetters(['info']),
  },
  mounted () {
    this.name = this.info.name
    this.isRuLocale = this.info.locale ==="ru-RU"
    setTimeout(()=>{
      M.updateTextFields()
    },0)

  },
  validations: {
    name: { required },
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler(){
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.updateInfo({
          name:this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      }
      catch (e) {}
    }
  }
}
</script>

<style scoped>
  .switch{
    margin-bottom: 2rem;
  }

</style>
