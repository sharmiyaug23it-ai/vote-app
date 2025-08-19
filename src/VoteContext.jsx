import React, { createContext, useContext, useEffect, useReducer } from "react";

const VotesContext = createContext();

const initialState = {
  candidates: [
    { id: "A", name: "Candidate A", votes: 0 },
    { id: "B", name: "Candidate B", votes: 0 },
    { id: "C", name: "Candidate C", votes: 0 },
  ],
};

// Load from localStorage if available
function loadState() {
  try {
    const saved = localStorage.getItem("votes_state");
    return saved ? JSON.parse(saved) : initialState;
  } catch {
    return initialState;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "VOTE": {
      const { id } = action;
      const candidates = state.candidates.map((c) =>
        c.id === id ? { ...c, votes: c.votes + 1 } : c
      );
      return { ...state, candidates };
    }
    case "RESET": {
      return initialState;
    }
    default:
      return state;
  }
}

export function VotesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    localStorage.setItem("votes_state", JSON.stringify(state));
  }, [state]);

  const totalVotes = state.candidates.reduce((sum, c) => sum + c.votes, 0);

  // Determine leader (with tie handling)
  const maxVotes = Math.max(...state.candidates.map((c) => c.votes));
  const leaders = state.candidates.filter((c) => c.votes === maxVotes && maxVotes > 0);
  let leadingText = "No votes yet";
  if (leaders.length === 1) {
    leadingText = `Leading Candidate: ${leaders[0].name} (${leaders[0].votes})`;
  } else if (leaders.length > 1) {
    const names = leaders.map((l) => l.name).join(", ");
    leadingText = `Tie between: ${names} (${maxVotes})`;
  }

  const value = {
    candidates: state.candidates,
    totalVotes,
    leadingText,
    vote: (id) => dispatch({ type: "VOTE", id }),
    reset: () => dispatch({ type: "RESET" }),
  };

  return <VotesContext.Provider value={value}>{children}</VotesContext.Provider>;
}

export function useVotes() {
  const ctx = useContext(VotesContext);
  if (!ctx) throw new Error("useVotes must be used within VotesProvider");
  return ctx;
}
