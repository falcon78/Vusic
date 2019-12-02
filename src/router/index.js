import Vue from 'vue';
import VueRouter from 'vue-router';
import Albums from '@/views/Albums.vue';
import ForYou from '@/views/ForYou.vue';
import Browse from '@/views/Browse.vue';
import RecentlyAdded from '@/views/RecentlyAdded.vue';
import routerConstants from './routerConstants';
import Artists from '@/views/Artists.vue';
import Songs from '@/views/Songs.vue';
import Playlists from '@/views/Playlists.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'test',
    component: Albums,
  },
  {
    path: routerConstants[0].routeName,
    name: routerConstants[0].routeName,
    component: ForYou,
  },
  {
    path: routerConstants[0].labels[0].routeName,
    name: routerConstants[0].labels[0].routeName,
    component: ForYou,
  },
  {
    path: routerConstants[0].labels[1].routeName,
    name: routerConstants[0].labels[1].routeName,
    component: Browse,
  },
  {
    path: routerConstants[1].routeName,
    name: routerConstants[1].routeName,
    component: ForYou,
  },
  {
    path: routerConstants[1].labels[0].routeName,
    name: routerConstants[1].labels[0].routeName,
    component: RecentlyAdded,
  },
  {
    path: routerConstants[1].labels[1].routeName,
    name: routerConstants[1].labels[1].routeName,
    component: Artists,
  },
  {
    path: routerConstants[1].labels[2].routeName,
    name: routerConstants[1].labels[2].routeName,
    component: Albums,
  },
  {
    path: routerConstants[1].labels[3].routeName,
    name: routerConstants[1].labels[3].routeName,
    component: Songs,
  },
  {
    path: routerConstants[1].labels[4].routeName,
    name: routerConstants[1].labels[4].routeName,
    component: Playlists,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
