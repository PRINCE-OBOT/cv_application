import { Passport } from "./components/passport";
import "./styles/App.css";
import { useState } from "react";

function App() {
  return (
    <div className="cv_container">
      <aside className="left_side">
        <Passport />
      </aside>
      <section className="right_side">
        <header></header>
        <main></main>
      </section>
    </div>
  );
}

export default App;
