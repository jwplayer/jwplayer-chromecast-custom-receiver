(() => {
    const context = cast.framework.CastReceiverContext.getInstance();
    const playerManager = context.getPlayerManager();
    var kid;
    var token; // Studio DRM token
    var laurl; // Widevine license URL

    // When the cast player is loaded, fetch the drm token and license url and set up the playback config
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
                if(customData["token"]){
                    // Request requires both token and license URL
                    token = customData["token"];
                    laurl = customData["laurl"];
                }
            }
            // Handles custom data from JWP web player cast request
            else if (customData["drm"]["widevine"]["url"]){
                widevine = customData["drm"]["widevine"];
                if (widevine["url"]){
                laurl = widevine["url"];
                token = widevine["headers"][0]["value"];
                }
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
        playbackConfig.licenseRequestHandler = licenseRequestHandler;
        playbackConfig.protectionSystem = cast.framework.ContentProtection.WIDEVINE;
        return playbackConfig;
    }

    function licenseRequestHandler(request) {
        request.headers['X-VUDRM-TOKEN'] = token;
        return request;
    }
})();