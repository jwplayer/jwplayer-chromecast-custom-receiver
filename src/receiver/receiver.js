(() => {
    const context = cast.framework.CastReceiverContext.getInstance();
    const playerManager = context.getPlayerManager();

    playerManager.setPlaybackConfig(createPlaybackConfig(playerManager));
    context.start();

    function createPlaybackConfig(playerManager) {
        let playbackConfig = (Object.assign(new cast.framework.PlaybackConfig(), playerManager.getPlaybackConfig()));
        playbackConfig.licenseUrl = '<WIDEVINE-LICENSE-URL>';
        playbackConfig.protectionSystem = cast.framework.ContentProtection.WIDEVINE;
        return playbackConfig;
    }

})();