import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

export default class DashboardSidebarPersonComponent extends Component {
  @service violationModal;

  @action
  openViolationModal() {
    const { person } = this.args;

    const violationData = {
      person,
      roomNameForPerson: this.roomNameForPerson,
    };

    this.violationModal.openModal(violationData);
  }

  get roomNameForPerson() {
    const { roomsById, person } = this.args;

    const currentRoom = roomsById[person.to];

    if (!currentRoom) {
      return "Poza obiektem";
    }

    return roomsById[person.to].name;
  }
}
