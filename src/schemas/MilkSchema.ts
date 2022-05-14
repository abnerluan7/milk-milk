import { Farmer } from 'Types/Checklist';

class Milk {
  public _id: number;
  public type: string;
  public amount_of_milk_produced: string;
  public number_of_cows_head: string;
  public had_supervision: boolean;
  public farmer: Farmer;
  public city: string;
  public from_name: string;
  public to_name: string;
  public created_at: string;
  public updated_at: string;
  public transmitted: boolean;

  public _partition: any;

  constructor({
    type,
    amount_of_milk_produced,
    number_of_cows_head,
    had_supervision,
    _partition,
    _id,
    farmer,
    from,
    to,
    created_at,
    updated_at,
    transmitted,
  }) {
    this._partition = _partition;
    this._id = _id;
    this.type = type;
    this.amount_of_milk_produced = amount_of_milk_produced;
    this.number_of_cows_head = number_of_cows_head;
    this.had_supervision = had_supervision;
    this.farmer = farmer.name;
    this.city = farmer.city;
    this.from_name = from.name;
    this.to_name = to.name;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.transmitted = transmitted;
  }

  static schema = {
    name: 'Milk',
    properties: {
      _id: 'int',
      _partition: 'string',
      type: 'string',
      amount_of_milk_produced: 'string',
      number_of_cows_head: 'string',
      had_supervision: 'bool',
      farmer: 'string',
      city: 'string',
      from_name: 'string',
      to_name: 'string',
      created_at: 'string',
      updated_at: 'string',
      transmitted: 'bool',
    },
    primaryKey: '_id',
  };
}

export { Milk };
