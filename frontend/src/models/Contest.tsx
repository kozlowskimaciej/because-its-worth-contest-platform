export type Contest = {
  id: string;
  name: string;
  description: string;
  category: string;
  entryCategories: string[];
  published: boolean;
  deadline: Date;
  termsAndConditions: string[];
  acceptedFileFormats: string[];
  background: string;
  ended: boolean;
};
