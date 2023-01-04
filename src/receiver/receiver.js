(() => {
    const context = cast.framework.CastReceiverContext.getInstance();
    const castDebugLogger = cast.debug.CastDebugLogger.getInstance();
    const playerManager = context.getPlayerManager();
    var kid;

    castDebugLogger.loggerLevelByEvents = {
        'cast.framework.events.category.CORE': cast.framework.LoggerLevel.INFO
    };

    context.addEventListener(cast.framework.system.EventType.READY, () => {
        if (!castDebugLogger.debugOverlayElement_) {
            // Enable debug logger and show a 'DEBUG MODE' overlay at top left corner.
            castDebugLogger.setEnabled(true);
        }
    });
    
    context.addEventListener(cast.framework.system.EventType.READY, () => {
        if (!castDebugLogger.debugOverlayElement_) {
            // Enable debug logger and show a 'DEBUG MODE' overlay at top left corner.
            castDebugLogger.setEnabled(true);
            // Show debug overlay
            castDebugLogger.showDebugLogs(true);
            // Clear log messages on debug overlay
            // castDebugLogger.clearDebugLogs();
        }
      });

    playerManager.setPlaybackConfig(createPlaybackConfig(playerManager));
    context.start();

    function createPlaybackConfig(playerManager) {
        let playbackConfig = (Object.assign(new cast.framework.PlaybackConfig(), playerManager.getPlaybackConfig()));
        playbackConfig.licenseUrl = '<LICENSE-URL>';
        playbackConfig.licenseRequestHandler = licenseRequestHandler;
        playbackConfig.protectionSystem = cast.framework.ContentProtection.WIDEVINE;
        return playbackConfig;
    }

    function licenseRequestHandler(request) {
        request.headers['X-VUDRM-TOKEN'] = 'vualto-demo|2023-01-03T15:13:54Z|RAQrLiTYv+Z8U9LrxO0JDw==|016657bce2f82dab3645d9e23f91f0edfd12f336';
        return request;
    }
})();