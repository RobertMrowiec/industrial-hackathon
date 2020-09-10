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

    const fixedData = data.reduce((acc, cur, index) => {
      if (index === 0) {
        return { ...cur, type: [cur.type] };
      }

      return { ...acc, type: [...acc.type, cur.type] };
    }, {});

    console.log(fixedData);

    this.violationResponseData = fixedData;
  }
}
