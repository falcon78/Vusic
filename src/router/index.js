import Vue from 'vue';
import VueRouter from 'vue-router';
import ForYou from '@/views/ForYou.vue';
import Browse from '@/views/Browse.vue';
import RecentlyAdded from '@/views/Library/RecentlyAdded.vue';
import Songs from '@/views/Library/LibrarySongs.vue';
import Playlists from '@/views/Library/LibraryPlaylist.vue';
import LibraryArtists from '@/views/Library/LibraryArtists';
import AlbumOrPlaylistItems from '../components/AlbumOrPlaylistItems';
import store from '@/store';
import Login from '@/views/Login';
import LibraryAlbums from '@/views/Library/LibraryAlbums';
import MultipleAlbumItems from '@/components/MultipleAlbumItems';
import Artist from '@/views/Artist';
import Search from '@/views/Search';

Vue.use(VueRouter);

const routes = [
  {
    path: '/browse',
    name: 'browse',
    component: Browse,
    meta: { isLibrary: false, title: 'Browse' },
  },
  {
    path: '/login',
    name: 'login',
    meta: { isLibrary: false, title: 'Login' },
    component: Login,
  },
  {
    path: '/for-you',
    name: 'for-you',
    component: ForYou,
    meta: { requiresAuth: true, isLibrary: false, title: 'For You' },
  },
  {
    path: '/album/:id',
    name: 'album',
    meta: { album: true, isLibrary: false, title: 'Album' },
    component: AlbumOrPlaylistItems,
  },
  {
    path: '/playlist/:id',
    name: 'playlist',
    meta: { album: false, isLibrary: false, title: 'Playlist' },
    component: AlbumOrPlaylistItems,
  },
  {
    path: '/artist/:id',
    meta: { isLibrary: false, title: 'Artist' },
    name: 'artist',
    component: Artist,
  },
  {
    path: '/search',
    meta: { isLibrary: false, title: 'Search' },
    name: 'search',
    component: Search,
  },
  {
    path: '/library',
    name: 'library',
    meta: { requiresAuth: true, isLibrary: true, title: 'Library' },
    component: {
      render(c) {
        return c('router-view');
      },
    },
    children: [
      {
        path: 'recently-added',
        name: 'recently-added',
        meta: { isLibrary: true, title: 'Recent' },
        component: RecentlyAdded,
      },
      {
        path: 'artists',
        name: 'library-artists',
        meta: { isLibrary: true, title: 'Library Artists' },
        component: LibraryArtists,
        children: [
          {
            path: ':id',
            name: 'library-artist-items',
            meta: { isLibrary: true, title: 'Library Artist Albums' },
            component: MultipleAlbumItems,
          },
        ],
      },
      {
        path: 'albums',
        name: 'library-albums',
        meta: { isLibrary: true, title: 'Library Albums' },
        component: LibraryAlbums,
      },
      {
        path: 'songs',
        name: 'library-songs',
        meta: { isLibrary: true, title: 'Library Songs' },
        component: Songs,
      },
      {
        path: 'playlists',
        name: 'library-playlists',
        meta: { album: false, isLibrary: true, title: 'Library Playlists' },
        component: Playlists,
      },
      {
        path: 'playlists/:id',
        name: 'library-playlist',
        meta: { isLibrary: true, album: false, title: 'Library Playlist' },
        component: AlbumOrPlaylistItems,
      },
      {
        path: 'album/:id',
        name: 'library-album',
        meta: { isLibrary: true, album: true, title: 'Library Album' },
        component: AlbumOrPlaylistItems,
      },
      {
        path: 'search',
        meta: { isLibrary: true, title: 'Library Search' },
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
