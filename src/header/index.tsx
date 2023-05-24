import { Page } from "../main/models";
import { MainMenu } from "../menu/MainMenu";
import logo from "./network-team-icon.png";

type Props = {
  activePage: Page;
};
type Actions = {
  setActive(page: Page): void;
};

const icons = {
  home: "🏠",
  skills: "🎳",
  teams: "👨‍👩‍👦‍👦",
  languages: "♑"
};
function getIcon(page: Page) {
  return icons[page];
}

export default function AppHeader(props: Props & Actions) {
  const icon = getIcon(props.activePage);
  return (
    <header>
      <div id="header-wrapper">
        <div>
          <img src={logo} alt="Selfie" height="100" />
        </div>
        <div>
          <h1>
            <span style={{ display: "inline-block", minWidth: "65px" }}>{icon}</span>
            Stelian Rosca
          </h1>
          <h2 id="job-title">Software Developer @ OSS</h2>
        </div>
      </div>

      <MainMenu active={props.activePage} setActive={props.setActive} />
    </header>
  );
}
