import "./styles/App.css";
import { useState } from "react";
import { Passport } from "./components/passport";
import { Contact } from "./components/contact";
import { Summary } from "./components/summary";
import { Skill } from "./components/skill";
import { Name } from "./components/name";
import { Education } from "./components/education";
import { Experience } from "./components/experience";

function App() {
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
        <Name />
        <main>
          <Education />
          <Experience />
        </main>
      </section>
    </div>
  );
}

export default App;
