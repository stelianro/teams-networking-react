import { MainMenu } from "../menu/MainMenu";
import logo from "./network-team-icon.png";

export default function AppHeader() {
  return (
    <header>
      <div id="header-wrapper">
        <div>
          <img src={logo} alt="Selfie" height="100" />
        </div>
        <div>
          <h1>Stelian Rosca</h1>
          <h2 id="job-title">Software Developer @ OSS</h2>
        </div>
      </div>

      <MainMenu />
    </header>
  );
}
