import { ChangeEvent, useRef, useState } from "react";
import {
  Card,
  CardInformation,
  emptyCardInfomation,
  getCardInformationFromCard,
  TunisianCardTypes,
} from "./Types/types";

export default function CardLab({
  selectedCard,
}: {
  selectedCard: Card | null;
}) {
  const [cardType, setCardType] = useState<TunisianCardTypes>(
    selectedCard ? selectedCard.cardType : TunisianCardTypes.noun
  );

  const [cardInformation, setCardInformation] = useState<CardInformation>(
    selectedCard
      ? getCardInformationFromCard(selectedCard)
      : emptyCardInfomation
  );

  const NounDynamicFields = () => {
    return (
      <div>
        <input
          type="text"
          name="pluralN"
          placeholder="plural"
          onChange={handleFieldChange}
          value={cardInformation.back.pluralN}
        ></input>
      </div>
    );
  };

  const AdjectiveDynamicFields = () => {
    return (
      <div>
        <input
          type="text"
          name="fem"
          placeholder="feminine"
          onChange={handleFieldChange}
          value={cardInformation.back.fem}
        ></input>
        <input
          type="text"
          name="pluralA"
          placeholder="plural"
          onChange={handleFieldChange}
          value={cardInformation.back.pluralA}
        ></input>
      </div>
    );
  };

  const VerbDynamicFields = () => {
    return (
      <div>
        <input
          type="text"
          name="past"
          placeholder="past"
          onChange={handleFieldChange}
          value={cardInformation.back.past}
        ></input>
        <input
          type="text"
          name="imperative"
          placeholder="imperative"
          onChange={handleFieldChange}
          value={cardInformation.back.imperative}
        ></input>
      </div>
    );
  };

  const dynamicFields = (): JSX.Element | null => {
    switch (cardType) {
      case TunisianCardTypes.noun:
        return <NounDynamicFields />;
      case TunisianCardTypes.adjective:
        return <AdjectiveDynamicFields />;
      case TunisianCardTypes.verb:
        return <VerbDynamicFields />;
      default:
        return null;
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleFieldChange = (
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
        setCardType(value as TunisianCardTypes);
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
    }
  };

  const cardTypeSelectRef = useRef(null);
  return (
    <div className={"cardLab"}>
      <form>
        <div>
          <input
            type="text"
            name="word"
            placeholder="word"
            onChange={handleFieldChange}
            value={cardInformation.front.value}
          ></input>
          <select
            ref={cardTypeSelectRef}
            name="cardType"
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
        {dynamicFields()}
        <div>
          <input
            type="text"
            name="translation"
            placeholder="translation"
            onChange={handleFieldChange}
            value={cardInformation.back.value}
          ></input>
        </div>
        <div>
          <input
            type="text"
            name="example"
            placeholder="example"
            onChange={handleFieldChange}
            value={cardInformation.back.example}
          ></input>
        </div>
        <div>
          <textarea
            name="notes"
            placeholder="notes"
            onChange={handleFieldChange}
            value={cardInformation.back.notes}
          ></textarea>
        </div>
        <div>
          <label htmlFor="groups">groups</label>
          <select name="groups" multiple>
            <option value="option1">option1</option>
            <option value="option2">option2</option>
            <option value="option3">option3</option>
          </select>
        </div>
        <div>
          <label htmlFor="link">links</label>
          <div>
            <select>
              <option value="">card1</option>
              <option value="">card2</option>
            </select>
            <input type="text" name="relation"></input>
            <button>+</button>
          </div>
        </div>
        {selectedCard == null ? (
          <button onClick={handleSubmit}>Create card</button>
        ) : (
          <>
            <button>save card</button>
            <button>delete card</button>
          </>
        )}
      </form>
    </div>
  );
}
