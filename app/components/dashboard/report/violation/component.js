import Component from "@glimmer/component";

import moment from "moment";

export default class DashboardReportViolationComponent extends Component {
  get timeFromNowInMinutes() {
    const { timestamp } = this.args.violation;

    const dateFromNow = moment(timestamp).fromNow();

    return dateFromNow;
  }
}
