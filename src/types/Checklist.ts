export type CheckList = {
  _id?: number;
  type: string;
  amount_of_milk_produced: number;
  farmer: Farmer;
  from: Name;
  to: Name;
  number_of_cows_head: number;
  had_supervision: boolean;
  created_at: string;
  updated_at: string;
  _partition?: any;
  transmitted?: boolean;
};

export type Farmer = {
  name: string;
  city: string;
};

export type Name = {
  name: string;
};

export interface MilkContextType {
  closeRealm: () => void;
  createChecklists: () => void;
  deleteMilks: () => void;
  updateCheckListsFrontSide: (checkList: CheckList) => void;
  checkLists: CheckList[];
}
