import { assign, fromPromise, setup } from "xstate";
import { CheckboxItem } from "./checkboxGroupStateMachine";
import { loadVoices } from "../speech";

export const ttsStateMachine = setup({
  types: {
    context: {} as {
      notes: CheckboxItem[];
      strings: CheckboxItem[];
      voices?: SpeechSynthesisVoice[];
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
        console.log("askQuestion", context);
      },
      after: {
        2000: { target: "waitForAnswer" },
      },
      on: { STOP: "ready" },
    },
    waitForAnswer: {
      always: { target: "askQuestion" },
    },
  },
});
