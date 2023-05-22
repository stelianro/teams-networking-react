import React from "react";
import "./style.css";
import { createTeamRequest, deleteTeamRequest, getTeamsRequest, updateTeamRequest } from "./middleware";
import { Team } from "./models";

type Props = {
  loading: boolean;
  teams: Team[];
  team: Team;
};

type Actions = {
  deleteTeam(id: string): void;
  save(): void;
  inputChange(name: string, value: string): void;
  startEdit(team: Team): void;
  reset(): void;
};

export function TeamsTable(props: Props & Actions) {
  return (
    <form
      id="editForm"
      action=""
      method="post"
      className={props.loading ? "loading-mask" : ""}
      onSubmit={e => {
        e.preventDefault();
        props.save();
      }}
      onReset={() => {
        props.reset();
      }}
    >
      <table>
        <colgroup>
          <col span={1} style={{ width: "40px" }} />
          <col span={1} style={{ width: "125px" }} />
          <col span={1} />
          <col span={1} />
          <col span={1} />
          <col span={1} style={{ width: "80px" }} />
        </colgroup>
        <thead>
          <tr>
            <th>
              <input type="checkbox" name="selectAll" id="selectAll" />
            </th>
            <th>Promotion</th>
            <th>Members</th>
            <th>Project Name</th>
            <th>Project URL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.teams.map(team => {
            const { id, url, promotion, members, name } = team;
            let displayURL = url;
            if (url.startsWith("https://")) {
              displayURL = url.substring(8);
            }
            return (
              <tr key={id}>
                <td>
                  <input type="checkbox" name="selected" value={"id"} />
                </td>
                <td>{promotion}</td>
                <td>{members}</td>
                <td>{name}</td>
                <td>
                  <a href={url} target="_blank">
                    {displayURL}
                  </a>
                </td>
                <td>
                  <a
                    className="link-btn"
                    onClick={() => {
                      props.deleteTeam(id);
                    }}
                  >
                    ✖
                  </a>
                  <a
                    className="link-btn"
                    onClick={() => {
                      props.startEdit(team);
                    }}
                  >
                    &#9998;
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                name="promotion"
                id="promotion"
                placeholder={"Enter Promotion"}
                required
                value={props.team.promotion}
                onChange={e => {
                  props.inputChange("promotion", e.target.value);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                name="members"
                id="members"
                placeholder={"Enter members"}
                required
                value={props.team.members}
                onChange={e => {
                  props.inputChange("members", e.target.value);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                name="name"
                id="name"
                placeholder={"Enter project name"}
                required
                value={props.team.name}
                onChange={e => {
                  props.inputChange("name", e.target.value);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                name="url"
                id="url"
                placeholder={"Enter URL"}
                required
                value={props.team.url}
                onChange={e => {
                  props.inputChange("url", e.target.value);
                }}
              />
            </td>
            <td>
              <button type="submit">💾</button>
              <button type="reset">✖</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  );
}

type WrapperProps = {};
type State = {
  loading: boolean;
  teams: Team[];
  team: Team;
};

const emptyTeam: Team = {
  id: "",
  name: "",
  promotion: "",
  url: "",
  members: ""
};
function getEmptyTeam(): Team {
  // return { ...emptyTeam };
  return {
    id: "",
    name: "",
    promotion: "",
    url: "",
    members: ""
  };
}

export class TeamsTableWrapper extends React.Component<WrapperProps, State> {
  constructor(props: WrapperProps) {
    super(props);
    this.state = {
      loading: true,
      teams: [],
      team: getEmptyTeam()
    };

    this.save = this.save.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount(): void {
    this.loadTeams();
  }

  async loadTeams() {
    const teams = await getTeamsRequest();
    this.setState({
      loading: false,
      teams: teams || []
    });
  }

  private async deleteTeam(id: string) {
    this.setState({
      loading: true
    });
    const { success } = await deleteTeamRequest(id);

    this.setState(state => ({
      loading: false,
      teams: state.teams.filter(team => team.id !== id)
    }));
  }

  private inputChange(name: string, value: string) {
    // state.team.promotion === state.team["promotion"]
    //  -> state.team[name]
    this.setState(state => ({
      team: {
        ...state.team,
        [name]: value
      }
    }));
  }

  private async save() {
    this.setState({
      loading: true
    });
    const team = this.state.team;
    let id, status;
    if (team.id) {
      status = await updateTeamRequest(team);
    } else {
      status = await createTeamRequest(team);
      id = status.id;
    }
    this.setState(state => ({
      loading: false,
      teams: team.id ? state.teams.map(t => (t.id === team.id ? { ...team } : t)) : [...state.teams, { ...team, id }],
      team: getEmptyTeam()
    }));
  }

  private startEdit(team: Team) {
    this.setState({
      team
    });
  }

  private reset() {
    this.setState({
      team: getEmptyTeam()
    });
  }

  render() {
    return (
      <TeamsTable
        teams={this.state.teams}
        loading={this.state.loading}
        team={this.state.team}
        deleteTeam={this.deleteTeam}
        save={this.save}
        startEdit={this.startEdit}
        reset={this.reset}
        inputChange={this.inputChange}
      />
    );
  }
}
