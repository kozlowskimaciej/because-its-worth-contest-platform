export type Contest = {
  id: string;
  name: string;
  description: string;
  categories: string[];
  published: boolean;
  deadline: Date;
  termsAndConditions: string[];
  acceptedFileFormats: string[];
  background: string;
};
