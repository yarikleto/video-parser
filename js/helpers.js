var helpers = (function() {
  return {
    getQueryParams: getQueryParams,
    parseIDs: parseIDs,
    isValidVideoID: isValidVideoID,
    createImageUrl: createImageUrl,
    createVideoUrl: createVideoUrl,
    getVideoInfo: getVideoInfo,
    createEmbedVideoUrl: createEmbedVideoUrl,
    hasClass: hasClass,
  }

  /**
   * Example: ?id=123 -> { id: '123' }
   *
   * @return {Object}
   */
  function getQueryParams() {
    var queryString = window.location.search;
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  }

  /**
   *
   * @param {string} ids
   * @return {Array<string>}
   */
  function parseIDs(ids) {
    var listIDs = ids.split(/\s|,/);
    var validIDs = [];

    for (var i = 0; i < listIDs.length; i++) {
      isValidVideoID(listIDs[i]) && validIDs.push(listIDs[i]);
    }

    return validIDs;
  }

  /**
   * The example valid id: RBbkCEHBw_I, Wpm07-BGJnE
   * 
   * @param {string} id
   * @return {boolean}
   */
  function isValidVideoID(videoId) {
    return videoId.length === 11 && RegExp('([a-zA-Z0-9\-\_]){11}').test(videoId);
  }

  /**
   * @param {string} videoId Valid id of video
   * @return {string} Image url
   */
  function createImageUrl(videoId) {
    if (isValidVideoID(videoId) === false) {
      return '';
    }

    return 'http://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg';
  }

  /**
   * @param {string} videoId Valid id of video
   * @return {string} Video url
   */
  function createVideoUrl(videoId) {
    if (isValidVideoID(videoId) === false) {
      return '';
    }
    return 'https://www.youtube.com/watch?v=' + videoId;
  }

  /**
   * @param {string} videoId Valid id of video
   * @return {string} Embed video url
   */
  function createEmbedVideoUrl(videoId, config) {
    if (isValidVideoID(videoId) === false) {
      return '';
    }

    // TODO: Create parser config
    if (!config) {
      config = {
        autoplay: 1,
      }
    }
    return 'https://www.youtube.com/embed/' + videoId + '?autoplay=' + config.autoplay;
  }

  /**
   * @param {string} videoUrl
   * @param {Function} cb The function receives two parameters: isSuccess, response.
   */
  function getVideoInfo(videoUrl, cb) {
    fetch('https://noembed.com/embed?url=' + videoUrl, null, function(isSuccess, res) {
      if (isSuccess === false) {
        cb(false)
        console.error(res)
      } else {
        cb(true, res)
      }
    })
  }

  /**
   * Create a request to the server
   *
   * @param {string} url 
   * @param {Function} cb The function receives two parameters: isSuccess, response.
   * @param {Object} options { method, body }
   */
  function fetch(url, options, cb) {
    var xhr = new XMLHttpRequest();

    if (!options) {
      options = {
        method: 'GET',
      }
    }
    xhr.open(options.method.toUpperCase(), url);
    if (options.body) {
      xhr.send(JSON.stringify(options.body));
    } else {
      xhr.send();
    }

    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) return;
      if (xhr.status != 200) {
        cb(false, xhr)
      } else {
        try {
          var data = JSON.parse(xhr.responseText)
        } catch(err) {
          console.error(err)
          cb(true, xhr.response)
        }
        cb(true, data)
      }
    }
  }

  /**
   * 
   * @param {HTMLElement} node
   * @param {string} className
   * @return {boolean}
   */
  function hasClass(node, className) {
    return node.classList.contains(className)
  }
})()

