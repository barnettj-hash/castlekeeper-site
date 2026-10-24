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

(function () {
  var root = document.querySelector("[data-menu-audio]");
  if (!root) {
    return;
  }

  var audio = root.querySelector("audio");
  var toggle = root.querySelector(".menu-audio-toggle");
  var slider = root.querySelector("input[type='range']");
  if (!audio || !toggle || !slider) {
    return;
  }

  var stored = 40;
  try {
    var saved = window.localStorage.getItem("ck-menu-volume");
    if (saved !== null && !isNaN(Number(saved))) {
      stored = Math.min(100, Math.max(0, Number(saved)));
    }
  } catch (error) {
    stored = 40;
  }

  slider.value = String(stored);
  audio.volume = stored / 100;
  audio.muted = true;

  function setOn(on) {
    toggle.setAttribute("aria-pressed", on ? "true" : "false");
    toggle.textContent = on ? "Sound on" : "Sound off";
    root.classList.toggle("is-on", on);
  }

  function fail() {
    audio.pause();
    root.classList.add("is-unavailable");
    toggle.disabled = true;
    slider.disabled = true;
    toggle.textContent = "Sound unavailable";
    toggle.setAttribute("aria-pressed", "false");
  }

  audio.addEventListener("error", fail);

  toggle.addEventListener("click", function () {
    if (toggle.disabled) {
      return;
    }

    var turningOn = toggle.getAttribute("aria-pressed") !== "true";
    if (!turningOn) {
      audio.pause();
      audio.muted = true;
      setOn(false);
      return;
    }

    audio.muted = false;
    audio.volume = Number(slider.value) / 100;
    var pending = audio.play();
    if (pending && typeof pending.then === "function") {
      pending.then(function () {
        setOn(true);
      }).catch(fail);
      return;
    }

    setOn(true);
  });

  slider.addEventListener("input", function () {
    var value = Number(slider.value);
    audio.volume = value / 100;
    try {
      window.localStorage.setItem("ck-menu-volume", String(value));
    } catch (error) {
      /* Volume still applies for this visit. */
    }

    if (value === 0 && toggle.getAttribute("aria-pressed") === "true") {
      audio.pause();
      audio.muted = true;
      setOn(false);
    }
  });
}());
