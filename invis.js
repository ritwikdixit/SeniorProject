
var canvas = 0;
var ctx, w, h = 0;
var prevX, prevY, currX, currY = 0;
var flag, dotFlag = false;
var wotn = "x";
var passworder = document.getElementById("inputdata");
var submitButton = document.getElementById("submitbutton");

submitButton.onclick = function() {
	if (passworder.value == wotn) {
		window.location.href = "congrats1.html";
	} else {
		alert("wrong passcode");
	}
}

var draw = function() {
	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(currX, currY);
	ctx.strokeStyle = "black";
	ctx.lineWidth = 20;
	ctx.stroke();
	ctx.fillStyle = "white";
	ctx.font = "80px Arial";
	ctx.fillText("h    i      d     i      n       g  ", 240, 200);
	ctx.font="24px Arial";
	ctx.fillText("^that's the password but remove the spaces though", 480, 230);
	ctx.closePath();
}

var findxy = function(res, e) {
	if (res == "up" || res == "up") {
		flag = false;
		return;
	}
	if (res == "down") {
		prevX = currX;
		prevY = currY;
		currX = e.clientX - canvas.offsetLeft;
		currY = e.clientY - canvas.offsetTop;

		flag = true;
		dotFlag = true;
		if (dotFlag) {
			ctx.beginPath();
			ctx.fillRect(currX, currY, 2, 2);
			ctx.closePath();
			dotFlag = false;
		}
	} 
	if (res == "move") {
		if (flag) {
			prevX = currX;
			prevY = currY;
			currX = e.clientX - canvas.offsetLeft;
			currY = e.clientY - canvas.offsetTop;
			draw();
		}
	}
}

window.onload = function() {
	//init (call other functions from here)
	canvas = document.getElementById("can");
	ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;
    wotn = "hiding";

    canvas.addEventListener("mousemove", function (e) {
            findxy("move", e)
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            findxy("down", e)
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            findxy("up", e)
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            findxy("out", e)
        }, false);

}