import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

export default class DashboardSidebarPersonViolationModalComponent extends Component {
  @service violationModal;

  @tracked violationResponseData;

  constructor() {
    super(...arguments);

    this.fetchPersonInfo();
  }

  async fetchPersonInfo() {
    // const { id } = this.args.person;

    const response = await fetch(
      `https://workvisor-bb.herokuapp.com/api/violations/7`
    );
    const { data } = await response.json();

    this.violationResponseData = data[0];

    console.log(data[0]);
  }
}
