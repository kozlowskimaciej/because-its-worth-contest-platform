import { Entry } from "../models/Entry";

export const prepareEntries = (entries: any): Entry[] => {
  const data = entries.data;

  return data.map((single: any) => {
    const id = single._id["$oid"];

    const {
      firstName,
      lastName,
      guardianFirstName,
      guardianLastName,
      phone,
      email,
      address,
      submissionDate,
      attachments,
      place,
      contestId,
    } = single;

    const author = {
      firstName,
      lastName,
      phone,
      email,
      address,
    };

    const guardian = {
      firstName: guardianFirstName,
      lastName: guardianLastName,
    };

    const entry: Entry = {
      id,
      author,
      guardian,
      place,
      submissionDate: new Date(submissionDate),
      files: attachments,
      contestID: contestId,
    };

    return entry;
  });
};
