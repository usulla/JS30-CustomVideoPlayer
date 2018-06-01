/* Get Our Elements*/

const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const btnToggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');
const btnFullscreen = document.querySelector('.fullscreen');
/* Build out functions */

function togglePlay(){
	const method = video.paused ? 'play':'pause';
	video[method]();
}

function updateButton(){
	const icon = this.paused?'►':'◼︎';
	btnToggle.textContent = icon;

}

function skip(){
	console.log(this.dataset);
	video.currentTime+=parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
	video[this.name]=this.value;
}

function handleProgress(){
	const percent = (video.currentTime/video.duration)*100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
	console.log(e)
	const scrubTime = (e.offsetX/progress.offsetWidth)*video.duration;
	video.currentTime = scrubTime;
}
function fullscreen(e){
	if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) { 
	  if(document.documentElement.mozRequestFullScreen){
	  	video.mozRequestFullScreen();
	  } else if(document.documentElement.RequestFullScreen){
		video.RequestFullScreen();
	  } else if(document.documentElement.webkitRequestFullScreen){
	  	video.webkitRequestFullScreen();
	  }
	} 
	else{
		if(document.cancelFullScreen){
 			document.cancelFullScreen();
		} 
		else if(document.mozCancelFullScreen){
			document.mozCancelFullScreen();
		}
		else if(document.webkitCancelFullScreen){
			document.webkitCancelFullScreen();
		}
	}
}
/* Hook up he event listeners */

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

btnToggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown',  () => mousedown = true);
progress.addEventListener('mouseup',  () => mousedown = false);

btnFullscreen.addEventListener('click', fullscreen);

