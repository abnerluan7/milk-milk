class Milk {
  public _id: number;
  public type: string;
  public amount_of_milk_produced: string;
  public number_of_cows_head: string;
  public had_supervision: boolean;

  constructor({
    type,
    amount_of_milk_produced,
    number_of_cows_head,
    had_supervision,
    partition,
    id,
  }) {
    this._partition = partition;
    this._id = id;
    this.type = type;
    this.amount_of_milk_produced = amount_of_milk_produced;
    this.number_of_cows_head = number_of_cows_head;
    this.had_supervision = had_supervision;
  }

  static schema = {
    name: 'Milk',
    properties: {
      _id: 'number',
      _partition: 'string',
      type: 'string',
      amount_of_milk_produced: 'string',
      number_of_cows_head: 'string',
      had_supervision: 'string',
    },
    primaryKey: '_id',
  };
}

export { Milk };
