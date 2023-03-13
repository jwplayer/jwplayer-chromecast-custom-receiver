(() => {
    const context = cast.framework.CastReceiverContext.getInstance();
    const playerManager = context.getPlayerManager();

    var laurl;

    // Wait until the cast player is loaded, get the laurl from the media request and use it in the player config
    playerManager.setMessageInterceptor(cast.framework.messages.MessageType.LOAD, loadRequestData => {
      let customData = loadRequestData.media.customData;
      laurl = customData["laurl"];
      playerManager.setPlaybackConfig(createPlaybackConfig(playerManager));
      return loadRequestData;
    }
  );

    context.start();
    
    function createPlaybackConfig(playerManager) {
      let playbackConfig = (Object.assign(new cast.framework.PlaybackConfig(), playerManager.getPlaybackConfig()));
      playbackConfig.licenseUrl = laurl;
      playbackConfig.protectionSystem = cast.framework.ContentProtection.WIDEVINE;
      return playbackConfig;
    }

})();