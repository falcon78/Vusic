import Vue from 'vue';
import VueRouter from 'vue-router';
import Albums from '@/views/Library/LibraryAlbums.vue';
import ForYou from '@/views/ForYou.vue';
import Browse from '@/views/Browse.vue';
import RecentlyAdded from '@/views/Library/RecentlyAdded.vue';
import Songs from '@/views/Library/LibrarySongs.vue';
import Playlists from '@/views/Library/LibraryPlaylist.vue';
import Album from '@/components/Album';
import LibraryPlaylist from '@/components/Playlist';
import LibraryArtists from '@/views/Library/LibraryArtists';
import Playlist from '../components/Playlist';

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
    component: Album,
  },
  {
    path: '/playlist/:id',
    name: 'playlist',
    component: Playlist,
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
        component: LibraryArtists,
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

export default router;
