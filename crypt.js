
var interpret = document.getElementById("submitbutton");
var input = document.getElementById("inputdata");
var output = document.getElementById("output");

//secret hax
var encrypt = function(strin) {
	
	revstrin = strin.split("").reverse().join("");

	var fst = strin.split("").slice(0, 3);
	var lst = strin.split("").slice(strin.length-3, strin.length);

	var resulto = lst[2]+fst[2]+fst[1]+revstrin.slice(3,strin.length-3)+fst[0]+lst[1]+lst[0]
	return resulto;
}

interpret.onclick = function() {
	if (input.value.length < 6)
		alert("oh yeah the minimum length is 6 tho");

	var strout = encrypt(input.value);
	output.innerText = strout;
	if (output.innerText == "TLUMLL1FFNE"){
		setTimeout(function(){
			window.location.href = "congratsthreee.html";
		}, 1000);
	}
		
}
