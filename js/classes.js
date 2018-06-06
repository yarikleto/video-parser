var classes = (function() {
  var VIDEO_GALLERY = 'video-gallery';
  var VIDEO_GALLERY_ITEM = 'video-gallery__item';
  var VIDEO_GALLERY_IFRAME = 'video-gallery__iframe';
  var VIDEO_GALLERY_ITEM_PREVIEW = 'video-gallery__item-preview';
  var VIDEO_GALLERY_ITEM_TITLE = 'video-gallery__item-title';

  // APP CLASS
  function App() {
    this.nodes = {
      videoGallery: null,
    };
    this.state = {
      activeVideoID: '',
      videoMap: {},
    }
  }

  App.prototype.init = function() {
    this.cacheNodes();
    this.addEventListeners();
    this.setVideoDataToState(this.getVideoIDs());
  }

  App.prototype.addEventListeners = function() {
    this.nodes.videoGallery.onclick = this.handleClickOnVideoGallery.bind(this);
  }

  // HANDLES EVENTS

  App.prototype.handleClickOnVideoGallery = function(e) {
    var galleryItemId = this.getGalleryItemID(e.target);
    if (!galleryItemId) return;
    this.setState('activeVideoID', this.state.activeVideoID === galleryItemId ? '' : galleryItemId);
  }

  /**
   * 
   * @param {HTMLElement} target
   * @return {string}
   */
  App.prototype.getGalleryItemID = function(target) {
    var parentNode = target.parentNode;
    if (helpers.hasClass(parentNode, VIDEO_GALLERY_ITEM) && parentNode.dataset.id) {
      return parentNode.dataset.id;
    }
    return '';
  }

  App.prototype.cacheNodes = function() {
    this.nodes.videoGallery = document.getElementById(VIDEO_GALLERY);
  }

  /**
   * @return {Array<string>}
   */
  App.prototype.getVideoIDs = function() {
    var queryParams = helpers.getQueryParams();
    if (queryParams.id) {
      return helpers.parseIDs(queryParams.id);
    }
    return [];
  }

  /**
   * @param {Array<string>} videoIDs
   * @return {void}
   */
  App.prototype.setVideoDataToState = function(videoIDs) {
    var SELF = this;
    var videoMap = {}
    for (var i = 0; i < videoIDs.length; i++) {
      var videoUrl = helpers.createVideoUrl(videoIDs[i]);

      helpers.getVideoInfo(videoUrl, (function(isSuccess, res) {
        var i = this;
        if (isSuccess) {
          videoMap[videoIDs[i]] = res;
        }
        SELF.setState('videoMap', videoMap);
      }).bind(i))
    }
  }

  /**
   * Update state
   * 
   * @param {string} key 
   * @param {any} newChunkState 
   * @return {boolean}
   */
  App.prototype.setState = function(key, newChunkState) {
    if (this.state.hasOwnProperty(key) && typeof this.state[key] === typeof newChunkState) {
      this.state[key] = newChunkState;
      this.render(this.state);
      return true;
    }
    return false;
  }

  App.prototype.render = function(state) {
    // TODO: optimize render method
    var wrapper = document.createDocumentFragment();
    var scrollY = window.scrollY;
    this.nodes.videoGallery.innerHTML = '';

    for (var key in state.videoMap) {
      if (state.videoMap.hasOwnProperty(key) === false) return;
      wrapper.appendChild(this.createGalleryItem(key))
    }
    this.nodes.videoGallery.appendChild(wrapper);
    window.scroll(0, scrollY);
  }

  /**
   * @param {string} videoId
   * @return {HTMLElement | null}
   */
  App.prototype.createGalleryItem = function(videoId) {
    if (helpers.isValidVideoID(videoId) === false) {
      return null;
    }

    var galleryItem = document.createElement('li');
    galleryItem.classList.add(VIDEO_GALLERY_ITEM);
    galleryItem.dataset.id = videoId;

    if (this.state.activeVideoID === videoId) {
      var iframeVideo = document.createElement('iframe');
      iframeVideo.classList.add(VIDEO_GALLERY_IFRAME);
      iframeVideo.width = '100%';
      iframeVideo.height = '100%';
      iframeVideo.src = helpers.createEmbedVideoUrl(videoId);
      iframeVideo.allowFullscreen = 'true';
      iframeVideo.frameBorder = '0';
      galleryItem.appendChild(iframeVideo);
      return galleryItem;
    }

    // Image preview
    var galleryItemImage = document.createElement('img');
    galleryItemImage.classList.add(VIDEO_GALLERY_ITEM_PREVIEW);
    galleryItemImage.src = helpers.createImageUrl(videoId);
    galleryItemImage.alt = this.state.videoMap[videoId].title;
    galleryItem.appendChild(galleryItemImage);

    // Title
    var galleryItemTitle = document.createElement('div');
    galleryItemTitle.classList.add(VIDEO_GALLERY_ITEM_TITLE);
    galleryItemTitle.innerText = this.state.videoMap[videoId].title;
    galleryItem.appendChild(galleryItemTitle);

    return galleryItem;
  }

  return {
    App: App,
  }
})()

