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
  id: "",
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

export function getCardInformationFromCard(card: Card): CardInformation {
  return {
    id: card.id,
    cardType: card.cardType,
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
