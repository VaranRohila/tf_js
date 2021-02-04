const angleDisplay = document.getElementById("angle");
const canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var radius = 4;
var Styles = {
    "points": "#1ecbe1",
    "lines": "#1ecbe1"
}

function draw (pose) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var points = pose.keypoints;
    var hip = undefined;
    var knee = undefined;
    var ank = undefined;

    ctx.fillStyle = Styles.lines;
    points.forEach(element => {
        if (element.score > 0.7) {
            if (element.part == 'rightHip') {
                hip = element;
                point(element);
            }
            else if (element.part == 'rightKnee') {
                knee = element;
                point(element);
            }
            else if (element.part == 'rightAnkle') {
                ank = element;
                point(element);
            }
        }
    });
    if (!hip || !knee || !ank) {
        return;
      }
    line (hip, knee);
    line (knee, ank);
    angleDisplay.innerHTML = calulateAngle(hip, knee, ank);
    squatCounter(hip, knee, ank);
}

function line (element1, element2) {
    ctx.strokeStyle = Styles.lines;
    ctx.beginPath();
    ctx.moveTo(element1.position.x, element1.position.y);
    ctx.lineTo(element2.position.x, element2.position.y);
    ctx.stroke();
}

function point (element) {
    ctx.beginPath();
    ctx.arc(element.position.x, element.position.y, radius, 0, 2 * Math.PI);
    ctx.fill();
}