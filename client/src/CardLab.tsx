import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  Card,
  CardInformation,
  emptyCardInfomation,
  TunisianCardTypes,
} from "./Types/types";
import { deepCopy } from "./utils/deepCopy";
import styles from "./cardLab.module.scss";
import {
  getCardFromCardInformation,
  getCardInformationFromCard,
} from "./utils/cardUtils";
import { BACKEND_URL } from "./services/apiService";

export default function CardLab({
  selectedCard,
}: {
  selectedCard: Card | null;
}) {
  const [cardInformation, setCardInformation] = useState<CardInformation>(
    selectedCard
      ? getCardInformationFromCard(selectedCard)
      : deepCopy<CardInformation>(emptyCardInfomation)
  );

  const cardType = cardInformation.cardType;

  useEffect(() => {
    setCardInformation(
      selectedCard
        ? getCardInformationFromCard(selectedCard)
        : deepCopy<CardInformation>(emptyCardInfomation)
    );
  }, [selectedCard]);

  const updateCard = async (id: string, cardDb: Card) => {
    const response = await fetch(`${BACKEND_URL}/api/card/${id}`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(cardDb),
    });

    if (!response.ok) {
      throw new Error("could not update card");
    }
  };

  const createCard = async (cardDb: Card) => {
    const response = await fetch(`${BACKEND_URL}/api/card`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(cardDb),
    });

    if (!response.ok) {
      throw new Error("could not create card");
    }
    resetCardInformation();
  };

  const deleteCard = async (id: string) => {
    const response = await fetch(`${BACKEND_URL}/api/card/${id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("could not delete card");
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const cardDb: Card = getCardFromCardInformation(cardInformation);
    console.log("cardDb is", cardDb);
    if (cardInformation.id) {
      updateCard(cardInformation.id, cardDb);
    } else {
      createCard(cardDb);
    }
    resetCardInformation();
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (cardInformation.id) {
      await deleteCard(cardInformation.id);
      resetCardInformation();
    }
  };

  const resetCardInformation = useCallback(() => {
    setCardInformation(deepCopy<CardInformation>(emptyCardInfomation));
  }, []);

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    resetCardInformation();
  };

  const handleFieldChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      const newCardInformation = { ...cardInformation };
      switch (name) {
        case "word":
          newCardInformation.front.value = value;
          setCardInformation(newCardInformation);
          break;
        case "cardType":
          newCardInformation.cardType = value as TunisianCardTypes;
          setCardInformation(newCardInformation);
          break;
        case "translation":
          newCardInformation.back.value = value;
          setCardInformation(newCardInformation);
          break;
        case "example":
          newCardInformation.back.example = value;
          setCardInformation(newCardInformation);
          break;
        case "notes":
          newCardInformation.back.notes = value;
          setCardInformation(newCardInformation);
          break;
        case "pluralN":
          newCardInformation.back.pluralN = value;
          setCardInformation(newCardInformation);
          break;
        case "pluralA":
          newCardInformation.back.pluralA = value;
          setCardInformation(newCardInformation);
          break;
        case "fem":
          newCardInformation.back.fem = value;
          setCardInformation(newCardInformation);
          break;
        case "past":
          newCardInformation.back.past = value;
          setCardInformation(newCardInformation);
          break;
        case "imperative":
          newCardInformation.back.imperative = value;
          setCardInformation(newCardInformation);
          break;
        default:
          throw new Error(`Unhandled field name ${value}`);
      }
    },
    [cardInformation]
  );

  const dynamicFields = useCallback((): JSX.Element | null => {
    switch (cardType) {
      case TunisianCardTypes.noun:
        return (
          <div className={styles.fieldContainer}>
            <label htmlFor="pluralN">Plural</label>
            <input
              type="text"
              id="pluralN"
              name="pluralN"
              placeholder="plural"
              onChange={handleFieldChange}
              value={cardInformation.back.pluralN}
              className={styles.rtl}
            ></input>
          </div>
        );
      case TunisianCardTypes.adjective:
        return (
          <>
            <div className={styles.fieldContainer}>
              <label htmlFor="feminine">feminine</label>
              <input
                type="text"
                id="feminine"
                name="fem"
                placeholder="feminine"
                onChange={handleFieldChange}
                value={cardInformation.back.fem}
                className={styles.rtl}
              ></input>
            </div>
            <div className={styles.fieldContainer}>
              <label htmlFor="pluralA">Plural</label>
              <input
                type="text"
                name="pluralA"
                id="pluralA"
                placeholder="plural"
                onChange={handleFieldChange}
                value={cardInformation.back.pluralA}
                className={styles.rtl}
              ></input>
            </div>
          </>
        );
      case TunisianCardTypes.verb:
        return (
          <>
            <div className={styles.fieldContainer}>
              <label htmlFor="past">Past</label>
              <input
                type="text"
                name="past"
                id="past"
                placeholder="past"
                onChange={handleFieldChange}
                value={cardInformation.back.past}
                className={styles.rtl}
              ></input>
            </div>
            <div className={styles.fieldContainer}>
              <label htmlFor="imperative">Imperative</label>
              <input
                id="imperative"
                type="text"
                name="imperative"
                placeholder="imperative"
                onChange={handleFieldChange}
                value={cardInformation.back.imperative}
                className={styles.rtl}
              ></input>
            </div>
          </>
        );
      default:
        return null;
    }
  }, [
    cardInformation.back.fem,
    cardInformation.back.imperative,
    cardInformation.back.past,
    cardInformation.back.pluralA,
    cardInformation.back.pluralN,
    cardType,
    handleFieldChange,
  ]);

  return (
    <div className={`${styles.cardLabContainer} ${styles.jumpAnimation}`}>
      <div className={styles.formContainer}>
        <form>
          <div className={styles.fieldContainer}>
            <label htmlFor="cardType">Card Type</label>
            <div>
              <select
                className={styles.cardType}
                name="cardType"
                id="cardType"
                onChange={handleFieldChange}
                value={cardInformation.cardType}
              >
                {Object.values(TunisianCardTypes).map((valueType) => (
                  <option key={valueType} value={valueType}>
                    {valueType}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.fieldContainer}>
            <label htmlFor="word">Word</label>
            <input
              type="text"
              id="word"
              name="word"
              placeholder="word"
              onChange={handleFieldChange}
              value={cardInformation.front.value}
              className={styles.rtl}
            ></input>
          </div>

          {dynamicFields()}
          <div className={styles.fieldContainer}>
            <label htmlFor="translation">Translation</label>
            <input
              type="text"
              name="translation"
              id="translation"
              placeholder="translation"
              onChange={handleFieldChange}
              value={cardInformation.back.value}
            ></input>
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="example">Example</label>
            <input
              type="text"
              name="example"
              id="example"
              placeholder="example"
              onChange={handleFieldChange}
              value={cardInformation.back.example}
              className={styles.rtl}
            ></input>
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="notes">Notes</label>
            <textarea
              name="notes"
              placeholder="notes"
              id="notes"
              onChange={handleFieldChange}
              value={cardInformation.back.notes}
            ></textarea>
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="linkedCards">Linked Cards</label>

            <select name="linkedCards">
              <option value="option1">option1</option>
              <option value="option2">option2</option>
              <option value="option3">option3</option>
            </select>
          </div>
          <div className={`${styles.fieldContainer} ${styles.boxContainer} `}>
            <label htmlFor="linkedCards"></label>
            <div className={styles.linkedCardsBox}></div>
          </div>

          <>
            <button onClick={handleSubmit}>
              {selectedCard ? "Save Card" : "Create card"}
            </button>
            {selectedCard ? (
              <button onClick={handleDelete}>Delete Card </button>
            ) : (
              <button onClick={handleReset}>reset fields </button>
            )}
          </>
        </form>
      </div>
    </div>
  );
}
