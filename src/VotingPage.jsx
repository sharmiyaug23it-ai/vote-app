import CandidateCard from "../components/CandidateCard.jsx";
import { useVotes } from "../context/VoteContext.jsx";

export default function VotingPage() {
  const { candidates, leadingText, vote, reset, totalVotes } = useVotes();

  return (
    <section>
      <h1>Cast Your Vote</h1>
      <p className="meta">
        Total Votes Cast: <strong>{totalVotes}</strong>
      </p>
      <div className="grid">
        {candidates.map((c) => (
          <CandidateCard
            key={c.id}
            id={c.id}
            name={c.name}
            votes={c.votes}
            onVote={vote}
          />
        ))}
      </div>
      <div className="leader">{leadingText}</div>
      <button className="btn secondary" onClick={reset}>Reset All</button>
    </section>
  );
}
