import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { countBy, groupBy } from "lodash";
import { inject as service } from "@ember/service";
import { TrackedObject } from "tracked-built-ins";
import { action } from "@ember/object";

const seralizedRule = {
  'no_helmet': 'bez kasku',
  'no_glasses': 'bez okularów',
  'no_temperature_to_high': 'ma za wysoką temperaturę'
}

const serializedRoom = {
  '2': 'Hala Główna',
  '3': 'Hala Produkcyjna',
  '4': 'Pokój Innowacyjny'
}

export default class DashboardComponent extends Component {
  @service socket;
  @service notifications;

  constructor() {
    super(...arguments);

    this.channelConnection = this.socket.connect();

    this.channelConnection.on("rule_violation", (data) => {
      const { rule, user_id } = data;

      if (rule === 'no_temperature_to_high')
        this.notifications.error(`Użytkownik ${user_id} znajdujący się w ${serializedRoom[this.peopleById[user_id].to]} ${seralizedRule[rule]}`, {
          autoClear: true,
          clearDuration: 4000
        })
      else if (this.peopleById[user_id].to !== '1')
        this.notifications.warning(`Użytkownik ${user_id} wszedł do ${serializedRoom[this.peopleById[user_id].to]} ${seralizedRule[rule]}`, {
          autoClear: true,
          clearDuration: 4000
        })

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
    {
      top: "0",
      left: "0",
      right: "50%",
      bottom: "50%",
      id: "2",
      name: "Hala Główna",
    },
    {
      top: "50%",
      left: "0",
      right: "50%",
      bottom: "0",
      id: "3",
      name: "Hala Produkcyjna",
    },
    {
      top: "0",
      left: "50%",
      right: "0",
      bottom: "0",
      id: "4",
      name: "Pokój Innowacyjny",
    },
  ];

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
