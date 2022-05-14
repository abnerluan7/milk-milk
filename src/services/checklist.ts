import { api } from 'Libs/api';

import { CheckList } from 'Types/Checklist';
import { ResponseSuccess } from 'Types/Response';

export const getAllCheckLists = async (): ResponseSuccess<CheckList[]> => {
  try {
    return api.get(process.env.ROUTE_CHECKLIST);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateCheckListsServerSide = async (
  checkList: CheckList
): ResponseSuccess<{ id: number }> => {
  let checkListToSend = { ...checkList };
  delete checkListToSend._id;
  delete checkListToSend._partition;
  delete checkListToSend.transmitted;
  try {
    return api.put(`${process.env.ROUTE_CHECKLIST}/${checkList._id}`, checkListToSend);
  } catch (err) {
    return Promise.reject(err);
  }
};
