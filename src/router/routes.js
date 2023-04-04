
const routes = [
  {

    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/startpage', component: () => import('pages/Start-page.vue') },
      { path: '/judjes', component: () => import('pages/Judjes.vue') },
      { path: '/bracket', component: () => import('pages/Bracket.vue') },
      { path: '/participant', component: () => import('pages/participant.vue') },
      { path: '/match', component: () => import('pages/Match.vue') },
      { path: '/teams', component: () => import('pages/Teams.vue') },
      { path: '/tournament', component: () => import('pages/Tournaments.vue') },      
      { path: '/setting', component: () => import('pages/Setting.vue') },      
    ]
  },
  {
    path:'/login',
    component:() => import("../views/Login.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
