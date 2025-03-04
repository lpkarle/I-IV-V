import { assign, fromPromise, setup } from "xstate";
import { CheckboxItem } from "../types";
import { loadVoices, speak } from "../speech";

export const ttsStateMachine = setup({
  types: {
    context: {} as {
      notes: CheckboxItem[];
      strings: CheckboxItem[];
      voices?: SpeechSynthesisVoice[];
      waitingTimeInSeconds: number;
    },

    input: {} as {
      notes: CheckboxItem[];
      strings: CheckboxItem[];
    },

    events: {} as
      | { type: "START" }
      | { type: "STOP" }
      | {
          type: "UPDATE_NOTES_STRINGS";
          notes: CheckboxItem[];
          strings: CheckboxItem[];
        },
  },

  delays: {
    timeout: ({ context }) => {
      return context.waitingTimeInSeconds * 1000;
    },
  },

  actors: {
    loadVoices: fromPromise(async () => {
      const voices = await loadVoices();
      console.log(voices);
      return voices;
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBdmwHQEsIBswGJZkBDAJ2QG0AGAXUVAAcB7WTZTJgO3pAA9EAtAGYAnOgAcANgCMAJllVJAdiWSRQyZoA0IAJ6JpAViUBfEztQYYnMKWLIwAFTC9k+anSQhmrdlx78CAKG6IaSACxC4dJSsiIiETr6CHHi6LLG4nKGZhZo6LAMYMQA1gCKAK5wfpz4vET2YOjEAGYOpAAUClRUAJT4lgVFpZXVHJwePD5s4wGI8uHoSkLislkZSfMiaRlK6zm5IJxMEHA8llMsM-5egQLiShIy8ooqahpKmwhpB3kY2HhLr5ZrdBEIQoYhEIqCIYpI4glooYvglDoNrLZGs5XEDrtxQUFwaEoTC4QiIkYvrJoaE0flCsVylUiCDGFcanNCRCSbDYvEKci9IgNAczEA */
  id: "tts",
  systemId: "tts",

  context: ({ input }) => ({
    notes: input.notes,
    strings: input.strings,
    voices: undefined,
    waitingTimeInSeconds: 10,
  }),

  initial: "loading",

  states: {
    loading: {
      invoke: {
        id: "loadVoices",
        src: "loadVoices",
        onDone: {
          target: "ready",
          actions: assign({
            voices: ({ event }) => event.output,
          }),
        },
      },
    },

    ready: {
      on: {
        START: "askQuestion",
        UPDATE_NOTES_STRINGS: {
          actions: assign({
            notes: ({ event }) => event.notes,
            strings: ({ event }) => event.strings,
          }),
        },
      },
    },

    askQuestion: {
      entry: ({ context }) => {
        if (!context.voices) return;

        const checkedNotes = context.notes.reduce<number[]>(
          (acc, item, index) => {
            if (item.checked) acc.push(index);
            return acc;
          },
          []
        );

        const checkedStrings = context.strings.reduce<number[]>(
          (acc, item, index) => {
            if (item.checked) acc.push(index);
            return acc;
          },
          []
        );

        let noteIndex: number;
        if (checkedNotes.length === 0) {
          return;
        } else if (checkedNotes.length === 1) {
          noteIndex = checkedNotes[0];
        } else {
          noteIndex =
            checkedNotes[Math.floor(Math.random() * checkedNotes.length)];
        }

        let stringIndex: number;
        if (checkedStrings.length === 0) {
          return;
        } else if (checkedStrings.length === 1) {
          stringIndex = checkedStrings[0];
        } else {
          stringIndex =
            checkedStrings[Math.floor(Math.random() * checkedStrings.length)];
        }

        const toSpeak =
          context.notes[noteIndex].label +
          " on " +
          context.strings[stringIndex].label;

        speak(context.voices[0], toSpeak);
      },
      after: {
        timeout: { target: "waitForAnswer" },
      },
      on: { STOP: "ready" },
    },

    waitForAnswer: {
      always: { target: "askQuestion" },
    },
  },
});
