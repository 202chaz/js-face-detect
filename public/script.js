const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  document.getElementById('br-spinner').style.display = 'none';
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {

  const displaySize = { width: video.width, height: video.height }

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const canvas = document.getElementById('overlay')
    canvas.getContext('2d').clearRect(0, 0, video.width, video.height)
    const deminsions = faceapi.matchDimensions(canvas, video, true)
    const resizedResult = faceapi.resizeResults(detections, deminsions)
    faceapi.draw.drawDetections(canvas, resizedResult)
    faceapi.draw.drawFaceLandmarks(canvas, resizedResult)
    faceapi.draw.drawFaceExpressions(canvas, resizedResult)
  }, 100)
})
