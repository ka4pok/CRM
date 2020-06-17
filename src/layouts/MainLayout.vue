<template>
  <div>
    <Loader v-if="loadingN"></Loader>

    <div class="app-main-layout" v-else>
      <Navbar @click="isOpen = !isOpen"></Navbar>

      <Sidebar
        v-model="isOpen"
        :key="locale"
      />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view></router-view>
        </div>
      </main>

      <div class="fixed-action-btn" style="bottom: 60px;">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip="'Создать новую запись!'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/app/Navbar'
import Sidebar from '../components/app/Sidebar'
import messages from '../utils/messages'

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loadingN: true,
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loadingN = false
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    locale(){
      return this.$store.getters.info.locale
    }
  },
  watch: {

    error(fbError) {
      console.log(fbError)
      this.$error(messages[fbError.code] || 'Что-то пошло не так!')
    },
  },
  components: {
    Navbar,
    Sidebar,
  },
}
</script>

<style scoped></style>
