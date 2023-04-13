import "./style.css";
import { default as song1Url } from "./music/gran-error-clap-clap.mp3";
import { default as song2Url } from "./music/ava-max-dancings-done.mp3";
import { default as song3Url } from "./music/jonas-blue-weekends.mp3";
import { default as song4Url } from "./music/sigala-radio.mp3";

import { default as img1 } from "./img/img-song1.png";
import { default as img2 } from "./img/img-song2.png";
import { default as img3 } from "./img/img-song3.png";
import { default as img4 } from "./img/img-song4.png";

const song1 = {
  title: "Clap Clap",
  author: "Gran Error",
  year: 2022,
  audioUrl: song1Url,
  imgUrl: img1,
};

const song2 = {
  title: `Dancing's Done`,
  author: "Ava Max",
  year: 2022,
  audioUrl: song2Url,
  imgUrl: img2,
};

const song3 = {
  title: "Weekends",
  author: "Jonas Blue",
  year: 2023,
  audioUrl: song3Url,
  imgUrl: img3,
};

const song4 = {
  title: "Radio",
  author: "Sigala",
  year: 2023,
  audioUrl: song4Url,
  imgUrl: img4,
};

const btnPlay = document.querySelector("#btn-play");
const btnPause = document.querySelector("#btn-pause");
const progress = document.querySelector("#progress");
const progressBar = document.querySelector("#progress-bar");
const btnNext = document.querySelector("#next");
const btnPrev = document.querySelector("#prev");
const songs = [song1, song2, song3, song4];
const imgSong = document.querySelector("#img-song");
const titleSong = document.querySelector("#title");
const authorSong = document.querySelector("#author");
let currentSongIndex = 0;
let audioElement;

function newSong() {
  audioElement = new Audio(songs[currentSongIndex].audioUrl);
  imgSong.src = songs[currentSongIndex].imgUrl;
  titleSong.innerHTML = songs[currentSongIndex].title;
  authorSong.innerHTML = `${songs[currentSongIndex].author}, ${songs[currentSongIndex].year}`;
}

function pause() {
  audioElement.pause();
  btnPause.classList.add("displayNone");
  btnPause.classList.remove("displayBlock");
  btnPlay.classList.add("displayBlock");
  btnPlay.classList.remove("displayNone");
}

function play() {
  audioElement.play();
  btnPlay.classList.add("displayNone");
  btnPlay.classList.remove("displayBlock");
  btnPause.classList.add("displayBlock");
  btnPause.classList.remove("displayNone");

  audioElement.addEventListener("timeupdate", () => {
    progress.style.width =
      (audioElement.currentTime / audioElement.duration) * 100 + "%";
    if (progress.style.width === 100 + "%") {
      pause();
    }
  });
}

function stop() {
  audioElement.pause();
  audioElement.currentTime = 0;
}

newSong();

btnPlay.addEventListener("click", play);

btnPause.addEventListener("click", pause);

btnNext.addEventListener("click", () => {
  if (currentSongIndex === songs.length - 1) {
    currentSongIndex = 0;
  } else {
    currentSongIndex += 1;
  }
  stop();
  newSong();
  play();
});

btnPrev.addEventListener("click", () => {
  if (currentSongIndex === 0) {
    currentSongIndex = songs.length - 1;
  } else {
    currentSongIndex -= 1;
  }
  stop();
  newSong();
  play();
});

progressBar.addEventListener("click", (e) => {
  const progressBarClientRect = progressBar.getBoundingClientRect();
  const percentageWidth =
    ((e.pageX - progressBarClientRect.left) / progressBarClientRect.width) *
    100;

  progress.style.width = `${percentageWidth}%`;
  audioElement.currentTime = (audioElement.duration * percentageWidth) / 100;
});
