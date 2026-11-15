export type Candidate = {
  id: number;
  name: string;
  region: string;
  votes: number;
};
export const initialCandidates: Candidate[] = [
  {
    id: 1,
    name: "O'ktamjonova Dilzoda",
    region: "O'rta chirchiq tumani",
    votes: 2,
  },
  { id: 2, name: "Abdukarimov Ulug'bek", region: "Olmaliq shahar", votes: 1 },
  { id: 3, name: "Tursunov Sardorbek", region: "Bekobod shahar", votes: 2 },
  { id: 4, name: "Karimova Nasiba", region: "Yangiyo'l tumani", votes: 7 },
  { id: 5, name: "Xajimetov Javohir", region: "Chirchiq shahar", votes: 3 },
];
export function changeVote(
  candidates: Candidate[],
  previousId: number | null,
  id: number,
) {
  return candidates
    .map((candidate) => ({
      ...candidate,
      votes:
        candidate.votes +
        (candidate.id === id && previousId !== id ? 1 : 0) -
        (candidate.id === previousId ? 1 : 0),
    }))
    .map((candidate) => ({
      ...candidate,
      votes: Math.max(0, candidate.votes),
    }));
}
