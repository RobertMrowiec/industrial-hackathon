import Component from "@glimmer/component";

export default class DashboardRoomComponent extends Component {
  get elementStyle() {
    const { top, left, right, bottom } = this.args.room;

    return `top: ${top}; left: ${left}; right: ${right}; bottom: ${bottom};`;
  }
}
