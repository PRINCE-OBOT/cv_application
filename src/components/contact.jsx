import "../styles/contact.css";

import addressImg from "../assets/imgs/address.svg";
import telImg from "../assets/imgs/tel.svg";
import emailImg from "../assets/imgs/email.svg";

import { ModifyField } from "./modifyField";
import { setId } from "../utils";
import { useState } from "react";

const contactList = [
  {
    Icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="icon"
      >
        <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
      </svg>
    ),
    placeholder: "Address",
    alt: "Address",
    isSelect: true,
    isEdit: false
  },

  {
    Icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="icon"
      >
        <path d="M20,15.5C18.8,15.5 17.5,15.3 16.4,14.9C16.3,14.9 16.2,14.9 16.1,14.9C15.8,14.9 15.6,15 15.4,15.2L13.2,17.4C10.4,15.9 8,13.6 6.6,10.8L8.8,8.6C9.1,8.3 9.2,7.9 9,7.6C8.7,6.5 8.5,5.2 8.5,4C8.5,3.5 8,3 7.5,3H4C3.5,3 3,3.5 3,4C3,13.4 10.6,21 20,21C20.5,21 21,20.5 21,20V16.5C21,16 20.5,15.5 20,15.5M5,5H6.5C6.6,5.9 6.8,6.8 7,7.6L5.8,8.8C5.4,7.6 5.1,6.3 5,5M19,19C17.7,18.9 16.4,18.6 15.2,18.2L16.4,17C17.2,17.2 18.1,17.4 19,17.4V19Z" />
      </svg>
    ),
    placeholder: "Tel",
    alt: "Telephone",
    isSelect: true,
    isEdit: false
  },
  {
    Icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="icon"
      >
        <path d="M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5M6.4,6.5H17.6C18.37,6.5 19,7.12 19,7.9V16.1A1.4,1.4 0 0,1 17.6,17.5H6.4C5.63,17.5 5,16.87 5,16.1V7.9C5,7.12 5.62,6.5 6.4,6.5M6,8V10L12,14L18,10V8L12,12L6,8Z" />
      </svg>
    ),
    placeholder: "Email",
    alt: "Email",
    isSelect: true,
    isEdit: false
  }
].map(setId);

const getId = (target) => target.closest("[data-item='contact']").id;
const getIndex = (arr, id) => arr.findIndex((item) => item.id === id);
const getItem = (e, contactItems) => {
  const target = e.target;
  const id = getId(target);

  const newContactItems = [...contactItems];

  const index = getIndex(newContactItems, id);
  return { item: newContactItems[index], newContactItems };
};

export function Contact() {
  const [contactItems, setContactItem] = useState(contactList);

  function toggleEdit(e) {
    const { item, newContactItems } = getItem(e, contactItems);
    item.isEdit = item.isEdit ? false : true;
    setContactItem(newContactItems);
  }

  function unselectItem(e) {
    const { item, newContactItems } = getItem(e, contactItems);
    item.isSelect = false;
    setContactItem(newContactItems);
  }

  function selectItem(e) {
    const { item, newContactItems } = getItem(e, contactItems);
    item.isSelect = true;
    setContactItem(newContactItems);
  }

  const selectedItem = [];
  const unSelectedItem = [];

  contactList.forEach((item) => {
    if (item.isSelect) selectedItem.push(item);
    else {
      unSelectedItem.push(item);
    }
  });

  return (
    <section className="contact">
      <div className="heading">
        <h2>Contact</h2>
      </div>
      <div className="unselect_contact_item_wrapper">
        {unSelectedItem.map(({ placeholder, id }) => {
          return (
            <button
              key={id}
              id={id}
              onClick={selectItem}
              className="unselect_contact_item_btn"
              data-item="contact"
            >
              {placeholder}
            </button>
          );
        })}
      </div>

      <div className="select_contact_item">
        {selectedItem.map(({ id, Icon, placeholder, alt, isEdit }) => {
          return (
            <li key={id} id={id} className="contact_item" data-item="contact">
              <Icon />
              <input
                type="text"
                placeholder={placeholder}
                alt={alt}
                readOnly={isEdit}
                className="field"
              />
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
