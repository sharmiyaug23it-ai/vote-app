export default function CandidateCard({ id, name, votes, onVote }) {
  return (
    <div className="card">
      <div className="card-title">{name}</div>
      <div className="card-votes">Votes: <strong>{votes}</strong></div>
      <button className="btn" onClick={() => onVote(id)}>Vote</button>
    </div>
  );
}
