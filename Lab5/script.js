var isPlaying = false;
var autoplay = false;
// the index of the current photo
var currentPhoto = -1;
var noPhotos = 3;
var timeout;
var waitTime=1000;

function loadNextImage(frame) {
    source =  "./images/img";

    if(!autoplay && currentPhoto == noPhotos - 1 && isPlaying == true)
        return;

    if(currentPhoto == noPhotos - 1 || currentPhoto == -1) {
        // last photo while replaying or currentPhoto -1, when the page loads
        // autoplaying, load the first images
        currentPhoto = 0;
    }
    else {
          // not the last photo, increment and load
          currentPhoto++;
    }

    source += currentPhoto + ".png"
    frame["src"] = source;

    console.log("Loaded next image. Status: currentPhoto: " + currentPhoto + ", isPlaying: " + isPlaying
        + ", autoplay: " + autoplay);

    if(isPlaying) {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(loadNextImage, waitTime, frame);
    }
}

window.onload = function() {
  var playpauseButton = document.getElementById("playpause");
  var autoplayCheckbox = document.getElementById("autoplay");
  var waitCombo = document.getElementById("waitcombo");
  var frame = document.getElementById("image");

  console.log("Page loaded");

  playpauseButton.addEventListener('click', function() {
      isPlaying = !isPlaying;
      if(isPlaying) {
          loadNextImage(frame);
          playpauseButton["innerText"] = "Pause";
      }
      else {
          playpauseButton["innerText"] = "Play";
          loadNextImage(frame);
      }
      console.log("Playpause clicked");
  });


  autoplayCheckbox.addEventListener('click', function() {
      autoplay = !autoplay;
      console.log("checkbox clicked. slideshow is playing: " + autoplay);

      if(autoplay) {
          // continue the slideshow
          loadNextImage(frame);
      }
      else {
          // stop the slideshow
          window.clearTimeout();
      }
  });


  waitCombo.addEventListener('click', function() {
      waitTime = waitCombo.selectedOptions[0]["value"]*1000;
      console.log("wait changed. New value: " + waitTime*1000 + "ms");

      window.clearTimeout();
      timeout = window.setTimeout(loadNextImage, waitTime*1000, frame);
  });

  // load the first image
  loadNextImage(frame);
}
