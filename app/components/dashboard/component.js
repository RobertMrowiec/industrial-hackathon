import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { countBy, groupBy } from "lodash";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { TrackedObject } from "tracked-built-ins";
// import { action } from "@ember/object";
import fetch from "fetch";

export default class DashboardComponent extends Component {
  @service socket;
  @service violationModal;

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

      const currentUser = new TrackedObject({ ...this.peopleById[user_id] });

      if (currentUser) {
        currentUser.from = from;
        currentUser.to = to;

        this.peopleById = new TrackedObject({
          ...this.peopleById,
          [user_id]: currentUser,
        });
      }

      const newPerson = {
        ...currentUser,
        from,
        to,
      };

      this.peopleById = new TrackedObject({
        ...this.peopleById,
        [user_id]: newPerson,
      });
    });

    this.fetchPeople();
  }

  @tracked channelConnection;

  @tracked peopleById = {};

  @tracked roomsById = {
    2: {
      top: "0",
      left: "0",
      right: "50%",
      bottom: "50%",
      id: "2",
      name: "Hala Główna",
      maxPeopleCapacity: 10,
    },
    3: {
      top: "50%",
      left: "0",
      right: "50%",
      bottom: "0",
      id: "3",
      name: "Hala Produkcyjna",
      maxPeopleCapacity: 10,
    },
    4: {
      top: "0",
      left: "50%",
      right: "0",
      bottom: "0",
      id: "4",
      name: "Pokój Innowacyjny",
      maxPeopleCapacity: 5,
    },
  };

  get rooms() {
    return Object.values(this.roomsById);
  }

  @action
  closeViolationModal() {
    this.violationModal.closeModal();
  }

  async fetchPeople() {
    const response = await fetch(
      "https://workvisor-bb.herokuapp.com/api/workers"
    );

    const { data } = await response.json();

    this.peopleById = new TrackedObject({ ...data });
  }

  get roomStats() {
    return countBy(people, "to");
  }

  get people() {
    return Object.values(this.peopleById);
  }

  get peopleByRoomId() {
    return groupBy(this.people, "to");
  }
}
