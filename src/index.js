import adaptstyle from "/styles/adaptivestyle.css";
import { TicketForm } from "/form.js";
import { VideoPlayer } from "./videoplayer.js";
/* import {slideWidthChange} from './explore-slider.js';
slideWidthChange(); */
import { ExploreSlider } from "./explore-slider.js";

//welcome slider

const burger = document.querySelector(".burger"),
  nav = document.querySelector(".header-navigation"),
  navList = document.querySelector(".nav-list"),
  links = document.querySelectorAll(".link"),
  welcomeTitle = document.querySelector(".welcome");
const welcomeWrapper = document.querySelector(".welcome-wrapper");
const mainMenu768 = document.querySelector(".main-menu-768w");



/* Swiper */
// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";

// import styles bundle
import "swiper/css/bundle";

// init Swiper:
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  grabCursor: true,
  spaceBetween: 10,
  initialSlide: 0,
  speed: 800,

  keyboard: {
    enabled: true,
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  /* hashNavigation: {
    watchState: true
  }, */

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

(document.getElementById("swiper-fraction-current").textContent =
  "0" + swiper.activeIndex),
  swiper.on("slideChange", function () {
    document.getElementById("swiper-fraction-current").textContent = `0${
      swiper.realIndex + 1
    }`;
  });



//gamburger-menu

function gamburger() {
  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    navList.classList.toggle("activenavlist");
    burger.classList.toggle("toggle");
    welcomeTitle.classList.toggle("activewelcome");
    welcomeWrapper.classList.toggle("activewelcomeALL");
    mainMenu768.classList.toggle("active-main-menu-768w");
  });
}

links.forEach((n) => n.addEventListener("click", closeMenu));
function closeMenu() {
  nav.classList.remove("active");
  burger.classList.remove("toggle");
  welcomeTitle.classList.remove("activewelcome");
  navList.classList.remove("activenavlist");
  welcomeWrapper.classList.remove("activewelcomeALL");
  mainMenu768.classList.remove("active-main-menu-768w");
}

gamburger();

AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 100, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 600, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

//VIDEO
document.documentElement.addEventListener(
  "keydown",
  function (e) {
    if ((e.keycode || e.which) == 32) {
      e.preventDefault();
    }
  },
  false
);

let player = new VideoPlayer(video);
player.init();

//EXPLORE

let expSl = document.querySelector(".explore-slider");
let exploreSlider = new ExploreSlider(expSl);
exploreSlider.slideWidthChange();

//TICKETS

const overlay = document.querySelector(".overlay");

const buyBtn = document.querySelector(".buy-button");

const ticketForm = new TicketForm(overlay);

buyBtn.onclick = () => ticketForm.show(totalPrice, seniorTypeTicket);

const seniorTypeTicket = document.querySelector(".senior");
const basicTypeTicket = document.querySelector(".basic");
const total = document.querySelector(".total");
const inputsTickets = document.querySelectorAll("#tickets-buy-input");
const radioType = document.querySelectorAll('input[type="radio"]');

let totalPrice;

let calculate = () => {
  for (const radio of radioType) {
    if (radio.checked) {
      totalPrice =
        (parseInt(seniorTypeTicket.value) * parseInt(radio.value)) / 2 +
        parseInt(basicTypeTicket.value) * parseInt(radio.value);
    }
  }
  total.innerHTML = `Total: €${totalPrice}`;
};

for (const inputTicket of inputsTickets) {
  inputTicket.addEventListener("click", function () {
    calculate();
    localStorage.setItem("seniorTypeTicket", seniorTypeTicket.value.toString());
    localStorage.setItem("basicTypeTicket", basicTypeTicket.value.toString());
    localStorage.setItem("Total", totalPrice.toString());
  });
}

//LOCALST

const inputLS = document.querySelectorAll(".tickets-buy input");
console.log(inputLS);

for (let i = 0; i < inputLS.length; i++) {
  inputLS[i].addEventListener("change", changeHandler);
}

function changeHandler() {
  if (this.type == "radio") {
    localStorage.setItem(this.name, this.checked);
  }
}

document
  .querySelector('input[name="radio1"]')
  .addEventListener("click", (e) => {
    localStorage.removeItem("radio2");
    localStorage.removeItem("radio3");
    document.querySelector('input[name="radio2"]').checked = false;
    document.querySelector('input[name="radio3"]').checked = false;
  });
document
  .querySelector('input[name="radio2"]')
  .addEventListener("click", (e) => {
    localStorage.removeItem("radio1");
    localStorage.removeItem("radio3");
    document.querySelector('input[name="radio1"]').checked = false;
    document.querySelector('input[name="radio3"]').checked = false;
  });
document
  .querySelector('input[name="radio3"]')
  .addEventListener("click", (e) => {
    localStorage.removeItem("radio1");
    localStorage.removeItem("radio2");
    document.querySelector('input[name="radio1"]').checked = false;
    document.querySelector('input[name="radio2"]').checked = false;
  });

