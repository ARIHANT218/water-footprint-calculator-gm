
const stopbtn=document.getElementById('stopbtn')
const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');
const waterFootprint={person:'100L/day', keyboard:'50L',book:'100L',bottle:'30L',cellphone:'200L',toothbrush:'15L',laptop:'300L',remote:'50L',chair:'75L',spoon:'10L'}

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

  // Enable the live webcam view and start classification.
    function enableCam(event) {
    // Only continue if the COCO-SSD has finished loading.
        if (!model) {
        return;
        }
        
        // Hide the button once clicked.
        event.target.classList.add('removed');  
        
        
        // getUsermedia parameters to force video but not audio.
        const constraints = {
        video: true
        };
        
       
        // Activate the webcam stream.
        navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        video.srcObject = stream;
        video.addEventListener('loadeddata', predictWebcam);
        });
  }



// Store the resulting model in the global scope of our app.
var model = undefined;

// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment 
// to get everything needed to run.
// Note: cocoSsd is an external object loaded from our index.html
// script tag import so ignore any warning in Glitch.
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  // Show demo section now model is ready to use.
  demosSection.classList.remove('invisible');
  
});

var children = [];
function predictWebcam() {
    
    stopbtn.classList.remove('removed')
  // Now let's start classifying a frame in the stream.
  model.detect(video).then(function (predictions) {
    // Remove any highlighting we did previous frame.
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }
    children.splice(0);
    
    // Now lets loop through predictions and draw them to the live view if
    // they have a high confidence score.
    for (let n = 0; n < predictions.length; n++) {
      // If we are over 66% sure we are sure we classified it right, draw it!
      if (predictions[n].score > 0.66) {
        const p = document.createElement('p');
        p.innerText = predictions[n].class  + ' - with ' 
            + Math.round(parseFloat(predictions[n].score) * 100) 
            + '% confidence. ' +' waterfootprint='+ 
            waterFootprint[predictions[n].class==='cell phone'?'cellphone':predictions[n].class];
        
        console.log(waterFootprint[predictions[n].class]);
        

        
        
        const highlighter = document.createElement('div');
            highlighter.setAttribute('class', 'highlighter');
        

        liveView.appendChild(highlighter);
        highlighter.appendChild(p);
        
        children.push(highlighter);
        
      }
    }
    
     
    // Call this function again to keep predicting when the browser is ready.
        window.requestAnimationFrame(predictWebcam);
  });
};

