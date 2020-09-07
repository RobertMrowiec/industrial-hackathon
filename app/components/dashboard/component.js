import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { countBy } from "lodash";

export default class DashboardComponent extends Component {
  @tracked people = [
    { from: null, to: "room-2", isOHPCompliant: false },
    { from: "room-2", to: "room-1", isOHPCompliant: true },
    { from: "room-1", to: "room-3", isOHPCompliant: true },
    { from: null, to: "room-1", isOHPCompliant: false },
  ];

  @tracked rooms = [
    { top: "0", left: "0", right: "50%", bottom: "50%", id: "room-1" },
    { top: "50%", left: "0", right: "50%", bottom: "0", id: "room-2" },
    { top: "0", left: "50%", right: "0", bottom: "0", id: "room-3" },
  ];

  get roomStats() {
    return countBy(people, "to");
  }
}
