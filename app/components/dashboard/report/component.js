import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { TrackedObject } from "tracked-built-ins";
import { sortBy, filter } from "lodash";
import moment from "moment";

export default class DashboardReportComponent extends Component {
  @tracked peopleById;

  constructor() {
    super(...arguments);

    this.fetchPeople();
  }

  get violations() {
    const currentViolations = localStorage.getItem("violations");

    if (!currentViolations) return [];

    const violations = JSON.parse(currentViolations);

    const filteredViolations = filter(violations, function (violation) {
      const now = moment(Date.now());

      const violationTimestamp = moment(violation.timestamp);

      const difference = now.diff(violationTimestamp, "minutes");

      return difference < 30;
    });

    const sortedViolations = sortBy(filteredViolations, "timestamp").reverse();

    return sortedViolations;
  }

  async fetchPeople() {
    const response = await fetch(
      "https://workvisor-bb.herokuapp.com/api/workers"
    );

    const { data } = await response.json();

    this.peopleById = new TrackedObject({ ...data });
  }
}
