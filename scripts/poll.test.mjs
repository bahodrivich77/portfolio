import test from "node:test";
import assert from "node:assert/strict";
import { changeVote, initialCandidates } from "../src/lib/poll.ts";
test("voting adds one vote without changing the initial demo data", () => {
  const result = changeVote(initialCandidates, null, 1);
  assert.equal(result[0].votes, 3);
  assert.equal(initialCandidates[0].votes, 2);
});
test("choosing the same candidate retracts the vote", () => {
  const result = changeVote(changeVote(initialCandidates, null, 1), 1, 1);
  assert.deepEqual(result, initialCandidates);
});
test("changing a vote transfers only the viewer vote", () => {
  const result = changeVote(changeVote(initialCandidates, null, 1), 1, 2);
  assert.equal(result[0].votes, 2);
  assert.equal(result[1].votes, 2);
  assert.equal(
    result.reduce((sum, c) => sum + c.votes, 0),
    initialCandidates.reduce((sum, c) => sum + c.votes, 0) + 1,
  );
});
