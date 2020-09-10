import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('login');
  this.route('index', { path: '/' });

  this.route('authenticated', function() {
    this.route('dashboard');

    this.route('rooms', function() {
      this.route('new');
    });

    this.route('users', function() {
      this.route('new');
    });

    this.route('settings');
    this.route('report');
  });
});
