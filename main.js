prediction1=""
prediction2=""

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach(camera);

function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:', ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/-xvbcZn1Z/model.json',modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak1="The first prediction is "+prediction1;
    speak2="And the second prediction is "+prediction2;
    var utterThis=new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(utterThis);
}
function predict(){
    image=document.getElementById("captured");
    classifier.classify(image,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction1=results[0].label;
        prediction2=results[1].label;
        document.getElementById("result_emotion_name").innerHTML=prediction1;
        document.getElementById("result_emotion_name2").innerHTML=prediction2;
        speak();
        if(prediction1=='Victory'){
            document.getElementById("emoji1").innerHTML="&#9996;";
        }
        if(prediction1=='Best'){
            document.getElementById("emoji1").innerHTML="&#128077;";
        }
        if(prediction1=='Amazing'){
            document.getElementById("emoji1").innerHTML="&#128076;";
        }
        if(prediction2=='Victory'){
            document.getElementById("emoji2").innerHTML="&#9996;";
        }
        if(prediction2=='Best'){
            document.getElementById("emoji2").innerHTML="&#128077;";
        }
        if(prediction2=='Amazing'){
            document.getElementById("emoji2").innerHTML="&#128076;";
        }
    }
}