import Component from "@glimmer/component";

export default class DashboardRoomComponent extends Component {
  get elementStyle() {
    const { top, left, right, bottom } = this.args.room;

    return `top: ${top}; left: ${left}; right: ${right}; bottom: ${bottom};`;
  }

  get countPeopleInRoom() {
    const { peopleInRoom } = this.args;

    if (!peopleInRoom) {
      return 0;
    }

    return peopleInRoom.length;
  }
}
