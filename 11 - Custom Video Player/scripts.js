// gather elements from HTML

const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
// controls both skip buttons
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullscreenButton = player.querySelector('.fullscreen_button')

/* -------build functions----------- */
// toggle between playing and pausing using ternery
function togglePlay() {
    console.log(video.paused)
    video.paused ? video.play() : video.pause()
}

// update Play button
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚'
    console.log(icon)
    toggle.textContent = icon
}

// interval skip buttons
function skip() {
    console.log(this.dataset.skip)
    video.currentTime += parseFloat(this.dataset.skip)
}

// volume and speed range
function handleRangeUpdate() {
    video[this.name] = this.value
}

// progress bar
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}

// fullscreen button
function fullscreen() {
    console.log("clicked!")
    // player.style.width = `${100}%`
    player.requestFullscreen()
}

/* ---------event listeners----------- */
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)
toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
/* ---------progressbar listeners----------- */
progress.addEventListener('click', scrub)
let mousedown = false
progress.addEventListener('mousemove', (e) => {
    return mousedown && scrub;
})
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
/* ---------fullscreen----------- */
fullscreenButton.addEventListener('click', fullscreen)