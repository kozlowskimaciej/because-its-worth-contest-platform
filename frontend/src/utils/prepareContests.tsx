import { Contest } from "../models/Contest";

export const prepareContests = (contests: any): Contest[] => {
  const data = contests.data;

  return data.map((single: any) => {
    const id = single.id;

    const contest = { id, ...single.attributes };

    contest.deadline = new Date(contest.deadline);

    return contest;
  });
};
