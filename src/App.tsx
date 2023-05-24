import { useState } from "react";
import "./App.css";
import { AppFooter } from "./footer/components";
import Header from "./header";
import { ContentWrapper } from "./main/components";
import { Page } from "./main/models";

const validPages: Page[] = ["home", "languages", "skills", "teams"];

function App() {
  let defaultPage = window.location.hash.substring(1) as Page;
  if (!validPages.includes(defaultPage)) {
    //console.warn("404");
    defaultPage = validPages[0];
  }
  const [activePage, setActivePage] = useState<Page>(defaultPage);
  return (
    <>
      <Header activePage={activePage} setActive={setActivePage} />
      <ContentWrapper activePage={activePage} />
      <AppFooter />
    </>
  );
}

export default App;
