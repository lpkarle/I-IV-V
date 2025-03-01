import { BaseSyntheticEvent, useEffect } from "react";
import { notesAll } from "../util/musicConst";
import Checkbox from "./UI/Checkbox";
import { useMachine } from "@xstate/react";
import { checkboxGroupStateMachine } from "../util/machines/checkboxGroupStateMachine";
import { ttsStateMachine } from "../util/machines/stateMach";

function App() {
  const [stateNotes, sendNotes] = useMachine(checkboxGroupStateMachine, {
    input: {
      items: notesAll.map((note) => ({
        label: note,
        checked: true,
      })),
    },
  });

  const [stateStrings, sendStrings] = useMachine(checkboxGroupStateMachine, {
    input: {
      items: ["E", "A", "D", "G", "B", "high E"].map((s) => ({
        label: s,
        checked: true,
      })),
    },
  });

  const [stateTts, sendTts] = useMachine(ttsStateMachine, {
    input: {
      notes: stateNotes.context.items,
      strings: stateStrings.context.items,
    },
  });

  useEffect(() => {
    sendTts({
      type: "UPDATE_NOTES_STRINGS",
      notes: stateNotes.context.items,
      strings: stateStrings.context.items,
    });
  }, [stateNotes.context.items, stateStrings.context.items, sendTts]);

  const handleCheckboxOnChangeNotes = (event: BaseSyntheticEvent) => {
    const label: string = event.target.value;
    sendNotes({ type: "TOGGLE_ITEM", label });
  };

  const handleCheckboxOnChangeStrings = (event: BaseSyntheticEvent) => {
    const label: string = event.target.value;
    sendStrings({ type: "TOGGLE_ITEM", label });
  };

  return (
    <div className="p-5">
      <h1 className="text-5xl font-sans">I IV V</h1>

      <br />

      <div className="card border-1 border-gray-300 ">
        <div className="card-body">
          <h2 className="card-title">Select Notes</h2>
          <div className="grid grid-cols-8 gap-1">
            {stateNotes.context.items.map((item, index) => (
              <Checkbox
                key={index}
                id={item.label}
                title={item.label}
                checked={item.checked}
                onChange={handleCheckboxOnChangeNotes}
              />
            ))}
          </div>
          <div className="card-actions justify-start mt-2">
            <button
              className="btn"
              onClick={() => sendNotes({ type: "SELECT_ALL" })}
            >
              Select All
            </button>
            <button
              className="btn"
              onClick={() => sendNotes({ type: "DESELECT_ALL" })}
            >
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
            {stateStrings.context.items.map((item, index) => (
              <Checkbox
                key={index}
                id={item.label}
                title={item.label}
                checked={item.checked}
                onChange={handleCheckboxOnChangeStrings}
              />
            ))}
          </div>
          <div className="card-actions justify-start mt-2">
            <button
              className="btn"
              onClick={() => sendStrings({ type: "SELECT_ALL" })}
            >
              Select All
            </button>
            <button
              className="btn"
              onClick={() => sendStrings({ type: "DESELECT_ALL" })}
            >
              Deselect All
            </button>
          </div>
        </div>
      </div>

      <br />

      {/* TODO */}
      {/* <fieldset className="fieldset">
        <legend className="fieldset-legend">Select speaker</legend>
        <select
          id="select-voices"
          className="select"
          value={
            stateTts.context.voices
              ? stateTts.context.voices[stateTts.context.selectedVoiceIndex].name
              : undefined
          }
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
      </fieldset> */}

      <h2>
        <span>'SELECTED' VOICE: </span>
        <span className="font-semibold">
          {stateTts.context.voices
            ? stateTts.context.voices[0].name +
              " " +
              stateTts.context.voices[0].lang
            : ""}
        </span>
      </h2>

      <br />

      <button className="btn" onClick={() => sendTts({ type: "START" })}>
        Start
      </button>
      <button className="btn" onClick={() => sendTts({ type: "STOP" })}>
        Stop
      </button>
    </div>
  );
}

export default App;
