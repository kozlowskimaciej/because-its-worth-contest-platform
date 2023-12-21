import React, { createContext, useContext, useState } from "react";
import { Entry, ExpandableEntry } from "../models/Entry";
import axios from "axios";
import { useParams } from "react-router-dom";

interface RateContextProps {
  children: React.ReactNode;
  entries: Entry[];
}

interface RateContextValue {
  expandableEntries: ExpandableEntry[];
  handleOpenEntry: Function;
  handleCloseEntry: Function;
  handleChangePlace: Function;
  handleDeleteEntry: Function;
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
          isExpanded: false,
          entry: { ...expEntry.entry, place: newPlace } as Entry,
        };
      });
    });
  };

  const handleDeleteEntry = (entryID: string) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/entries/${entryID}`, {
        withCredentials: true,
      })
      .then((data) => {
        if (data.status !== 200) return;

        setExpandableEntries((prev) =>
          prev.filter((expEntry) => expEntry.entry.id !== entryID)
        );
      });
  };

  return (
    <RateContext.Provider
      value={{
        expandableEntries,
        handleOpenEntry,
        handleCloseEntry,
        handleChangePlace,
        handleDeleteEntry,
      }}
    >
      {children}
    </RateContext.Provider>
  );
};

export default RateContextProvider;
