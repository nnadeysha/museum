export class VideoPlayer {
  constructor(video) {
    this.video = video.querySelector(".video");
    const Video = this.video;
    this.playBtn = document.querySelector(".video-play");
    this.playBigBtn = document.querySelector(".video-play-big-btn");
    this.time = document.querySelector(".control-time");
    this.mute = document.querySelector(".volume-icon");
    this.progress = document.querySelector(".progress");
    this.progressVolume = document.querySelector(".progress-volume");
    this.fullscreenbtn = document.querySelector(".scale-icon");
    this.inFocus;
  }

  init() {
    this.video.addEventListener("timeupdate", () => this.updateProgress());
    this.video.addEventListener("play", () => this.updateToggle());
    this.video.addEventListener("pause", () => this.updateToggle());
    this.playBtn.addEventListener("click", () => this.togglePlay());
    this.video.addEventListener("click", () => this.togglePlay());
    this.playBigBtn.addEventListener("click", () => this.togglePlay());
    this.mute.addEventListener("click", () => this.vidmute());
    this.progressVolume.addEventListener("input", () => this.videoVolume());
    this.progress.addEventListener("input", () => this.setProgress());
    this.progress.addEventListener("clock", (e) => this.videoRewind(e));
    window.addEventListener("keydown", (e) => this.handleKeys(e));

    this.fullscreenbtn.addEventListener("click", (e) =>
      this.toggleFullScreen(e)
    );
  }
  togglePlay() {
    const method = this.video.paused ? "play" : "pause";
    this.video[method]();
  }

  updateProgress() {
    this.progress.value = (this.video.currentTime / this.video.duration) * 100;
    let minutes = Math.floor(this.video.currentTime / 60);
    let seconds = Math.floor(this.video.currentTime % 60);
    if (minutes < 10) {
      minutes = "0" + String(minutes);
    }
    if (seconds < 10) {
      seconds = "0" + String(seconds);
    }
    this.time.innerHTML = `${minutes}:${seconds}`;
    this.progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${this.progress.value}%, #C4C4C4 ${this.progress.value}%, grey 100%)`;
  }

  vidmute() {
    if (this.video.muted) {
      this.video.muted = false;
      this.mute.classList.remove("muteon");
      this.mute.style.backgroundImage = "url(./images/btn-volume.svg)";
    } else {
      this.video.muted = true;
      this.mute.classList.toggle("muteon");
      this.mute.style.backgroundImage = "url(./images/mute.svg)";
    }
  }

  videoVolume() {
    this.video.volume = this.progressVolume.value / 100;
    if (this.progressVolume.value > 0) {
      this.mute.style.backgroundImage = "url(./images/btn-volume.svg)";
    } else {
      this.mute.style.backgroundImage = "url(./images/mute.svg)";
    }
    this.progressVolume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${this.progressVolume.value}%, #C4C4C4 ${this.progressVolume.value}%, grey 100%)`;
  }

  setProgress() {
    this.video.currentTime = (this.progress.value * this.video.duration) / 100;
    this.progress.value = (this.video.currentTime / this.video.duration) * 100;
    const value = this.progress.value;
    this.progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, grey 100%)`;
  }

  updateToggle() {
    if (this.video.paused) {
      this.playBtn.style.backgroundImage = "url(./images/btn-play-mini.svg)";
      this.playBigBtn.style.display = "block";
    } else if (this.video.play) {
      this.playBtn.style.backgroundImage = "url(./images/pause.svg)";
      this.playBigBtn.style.display = "none";
      this.video.playbackRate = 1;
    }
  }

  videoRewind(e) {
    let w = this.offsetWidth;
    let o = e.offsetX;
    this.value = (100 * o) / w;
    this.video.pause();
    this.video.currentTime = this.video.duration * (o / w);
  }
  toggleFullScreen() {
    if (this.video.webkitRequestFullScreen) {
      this.video.webkitRequestFullScreen();
    }
  }

  handleKeys(e) {
    if (e.keyCode == 32) {
        this.video[method] = this.video.paused ? "play" : "pause";
      this.video[method]();
    }
    if (e.keyCode == 77) {
      this.video.muted = !this.video.muted;
    }
    if (e.keyCode == 70) {
      if (this.toggleFullScreen() == false) {
        this.toggleFullScreen();
      }
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    if ((e.keyCode == 188) & e.shiftKey) {
      this.video.playbackRate = 1.5;
    }
    if ((e.keyCode == 190) & e.shiftKey) {
      this.video.playbackRate = 0.5;
    }
  }
}
