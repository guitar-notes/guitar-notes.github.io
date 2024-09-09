let objects = {};
let randomIndex = -1;
let randomIndex2 = -1;

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

function makeSublist(list, i, offset) {
    let sublist = [];
    for (let j = i - offset; j <= i + offset; j++) {
        if (j >= 0 && j < list.length && j !== i) {
            sublist.push(list[j]);
        }
    }
    return sublist;
}

function playRandom(audioFiles) {
    if (audioFiles.length === 0) {
        console.log("No audio files provided");
        return;
    }

    if (randomIndex === -1) {
        randomIndex = Math.floor(Math.random() * audioFiles.length);
    }

    sublist = makeSublist(audioFiles, randomIndex, 3);
    if (randomIndex2 === -1) {
        randomIndex2 = Math.floor(Math.random() * sublist.length);
    }
    playAudio(audioFiles[randomIndex]);

    // wait for 1 second
    setTimeout(() => {
        playAudio(sublist[randomIndex2]);
    }, 1000);
}