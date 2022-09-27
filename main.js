object_name = "";
states = "";
objects = [];

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector("cocossd",modalLoaded);
    document.getElementById("detectingobject").innerHTML = "Detecting Objects";
    object_name = document.getElementById("objectname").value;
    console.log(objectName);
}

function modalLoaded(){
    console.log("modal is loaded");
    states = true;
    console.log(states)
}

function gotResult(results, error){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video,0,0,380,380);
    if (states != ""){
       objectDetector.detect(video,gotResult);
     for(i = 0 ; i > objects.length ; i++) {
        document.getElementById("objectdetected").innerHTML = "Objects detected"
        
        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15)
        noFill();
        stroke("#FF0000");
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

        if(objects[i].label == object_name)
          {
            video.stop();
            objectDetector.detect(gotResult);
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + "Found");
            synth.speak(utterThis);
          }

    }
  }
}
