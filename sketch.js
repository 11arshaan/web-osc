import ml5 from "ml5";
//select app div
const app = document.querySelector("#app");






//create sketch
function createSketch(video, handpose, predictions) {
 
  const options = {
    flipHorizontal:false, // boolean value for if the video should be flipped, defaults to false
    maxContinuousChecks: Infinity, // How many frames to go without running the bounding box detector. Defaults to infinity, but try a lower value if the detector is consistently producing bad predictions.
    detectionConfidence: .9, // Threshold for discarding a prediction. Defaults to 0.8.
    scoreThreshold: 0.75, // A threshold for removing multiple (likely duplicate) detections based on a "non-maximum suppression" algorithm. Defaults to 0.75
    iouThreshold: 0.3, // A float representing the threshold for deciding whether boxes overlap too much in non-maximum suppression. Must be between [0, 1]. Defaults to 0.3.
    }

    

  return function (p) {
    p.setup = () => {

      let constraints = {
        video: {
          mandatory: {
            width: 640,
            height: 480,
          }
        },
        audio: false
      };


      p.createCanvas(640, 480);
       video = p.createCapture(constraints);
       
      //  video.size(p.width, p.width );
      handpose = ml5.handpose(video, options, modelReady);
  
      // This sets up an event that fills the global variable "predictions"
      // with an array every time new hand poses are detected
      handpose.on("predict", results => {
        predictions = results;
      });
    
      // Hide the video element, and just show the canvas
      video.hide();
    };
    p.windowResized = () => {
      
    };
    p.draw = () => {
      p.image(video, 0, 0, video.width, video.height),
      drawKeypoints(p,predictions);

    };

  }
  
}

function modelReady() {
  console.log("Model ready!");
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints(p, predictions) {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      p.fill(0, 255, 0);
      p.noStroke();
      p.ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}


export default createSketch;