import "../styles/summary.css";
import { useState } from "react";
import { ModifyField } from "./modifyField";
import { getItem, setId } from "../utils";

const summaryList = [
  {
    value: "",
    isEdit: true
  }
].map(setId);

export default function Summary() {
  const [summaryItems, setSummaryItem] = useState(summaryList);

  function updateValue(e) {
    const { item, newItems } = getItem(e, summaryItems);
    item.value = e.target.value;
    setSummaryItem(newItems);
  }

  function toggleEdit(e) {
    const { item, newItems } = getItem(e, summaryItems);
    item.isEdit = item.isEdit ? false : true;
    setSummaryItem(newItems);
  }

  const { id, value, isEdit } = summaryItems[0];
  return (
    <section className="summary">
      <h2>Summary</h2>
      <li id={id} className="summary_item item" data-item="summary">
        {isEdit ? (
          <textarea
            name=""
            id=""
            maxLength={500}
            className="summary_description"
            value={value}
            onChange={updateValue}
          ></textarea>
        ) : (
          <p className="summary_description">{value}</p>
        )}
        <ModifyField toggleEdit={toggleEdit} />
      </li>
    </section>
  );
}
