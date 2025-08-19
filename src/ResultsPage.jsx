import { useVotes } from "../context/VoteContext.jsx";

export default function ResultsPage() {
  const { candidates, totalVotes, leadingText } = useVotes();

  return (
    <section>
      <h1>Results</h1>
      <p className="meta">
        Total Votes Cast: <strong>{totalVotes}</strong>
      </p>

      <ul className="results">
        {candidates.map((c) => (
          <li key={c.id} className="results-row">
            <span className="name">{c.name}</span>
            <span className="count">{c.votes}</span>
            <div className="bar-wrap">
              <div
                className="bar"
                style={{
                  width:
                    totalVotes === 0
                      ? "0%"
                      : `${Math.round((c.votes / totalVotes) * 100)}%`,
                }}
                aria-label={`${c.name} bar`}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="leader">{leadingText}</div>
    </section>
  );
}
