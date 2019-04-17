$(document).ready(function() {
	console.log("Page loaded");

	populatePuzzle();

	// add event listeners for onMouseDown for all <img> in the page
	$("img").bind("mousedown", onMouseDown);
});

function onMouseDown(event) {
	//event.preventDefault();
	console.log("mouse down" + event.target);

	// mouseup would trigger for the replaced, not for replacer
	// using dragend instead
	event.target.addEventListener("dragend", onMouseUp, false);
}

function onMouseUp(event) {
	var replacer = event.target
	var posX = event.pageX;
	var posY = event.pageY;

	// get the element at (x,y) which is to be swapped with replacer
	var replaced = document.elementFromPoint(posX, posY);

	console.log("mouse up for id:" + replacer.id + ". Replacer:" + replacer.id + ", replaced: " + replaced.id);

	// if they are different elements, swap the image source
	if(replacer.id !== replaced.id) {
		tmpSrc = replacer.src;
		replacer.src = replaced.src;
		replaced.src = tmpSrc;
	}

	console.log("replaced:" + replaced);
	// handle the swapping
	//document.removeEventListener("mousemove", onMouseMove, false);
	document.removeEventListener("dragend", onMouseUp, false);

	if(check()) {
		alert("Puzzle solved.");
	}
}

/*
Return true if the pieces are in the correct order
*/
function check() {
	imgList = document.getElementsByTagName("img");

	// check if the sources are in the correct order
	for(i=0; i<16; i++) {
		// file:///home/marian/Documents/CS/Web/Lab5/jquery/images/img1-0-0.png
		sourceStr = imgList[i].src.replace("file:///home/marian/Documents/CS/Web/Lab5/jquery/images/img1-", "");
		// 0-1.png, 2-1.png etc
		rown = parseInt(sourceStr.split("-")[0], 10);
		coln = parseInt(sourceStr.split("-")[1].replace(".png", ""), 10);

		if(coln === parseInt(i/4, 10) && rown === parseInt(i%4))
			continue;
		else
			return false;
	}
	return true;
}

/*
	Load the images on random empty spots
*/
function populatePuzzle() {
	imagePlaces = [];
	imageSources = [];
	sourceBase = "./images/img1-";
	// current image place
	currentPlace = 0;

	// add the images and source strings to the lists
	for(i=0; i<16; i++) {
		sourcePath =  sourceBase + parseInt(i/4, 10) + "-" + parseInt(i%4, 10) + ".png";
		imageSources[i] = sourcePath;
		console.log("Source created: " +  sourcePath);
		imgName = "#" + i;
		imagePlaces[i] = $(imgName);
	}

	// while not all images are populated, generate a new random number
	// and check if the index has been used
	while(imagePlaces.length != 0) {
		index = parseInt(Math.random()*15, 10);

		// if imagePlaces[i] hasn;t been used yet
		if(imagePlaces[index] !== undefined) {
			imagePlaces[index][0].src = imageSources[currentPlace];

			// move to the next image source
			currentPlace++;

			//delete the imagePlaces[i], it has been used
			imagePlaces.splice(index, 1);
		}
		else {
			// else, try again
			continue;
		}
	}
}
