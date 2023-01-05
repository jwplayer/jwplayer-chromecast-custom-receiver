(() => {
    const context = cast.framework.CastReceiverContext.getInstance();
    const playerManager = context.getPlayerManager();

    playerManager.setPlaybackConfig(createPlaybackConfig(playerManager));
    context.start();

    function createPlaybackConfig(playerManager) {
        let playbackConfig = (Object.assign(new cast.framework.PlaybackConfig(), playerManager.getPlaybackConfig()));
        playbackConfig.licenseUrl = 'https://content.jwplatform.com/v2/media/YkMJqkrX/license?drm=widevine&policy_id=yysLM5Ua&version=v2&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzI5MjI3NzgsInJlc291cmNlIjoiL3YyL21lZGlhL1lrTUpxa3JYL2xpY2Vuc2U_ZHJtPXdpZGV2aW5lJnBvbGljeV9pZD15eXNMTTVVYSZ2ZXJzaW9uPXYyIn0.IM2Wiv5qGELC9johHNRlgDdRvNFw5v7ktLzD0lPgTh8';
        playbackConfig.protectionSystem = cast.framework.ContentProtection.WIDEVINE;
        return playbackConfig;
    }

})();