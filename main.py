from pathlib import Path

import sf2_loader as sf
from fire import Fire
from pydub import AudioSegment


def test_note(name: str = "C5", path: str = "ProTrax_Classical_Guitar.sf2"):
    # Soundfont from https://www.kvraudio.com/forum/viewtopic.php?t=578420
    loader = sf.sf2_loader(path)
    loader.export_note(
        name="demo.wav",
        note_name=name,
        duration=2,
        decay=1,
        volume=100,
        channel=0,
        start_time=0,
        sample_width=2,
        channels=2,
        frame_rate=44100,
        format="wav",
        effects=None,
        bpm=80,
        export_args={},
    )


def generate_guitar_notes(
    path: str = "ProTrax_Classical_Guitar.sf2",
    output_dir: str = "data",
):
    loader = sf.sf2_loader(path)
    notes = [
        "E2 F2 F#2 G2 G#2 A2 A#2 B2 C3 C#3 D3 D#3 E3",  # Low E string (E2)
        "A2 A#2 B2 C3 C#3 D3 D#3 E3 F3 F#3 G3 G#3 A3",  # A string (A2)
        "D3 D#3 E3 F3 F#3 G3 G#3 A3 A#3 B3 C4 C#4 D4",  # D string (D3)
        "G3 G#3 A3 A#3 B3 C4 C#4 D4 D#4 E4 F4 F#4 G4",  # G string (G3)
        "B3 C4 C#4 D4 D#4 E4 F4 F#4 G4 G#4 A4 A#4 B4",  # B string (B3)
        "E4 F4 F#4 G4 G#4 A4 A#4 B4 C5 C#5 D5 D#5 E5",  # High E string (E4)
    ]

    for i, text in enumerate(notes):
        for j, note in enumerate(text.split()):
            filename = f"{output_dir}/{i + 1}{'abcdefghijklm'[j]}.mp3"
            Path(filename).parent.mkdir(parents=True, exist_ok=True)

            loader.export_note(
                name=filename,
                note_name=note,
                duration=2,
                decay=1,
                volume=100,
                channel=0,
                start_time=0,
                sample_width=2,
                channels=2,
                frame_rate=44100,
                format="mp3",
                effects=None,
                bpm=80,
                export_args={},
            )

            # Post-process to increase volume
            audio = AudioSegment.from_mp3(filename)
            gain = 16  # Increase volume by 16 dB
            louder_audio = audio + gain
            louder_audio.export(filename, format="mp3")
            print(f"Generated and amplified {filename}")


"""
conda create -n guitar-notes python=3.11 -y
conda activate guitar-notes
pip install -r requirements.txt
conda install ffmpeg fluidsynth
python main.py generate_guitar_notes 
"""


if __name__ == "__main__":
    Fire()
