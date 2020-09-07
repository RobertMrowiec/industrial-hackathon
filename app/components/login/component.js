import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class LoginComponent extends Component {
  @service router;

  @tracked userEmail;
  @tracked userPassword;

  @action
  login(event) {
    event.preventDefault();

    const correctCredentials =
      this.userEmail === "hackathon@selleo.com" &&
      this.userPassword === "winners";

    if (!correctCredentials) {
      return;
    }

    localStorage.setItem("isAuthenticated", "true");

    this.router.transitionTo("authenticated.dashboard");
  }
}
