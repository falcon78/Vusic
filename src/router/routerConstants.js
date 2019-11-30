const routes = [
  {
    routeName: '/apple',
    category: 'APPLE MUSIC',
    labels: [
      { name: 'For You', routeName: '/library/for-you' },
      { name: 'Browse', routeName: '/library/browse' },
    ],
  },
  {
    routeName: '/library',
    category: 'LIBRARY',
    labels: [
      { name: 'Recently Added', routeName: '/library/recently-added' },
      { name: 'Artists', routeName: '/library/my-artists' },
      { name: 'Albums', routeName: '/library/my-albums' },
      { name: 'Songs', routeName: '/library/songs' },
    ],
  },
];

export default routes;
