import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginComponent extends Component {
  @service router;

  @action
  login(event) {
    event.preventDefault();
    if (this.userEmail === 'hackathon@selleo.com' && this.userPassword === 'winners')
      return this.router.transitionTo('authenticated.dashboard');

  }
}
