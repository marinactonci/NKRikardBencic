<template>
    <q-layout>
        <q-header elevated>
            <q-toolbar class="bg-black">
                <q-toolbar-title>
                    <q-img
                        src="https://i.imgur.com/4RBHbke.png"
                        style="width: 35px; height: 35px"
                    />
                    NK Rikard Benčić
                </q-toolbar-title>
                <q-btn
                    flat
                    dense
                    clickable
                    to="/NadolazeceUtakmice"
                    icon="home"
                />
                <q-space />
            </q-toolbar>
        </q-header>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
export default {
  name: 'LoginPageLayout',
  methods: {
    openWelcomePage () {
      this.$router.push('/')
    }
  }
}
</script>
