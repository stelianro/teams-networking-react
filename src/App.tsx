import { useState } from "react";
import "./App.css";
import { AppFooter } from "./footer/components";
import Header from "./header";
import { ContentWrapper } from "./main/components";
import { Page } from "./main/models";

function App() {
  const [activePage, setActivePage] = useState<Page>("home");
  return (
    <>
      <Header activePage={activePage} setActive={setActivePage} />
      <ContentWrapper activePage={activePage} />
      <AppFooter />
    </>
  );
}

export default App;
