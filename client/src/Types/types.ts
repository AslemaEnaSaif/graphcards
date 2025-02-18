export enum TunisianCardTypes {
  noun = "إسم",
  verb = "فعل",
  adjective = "صفة",
  letter = "حرف",
  expression = "عبارة",
}

export interface BaseCard {
  id: string;
  cardType: TunisianCardTypes;
  front: {
    value: string;
  };
  back: {
    value: string;
    example: string;
    notes?: string;
  };
  groups: string[];
  links: {
    linkedCardId: string;
    label: string;
  }[];
  // createdAt: Date;
  //   tests: Test[];
  //   mastery: number;
}

export interface NounCard extends BaseCard {
  cardType: TunisianCardTypes.noun;
  back: {
    value: string;
    plural: string;
    example: string;
    notes?: string;
  };
}

export interface AdjectiveCard extends BaseCard {
  cardType: TunisianCardTypes.adjective;
  back: {
    value: string;
    plural: string;
    fem: string;
    example: string;
    notes?: string;
  };
}

export interface VerbCard extends BaseCard {
  cardType: TunisianCardTypes.verb;
  back: {
    value: string;
    past: string;
    imperative: string;
    example: string;
    notes?: string;
  };
}

export interface LetterCard extends BaseCard {
  cardType: TunisianCardTypes.letter;
}

export interface ExpressionCard extends BaseCard {
  cardType: TunisianCardTypes.expression;
}

export type Card =
  | LetterCard
  | ExpressionCard
  | NounCard
  | VerbCard
  | AdjectiveCard;

export type CardInformation = {
  id: string | null;
  cardType: TunisianCardTypes;
  front: {
    value: string;
  };
  back: {
    value: string;
    pluralN: string;
    pluralA: string;
    fem: string;
    past: string;
    imperative: string;
    example: string;
    notes?: string;
  };
  groups: string[];
  links: {
    linkedCardId: string;
    label: string;
  }[];
};

export const emptyCardInfomation: CardInformation = {
  id: null,
  cardType: TunisianCardTypes.noun,
  front: {
    value: "",
  },
  back: {
    value: "",
    pluralN: "",
    pluralA: "",
    fem: "",
    past: "",
    imperative: "",
    example: "",
    notes: "",
  },
  groups: [],
  links: [],
};

export type CardApiData = Card & { _id: string };

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
