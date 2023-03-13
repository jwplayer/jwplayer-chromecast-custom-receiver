(() => {
    const context = cast.framework.CastReceiverContext.getInstance();
    const playerManager = context.getPlayerManager();
    var kid;
    var token;
    var laurl;

    // When the cast player is loaded, fetch the drm token and license url and set up the playback config
    playerManager.setMessageInterceptor(cast.framework.messages.MessageType.LOAD, loadRequestData => {
        let customData = loadRequestData.media.customData;
        token = customData["token"];
        laurl = customData["laurl"];
        console.log(customData);
        playerManager.setPlaybackConfig(createPlaybackConfig(playerManager));
        return loadRequestData;
      }
    );

    playerManager.setPlaybackConfig(createPlaybackConfig(playerManager));
    context.start();

    function createPlaybackConfig(playerManager) {
        let playbackConfig = (Object.assign(new cast.framework.PlaybackConfig(), playerManager.getPlaybackConfig()));
        playbackConfig.licenseUrl = laurl;
        playbackConfig.licenseRequestHandler = licenseRequestHandler;
        playbackConfig.protectionSystem = cast.framework.ContentProtection.WIDEVINE;
        return playbackConfig;
    }

    function licenseRequestHandler(request) {
        request.headers['X-VUDRM-TOKEN'] = token;
        return request;
    }
})();