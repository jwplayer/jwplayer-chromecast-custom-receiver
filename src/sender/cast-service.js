const CastService = function (stream, token, laurl) {
    this._context;
    this._laurl = laurl
    this._mimeType = 'application/dash+xm';
    this._remotePlayer;
    this._remotePlayerController;
    this._stream = stream;
    this._token = token;
}

CastService.prototype.initCast = function () {
    this._context = cast.framework.CastContext.getInstance();
    this._context.setOptions({
        receiverApplicationId: '<CUSTOM-RECEIVER-ID>',
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });

    this._remotePlayer = new cast.framework.RemotePlayer();
    this._remotePlayerController = new cast.framework.RemotePlayerController(this._remotePlayer);
    this._remotePlayerController.addEventListener(
        cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
        () => { this.connectionHandler(); },
        false
    );

    document.getElementById('play').addEventListener('click', this.play.bind(this));
}

CastService.prototype.connectionHandler = function () {
    if (!this._remotePlayer.isConnected) return;
    let mediaInfo = new chrome.cast.media.MediaInfo(this._stream, this._mimeType);

    mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
    mediaInfo.metadata.metadataType = chrome.cast.media.MetadataType.GENERIC;
    mediaInfo.metadata.title = 'Studio DRM Receiver Demo';
    mediaInfo.customData = { laurl: this._laurl, token: this._token};

    let request = new chrome.cast.media.LoadRequest(mediaInfo);
    let session = this._context.getCurrentSession();
    session.loadMedia(request);
}

CastService.prototype.play = function () {
    this._remotePlayerController.playOrPause();
}