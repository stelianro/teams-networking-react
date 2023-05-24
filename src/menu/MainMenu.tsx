import "./menu.css";
import { Page } from "../main/models";

type Props = {
  active: Page;
};
type Actions = { setActive(page: Page): void };
type MenuElement = { text: string; name: Page };

export function MainMenu(props: Props & Actions) {
  const active = props.active;
  const elements: MenuElement[] = [
    { text: "Home", name: "home" },
    { text: "Skills", name: "skills" },
    { text: "Todos", name: "todos" },
    { text: "Teams", name: "teams" },
    { text: "Languages", name: "languages" }
  ];
  return (
    <ul id="top-menu-bar">
      {elements.map(element => (
        <li key={element.name}>
          <a
            href={"#" + element.name}
            className={active === element.name ? "active" : ""}
            onClick={() => {
              props.setActive(element.name);
            }}
          >
            {element.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
