import "../styles/summary.css";
import { useState } from "react";
import { ModifyField } from "./modifyField";
import { closestItem, getItem, setId } from "../utils";

const summaryList = [
  {
    value: "",
    isEdit: true,
    isSelect: true,
    placeholder: "Summary"
  }
].map(setId);

export function Summary() {
  const [summaryItems, setSummaryItem] = useState(summaryList);

  function updateValue(e) {
    const { item, newItems } = getItem(e, summaryItems);
    item.value = e.target.value;
    setSummaryItem(newItems);
  }

  function toggleEdit(e) {
    const closest = closestItem(e.target);
    const textarea = closest.querySelector(".summary_description");

    const { item, newItems } = getItem(e, summaryItems);
    const isEdit = item.isEdit;

    if (isEdit) {
      if (textarea.value.trim() === "") return;
    }

    item.isEdit = isEdit ? false : true;
    setSummaryItem(newItems);
  }

  function unselectItem(e) {
    const { item, newItems } = getItem(e, summaryItems);
    item.isSelect = false;
    setSummaryItem(newItems);
  }

  function selectItem(e) {
    const { item, newItems } = getItem(e, summaryItems);
    item.isSelect = true;
    setSummaryItem(newItems);
  }

  const selectedItem = [];
  const unSelectedItem = [];

  summaryItems.forEach((item) => {
    if (item.isSelect) selectedItem.push(item);
    else {
      unSelectedItem.push(item);
    }
  });

  return (
    <section className="summary">
      <h3>SUMMARY</h3>

      <div className="unselect_summary_item_wrapper">
        {unSelectedItem.map(({ id, placeholder }) => {
          return (
            <button
              key={id}
              id={id}
              value={placeholder}
              onClick={selectItem}
              className="unselect_summary_item_btn unselect_item_btn"
              data-item="contact"
            >
              {placeholder}
            </button>
          );
        })}
      </div>

      <div className="select_item_wrapper">
        {selectedItem.map(({ id, isEdit, placeholder, value }) => {
          return (
            <li
              key={id}
              id={id}
              className="summary_item item"
              data-item="summary"
            >
              {isEdit ? (
                <textarea
                  name=""
                  maxLength={500}
                  className="summary_description"
                  value={value}
                  placeholder={placeholder}
                  onChange={updateValue}
                ></textarea>
              ) : (
                <p className="summary_description">{value}</p>
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
