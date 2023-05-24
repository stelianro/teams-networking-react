import { useState } from "react";
import { SideMenu } from "../menu/SideMenu";
import { TeamsTableWrapper } from "../teams/TeamsTable";

export function ContentWrapper() {
  // let search = "JS";
  const [search, setSearch] = useState("JS");
  return (
    <section id="content">
      <SideMenu />
      <div id="main">
        <div className="page" id="home">
          HOME content...
        </div>
        <div className="page" id="skills">
          <h2>Skills & Endorcements</h2>
          <ul></ul>
        </div>
        <div className="page" id="teams" style={{ display: "block" }}>
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
            }}
          />
          <span>searching: {search}</span>
          <TeamsTableWrapper search={search} />
        </div>
        <div className="page" id="languages">
          Languages content...
        </div>
      </div>
    </section>
  );
}
