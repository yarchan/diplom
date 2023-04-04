<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="transparent">
      <q-btn
        flat
        dense
        round
        color=primary
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />
    </q-header>
    <q-drawer
      dark
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          style="max-height:16em; display: flex; justify-content: center; padding: 100px;"
          header
        >
          <q-icon
          style="width: 6em; height: 6em;"
          >
            <img style="width: 6em; height: 6em;" src="../assets/cyber-logo.svg" alt="">
          </q-icon>
        </q-item-label>
        <q-item-label
          header
        >
          Панель управления
        </q-item-label>
        <q-item clickable v-ripple to="/tournament" style="font-size:20px;font-weight:1000">
          Турниры
        </q-item>
        <q-item clickable v-ripple to="/match" style="font-size:20px;font-weight:1000">
          Матчи
        </q-item>
        <q-item clickable v-ripple to="/bracket" style="font-size:20px;font-weight:1000">
          Раунды
        </q-item>
        <q-item clickable v-ripple to="/teams" style="font-size:20px;font-weight:1000">
          Команды
        </q-item>
        <q-item clickable v-ripple to="/participant" style="font-size:20px;font-weight:1000">
          Участники
        </q-item>
        <q-item clickable v-ripple to="/setting" style="font-size:20px;font-weight:1000">
          Настройки
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
   title: '',
    caption: 'quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  } 
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  created() {
    this.$router.push("/startpage");
  },
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style scoped>
body.body--dark{
  background: none;
}
</style>
