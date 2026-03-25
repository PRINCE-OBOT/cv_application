import "./styles/App.css";
import { useState } from "react";
import { Passport } from "./components/passport";
import { Contact } from "./components/contact";
import Summary from "./components/summary";


function App() {
  return (
    <div className="cv_container">
      <aside className="left_side">
        <Passport />
        <div className="bottom_wrapper">
          <Contact />
          <Summary/>
        </div>
      </aside>
      <section className="right_side">
        <header></header>
        <main></main>
      </section>
    </div>
  );
}

export default App;
