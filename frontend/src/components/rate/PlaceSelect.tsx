import React from "react";
import { Entry } from "../../models/Entry";
import { useRateContext } from "../../contexts/RateContext";
import Select from "react-select";

interface IProps {
  entry: Entry;
}

export default function PlaceSelect({ entry }: IProps) {
  const { handleChangePlace } = useRateContext();

  const options = [
    { value: "laureat", label: "Laureat" },
    { value: "wyroznienie", label: "Wyróżnienie" },
    { value: "none", label: "Brak nagrody" },
    { value: null, label: "Nieocenione" },
  ];

  const handleSelectChange = (selectedOption: any | null) => {
    handleChangePlace(entry.id, selectedOption?.value);
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
