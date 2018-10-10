//Ritwik Dixit 2017
//Js game controller
var playbutton = document.getElementById("testbutton");
var resetbutton = document.getElementById("resetbutton");
var grid = document.getElementById("gametable");

//0 = Up
//1 = Down
//2 = Left
//3 = right
//this will be the displacement values
var movesX = [0, 0, -1, 1];
var movesY = [-1, 1, 0, 0];

var changedrows = [];
var changedcolumns = [];
var changedclasses = [];

maxrows = grid.rows.length;
maxcolumns = grid.rows[0].cells.length;

//the command (rules)
var tr = -100;
var sqr = -100;
var cir = -100;
var dmr = -100;

var parse = function(characterval) {

	characterval = characterval.replace(/\s/g, '');
	if (characterval.toUpperCase() == "U")
		return 0;
	if (characterval.toUpperCase() == "D")
		return 1;
	if (characterval.toUpperCase() == "L")
		return 2;
	if (characterval.toUpperCase() == "R")
		return 3;
	else
		console.log("invalid input")
}

//for afterward, change the classes with reset button
var storeClass = function(r, c, className) {
	changedrows.push(r);
	changedcolumns.push(c);
	changedclasses.push(className);
}

//one action of the animation sequence (recursive calls)
var animate = function(r, c) {
	if (r < 0 || c < 0 || r >= maxrows || c >= maxcolumns)
		return;

	var cell = grid.rows[r].cells[c]
	console.log(r + "," + c);

	var visitClass = function(prevclass, newclass) {
		storeClass(r, c, prevclass);
		cell.getElementsByClassName(prevclass)[0].className=newclass;
	}

	//solve the puzzle ? exit or go to next?
	if (cell.getElementsByClassName("finish").length != 0) {
		visitClass("finish", "squareplayer")
		setTimeout(function(){
			window.location.href = redirect;
		}, 1000);
		
		//alert("YOU WIN BRUH");
		return;
	}
	waitTime = 100;
	if (cell.getElementsByClassName("triangle").length != 0) {
		visitClass("triangle", "triangleplayer");
		setTimeout(animate, waitTime, r+movesY[tr], c+movesX[tr]);
		
	} else if (cell.getElementsByClassName("square").length != 0) {
		visitClass("square", "squareplayer");
		setTimeout(animate, waitTime, r+movesY[sqr], c+movesX[sqr]);
		
	} else if (cell.getElementsByClassName("circle").length != 0) {
		visitClass("circle", "circleplayer");
		setTimeout(animate, waitTime, r+movesY[cir], c+movesX[cir]);
		
	} else if (cell.getElementsByClassName("diamond").length != 0) {
		visitClass("diamond", "diamondplayer");
		setTimeout(animate, waitTime, r+movesY[dmr], c+movesX[dmr]);
		

	}
	
}

playbutton.onclick = function() {
	//get what they typed and translate to index for movesX movesY as an XY coordinate displacement
	tr = parse(document.getElementById("trianglerule").value);
	sqr = parse(document.getElementById("squarerule").value);
	cir = parse(document.getElementById("circlerule").value);
	dmr = parse(document.getElementById("diamondrule").value);
	if (tr+sqr+cir+dmr==6 && tr*sqr*cir*dmr==0) //3210, 3300, 2220
		animate(startR, startC);
	else
		alert("you can't assign 2 shapes the same direction");
	
}

resetbutton.onclick = function() {
	for (var k = 0; k < changedclasses.length; k++) {
		var cellio = grid.rows[changedrows[k]].cells[changedcolumns[k]];
		trs = cellio.getElementsByClassName("triangleplayer");
		sqrs = cellio.getElementsByClassName("squareplayer");
		crcps = cellio.getElementsByClassName("circleplayer");
		dmds = cellio.getElementsByClassName("diamondplayer");
		if (trs.length>0)
			trs[0].className=changedclasses[k];
		else if (sqrs.length>0)
			sqrs[0].className=changedclasses[k];
		else if (crcps.length>0)
			crcps[0].className=changedclasses[k];
		else if (dmds.length>0)
			dmds[0].className=changedclasses[k];

	}
	changedclasses = [];
	changedrows = [];
	changedcolumns = [];
}

