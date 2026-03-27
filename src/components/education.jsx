import "../styles/education.css";
import { useState } from "react";
import { closestItem, getId, getIndex, getItem } from "../utils";
import { ModifyField } from "./modifyField";

export function Education() {
  const [educationItems, setEducationItems] = useState([]);

  function addEducationItem() {
    const item = {
      id: crypto.randomUUID(),
      isEdit: true,
      isSelect: true,
      subItems: [
        {
          id: "education_&_location",
          className: "education_name_and_location",
          labelVal: "Education & Location",
          value: ""
        },
        {
          id: "certificate",
          className: "certificate",
          labelVal: "Certificate",
          value: ""
        },
        {
          id: "year",
          className: "year",
          labelVal: "Year",
          value: ""
        }
      ]
    };

    const newItems = [...educationItems, item];
    setEducationItems(newItems);
  }

  function updateValue(e) {
    const target = e.target;
    const itemId = getId(target);

    const newItems = [...educationItems];

    const subItemId = getId(target, "[data-sub-item]");
    const itemIndex = getIndex(newItems, itemId);

    const newSubItems = newItems[itemIndex].subItems;
    const subItemIndex = getIndex(newSubItems, subItemId);

    const newSubItem = newSubItems[subItemIndex];

    newSubItem.value = target.value;
    setEducationItems(newItems);
  }

  function toggleEdit(e) {
    const { item, newItems } = getItem(e, educationItems);
    const isEdit = item.isEdit;

    if (isEdit) {
      const closest = closestItem(e.target);
      const inputs = closest.querySelectorAll("input");

      const isEmpty = [...inputs].some((inp) => inp.value.trim() === "");

      if (isEmpty) return;
    }

    item.isEdit = isEdit ? false : true;

    setEducationItems(newItems);
  }

  function unselectItem(e) {
    const id = getId(e.target);
    const newItems = [...educationItems];

    const index = getIndex(newItems, id);
    newItems.splice(index, 1);
    setEducationItems(newItems);
  }

  return (
    <section className="education">
      <div className="heading">
        <h3>EDUCATION</h3>
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
          onClick={addEducationItem}
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
      </div>

      <div className="education_item_wrapper">
        {educationItems.map(({ id, subItems, isEdit }) => {
          return (
            <li
              key={id}
              id={id}
              data-item="education"
              className="education_item item"
            >
              <div className="education_item_left_side">
                {isEdit
                  ? subItems.map(({ id, value, labelVal, className }) => {
                      return (
                        <div
                          key={id}
                          id={id}
                          data-sub-item="education"
                          className={className}
                        >
                          <label htmlFor={id}>{labelVal}</label>
                          <input
                            type="text"
                            id={id}
                            value={value}
                            placeholder={labelVal}
                            onChange={updateValue}
                          />
                        </div>
                      );
                    })
                  : subItems.map(({ id, value, className }) => (
                      <p key={id} className={className}>
                        {value}
                      </p>
                    ))}
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
