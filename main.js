function setup(){
    canvas=createCanvas(800,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(800,500);
    video.hide();
    objectdetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    }

img="";
status="";
objects=[];

function modelLoaded(){
    console.log("Model is loaded");
    status=true;
}

function gotresult(error,results){
if (error) {
    console.error(error);
}

console.log(results);
objects=results;
}


function preload(){
    img=loadImage('dog_cat.jpg');
    }

function draw(){
    image(video,0,0,800,500);
   
if (status != "") {
    r =random(255);
    
    g =random(255);

    b =random(255); 

    objectdetector.detect(video,gotresult);
  for(i=0;i < objects.length; i++){
    document.getElementById("status").innerHTML="Status : Objects Detected";
    document.getElementById("Number_of_Objects").innerHTML="Number of Objects Detected are "+objects.length;
    fill(r,g,b);
    percent=floor(objects[i].confidence * 100);
    text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

  }  
}
    }
