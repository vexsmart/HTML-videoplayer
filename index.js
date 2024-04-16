// get our elements
//  ❚ ❚ || ► 
let mouseDown = false

const player = document.querySelector(".player")
const videoPlayer = document.querySelector(".player__video")
const playButton = document.querySelector(".toggle")
const rangeInputs = document.querySelectorAll(`.player__slider`)
const skipButtons = document.querySelectorAll(`[data-skip]`)
const progressTrack = document.querySelector(".progress")
const progressBar = document.querySelector(".progress__filled")
const fullScreenBtn = document.getElementById("screen")
console.log(fullScreenBtn)


//  build out functins

function togglePlay(e){
    if(videoPlayer.paused){
        videoPlayer.play()
    }else {
        videoPlayer.pause()
    }
}

function updateButton(){
    const icon = this.paused ? "►" : "❚ ❚"
    playButton.textContent = icon
}

function skip(){
   const skipTime = this.dataset.skip
    videoPlayer.currentTime += parseFloat(skipTime)
}

function handleRange(){
    videoPlayer[this.name] = this.value 
}

function updateBar(){
    const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function updateTimeBar(e){
    const newTime = (e.offsetX / progressTrack.offsetWidth) * videoPlayer.duration
    console.log(newTime)
    console.log(e)
    videoPlayer.currentTime = newTime
}

function toggleFullScreen(e){
    if(!document.fullscreenElement){
        player.requestFullscreen()
    }else {
        document.exitFullscreen()
    }
}

// hook up the event listeners
playButton.addEventListener("click", togglePlay)
videoPlayer.addEventListener("click", togglePlay )
videoPlayer.addEventListener("timeupdate", updateBar)
videoPlayer.addEventListener("play", updateButton )
videoPlayer.addEventListener("pause", updateButton )

progressTrack.addEventListener("click", updateTimeBar)
progressTrack.addEventListener("mousemove", (e) => mouseDown && updateTimeBar(e))
progressTrack.addEventListener("mousedown", () => mouseDown = true)
progressTrack.addEventListener("mouseup", () => mouseDown = false)

fullScreenBtn.addEventListener("click", toggleFullScreen)

skipButtons.forEach(button => button.addEventListener("click", skip))
rangeInputs.forEach(input => input.addEventListener("change", handleRange))