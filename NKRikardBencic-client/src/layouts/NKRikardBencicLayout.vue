<template>
    <q-layout>
        <q-header elevated>
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    @click="leftDrawerOpen = !leftDrawerOpen"
                    icon="menu"
                    aria-label="Menu"
                />
                <q-toolbar-title>
                    NKRikardBencic
                </q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            content-class="bg-grey-2"
        >
            <q-list>
            <q-item-label header>Izbornik</q-item-label>
            <q-item
                clickable
                to="/Karta"
            >
                <q-item-section avatar>
                    <q-icon name="settings_input_antenna" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Karta</q-item-label>
                </q-item-section>
            </q-item>
            <q-item
                clickable
                to="/NadolazeceUtakmice"
            >
                <q-item-section avatar>
                    <q-icon name="router" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Nadolazeće utakmice</q-item-label>
                </q-item-section>
            </q-item>
            <q-separator />
            <q-item
                clickable
                to="/ProsleUtakmice"
            >
                <q-item-section avatar>
                    <q-icon name="router" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Prošle utakmice</q-item-label>
                </q-item-section>
            </q-item>
            <q-separator />
            <q-item
                clickable
                @click="home"
            >
                <q-item-section avatar>
                    <q-icon name="home" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Početna</q-item-label>
                </q-item-section>
            </q-item>
            <q-separator />
            <q-item
                clickable
                @click="logout"
            >
                <q-item-section avatar>
                    <q-icon name="power_settings_new" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Log out</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-drawer>
    <q-page-container>
        <router-view />
    </q-page-container>
    </q-layout>
</template>
<script>
export default {
  name: 'NKRikardBencicLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    logout () {
      this.$auth.signOut()
        .then(() => {
          this.$router.push('/')
        })
    },
    home () {
      this.$router.push('/')
    }
  }
}
</script>
