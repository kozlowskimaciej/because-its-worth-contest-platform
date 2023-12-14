import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/MultipleElementsAdder.module.css";
import styles2 from "./styles/ContestCreationForm.module.css";

interface IProps {
  participants: string[];
  setParticipants: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ParticipantsCategory({
  participants,
  setParticipants,
}: IProps) {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const newCategoryInputRef = useRef<HTMLInputElement>(null);

  const removeCategory = (index: number) => {
    setParticipants((prev) => prev.filter((_, id) => id !== index));
  };

  const handleNewCategory = () => {
    const inputElement = newCategoryInputRef.current;
    if (!inputElement) return;

    setParticipants((prev) => [...prev, inputElement.value]);
  };

  useEffect(() => {
    const inputElement = newCategoryInputRef.current;
    if (!inputElement) return;

    inputElement.value = "";
  }, [participants]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNewCategory();
    }
  };

  return (
    <div style={{ marginBottom: "50px" }}>
      <label className={styles2.label}>kategorie uczestników</label>
      <ul>
        {participants.map((type, index) => (
          <li key={index} className={styles.li}>
            <span>{type}</span>
            <button
              className={styles.remove}
              title="usun"
              onClick={(e) => {
                e.preventDefault();
                removeCategory(index);
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/icons/remove.svg`}
                alt="usun"
              />
            </button>
          </li>
        ))}
      </ul>
      {isAddingCategory ? (
        <div className={styles.adding}>
          <input
            type="text"
            ref={newCategoryInputRef}
            onKeyDown={handleKeyPress}
            placeholder="wpisz nową kategorię uczestnika"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleNewCategory();
            }}
          >
            dodaj
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsAddingCategory(false);
            }}
          >
            anuluj
          </button>
        </div>
      ) : (
        <button
          className={styles.new}
          onClick={() => setIsAddingCategory(true)}
        >
          <img src={`${process.env.PUBLIC_URL}/icons/plus.svg`} alt="dodaj" />
          <span>dodaj kategorię</span>
        </button>
      )}
    </div>
  );
}
