const countDisplay = document.getElementById("count");
// console.log(countDisplay.innerHTML);
var count = 0;
var green = "#2cd35f";
var red = "#de2221";
var yellow = "#f1e450";
var flagLow = false;
var flagStraight = true;
var gap = 2000;

function squatCounter (hip, knee, ank)  {
    if (isLow(hip, knee, ank)) {
        flagLow = true;
        flagStraight = false;
        Styles.lines = yellow;
        line (hip, knee);
        line (knee, ank);
        countDisplay.style.color = yellow;
    }
    if ((flagLow) && (isStraight(hip, knee, ank))) {
        flagLow = false;
        flagStraight = true;
        count += 1;
        countDisplay.innerHTML = count;
        Styles.lines = green;
        line (hip, knee);
        line (knee, ank);
        countDisplay.style.color = green;
    }
    if (isBetween(hip, knee, ank)) {
        return;
    }
    if (flagStraight && !flagLow) {
        Styles.lines = red;
        line (hip, knee);
        line (knee, ank);
        countDisplay.style.color = red;
    }
}

function isLow (hip, knee, ank) {
    var angle = calulateAngle(hip, knee, ank);
    if (angle <= 80) return true;
    return false;
}

function isStraight (hip, knee, ank) {
    var angle = calulateAngle(hip, knee, ank);
    if (angle >= 170) return true;
    return false;
}

function isBetween (hip, knee, ank) {
    var angle = calulateAngle(hip, knee, ank);
    if ((angle > 130) ) return true;
    return false;
}

function calulateAngle (e1, e2, e3) {
    var dAx = e2.position.x - e1.position.x;
    var dAy = e2.position.y - e1.position.y;
    var dBx = e2.position.x - e3.position.x;
    var dBy = e2.position.y - e3.position.y;
    var angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
    if(angle < 0) {angle = angle * -1;}
    var degree_angle = angle * (180 / Math.PI);
    return Math.trunc(degree_angle);
}

function calculateLength (e1, e2) {
    var l1 = e1.position.x - e2.position.x;
    var l2 = e1.position.y - e2.position.y;
    return Math.sqrt( l1*l1 + l2*l2 );
}