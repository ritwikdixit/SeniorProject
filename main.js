var submit = document.getElementById("submitbutton");
var textfield = document.getElementById("inputdata");
submit.onclick = function() {
	if (textfield.value == "growth") {
		window.location.href = "congratstwo.html";
	} else {
		alert("wrong passcode");
	}
}
