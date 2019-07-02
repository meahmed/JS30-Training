const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen__button');
let ismousedown = false;

function togglePlay(){
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}
function updateStatus(){
	const icon = video.paused ?  '►' : '❚ ❚';
	toggle.textContent = icon;
}
function skip(){
	video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate(){
	if(ismousedown){
		video[this.name] = this.value;
	console.log(this.name);
	console.log(this.value);
	}
	else{
		return;
	}
}

function handleVideoProgress(){
	let videoPer = (video.currentTime/video.duration)*100;
	progressBar.style.flexBasis = `${videoPer}%`;
}

function scrub(e){
	const scrubTime = (e.offsetX/progress.offsetWidth)*video.duration;
	video.currentTime = scrubTime;
}

function makeFullscreen(){
	console.log(video.requestFullScreen);
	if (video.requestFullscreen) {
	  video.requestFullscreen();
	} else if (video.mozRequestFullScreen) {
	  video.mozRequestFullScreen();
	} else if (video.webkitRequestFullscreen) {
	  video.webkitRequestFullscreen();
	} else if (video.msRequestFullscreen) { 
	  video.msRequestFullscreen();
	}
}

video.addEventListener('click',togglePlay);
video.addEventListener('play',updateStatus);
video.addEventListener('pause',updateStatus);
video.addEventListener('timeupdate',handleVideoProgress);
toggle.addEventListener('click',togglePlay);
skipButtons.forEach(skips => skips.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change',() =>{video[range.name]=range.value;}));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousedown',() => ismousedown = true));
ranges.forEach(range => range.addEventListener('mouseup',() => ismousedown = false));
progress.addEventListener('mousemove',()=>ismousedown && scrub);
progress.addEventListener('mousedown',() => ismousedown=true);
progress.addEventListener('mouseup',() => ismousedown=false);
progress.addEventListener('click',scrub);
fullscreen.addEventListener('click',makeFullscreen);