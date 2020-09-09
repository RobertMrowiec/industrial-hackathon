import Route from "@ember/routing/route";

export default class IndexRoute extends Route {
  beforeModel() {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (isAuthenticated) {
      this.transitionTo("authenticated.dashboard");
      return;
    }

    this.transitionTo("login");
  }
}
