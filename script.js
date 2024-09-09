let objects = {};
let randomIndex = -1;
let randomIndex2 = -1;
let audioContext;

function playAudio(source) {
  // Initialize AudioContext if it doesn't exist
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (!objects[source]) {
    // Fetch the audio file
    fetch(source)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        objects[source] = {
          buffer: audioBuffer,
          source: null,
          startTime: 0
        };
      })
      .catch(error => console.error('Error loading audio:', error));
  }

  let audioObj = objects[source];

  if (audioObj && audioObj.buffer) {
    const currentTime = audioContext.currentTime;

    // If audio is already playing, stop it
    if (audioObj.source) {
      audioObj.source.stop();
    }

    // Create a new source
    audioObj.source = audioContext.createBufferSource();
    audioObj.source.buffer = audioObj.buffer;
    audioObj.source.connect(audioContext.destination);

    // Start playback
    audioObj.source.start(0);
    audioObj.startTime = currentTime;
  } else {
    console.log('Audio buffer not loaded yet, using HTML5 Audio');
    new Audio(source).play()
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