import { useState } from "react";
import { closestItem, getId, getIndex, getItem, previewBus } from "../utils";
import { ModifyField } from "./modifyField";

export function Referees() {
  const [refereesItems, setRefereesItems] = useState([]);

  function addRefereeItem() {
    const item = {
      id: crypto.randomUUID(),
      isEdit: true,
      isSelect: true,
      subItems: [
        {
          id: "name",
          className: "name",
          labelVal: "Name",
          value: ""
        },
        {
          id: "tel",
          className: "tel",
          labelVal: "Tel",
          value: ""
        }
      ]
    };

    const newItems = [...refereesItems, item];
    setRefereesItems(newItems);
  }

  function updateValue(e) {
    const target = e.target;
    const itemId = getId(target);

    const newItems = [...refereesItems];

    const subItemId = getId(target, "[data-sub-item]");
    const itemIndex = getIndex(newItems, itemId);

    const newSubItems = newItems[itemIndex].subItems;
    const subItemIndex = getIndex(newSubItems, subItemId);

    const newSubItem = newSubItems[subItemIndex];

    newSubItem.value = target.value;
    setRefereesItems(newItems);
  }

  function toggleEdit(e) {
    const { item, newItems } = getItem(e, refereesItems);
    const isEdit = item.isEdit;

    if (isEdit) {
      const closest = closestItem(e.target);
      const inputs = closest.querySelectorAll("input");

      const isEmpty = [...inputs].some((inp) => inp.value.trim() === "");

      if (isEmpty) return;
    }

    item.isEdit = isEdit ? false : true;

    setRefereesItems(newItems);
  }

  function unselectItem(e) {
    const id = getId(e.target);
    const newItems = [...refereesItems];

    const index = getIndex(newItems, id);
    newItems.splice(index, 1);
    setRefereesItems(newItems);
  }

  previewBus.addEventListener("preview", (e) => {
    e.detail.previewFormat(refereesItems, setRefereesItems);
  });

  return (
    <section className="experience">
      <div className="border_design_icon_wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="border_design_icon"
          fill="#fff"
        >
          <path d="M6,17C6,15 10,13.9 12,13.9C14,13.9 18,15 18,17V18H6M15,9A3,3 0 0,1 12,12A3,3 0 0,1 9,9A3,3 0 0,1 12,6A3,3 0 0,1 15,9M3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5C3.89,3 3,3.9 3,5Z" />
        </svg>
      </div>
      <div className="heading">
        <h3>REFEREES</h3>
        <button onClick={addRefereeItem} className="add_item_btn">
          <svg
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
          >
            <circle
              opacity="0.5"
              cx="12"
              cy="12"
              r="10"
              stroke="#1C274C"
              strokeWidth="1.5"
            />
            <path
              d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="item_wrapper">
        {refereesItems
          .filter(({ isSelect }) => isSelect)
          .map(({ id, subItems, isEdit }) => {
            return (
              <li key={id} id={id} data-item className="item">
                <div className="border_design_bullet">&#9632;</div>
                <div className="item_left_side">
                  {isEdit
                    ? subItems.map(({ id, value, labelVal, className }) => {
                        return (
                          <div
                            key={id}
                            id={id}
                            data-sub-item
                            className={className}
                          >
                            <label htmlFor={id + "_"}>{labelVal}</label>
                            <input
                              type="text"
                              id={id + "_"}
                              value={value}
                              placeholder={labelVal}
                              onChange={updateValue}
                            />
                          </div>
                        );
                      })
                    : subItems.map(({ id, value, labelVal, className }) => {
                        return (
                          <div
                            key={id}
                            id={id}
                            data-sub-item
                            className={className}
                          >
                            <label>{labelVal}</label>
                            <p key={id} className={className}>
                              {value}
                            </p>
                          </div>
                        );
                      })}
                </div>
                <ModifyField
                  toggleEdit={toggleEdit}
                  unselectItem={unselectItem}
                />
              </li>
            );
          })}
      </div>
    </section>
  );
}
