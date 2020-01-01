# Vusic - Apple Music Web Player Built With VueJS

### Made using Vue, Vuex , Vue Router. Powered by Genius, Youtube and Apple MusicKitJS SDK
![](./example/image.png)

# Features 

## Library
* View all songs, albums, playlists in your library.
* Add songs to your Library.
* Searh you library.

## Apple Music
* Browse currently popular songs.
* Search Apple Music catalog.
* Show recommendations by Apple (For You)
* Browse Recently played , added and most frequently played items (heavy rotation)
* like or dislike (rate) a song

## Other features
* Show music video for currenyly playing song (youtube)
* Show lyrics for currenyly playing song




# Screenshots

![](./example/1.png)
![](./example/2.png)
![](./example/3.png)
![](./example/4.png)
![](./example/5.png)
![](./example/6.png)

# How to Build

Rename `apiKeys.example.js` to `apiKeys.js` and add all the necessary api keys

### Api keys example
```
const keys = {
  appleMusic: {
    developerToken: 'Apple MusicKitJS API Key Goes Here',
    name: 'Vusic',
    build: 'ver1',
    version: 'ver1',
  },
  geniusAccessToken: 'Genius Access Token Goes Here',
  youtubeApiKey: 'Youtube Api Key Goes Here',
};
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
