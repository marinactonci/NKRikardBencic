<template>
    <q-layout>
        <q-header elevated>
            <q-toolbar class="bg-black">
                <q-btn
                    flat
                    dense
                    round
                    @click="leftDrawerOpen = !leftDrawerOpen"
                    icon="menu"
                    aria-label="Menu"
                />
                <q-toolbar-title>
                    <q-img
                        src="https://i.imgur.com/4RBHbke.png"
                        style="width: 35px; height: 35px"
                    />
                    NK Rikard Benčić
                </q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            content-class="bg-grey-3"
        >
            <q-list>
            <q-item-label header>Izbornik</q-item-label>
            <q-item
                clickable
                to="/Pocetna"
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
                to="/Karta"
            >
                <q-item-section avatar>
                    <q-icon name="confirmation_number" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Karta</q-item-label>
                </q-item-section>
            </q-item>
            <q-separator />
            <q-item
                clickable
                to="/NadolazeceUtakmice"
            >
                <q-item-section avatar>
                    <q-icon name="event_available" />
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
                    <q-icon name="event_busy" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Prošle utakmice</q-item-label>
                </q-item-section>
            </q-item>
            <q-separator />
            <q-item
                clickable
                @click="logout"
            >
                <q-item-section avatar>
                    <q-icon name="logout" />
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
