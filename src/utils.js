export function setId(item) {
  item.id = crypto.randomUUID();
  return item;
}

const getId = (target) => target.closest("[data-item]").id;
const getIndex = (arr, id) => arr.findIndex((item) => item.id === id);

export const getItem = (e, items) => {
  const target = e.target;
  const id = getId(target);
  
  const newItems = [...items];
  const index = getIndex(newItems, id);

  return { item: newItems[index], newItems };
};
