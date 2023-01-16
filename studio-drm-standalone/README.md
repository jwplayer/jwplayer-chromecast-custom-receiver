# JW Player Chromecast Custom Receiver Demo App

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Description

This repository will demonstrate how to use [Studio DRM](https://developer.jwplayer.com/jwplayer/docs/studio-drm-standalone-getting-started) with [Chromecast devices](https://www.google.com/chromecast/built-in/).

Please note, you need to [register your custom receiver app](https://developers.google.com/cast/docs/registration#RegisterApp) before continuing.

If you have any questions please contact [support@jwplayer.com](mailto:support@jwplayer.com)

## Instructions

### Install dependencies

1. Install [npm](https://www.npmjs.com/).
2. Clone the repository: `git clone git@github.com:Vualto/vualto-jwplayer.git`
3. Navigate to the project's root folder: `cd jwplayer-chromecast-custom-receiver`
4. Install the dependencies: `npm install`
5. Install [http-server](https://www.npmjs.com/package/http-server): `npm install -g http-server`
6. Install [ngrok](https://www.npmjs.com/package/ngrok): `npm install -g ngrok`

### Build and run the dev environment

1. Open the repository in your favourite javascript editor.
2. In the file `src/receiver/receiver.js` replace `<your-studiodrm-token>` with a Studio DRM token. Details can be found in the [Studio DRM Token v2 documentation](https://developer.jwplayer.com/jwplayer/docs/studio-drm-token-api-v2).
3. In the file `src/sender/cast-service.js` replace `<your-receiver-application-id>` with your receiver application ID provided by [Google](https://developers.google.com/cast/codelabs/cast-receiver#3).
4. In the file `src/sender/index.html` replace `<dash-stream-url>` with your [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP) stream URL.
5. In the file `src/sender/index.html` replace `<your-studiodrm-token>` with a Studio DRM token. Details can be found in the [Studio DRM Token v2 documentation](https://developer.jwplayer.com/jwplayer/docs/studio-drm-token-api-v2).
6. Navigate to the project's root folder: `cd jwplayer-chromecast-custom-receiver`
7. Start the [http-server](https://www.npmjs.com/package/http-server): `http-server`
8. Start [ngrok](https://www.npmjs.com/package/ngrok): `ngrok http <port number from http-server(normally 8080)>`
9. In the Google Cast SDK Developer Console, click Edit on the Application ID for your receiver and enter `<https url created by ngrok>/src/receiver` in the Receiver Application URL field box and click save.
10. In Chrome, go to `<https url created by ngrok>/src/sender`, click the cast button and select your Chromecast device.

### Browser support

The browser must support [encrypted media extensions](https://www.w3.org/TR/2016/CR-encrypted-media-20160705/) and be Chromecast compatible such as Chrome and Firefox.

For a complete breakdown of supported media extensions please contact [support@jwplayer.com](mailto:support:jwplayer.com)

## Useful links

### Google

-   [Register your Custom Receiver](https://developers.google.com/cast/docs/registration#RegisterApp)
-   [Build a basic Cast Receiver](https://developers.google.com/cast/codelabs/cast-receiver#0)
-   [Cast-enable a Chrome web app](https://developers.google.com/cast/codelabs/cast-videos-chrome#0)

### Studio DRM

-   [Contact JW Player](https://support.jwplayer.com/)
-   [Studio DRM](https://developer.jwplayer.com/jwplayer/docs/studio-drm-standalone-getting-started)
-   [Studio DRM token documentation](https://developer.jwplayer.com/jwplayer/docs/studio-drm-token-api-v2)

### JW Player

-   [Homepage](https://www.jwplayer.com/)
-   [Pricing](https://www.jwplayer.com/pricing/)
-   [Developer Portal](https://developer.jwplayer.com)

### mpeg-DASH

-   [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP)
-   [What is MPEG-DASH](https://www.streamingmedia.com/Articles/Editorial/What-Is-.../What-is-MPEG-DASH-79041.aspx)
-   [Widevine](https://www.widevine.com/)
-   [PlayReady](https://www.microsoft.com/playready/)

### Encrypted media extensions

-   [Encrypted media extensions specification](https://www.w3.org/TR/2016/CR-encrypted-media-20160705/)
-   [Encrypted media extensions wikipedia](https://en.wikipedia.org/wiki/Encrypted_Media_Extensions)
-   [Encrypted media extensions on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Encrypted_Media_Extensions_API)
-   [Intro to encrypted media extensions](https://www.html5rocks.com/en/tutorials/eme/basics/)

### Build tools

-   [npm](https://www.npmjs.com/)
-   [http-server](https://www.npmjs.com/package/http-server)
-   [ngrok](https://www.npmjs.com/package/ngrok)
