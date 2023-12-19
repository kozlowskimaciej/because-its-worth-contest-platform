import React, { createContext, useContext, useRef, useState } from "react";

interface EntryFormContextProps {
  children: React.ReactNode;
}

interface EntryFormContextValue {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  entryFormRef: React.RefObject<HTMLFormElement>;
  entryFilesRef: React.RefObject<HTMLDivElement>;
  submitButtonRef: React.RefObject<HTMLButtonElement>;
}

const EntryFormContext = createContext<EntryFormContextValue>(
  {} as EntryFormContextValue
);

export const useEntryFormContext = () => useContext(EntryFormContext);

export const EntryFormContextProvider = ({
  children,
}: EntryFormContextProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const entryFormRef = useRef<HTMLFormElement>(null);
  const entryFilesRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <EntryFormContext.Provider
      value={{
        files,
        setFiles,
        entryFormRef,
        entryFilesRef,
        submitButtonRef,
      }}
    >
      {children}
    </EntryFormContext.Provider>
  );
};

export default EntryFormContextProvider;
