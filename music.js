// // um modified  💔

// let ul = document.querySelector(".album").querySelector("ul");
// let player = document.querySelector(".player").lastElementChild;
// let album = document.querySelector(".album").firstElementChild;
// let songs = [];
// let songurls = [];
// let songname = document.querySelector(".song").firstElementChild;
// let artist = document.querySelector(".artist").firstElementChild;
// let li = ul.childNodes;
// let playbutton = document.querySelector(".plab");
// let allaudio = new Audio();
// let pic = document.querySelector(".pic");
// let prev = document.querySelector(".prevnext").firstElementChild;
// let next = document.querySelector(".prevnext").lastElementChild;

// let f = playbutton.addEventListener("click", () => {
//   if (allaudio.paused) {
//     allaudio.play();
//     playbutton.innerHTML = '<i class="fa-solid fa-pause"></i>';
//   } else if (allaudio.played) {
//     allaudio.pause();
//     playbutton.innerHTML =
//       '<i style="position: relative; left: 2px" class="fa-solid fa-play"></i>';
//   }
// });

// // for convert api to songs-->>
// let getapi = async () => {
//   let api = await fetch("allsongs");
//   let response = await api.text();
//   let div = document.createElement("div");
//   div.innerHTML = response;
//   let a = div.getElementsByTagName("a");

//   for (let i = 0; i < a.length; i++) {
//     const element = a[i];
//     if (element.href.endsWith(".mp3")) {
//       songs.push(element.href.split("allsongs/")[1].replaceAll("%20", " "));
//       songurls.push(element.href);
//     }
//   }

//   return songs;
// };

// // for get the album area and for close-->>
// player.addEventListener("click", () => {
//   ul.style.top = "-235px";
//   ul.style.opacity = 1;
//   document.querySelector(".cut").addEventListener("click", () => {
//     ul.style.top = "60px";
//     ul.style.opacity = 0;
//   });
// });

// let playpause = async () => {
//   let getsong = await getapi();
//   // console.log(getsong);

//   // append all songs to list-->>
//   getsong.forEach((w, h) => {
//     let li = document.createElement("li");
//     li.innerHTML = w;
//     album.append(li);
//     // console.log(w)
//     // for update songname & artist-->>
//     li.addEventListener("click", () => {
//       songname.innerHTML = w.split("_")[0].split(".")[0];
//       artist.innerHTML = w.split("_")[1].split(".")[0];

//       //   for play songs-->>
//       allaudio.src = songurls[h];

//       allaudio.play();
//       playbutton.innerHTML = '<i class="fa-solid fa-pause"></i>';

//       f;
//       // it calculate song current time & duration to minuts-->>
//       function formatToMinutesSeconds(totalSeconds) {
//         // Calculate minutes and remaining seconds
//         const minutes = Math.floor(totalSeconds / 60);
//         const seconds = Math.floor(totalSeconds % 60);

//         // Ensure both minutes and seconds are two digits
//         const formattedMinutes = String(minutes).padStart(2, "0");
//         const formattedSeconds = String(seconds).padStart(2, "0");

//         return `${formattedMinutes}:${formattedSeconds}`;
//       }
//       // seek bar & current time update-->>
//       let currenttime = document.querySelector(".timer").firstElementChild;
//       let duration = document.querySelector(".timer").lastElementChild;
//       let seekbar = document.querySelector(".seekbar").firstElementChild;

//       allaudio.addEventListener("timeupdate", () => {
//         currenttime.innerHTML = `${formatToMinutesSeconds(
//           allaudio.currentTime
//         )}`;
//         duration.innerHTML = `${formatToMinutesSeconds(allaudio.duration)}`;
//         seekbar.value = (allaudio.currentTime / allaudio.duration) * 100;
//         pic.style.rotate = `${allaudio.duration * 100}deg`;
//         pic.style.transition = `all linear ${allaudio.duration}s`;

//         seekbar.addEventListener("input", () => {
//           allaudio.currentTime = (allaudio.duration / 100) * seekbar.value;
//         });
//       });
//     });
//   });
//   let prevnext = () => {
//     // for next and previous songs-->>

//     next.addEventListener("click", () => {
//       allaudio.src = songurls[songurls.indexOf(allaudio.src) + 1];
//       // console.log(songs[songurls.indexOf(allaudio.src)]);
//       songname.innerHTML = songs[songurls.indexOf(allaudio.src)]
//         .split("_")[0]
//         .split(".")[0];
//       artist.innerHTML = songs[songurls.indexOf(allaudio.src)]
//         .split("_")[1]
//         .split(".")[0];
//       allaudio.play();
//       f;
//       playbutton.innerHTML = '<i class="fa-solid fa-pause"></i>';
//     });
//     prev.addEventListener("click", () => {
//       allaudio.src = songurls[songurls.indexOf(allaudio.src) - 1];
//       songname.innerHTML = songs[songurls.indexOf(allaudio.src)]
//         .split("_")[0]
//         .split(".")[0];
//       artist.innerHTML = songs[songurls.indexOf(allaudio.src)]
//         .split("_")[1]
//         .split(".")[0];
//       allaudio.play();
//       f;
//       playbutton.innerHTML = '<i class="fa-solid fa-pause"></i>';
//     });
//   };
//   prevnext();
// };
// playpause();

