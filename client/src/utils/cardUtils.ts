import { Card, CardInformation, TunisianCardTypes } from "../Types/types";

export function getCardInformationFromCard(card: Card): CardInformation {
  return {
    id: card.id,
    cardType: card.cardType || TunisianCardTypes.noun,
    front: {
      value: card.front.value,
    },
    back: {
      value: card.back.value,
      pluralN: card.cardType === TunisianCardTypes.noun ? card.back.plural : "",
      pluralA:
        card.cardType === TunisianCardTypes.adjective ? card.back.plural : "",
      fem: card.cardType === TunisianCardTypes.adjective ? card.back.fem : "",
      past: card.cardType === TunisianCardTypes.verb ? card.back.past : "",
      imperative:
        card.cardType === TunisianCardTypes.verb ? card.back.imperative : "",
      example: card.back.example,
      notes: card.back.notes,
    },
    groups: card.groups,
    links: card.links,
  };
}

export function getCardFromCardInformation(
  cardInformation: CardInformation
): Card {
  switch (cardInformation.cardType) {
    case TunisianCardTypes.noun:
      return {
        id: cardInformation.id ? cardInformation.id : "new card", // not used when creating/updating a card anyways
        cardType: cardInformation.cardType,
        front: {
          value: cardInformation.front.value,
        },
        back: {
          value: cardInformation.back.value,
          plural: cardInformation.back.pluralN,
          example: cardInformation.back.example,
          notes: cardInformation.back.notes,
        },
        groups: cardInformation.groups,
        links: cardInformation.links,
      };
    case TunisianCardTypes.adjective:
      return {
        id: cardInformation.id ? cardInformation.id : "new card", // not used when creating/updating a card anyways
        cardType: cardInformation.cardType,
        front: {
          value: cardInformation.front.value,
        },
        back: {
          value: cardInformation.back.value,
          plural: cardInformation.back.pluralN,
          fem: cardInformation.back.fem,
          example: cardInformation.back.example,
          notes: cardInformation.back.notes,
        },
        groups: cardInformation.groups,
        links: cardInformation.links,
      };
    case TunisianCardTypes.verb:
      return {
        id: cardInformation.id ? cardInformation.id : "new card", // not used when creating/updating a card anyways,
        cardType: cardInformation.cardType,
        front: {
          value: cardInformation.front.value,
        },
        back: {
          value: cardInformation.back.value,
          past: cardInformation.back.past,
          imperative: cardInformation.back.imperative,
          example: cardInformation.back.example,
          notes: cardInformation.back.notes,
        },
        groups: cardInformation.groups,
        links: cardInformation.links,
      };
    default:
      return {
        id: cardInformation.id ? cardInformation.id : "new card", // not used when creating/updating a card anyways,
        cardType: cardInformation.cardType,
        front: {
          value: cardInformation.front.value,
        },
        back: {
          value: cardInformation.back.value,
          example: cardInformation.back.example,
          notes: cardInformation.back.notes,
        },
        groups: cardInformation.groups,
        links: cardInformation.links,
      };
  }
}
