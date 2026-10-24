(function () {
  var fullscreenButtons = document.querySelectorAll("[data-fullscreen-target]");
  fullscreenButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var targetId = button.getAttribute("data-fullscreen-target");
      var target = document.getElementById(targetId);
      if (!target || !target.requestFullscreen) {
        button.textContent = "Fullscreen unavailable";
        return;
      }

      target.requestFullscreen().catch(function () {
        button.textContent = "Fullscreen blocked";
      });
    });
  });

  var loadingNote = document.getElementById("play-loading-note");
  var errorNote = document.getElementById("play-error-note");
  var frame = document.getElementById("webgl-frame");
  if (loadingNote && frame) {
    var loaded = false;
    var errorTimer = window.setTimeout(function () {
      if (loaded) {
        return;
      }

      loadingNote.textContent = "Castle Keeper is still preparing...";
      if (errorNote) {
        errorNote.classList.remove("is-hidden");
      }
    }, 12000);

    frame.addEventListener("load", function () {
      loaded = true;
      window.clearTimeout(errorTimer);
      loadingNote.classList.add("is-hidden");
      if (errorNote) {
        errorNote.classList.add("is-hidden");
      }
    });

    frame.addEventListener("error", function () {
      loaded = false;
      loadingNote.textContent = "Castle Keeper could not load.";
      if (errorNote) {
        errorNote.textContent = "The embedded WebGL build could not be reached. Refresh the page or confirm the `castle-keeper-webgl` folder was uploaded correctly.";
        errorNote.classList.remove("is-hidden");
      }
    });
  }

  document.addEventListener("fullscreenchange", function () {
    fullscreenButtons.forEach(function (button) {
      var targetId = button.getAttribute("data-fullscreen-target");
      var target = document.getElementById(targetId);
      if (!target) {
        return;
      }

      button.textContent = document.fullscreenElement === target ? "Exit Fullscreen" : "Fullscreen";
    });
  });
}());
