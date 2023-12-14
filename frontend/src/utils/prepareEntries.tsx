import { Entry } from "../models/Entry";

export const prepareEntries = (entries: any): Entry[] => {
  const data = entries.data;

  return data.map((single: any) => {
    const id = single.id;

    const entry = { id, ...single.attributes };

    entry.author = { id: entry.author.id, ...entry.author.attributes };
    entry.submissionDate = new Date(entry.submissionDate);

    entry.files = entry.files.map((file: any) => file.src);

    entry.contestID = single.relationships.contest.data.id;

    return entry;
  });
};
