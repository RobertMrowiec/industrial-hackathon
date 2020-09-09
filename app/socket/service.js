import PhoenixSocket from "ember-phoenix/services/phoenix-socket";

export default PhoenixSocket.extend({
  init() {
    this._super(...arguments);
    // You may listen to open, "close" and "error"
    this.on("open", () => {
      console.log("Socket was opened!");
    });

    this.on("close", () => {
      console.log("Socket was closed");
    });

    this.on("close", () => {
      console.log("Socket was closed");
    });
  },

  connect() {
    this._super("ws://workvisor-bb.herokuapp.com/socket", {
      params: {},
    });

    const channel = this.joinChannel("events:monitoring", {
      nickname: "Mike",
    });

    return channel;
  },

  _onNotification(message) {
    alert(`Notification: ${message}`);
  },
});
