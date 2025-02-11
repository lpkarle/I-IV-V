const synth = window.speechSynthesis;

let voices: SpeechSynthesisVoice[] = [];

async function getVoices(): Promise<SpeechSynthesisVoice[]> {
  voices = synth.getVoices().sort(function (a, b) {
    const aName = a.name.toUpperCase();
    const bName = b.name.toUpperCase();

    if (aName < bName) {
      return -1;
    } else if (aName == bName) {
      return 0;
    } else {
      return +1;
    }
  });

  return voices;
}

function speak(voice: SpeechSynthesisVoice, text: string) {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }

  if (!text || text.length === 0) {
    return;
  }

  const utterThis = new SpeechSynthesisUtterance(text);

  utterThis.voice = voice;
  utterThis.pitch = 1;
  utterThis.rate = 1;
  synth.speak(utterThis);
}

export { getVoices, speak };
