(() => {
    const context = cast.framework.CastReceiverContext.getInstance();
    const playerManager = context.getPlayerManager();
    var laurl;

    // Wait until the cast player is loaded, get the laurl from the media request and use it in the player config
    playerManager.setMessageInterceptor(cast.framework.messages.MessageType.LOAD, loadRequestData => {
      let customData = loadRequestData.media.customData;
      // Check all content source fields for asset URL or ID
      let source = loadRequestData.media.contentUrl || loadRequestData.media.entity || loadRequestData.media.contentId;
      if (!source || source == ""){
        let error = new cast.framework.messages.ErrorData(
          cast.framework.messages.ErrorType.LOAD_FAILED
        );
        error.reason = cast.framework.messages.ErrorReason.INVALID_REQUEST;
        return error;
      }

      loadRequestData.media.contentUrl = source;

      if (customData){
        if (customData["laurl"]){
          laurl = customData["laurl"];
        }
        else if (customData["drm"]["widevine"]["url"]){
          laurl = customData["drm"]["widevine"]["url"];
        }
      }
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