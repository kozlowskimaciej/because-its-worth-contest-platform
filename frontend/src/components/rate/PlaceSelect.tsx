import React from "react";
import { Entry } from "../../models/Entry";
import { useRateContext } from "../../contexts/RateContext";
import Select from "react-select";
import { toast } from "react-toastify";
import axios from "axios";
import { errorConfig, successConfig } from "../../config/toasts";

interface IProps {
  entry: Entry;
}

export default function PlaceSelect({ entry }: IProps) {
  const { handleChangePlace } = useRateContext();

  const options = [
    { value: "laureat", label: "Laureat" },
    { value: "wyroznienie", label: "Wyróżnienie" },
    { value: "brak_nagrody", label: "Brak nagrody" },
    { value: "nieocenione", label: "Nieocenione" },
  ];

  const handleSelectChange = (selectedOption: any | null) => {
    handleChangePlace(entry.id, selectedOption?.value);

    const id = toast.loading("Proszę czekać...");

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/entries/${entry.id}/evaluation`,
        {
          value: selectedOption.value,
        },
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        if (data.status !== 200) throw new Error();
        toast.update(id, successConfig("Miejsce przypisane pomyślnie."));
      })
      .catch((err) => {
        toast.update(
          id,
          errorConfig("Wystąpił błąd podczas przypisania miejsca.")
        );
      });
  };

  return (
    <Select
      menuPosition="absolute"
      menuPortalTarget={document.body}
      options={options}
      defaultValue={options.find((option) => option.value === entry.place)}
      onChange={handleSelectChange}
    />
  );
}
