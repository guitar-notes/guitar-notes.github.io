let objects = {};

function playAudio(source) {
  if (!objects[source]) {
    objects[source] = new Audio(source);
    objects[source].load();
  }

  let audio = objects[source];

  if (audio.currentTime > 0 && !audio.paused) {
    // If audio is already playing, reset to beginning
    audio.currentTime = 0;
  } else {
    // If audio is not playing, start playback
    audio.play();
  }
}