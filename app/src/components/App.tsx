import { BaseSyntheticEvent } from "react";
import { notesAll } from "../util/musicConst";
import Checkbox from "./UI/Checkbox";
import { useMachine } from "@xstate/react";
import { checkboxGroupStateMachine } from "../util/machines/checkboxGroupStateMachine";

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

  const handleCheckboxOnChange = (event: BaseSyntheticEvent) => {
    const label: string = event.target.value;
    sendNotes({ type: "TOGGLE_ITEM", label });
  };

  return (
    <div className="p-30">
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
                onChange={handleCheckboxOnChange}
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
                onChange={handleCheckboxOnChange}
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
    </div>
  );
}

export default App;
