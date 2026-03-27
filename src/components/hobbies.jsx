import { useState } from "react";
import { ModifyField } from "./modifyField";
import { closestItem, getId, getIndex, getItem } from "../utils";

export function Hobbies() {
  const [hobbiesItems, setHobbiesItem] = useState([]);

  function addSkillItem() {
    const item = {
      id: crypto.randomUUID(),
      value: "",
      isEdit: true
    };

    const newItems = [...hobbiesItems, item];
    setHobbiesItem(newItems);
  }

  function toggleEdit(e) {
    const { item, newItems } = getItem(e, hobbiesItems);
    const isEdit = item.isEdit;

    if (isEdit) {
      const closest = closestItem(e.target);
      const inp = closest.querySelector("input.value");

      if (inp.value.trim() === "") return;
    }

    item.isEdit = isEdit ? false : true;
    setHobbiesItem(newItems);
  }

  function unselectItem(e) {
    const id = getId(e.target);
    const newItems = [...hobbiesItems];

    const index = getIndex(newItems, id);
    newItems.splice(index, 1);
    setHobbiesItem(newItems);
  }

  function updateValue(e) {
    const { item, newItems } = getItem(e, hobbiesItems);
    item.value = e.target.value;
    setHobbiesItem(newItems);
  }

  return (
    <section className="hobbies">
      <div className="border_design_icon_wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="border_design_icon"
          fill="#fff"
        >
          <path d="M15,12C13.89,12 13,12.89 13,14A2,2 0 0,0 15,16A2,2 0 0,0 17,14C17,12.89 16.1,12 15,12M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M14,9C14,7.89 13.1,7 12,7C10.89,7 10,7.89 10,9A2,2 0 0,0 12,11A2,2 0 0,0 14,9M9,12A2,2 0 0,0 7,14A2,2 0 0,0 9,16A2,2 0 0,0 11,14C11,12.89 10.1,12 9,12Z" />
        </svg>
      </div>
      <div className="heading">
        <h3>HOBBIES</h3>
        <button onClick={addSkillItem} className="add_item_btn">
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

      <div className="hobbies_item_wrapper">
        {hobbiesItems.map(({ id, value, isEdit }, index) => {
          return (
            <li
              key={id}
              id={id}
              className="item"
              data-item
              data-edit={isEdit}
            >
              {isEdit ? (
                <input
                  id={"hobbies_" + id}
                  type="text"
                  value={value}
                  onChange={updateValue}
                  className="value"
                />
              ) : (
                <div className="value_wrapper">
                  <p>&bull;</p>
                  <p className="value">{value}</p>
                </div>
              )}
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
