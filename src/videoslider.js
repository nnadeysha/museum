var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      const player = document.querySelectorAll('.player');
      let playerID = player.attr(ID);
      
      let playerSlide;
      function onYouTubeIframeAPIReady() {
        playerSlide = new YT.Player(playerID, {
            playerVars: { 'autoplay': 0, 'controls': 1 },
          height: '254',
          width: '452',
          videoId: 'zp1BXPX8jcU',
          events: {
            //'onReady': onPlayerReady,
            //'onStateChange': onPlayerStateChange
          }
        });
      };
      
      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          //setTimeout(stopVideo, 6000);
          done = true;
        }
      }
     /*  function stopVideo() {
        player.stopVideo();
      } */