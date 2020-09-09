import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { countBy } from "lodash";
import { inject as service } from "@ember/service";
import { TrackedObject } from "tracked-built-ins";
export default class DashboardComponent extends Component {
  @service socket;

  constructor() {
    super(...arguments);

    this.channelConnection = this.socket.connect();

    this.channelConnection.on("rule_violation", (data) => {
      const { rule, user_id } = data;

      const currentUser = this.peopleById[user_id];

      this.peopleById = new TrackedObject({
        ...this.peopleById,
        [user_id]: { ...currentUser, violatedRule: rule },
      });
    });

    this.channelConnection.on("room_transition", (data) => {
      const { origin_room: from, destination_room: to, user_id } = data;

      const currentUser = this.peopleById[user_id];

      if (currentUser) {
        currentUser[from] = from;
        currentUser[to] = to;

        this.peopleById = new TrackedObject({
          ...this.peopleById,
          [user_id]: currentUser,
        });
      }

      const newPerson = {
        from,
        to,
        user_id,
      };

      this.peopleById = new TrackedObject({
        ...this.peopleById,
        [user_id]: newPerson,
      });
    });
  }

  @tracked channelConnection;

  @tracked peopleById = {};

  @tracked rooms = [
    { top: "0", left: "0", right: "50%", bottom: "50%", id: "room-1" },
    { top: "50%", left: "0", right: "50%", bottom: "0", id: "room-2" },
    { top: "0", left: "50%", right: "0", bottom: "0", id: "room-3" },
  ];

  get roomStats() {
    return countBy(people, "to");
  }

  get people() {
    return Object.values(this.peopleById);
  }
}
