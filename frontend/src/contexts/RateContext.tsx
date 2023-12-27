import React, { createContext, useContext, useState } from "react";
import { Entry, ExpandableEntry } from "../models/Entry";
import axios from "axios";
import { toast } from "react-toastify";
import { errorConfig, loadingConfig, successConfig } from "../config/toasts";
import { useAppContext } from "./AppContext";

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
  const { tokenRef } = useAppContext();
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
    const id = toast.loading("Proszę czekać...", loadingConfig());

    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/entries/${entryID}`, {
        headers: {
          Authorization: `Bearer ${tokenRef.current}`,
        },
      })
      .then((data) => {
        if (data.status !== 200) throw new Error();

        setExpandableEntries((prev) =>
          prev.filter((expEntry) => expEntry.entry.id !== entryID)
        );

        toast.update(id, successConfig("Zgłoszenie usunięte pomyślnie."));
      })
      .catch((err) => {
        toast.update(
          id,
          errorConfig("Wystąpił błąd podczas usuwania zgłoszenia.")
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
