import Vue from 'vue';
import VueRouter from 'vue-router';
import Albums from '@/views/Library/LibraryAlbums.vue';
import ForYou from '@/views/ForYou.vue';
import Browse from '@/views/Browse.vue';
import RecentlyAdded from '@/views/Library/RecentlyAdded.vue';
import Songs from '@/views/Library/LibrarySongs.vue';
import Playlists from '@/views/Library/LibraryPlaylist.vue';
import Album from '@/components/Album';
import LibraryPlaylist from '@/components/AlbumOrPlaylistItems';
import LibraryArtists from '@/views/Library/LibraryArtists';
import Playlist from '../components/AlbumOrPlaylistItems';
import store from '@/store';
import Login from '@/views/Login';

Vue.use(VueRouter);

const routes = [
  {
    path: '/browse',
    name: 'browse',
    component: Browse,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/for-you',
    name: 'for-you',
    component: ForYou,
    meta: { requiresAuth: true },
  },
  {
    path: '/album/:id',
    name: 'album',
    meta: { album: true },
    component: Playlist,
  },
  {
    path: '/playlist/:id',
    name: 'playlist',
    meta: { album: false },
    component: Playlist,
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
      },
      {
        path: 'albums',
        name: 'library-albums',
        meta: { album: true, isLibrary: true },
        component: Playlist,
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
        meta: { isLibrary: true },
        component: LibraryPlaylist,
      },
      {
        path: 'album/:id',
        name: 'library-album',
        meta: { isLibrary: true },
        component: Album,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
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
