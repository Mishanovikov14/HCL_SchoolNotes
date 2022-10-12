define(function() {

  return {
    timerId: null,
    initialTop: "",
    finalTop: "",

    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    initialize: function (data) {
      this.initialTop = data.initialTop;
      this.finalTop = data.finalTop;
      this.view.flxAnimatedContainer.top = this.initialTop;
      this.view.lblNotificationText.text = data.text;
      this.view.flxContainer.height = "100%";
      this.view.flxContainer.onTouchStart = () => this.onHide();
      this.view.flxAnimatedContainer.onTouchStart = () => this.onHide();
      this.initUI(data.type);
    },

    initUI: function(config) {
      this.view.flxAnimatedContainer.skin = config === "success" ? "sknFlxNotificationSuccess" : "sknFlxNotificationError"; 
    },

    onHide: function () {
        if (this.timerId) {
          voltmx.timer.cancel(this.timerId);
        }
        this.timerId = null;
        let self = this;

        let scrollAnimationConfig = {
          100: {
            top: self.initialTop
          },
          0: {
            top: self.finalTop
          }
        };

        this.view.flxAnimatedContainer.animate(
          voltmx.ui.createAnimation(scrollAnimationConfig),
          {
            "iterationCount": 1,
            "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
            "duration": 1
          },
          {
            "animationEnd": function() {
              self.view.isVisible = false;
            }
          }
        );
    },

    onShow: function (data) {
        this.initialize(data);
        this.view.isVisible = true;

        let self = this;
        let scrollAnimationConfig = {
          100: {
            top: self.finalTop
          },
          0: {
            top: self.initialTop
          }
        };

        this.view.flxAnimatedContainer.animate(
          voltmx.ui.createAnimation(scrollAnimationConfig),
          {
            "iterationCount": 1,
            "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
            "duration": 1
          },
          {
            "animationEnd": function() {},
          }
        );

        this.timerId = "auto-close";
        voltmx.timer.schedule(self.timerId, self.onHide, 3, false);
    },
  };
});