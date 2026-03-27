export function setId(item) {
  item.id = crypto.randomUUID();
  return item;
}

export const closestItem = (target, attr = "[data-item]") =>
  target.closest(attr);
export const getId = (target, attr) => closestItem(target, attr).id;
export const getIndex = (arr, id) => arr.findIndex((item) => item.id === id);

export const getItem = (e, items) => {
  const target = e.target;
  const id = getId(target);

  const newItems = [...items];
  const index = getIndex(newItems, id);

  return { item: newItems[index], newItems };
};
