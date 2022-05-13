export type CheckList = {
  _id: number;
  type: string;
  amount_of_milk_produced: string;
  farmer: Farmer;
  from: Name;
  to: Name;
  number_of_cows_head: string;
  had_supervision: true;
  created_at: string;
  updated_at: string;
  __v: number;
};

export type Farmer = {
  name: string;
  city: string;
};

export type Name = {
  name: string;
};
