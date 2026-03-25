import { useState } from "react";
import "../styles/skill.css";
import { ModifyField } from "./modifyField";
import { closestItem, getId, getIndex, getItem } from "../utils";

export function Skill() {
  const [skillItems, setSkillItem] = useState([]);

  function addSkillItem() {
    const item = {
      id: crypto.randomUUID(),
      value: "",
      isEdit: true
    };

    const newItems = [...skillItems, item];
    setSkillItem(newItems);
  }

  function toggleEdit(e) {
    const closest = closestItem(e.target);
    const inp = closest.querySelector("input.value");

    const { item, newItems } = getItem(e, skillItems);
    const isEdit = item.isEdit;

    if (isEdit) {
      if (inp.value.trim() === "") return;
    }

    item.isEdit = isEdit ? false : true;
    setSkillItem(newItems);
  }

  function unselectItem(e) {
    const id = getId(e.target);
    const newItems = [...skillItems];

    const index = getIndex(newItems, id);
    newItems.splice(index, 1);
    setSkillItem(newItems);
  }

  function updateValue(e) {
    const { item, newItems } = getItem(e, skillItems);
    item.value = e.target.value;
    setSkillItem(newItems);
  }

  return (
    <section className="skill">
      <div className="heading">
        <h3>SKILLS</h3>
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
          onClick={addSkillItem}
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

      <div className="skill_item_wrapper">
        {skillItems.map(({ id, value, isEdit }, index) => {
          return (
            <li
              key={id}
              id={id}
              className="skill_item item"
              data-item="skill"
              data-edit={isEdit}
            >
              {isEdit ? (
                <input
                  id={"skill_" + id}
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
