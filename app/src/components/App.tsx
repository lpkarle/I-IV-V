import { BaseSyntheticEvent, useState } from "react";
import { notesAll } from "../util/musicConst";
import Checkbox from "./UI/Checkbox";
import { getVoices, speak } from "../util/speech";
import { useQuery } from "@tanstack/react-query";
import { useMachine } from "@xstate/react";
import { ttsStateMachine } from "../util/stateMach";

function App() {
  const query = useQuery({ queryKey: ["voices"], queryFn: getVoices });
  const [select, setSelect] = useState<SpeechSynthesisVoice | null>(
    query.data ? query.data[0] : null
  );

  const [selectedNotes, setSelectedNotes] = useState(
    notesAll.map((note) => ({
      note,
      checked: true,
    }))
  );

  const [selectedStrings, setSelectedStrings] = useState(
    ["E", "A", "D", "G", "B", "high E"].map((s) => ({
      s,
      checked: true,
    }))
  );

  console.log(selectedNotes, selectedStrings);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const voice =
      query.data?.find((v) => v.name === event.target.value) || null;
    setSelect(voice);
  };

  const handleChangeNotes = (event: BaseSyntheticEvent) => {
    const note: string = event.target.value;

    setSelectedNotes((prev) =>
      prev.map((item) =>
        item.note === note ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleSelectAllNotes = () => {
    setSelectedNotes((prev) =>
      prev.map((item) => ({ ...item, checked: true }))
    );
  };

  const handleDeselectAllNotes = () => {
    setSelectedNotes((prev) =>
      prev.map((item) => ({ ...item, checked: false }))
    );
  };

  const handleChangeStrings = (event: BaseSyntheticEvent) => {
    const str = event.target.value;

    setSelectedStrings((prev) =>
      prev.map((item) =>
        item.s === str ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleSelectAllStrings = () => {
    setSelectedStrings((prev) =>
      prev.map((item) => ({ ...item, checked: true }))
    );
  };

  const handleDeselectAllStrings = () => {
    setSelectedStrings((prev) =>
      prev.map((item) => ({ ...item, checked: false }))
    );
  };

  const handleSpeak = () => {
    if (!select) return;

    console.log(selectedNotes);

    const randomStringIndex = Math.floor(
      Math.random() * selectedStrings.length
    );
    const randomNoteIndex = Math.floor(Math.random() * selectedNotes.length);

    const toSpeak =
      selectedNotes[randomNoteIndex].note +
      " on " +
      selectedStrings[randomStringIndex].s;
    speak(select, toSpeak);
  };

  return (
    <div className="p-30">
      <h1 className="text-5xl font-sans">I IV V</h1>

      <br />

      <div className="card border-1 border-gray-300 ">
        <div className="card-body">
          <h2 className="card-title">Select Notes</h2>
          <div className="grid grid-cols-8 gap-1">
            {selectedNotes.map((note, index) => (
              <Checkbox
                key={index}
                id={note.note}
                title={note.note}
                checked={note.checked}
                onChange={handleChangeNotes}
              />
            ))}
          </div>
          <div className="card-actions justify-start mt-2">
            <button className="btn" onClick={handleSelectAllNotes}>
              Select All
            </button>
            <button className="btn" onClick={handleDeselectAllNotes}>
              Deselect All
            </button>
          </div>
        </div>
      </div>

      <br />

      <div className="card border-1 border-gray-300 ">
        <div className="card-body">
          <h2 className="card-title">Select Strings</h2>
          <div className="grid grid-cols-8 gap-1">
            {selectedStrings.map((str, index) => (
              <Checkbox
                key={index}
                id={str.s}
                title={str.s}
                checked={str.checked}
                onChange={handleChangeStrings}
              />
            ))}
          </div>
          <div className="card-actions justify-start mt-2">
            <button className="btn" onClick={handleSelectAllStrings}>
              Select All
            </button>
            <button className="btn" onClick={handleDeselectAllStrings}>
              Deselect All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
