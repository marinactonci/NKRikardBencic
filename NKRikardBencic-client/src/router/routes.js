
const routes = [
  {
    path: '/Login',
    component: () => import('layouts/LoginPageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login/LoginIndex.vue') }
    ]
  },
  {
    path: '/Administration',
    component: () => import('layouts/NKRikardBencicLayout.vue'),
    meta: { auth: true },
    children: [
      { path: '/Karta', meta: { auth: true }, component: () => import('pages/NKRikardBencic/KartaIndex.vue') },
      { path: '/NadolazeceUtakmice', meta: { auth: true }, component: () => import('pages/NKRikardBencic/NadolazeceUtakmiceIndex.vue') },
      { path: '/ProsleUtakmice', meta: { auth: true }, component: () => import('pages/NKRikardBencic/ProsleUtakmiceIndex.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
