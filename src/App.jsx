import "./styles/App.css";
import { useState } from "react";
import { Passport } from "./components/passport";
import { Contact } from "./components/contact";
import { Summary } from "./components/summary";
import { Skill } from "./components/skill";
import { Name } from "./components/name";
import { Education } from "./components/education";
import { Experience } from "./components/experience";
import { Hobbies } from "./components/hobbies";
import { Referees } from "./components/referees";
import { hideEmptyElem, isSomeItemEmpty, previewBus } from "./utils";

const body = document.body;

function App() {
  const [isPreview, setIsPreview] = useState(false);

  function preview() {
    previewBus.dispatchEvent(
      new CustomEvent("preview", {
        detail: {
          previewFormat: (items, setItems) => {
            const newItems = items.map((item) => {
              item.isEdit = isPreview;

              const subItems = item.subItems;

              const isEmpty = subItems
                ? isSomeItemEmpty(subItems)
                : item.value === "";

              item.isSelect = isEmpty && !isPreview ? false : true;
              return item;
            });

            setItems(newItems);
          }
        }
      })
    );

    const icons = body.querySelectorAll(".modifyFieldWrapper");
    const addItemsBtns = body.querySelectorAll(".add_item_btn");
    const unselectItemWrapper = body.querySelectorAll(".unselect_item_wrapper");

    hideEmptyElem(isPreview, [
      ...icons,
      ...addItemsBtns,
      ...unselectItemWrapper
    ]);
    setIsPreview(!isPreview);
  }

  return (
    <div className="cv_container">
      <aside className="left_side">
        <Passport />
        <div className="bottom_wrapper">
          <Contact />
          <Summary />
          <Skill />
        </div>
      </aside>
      <section className="right_side">
        <header>
          <Name />
          <button onClick={preview} className="preview_icon_btn">
            <svg
              fill="#000000"
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="preview_icon"
            >
              <path d="m23.589 22.261-2.102-2.101c.51-.769.814-1.713.814-2.728 0-2.389-1.683-4.385-3.929-4.866l-.033-.006v-4.043c0-.009 0-.018 0-.026 0-.246-.088-.471-.233-.646l.001.002v-.005c-.019-.023-.039-.045-.06-.066l-.008-.009c-.009-.009-.018-.018-.027-.027l-7.44-7.44c-.021-.021-.042-.04-.065-.059l-.026-.018c-.016-.013-.033-.026-.05-.038l-.025-.018c-.018-.012-.036-.022-.054-.034l-.023-.012q-.034-.02-.075-.037l-.032-.013-.051-.018-.036-.011-.058-.015-.028-.006c-.028-.006-.057-.01-.086-.013h-8.948c-.559.002-1.011.454-1.015 1.012v20.377c0 .561.454 1.017 1.015 1.019h16.306.004c1.013 0 1.955-.304 2.74-.827l-.018.011 2.102 2.102c.181.166.423.268.689.268.563 0 1.019-.456 1.019-1.019 0-.266-.102-.508-.269-.689l.001.001zm-3.325-4.827c0 1.625-1.318 2.943-2.943 2.943s-2.943-1.318-2.943-2.943 1.318-2.943 2.943-2.943c1.624.002 2.941 1.318 2.943 2.942zm-9.396-13.956 3.993 3.994h-3.993zm-8.83-1.44h6.793v6.453c0 .563.456 1.019 1.019 1.019h6.453v3.05c-2.278.487-3.962 2.483-3.962 4.873 0 1.109.362 2.133.975 2.96l-.01-.013h-11.269z" />
            </svg>
            <p>{isPreview ? "Cancel Preview" : "Preview"}</p>
          </button>
        </header>
        <main>
          <Education />
          <Experience />
          <Hobbies />
          <Referees />
        </main>
      </section>
    </div>
  );
}

export default App;