function checkStor() {
  for (let i = 0; i < inputLS.length; i++) {
    if (inputLS[i].type === "radio") {
      inputLS[i].checked = localStorage.getItem(inputLS[i].name);
    } else {
      seniorTypeTicket.value = parseFloat(
        localStorage.getItem("seniorTypeTicket")
      );
      basicTypeTicket.value = parseFloat(
        localStorage.getItem("basicTypeTicket")
      );
      totalPrice = parseFloat(localStorage.getItem("Total"));
      total.innerHTML = `Total: €${totalPrice}`;
    }
  }
}
checkStor();

//разбить на модули не бол 100 строк

/* let images = [];
  for (let i = 1; i < 16; i++) {
    let img = `<img src="images/gallery/galery${i}.jpg" alt="gallery${i}">`
    images.push(img)
  }
  
  let i = 0, arr = [], temp;
  
  while (arr.length < 15) {
    temp = Math.trunc(Math.random() * 15 + 1);
    if (!arr.includes(temp)) {
      arr.push(temp);
    };
  }
  let randomImages = [];
  for (let i = 0; i < 15; i++) {
    randomImages.push(images[arr[i] - 1])
  }
  
  galleryImgContainer.innerHTML = randomImages.join('');
   */

//art gallery surfacing

/* 
  const video = document.querySelector('.video');
  const playBtn = document.querySelector('.video-play');
  const playBigBtn = document.querySelector('.video-play-big-btn');
  const time = document.querySelector('.control-time');
  const mute = document.querySelector('.volume-icon');
  
  const fullscreenbtn = document.querySelector('.scale-icon');
  
  //progress volume
  mute.onclick = vidmute;
  function vidmute(){
    if(video.muted){
      video.muted = false;
      mute.classList.remove('muteon');
      mute.style.backgroundImage = "url(./images/btn-volume.svg)";
    } else {
      video.muted = true;
      mute.classList.toggle('muteon');
      mute.style.backgroundImage = "url(./images/mute.svg)";
    }
  }
  
 

  progressVolume.oninput = videoVolume;
  function videoVolume() {
  video.volume = this.value/100;
  
  if(video.volume > 0){
    mute.style.backgroundImage = "url(./images/btn-volume.svg)";
  } else {
    mute.style.backgroundImage = "url(./images/mute.svg)";
  }
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, grey 100%)`
  
  }
  
  //progress video
  progress.oninput = setProgress;
  function setProgress() {
    video.currentTime = (progress.value * video.duration) / 100;
    progress.value = (video.currentTime / video.duration) * 100
    
    progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progress.value}%, #C4C4C4 ${progress.value}%, grey 100%)`
  }
  
  
  
    //timer
   function updateProgress(){
     progress.value = (video.currentTime / video.duration) * 100
  
     //minutes
      let minutes = Math.floor(video.currentTime / 60);
      if(minutes < 10) {
        minutes = '0' + String(minutes)
      }
     //seconds
     let seconds = Math.floor(video.currentTime % 60)
     if(seconds < 10) {
      seconds = '0' + String(seconds)
    }
  
     time.innerHTML = `${minutes}:${seconds}`
   }
  
  
    //play & pause
  playBtn.onclick = updateToggle;
    function updateToggle() {
      if (video.paused) {
       playBtn.style.backgroundImage = "url(./images/btn-play-mini.svg)";
       playBigBtn.style.display = 'block';
      } else if (video.play) {
        playBtn.style.backgroundImage = "url(./images/pause.svg)";
        playBigBtn.style.display = 'none';
        video.playbackRate =1;
      }
    }
  
   function togglePlay() {
     const method = video.paused ? 'play' : 'pause';
     video[method]()
   }
  
  //rewind
  
  progress.onclick = videoRewind;
  function videoRewind(event) {
    let w = this.offsetWidth;
    let o = event.offsetX;
    this.value = 100 * o/w;
    video.pause();
    video.currentTime = video.duration * (o/w)
  }
   
  
  //keyboard events
  
  document.body.onkeyup = function(e){
    if(e.keyCode == 32){
      const method = video.paused ? 'play' : 'pause';
     video[method]()
    } 
    if(e.keyCode == 77) {
      video.muted = !video.muted;
      
    }
    if(e.keyCode == 70) {
      if(toggleFullScreen() == false) {
        toggleFullScreen()
      } if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    if(e.keyCode == 188 & e.shiftKey ) {
      video.play();
      video.playbackRate = 1.5;
    }
    if(e.keyCode == 190 & e.shiftKey ) {
      video.play();
      video.playbackRate = 0.5;
      
    }
   
}



  document.documentElement.addEventListener('keydown', function (e) {
    if ( ( e.keycode || e.which ) == 32) {
        e.preventDefault();
    }
}, false);


   //fullscreen

   function toggleFullScreen(){
    if(video.requestFullScreen){
      video.requestFullScreen();
    } else if(video.webkitRequestFullScreen){
      video.webkitRequestFullScreen();
    } else if(video.mozRequestFullScreen){
      video.mozRequestFullScreen();
    }

  }
  
  
  fullscreenbtn.addEventListener("click",toggleFullScreen,false);
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
playBigBtn.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggle);
video.addEventListener('pause', updateToggle);
video.addEventListener('timeupdate', updateProgress);
progress.addEventListener('change', setProgress) 
*/
