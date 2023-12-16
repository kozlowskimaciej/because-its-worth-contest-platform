import { Contest } from "../models/Contest";

export const prepareSingleContest = (single: any): Contest => {
  const id = single._id["$oid"];

  const contest = { id, ...single };

  contest.deadline = new Date(contest.deadline);

  return contest;
};

export const prepareContests = (contests: any): Contest[] => {
  const data = contests.data;

  return data.map((single: any) => {
    return prepareSingleContest(single);
  });
};
