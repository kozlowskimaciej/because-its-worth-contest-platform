import React, { createContext, useContext, useState } from "react";

type initialValuesType = {
  title: string;
  description: string;
  deadline: Date;
  contestCategory: string;
  entryCategories: string[];
  formats: string[];
};

interface ContestCreationFormContextProps {
  children: React.ReactNode;
  initialValues: initialValuesType;
}

interface ContestCreationFormContextValue {
  initialValues: initialValuesType;
  participants: string[];
  fileFormats: string[];
  files: File[];
  background: File | null;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setBackground: React.Dispatch<React.SetStateAction<File | null>>;
  setParticipants: React.Dispatch<React.SetStateAction<string[]>>;
  setFileFormats: React.Dispatch<React.SetStateAction<string[]>>;
}

const ContestCreationFormContext =
  createContext<ContestCreationFormContextValue>(
    {} as ContestCreationFormContextValue
  );

export const useContestCreationFormContext = () =>
  useContext(ContestCreationFormContext);

export const ContestCreationFormContextProvider = ({
  children,
  initialValues,
}: ContestCreationFormContextProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [background, setBackground] = useState<File | null>(null);
  const [participants, setParticipants] = useState<string[]>(
    initialValues.entryCategories
  );
  const [fileFormats, setFileFormats] = useState<string[]>(
    initialValues.formats
  );

  return (
    <ContestCreationFormContext.Provider
      value={{
        initialValues,
        participants,
        fileFormats,
        files,
        background,
        setFiles,
        setBackground,
        setParticipants,
        setFileFormats,
      }}
    >
      {children}
    </ContestCreationFormContext.Provider>
  );
};

export default ContestCreationFormContextProvider;
