status1="";
input="";
objects=[];
function setup(){
canvas=createCanvas(600,380);
canvas.center();

video = createCapture(VIDEO);
video.size(600,380);
video.hide();
}
function start(){
    object=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="status: detecting objects";
    input=document.getElementById("input").value;
}
function modelloaded(){
    console.log("model loaded");
status1=true;
}
function gotResult(error,results) {
    if (error) {
      console.error(error);
    }
    console.log(results);
    objects = results;
  }
function draw(){
    image(video,0,0,600,380);
    if (status1 != "") {
        object.detect(video,gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML="status: object detected"
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            label=objects[i].label;
            text( 
            objects[i].label + " " + percent + "%",
            objects[i].x + 15,
            objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        
        if(input==label){
            video.stop();
            object.detect(gotResult);
            document.getElementById("status").innerHTML="status: Mentioned object found";
            var synth = window.speechSynthesis;
            var utterThis = new SpeechSynthesisUtterance(input+" found");
            synth.speak(utterThis);
        }
        else{
            document.getElementById("status").innerHTML="status: Mentioned object not found";
        }
    }
            }
    }

