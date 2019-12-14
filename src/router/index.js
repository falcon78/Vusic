import Vue from 'vue';
import VueRouter from 'vue-router';
import Albums from '@/views/Library/LibraryAlbums.vue';
import ForYou from '@/views/ForYou.vue';
import Browse from '@/views/Browse.vue';
import RecentlyAdded from '@/views/Library/RecentlyAdded.vue';
import Artists from '@/views/Library/LibraryArtists.vue';
import Songs from '@/views/Library/LibrarySongs.vue';
import Playlists from '@/views/Library/LibraryPlaylist.vue';
import LibraryAlbum from '@/components/Album';
import LibraryPlaylist from '@/components/Playlist';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'browse',
    component: Browse,
  },
  {
    path: '/for-you',
    name: 'for-you',
    component: ForYou,
  },
  {
    path: '/album/:id',
    name: 'album',
    component: LibraryAlbum,
  },
  {
    path: '/library',
    name: 'library',
    component: {
      render(c) {
        return c('router-view');
      },
    },
    children: [
      {
        path: 'recently-added',
        name: 'recently-added',
        component: RecentlyAdded,
      },
      {
        path: 'artists',
        name: 'library-artists',
        component: Artists,
      },
      {
        path: 'albums',
        name: 'library-albums',
        component: Albums,
      },
      {
        path: 'songs',
        name: 'library-songs',
        component: Songs,
      },
      {
        path: 'playlists',
        name: 'library-playlists',
        component: Playlists,
      },
      {
        path: 'playlists/:id',
        name: 'library-playlist',
        component: LibraryPlaylist,
      },
      {
        path: 'album/:id',
        name: 'library-album',
        component: LibraryAlbum,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    console.log('i was here ');
    console.log(savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
});

export default router;
