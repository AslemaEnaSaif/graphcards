export enum TunisianValueTypes {
  Noun = "إسم",
  verb = "فعل",
  letter = "حرف",
  Expression = "عبارة",
}

export type Card = {
  id: string;
  front: {
    value: string;
    valueType: TunisianValueTypes;
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
  createdAt: Date;
  //   tests: Test[];
  //   mastery: number;
};
