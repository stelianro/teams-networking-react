import "./menu.css";
import { Page } from "../main/models";

type Props = {};
type Actions = { setActive(page: Page): void };

export function MainMenu(props: Props & Actions) {
  return (
    <ul id="top-menu-bar">
      <li>
        <a
          href="#"
          onClick={() => {
            props.setActive("home");
          }}
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="#"
          onClick={() => {
            props.setActive("skills");
          }}
        >
          Skills
        </a>
      </li>
      <li>
        <a
          href="#"
          onClick={() => {
            props.setActive("teams");
          }}
        >
          Teams
        </a>
      </li>
      <li>
        <a
          href="#"
          onClick={() => {
            props.setActive("languages");
          }}
        >
          Languages
        </a>
      </li>
    </ul>
  );
}
