objectDetector = '';
game_status = '';
object = [];


function preload(){
    
}
function setup(){
    canvas = createCanvas(800, 500);
    canvas.position(600, 300);
    video = createCapture(VIDEO);
    video.size(800, 500);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}
function modelLoaded(){
    console.log("Model is loaded");
    game_status = true;
}
function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results;
    }
}
function draw(){
     image(video, 0, 0, 800, 500);
    //stroke("red");
    //noFill()
    //rect(50, 100, 350, 300);
    //text("Dog", 25, 85);
    //stroke("blue");
    //rect(350, 100, 350, 300);
    //text("Cat", 715, 85)
    if(game_status != ""){

        objectDetector.detect(video, gotResults);
    for(i=0; object.length; i++){
        document.getElementById("status").innerHTML = "Status: Objects detected";
        document.getElementById("number").innerHTML = "Number of objects: " + object.length;
        stroke("red");
        noFill();
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
        percent = floor(object[i].confidence*100);
        text(object[i].label + ":" + percent + "%", object[i].x, object[i].y);
    }
}
}
