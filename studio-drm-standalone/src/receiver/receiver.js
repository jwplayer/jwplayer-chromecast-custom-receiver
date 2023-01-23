(() => {
    const context = cast.framework.CastReceiverContext.getInstance();
    const playerManager = context.getPlayerManager();
    var kid;

    playerManager.setPlaybackConfig(createPlaybackConfig(playerManager));
    context.start();

    function createPlaybackConfig(playerManager) {
        let playbackConfig = (Object.assign(new cast.framework.PlaybackConfig(), playerManager.getPlaybackConfig()));
        playbackConfig.licenseUrl = 'https://widevine-license.vudrm.tech/proxy';
        playbackConfig.licenseRequestHandler = licenseRequestHandler;
        playbackConfig.protectionSystem = cast.framework.ContentProtection.WIDEVINE;
        return playbackConfig;
    }

    function licenseRequestHandler(request) {
        request.headers['X-VUDRM-TOKEN'] = '<your-studiodrm-token>';
        return request;
    }
})();