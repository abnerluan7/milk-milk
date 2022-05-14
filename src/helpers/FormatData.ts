import { CheckList } from 'Types/Checklist';

export const reformatChecklist = (checklistsRealmFormat): CheckList[] => {
  const checklist: CheckList[] = [];
  checklistsRealmFormat.map((checklistRealmFormat) => {
    checklist.push({
      _id: checklistRealmFormat._id,
      type: checklistRealmFormat.type,
      amount_of_milk_produced: parseInt(checklistRealmFormat.amount_of_milk_produced),
      farmer: {
        name: checklistRealmFormat.farmer,
        city: checklistRealmFormat.city,
      },
      from: {
        name: checklistRealmFormat.from_name,
      },
      to: {
        name: checklistRealmFormat.to_name,
      },
      number_of_cows_head: parseInt(checklistRealmFormat.number_of_cows_head),
      had_supervision: checklistRealmFormat.had_supervision,
      created_at: checklistRealmFormat.created_at,
      updated_at: checklistRealmFormat.updated_at,
      _partition: checklistRealmFormat._partition,
      transmitted: checklistRealmFormat.transmitted,
    });
  });
  return checklist;
};
