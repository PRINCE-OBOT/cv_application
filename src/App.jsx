import "./styles/App.css";
import { Passport } from "./components/passport";
import { Contact } from "./components/contact";
import { Summary } from "./components/summary";
import { Skill } from "./components/skill";
import { Name } from "./components/name";
import { Education } from "./components/education";
import { Experience } from "./components/experience";
import { Hobbies } from "./components/hobbies";
import { Referees } from "./components/referees";
import { Preview } from "./components/preview";

const body = document.body;

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
        <header>
          <Name />
          <Preview />
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
