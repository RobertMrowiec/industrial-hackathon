import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class ViolationModalService extends Service {
  @tracked violationData = null;

  closeModal() {
    this.violationData = null;
  }

  openModal(violationData) {
    this.violationData = violationData;
  }
}
