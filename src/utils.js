export function setId(item) {
  item.id = crypto.randomUUID();
  return item;
}
