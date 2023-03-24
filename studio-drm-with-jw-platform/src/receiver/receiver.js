(() => {
    const context = cast.framework.CastReceiverContext.getInstance();
    const playerManager = context.getPlayerManager();
    var laurl; // Widevine license URL

    // Wait until the cast player is loaded, get the laurl from the media request and use it in the player config
    playerManager.setMessageInterceptor(cast.framework.messages.MessageType.LOAD, loadRequestData => {
      let customData = loadRequestData.media.customData;
      // Media URL will always be the contentId unless one of the other options is provided
      let source = loadRequestData.media.contentUrl || loadRequestData.media.entity || loadRequestData.media.contentId;
      if (!source || source == ""){
        let error = new cast.framework.messages.ErrorData(
          cast.framework.messages.ErrorType.LOAD_FAILED
        );
        error.reason = cast.framework.messages.ErrorReason.INVALID_REQUEST;
        return error;
      }

      loadRequestData.media.contentUrl = source;

      // If no custom data, assume content is unprotected
      if (customData){
        if (customData["laurl"]){
          laurl = customData["laurl"];
        }
        // Handles custom data from JWP web player cast request
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