Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./weights'),
  faceapi.nets.faceExpressionNet.loadFromUri('./weights')
])


var video = document.getElementById('webcamVideo');
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    video.srcObject = stream;
    video.play();
});
}

async function onPlay() {
const videoEl = $('#webcamVideo').get(0)
const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 224 })

if(videoEl.paused || videoEl.ended )
  return setTimeout(() => onPlay())

const result = await faceapi.detectSingleFace(videoEl, options).withFaceExpressions()

if (result) {
  // get expression and change text 
  const ex = document.getElementById('faceEx')
  const expressionArray = result.expressions.asSortedArray()
  //console.log(expressionArray[0].expression)
  ex.innerHTML = expressionArray[0].expression
}

setTimeout(() => onPlay())
}