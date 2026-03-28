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

function navLeftSideBar(method) {
  const leftSide = document.querySelector(".left_side");
  leftSide.classList[method]("show");
  
}

function App() {
  return (
    <div className="cv_container">
      <button
        className="open_side_bar_btn"
        onClick={() => navLeftSideBar("add")}
      >
        Profile
      </button>
      <aside className="left_side">
        <button
          className="close_side_bar_btn"
          onClick={() => navLeftSideBar("remove")}
        >
          X
        </button>
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
