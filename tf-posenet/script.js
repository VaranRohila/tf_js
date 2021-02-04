const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');
const predictButton = document.getElementById('predictButton');
var streamVar = undefined;

document.getElementById('cont').addEventListener('click', continous_prediction);
function continous_prediction () {
    wrapper();
}

predictButton.addEventListener('click', predict_once);
function predict_once () {
    predict_pose();
}

// Check if webcam access is supported.
function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }
  
  // If webcam supported, add event listener to button for when user
  // wants to activate it to call enableCam function which we will 
  // define in the next step.
  if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
  } else {
    console.warn('getUserMedia() is not supported by your browser');
  }
  
async function enableCam(event) {
    if (!net) {
      return;
    }
    event.target.classList.add('removed');  
    const constraints = {
      video: true
    };
    streamVar = await navigator.mediaDevices.getUserMedia(constraints)
    video.srcObject = streamVar;
    countDisplay.innerHTML = 0;
  }

demosSection.classList.remove('invisible');

var net = undefined;

posenet.load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    // inputResolution: { width: 640, height: 480 },
    multiplier: 0.75
  }).then(function (loadedModel) {
      net = loadedModel;
  });

var children = [];

async function predict_pose() {
    const pose = await net.estimateSinglePose(video, {
        flipHorizontal: true
      });
    draw(pose);
    // window.requestAnimationFrame(predict_pose);
}

function wrapper () {
    predict_pose();
    window.requestAnimationFrame(wrapper);
}
