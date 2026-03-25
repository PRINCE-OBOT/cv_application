export function setId(item) {
  item.id = crypto.randomUUID();
  return item;
}

export const closestItem = (target) => target.closest("[data-item]");
export const getId = (target) => closestItem(target).id;
export const getIndex = (arr, id) => arr.findIndex((item) => item.id === id);

export const getItem = (e, items) => {
  const target = e.target;
  const id = getId(target);

  const newItems = [...items];
  const index = getIndex(newItems, id);

  return { item: newItems[index], newItems };
};
