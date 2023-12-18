import React, { createContext, useContext, useState } from "react";
import { Entry, ExpandableEntry } from "../models/Entry";

interface RateContextProps {
  children: React.ReactNode;
  entries: Entry[];
}

interface RateContextValue {
  expandableEntries: ExpandableEntry[];
  handleOpenEntry: Function;
  handleCloseEntry: Function;
  handleChangePlace: Function;
}

const RateContext = createContext<RateContextValue>({} as RateContextValue);

export const useRateContext = () => useContext(RateContext);

export const RateContextProvider = ({
  children,
  entries,
}: RateContextProps) => {
  const [expandableEntries, setExpandableEntries] = useState<ExpandableEntry[]>(
    entries.map((entry) => ({
      entry,
      isExpanded: false,
    }))
  );

  const handleOpenEntry = (id: string) => {
    setExpandableEntries((prev) => {
      return prev.map((expEntry) => {
        if (expEntry.entry.id !== id) return expEntry;

        return {
          isExpanded: true,
          entry: expEntry.entry,
        };
      });
    });
  };

  const handleCloseEntry = (id: string) => {
    setExpandableEntries((prev) => {
      return prev.map((expEntry) => {
        if (expEntry.entry.id !== id) return expEntry;

        return {
          isExpanded: false,
          entry: expEntry.entry,
        };
      });
    });
  };

  const handleChangePlace = (id: string, newPlace: string | null) => {
    setExpandableEntries((prev) => {
      return prev.map((expEntry) => {
        if (expEntry.entry.id !== id) return expEntry;

        return {
          isExpanded: expEntry.isExpanded,
          entry: { ...expEntry.entry, place: newPlace } as Entry,
        };
      });
    });
  };

  return (
    <RateContext.Provider
      value={{
        expandableEntries,
        handleOpenEntry,
        handleCloseEntry,
        handleChangePlace,
      }}
    >
      {children}
    </RateContext.Provider>
  );
};

export default RateContextProvider;
