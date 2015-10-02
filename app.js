int clicks = 0;

function click() {
	clicks += 1;
	document.getElementByID("clicks").innerHTML = clicks;
};

