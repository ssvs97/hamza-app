export const aggregateHandle = (data) => {
  if (data.length != 0 && !data._model) return data;
  if (data.length == 0 || (data._model && data._model.length == 0)) return [];
  return data._model;
};
