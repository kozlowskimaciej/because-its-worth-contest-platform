type Guardian = {
  firstName: string;
  lastName: string;
};

export type Entry = {
  id: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    email: string | null;
    address: string | null;
  };
  guardian: Guardian | null;
  place: string;
  submissionDate: Date;
  files: string[];
};
