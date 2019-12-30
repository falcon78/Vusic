import Vue from 'vue';
import VueRouter from 'vue-router';
import Albums from '@/views/Library/LibraryAlbums.vue';
import ForYou from '@/views/ForYou.vue';
import Browse from '@/views/Browse.vue';
import RecentlyAdded from '@/views/Library/RecentlyAdded.vue';
import Songs from '@/views/Library/LibrarySongs.vue';
import Playlists from '@/views/Library/LibraryPlaylist.vue';
import Album from '@/components/Album';
import LibraryArtists from '@/views/Library/LibraryArtists';
import AlbumOrPlaylistItems from '../components/AlbumOrPlaylistItems';
import store from '@/store';
import Login from '@/views/Login';
import LibraryAlbums from '@/views/Library/LibraryAlbums';
import MultipleAlbumItems from '@/components/MultipleAlbumItems';
import Artist from '@/views/Artist';
import Search from '@/views/Search';
import QueueItems from '@/views/Library/QueueItems';

Vue.use(VueRouter);

const routes = [
  {
    path: '/browse',
    name: 'browse',
    component: Browse,
    meta: { isLibrary: false },
  },
  {
    path: '/queue',
    name: 'queue',
    component: QueueItems,
  },
  {
    path: '/login',
    name: 'login',
    meta: { isLibrary: false },
    component: Login,
  },
  {
    path: '/for-you',
    name: 'for-you',
    component: ForYou,
    meta: { requiresAuth: true, isLibrary: false },
  },
  {
    path: '/album/:id',
    name: 'album',
    meta: { album: true, isLibrary: false },
    component: AlbumOrPlaylistItems,
  },
  {
    path: '/playlist/:id',
    name: 'playlist',
    meta: { album: false, isLibrary: false },
    component: AlbumOrPlaylistItems,
  },
  {
    path: '/artist/:id',
    meta: { isLibrary: false },
    name: 'artist',
    component: Artist,
  },
  {
    path: '/search',
    meta: { isLibrary: false },
    name: 'search',
    component: Search,
  },
  {
    path: '/library',
    name: 'library',
    meta: { requiresAuth: true, isLibrary: true },
    component: {
      render(c) {
        return c('router-view');
      },
    },
    children: [
      {
        path: 'recently-added',
        name: 'recently-added',
        meta: { isLibrary: true },
        component: RecentlyAdded,
      },
      {
        path: 'artists',
        name: 'library-artists',
        meta: { isLibrary: true },
        component: LibraryArtists,
        children: [
          {
            path: ':id',
            name: 'library-artist-items',
            meta: { isLibrary: true },
            component: MultipleAlbumItems,
          },
        ],
      },
      {
        path: 'albums',
        name: 'library-albums',
        meta: { isLibrary: true },
        component: LibraryAlbums,
      },
      {
        path: 'songs',
        name: 'library-songs',
        meta: { isLibrary: true },
        component: Songs,
      },
      {
        path: 'playlists',
        name: 'library-playlists',
        meta: { album: false, isLibrary: true },
        component: Playlists,
      },
      {
        path: 'playlists/:id',
        name: 'library-playlist',
        meta: { isLibrary: true, album: false },
        component: AlbumOrPlaylistItems,
      },
      {
        path: 'album/:id',
        name: 'library-album',
        meta: { isLibrary: true, album: true },
        component: AlbumOrPlaylistItems,
      },
      {
        path: 'search',
        meta: { isLibrary: true },
        name: 'library-search',
        component: Search,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 500);
    });
  },
});

router.beforeEach((to, from, next) => {
  const isAuthorized = store.state.music.auth.isAuthorized;
  if (to.path === '/') {
    next({ path: '/browse' });
  }
  if (to.matched.some((record) => record.meta.requiresAuth))
    if (!isAuthorized) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  else {
    next();
  }
});

export default router;
