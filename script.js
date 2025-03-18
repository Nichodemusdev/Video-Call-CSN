let startTime;
const videoElement = document.getElementById("video");
const videoInput = document.getElementById("videoInput");


videoInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const objectURL = URL.createObjectURL(file);
        videoElement.src = objectURL;
        videoElement.pause(); 
        videoElement.style.display = "none"; 
    }
});

function startCall() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("callScreen").style.display = "block";

    setTimeout(() => {
        document.getElementById("callScreen").style.display = "none";
        document.getElementById("ringingScreen").style.display = "block";
    }, 3000);

    setTimeout(() => {
        document.getElementById("ringingScreen").style.display = "none";
        document.getElementById("videoContainer").style.display = "block";
        startWebcam();
        startTime = Date.now();

       
        setTimeout(() => {
            videoElement.style.display = "block"; 
            videoElement.play();
        }, 1000); 

    }, 13000);
}

function startWebcam() {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        document.getElementById("webcam").srcObject = stream;
    });
}

function endCall() {
    document.getElementById("videoContainer").style.display = "none";
    document.getElementById("endScreen").style.display = "block";
    let duration = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("callDuration").textContent = `${Math.floor(duration / 60)}:${duration % 60}`;
}
