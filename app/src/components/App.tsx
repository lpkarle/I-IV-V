import { BaseSyntheticEvent, useState } from "react";
import { notesAll } from "../util/musicConst";
import Checkbox from "./UI/Checkbox";
import { getVoices, speak } from "../util/speech";
import { useQuery } from "@tanstack/react-query";

function App() {
  const query = useQuery({ queryKey: ["voices"], queryFn: getVoices });
  const [select, setSelect] = useState<SpeechSynthesisVoice | null>(
    query.data ? query.data[0] : null
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const voice =
      query.data?.find((v) => v.name === event.target.value) || null;
    setSelect(voice);
  };

  const notesToPractice = notesAll.map((note) => ({
    note,
    checked: true,
  }));

  const populateNotesToPractice = (event: BaseSyntheticEvent) => {
    const note: string = event.target.value;

    notesToPractice.forEach((item) => {
      if (item.note === note) {
        item.checked = event.target.checked;
      }
    });
  };

  const tts = "Hallo das ist ein Test!";

  return (
    <div className="p-30">
      <h1 className="text-5xl font-sans">I IV V</h1>

      <br />

      <div className="grid grid-cols-8 gap-1">
        {notesAll.map((note, index) => (
          <Checkbox
            key={index}
            id={note}
            title={note}
            checked={true}
            onChange={populateNotesToPractice}
          />
        ))}
      </div>

      <br />

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Sprecher wählen</legend>
        <select
          id="select-voices"
          className="select"
          value={select?.name}
          onChange={handleChange}
        >
          <option value="" disabled>
            Stimme wählen...
          </option>
          {query.data?.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </fieldset>

      <br />

      {select && (
        <>
          <p>
            <strong>Ausgewählte Stimme:</strong> {select.name} ({select.lang})
          </p>

          <button onClick={() => speak(select, tts)} className="btn">
            Play
          </button>
        </>
      )}
    </div>
  );
}

export default App;
