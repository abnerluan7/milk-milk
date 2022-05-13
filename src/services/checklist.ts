import { api } from 'Libs/axios';
import { CheckList } from 'Types/Checklist';
import { ResponseSuccess } from 'Types/Response';

export const getAllCheckLists = async (): ResponseSuccess<CheckList[]> => {
  try {
    return api.get('/v1/checkList');
  } catch (err) {
    return Promise.reject(err);
  }
};