// modified code  😊

// 🎧 Core Elements
const ul = document.querySelector(".album ul");
const player = document.querySelector(".player").lastElementChild;
const album = document.querySelector(".album").firstElementChild;
const songname = document.querySelector(".song").firstElementChild;
const artist = document.querySelector(".artist").firstElementChild;
const playButton = document.querySelector(".plab");
const audio = new Audio();
const pic = document.querySelector(".pic");
const prevBtn = document.querySelector(".prevnext").firstElementChild;
const nextBtn = document.querySelector(".prevnext").lastElementChild;
const seekbar = document.querySelector(".seekbar input");
const currentTimeEl = document.querySelector(".timer").firstElementChild;
const durationEl = document.querySelector(".timer").lastElementChild;

let songs = [];
let songUrls = [];
let currentIndex = 0;

// 🌀 Utility: Format MM:SS
const formatTime = (secs) => {
  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(Math.floor(secs % 60)).padStart(2, "0");
  return `${m}:${s}`;
};

// 🧠 Update UI & Audio State
const updateNowPlaying = (index) => {
  const name = songs[index].split("_")[0].split(".")[0];
  const artistName = songs[index].split("_")[1].split(".")[0];

  songname.textContent = name;
  artist.textContent = artistName;
  audio.src = songUrls[index];
  audio.play();
  playButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;

  animateAlbumArt(audio.duration);
};

// 🎨 Album Art Rotation
const animateAlbumArt = (duration) => {
  pic.style.transition = `transform ${duration}s linear`;
  pic.style.transform = `rotate(${duration * 50}deg)`;
};

// ▶️ Toggle Play / Pause
const togglePlayback = () => {
  if (audio.paused) {
    audio.play();
    playButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  } else {
    audio.pause();
    playButton.innerHTML = `<i class="fa-solid fa-play" style="position: relative; left: 2px;"></i>`;
  }
};

playButton.addEventListener("click", togglePlayback);

// 🎛️ Seekbar Logic
audio.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration || 0);
  seekbar.value = (audio.currentTime / (audio.duration || 1)) * 100;
});

seekbar.addEventListener("input", () => {
  audio.currentTime = (audio.duration / 100) * seekbar.value;
});

// ⏮️⏭️ Navigation Logic
const handleNavigation = (direction) => {
  const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
  if (newIndex >= 0 && newIndex < songs.length) {
    currentIndex = newIndex;
    updateNowPlaying(currentIndex);
  }
};

nextBtn.addEventListener("click", () => handleNavigation("next"));
prevBtn.addEventListener("click", () => handleNavigation("prev"));

// 📁 Fetch Songs from API
const fetchSongs = async () => {
  try {
    const res = await fetch("allsongs");
    const html = await res.text();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    [...tempDiv.getElementsByTagName("a")].forEach((a) => {
      if (a.href.endsWith(".mp3")) {
        const filename = decodeURIComponent(a.href.split("allsongs/")[1]);
        songs.push(filename);
        songUrls.push(a.href);
      }
    });
  } catch (err) {
    console.error("Failed to load songs:", err);
  }
};

// 📜 Populate Album List
const populateAlbum = () => {
  album.innerHTML = ""; // Clear existing
  songs.forEach((title, index) => {
    const li = document.createElement("li");
    li.textContent = title;
    li.classList.add("song-item");
    li.addEventListener("click", () => {
      currentIndex = index;
      updateNowPlaying(index);
    });
    album.appendChild(li);
  });
};

// this function is called to next song when the current song ends

audio.addEventListener("ended", () => {
  if (currentIndex < songs.length - 1) {
    currentIndex++;
    updateNowPlaying(currentIndex);
  } else {
    playButton.innerHTML = `<i class="fa-solid fa-play" style="position: relative; left: 2px;"></i>`;
  }
});

// 🧱 Slide Album List
const setupPlayerSlide = () => {
  player.addEventListener("click", () => {
    ul.style.transition = "top 0.3s ease, opacity 0.3s ease";
    ul.style.top = "-235px";
    ul.style.opacity = 1;

    document.querySelector(".cut").addEventListener("click", () => {
      ul.style.top = "60px";
      ul.style.opacity = 0;
    });
  });
};

// 🚀 Init Everything
const initPlayer = async () => {
  await fetchSongs();
  populateAlbum();
  setupPlayerSlide();
};

initPlayer();
