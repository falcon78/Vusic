const routes = [
  {
    routeName: '/apple',
    category: 'APPLE MUSIC',
    icon: 'music',
    labels: [
      { name: 'For You', routeName: 'for-you' },
      { name: 'Browse', routeName: 'browse' },
      { name: 'Search', routeName: 'search' },
    ],
  },
  {
    routeName: '/library',
    category: 'LIBRARY',
    icon: 'save',
    labels: [
      { name: 'Recently Added', routeName: 'recently-added' },
      { name: 'Artists', routeName: 'library-artists' },
      { name: 'Albums', routeName: 'library-albums' },
      { name: 'Songs', routeName: 'library-songs' },
      { name: 'Playlists', routeName: 'library-playlists' },
      { name: 'Search', routeName: 'library-search' },
    ],
  },
];

export default routes;
