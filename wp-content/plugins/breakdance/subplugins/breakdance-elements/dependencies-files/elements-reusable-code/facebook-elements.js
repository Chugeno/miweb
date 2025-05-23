(function () {
  class BreakdanceFacebookSDK {
    sdkUrl = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0`;
    sdkId = "fb-sdk";

    constructor(element) {
      this.loadScript.bind(this);
      this.selector = element;
      this.element = this.queryElement(element);
      this.appId = this.queryElement('meta[property="fb:app_id"');
      this.init();
    }

    queryElement(element) {
      if (typeof element == "string") {
        return document.querySelector(element);
      }
      return element;
    }

    loadScript(appId) {
      if (document.getElementById(this.sdkId)) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.onload = resolve;
        script.src = appId ? `${this.sdkUrl}&appId=${appId}` : `${this.sdkUrl}`;
        script.id = this.sdkId;
        script.async = true;
        script.defer = true;
        script.crossOrigin = "anonymous";
        script.nonce = "FOKrbAYI";

        document.body.appendChild(script);
      });
    }

    update() {
      if (typeof FB !== "undefined") {
        FB.XFBML.parse(this.element);
      }
    }

    destroy() {
      this.element = null;
    }

    async init() {
      // make sure we load the script once
      if (typeof FB === "undefined") {
        if (this.appId) {
          await this.loadScript(this.appId.content);
        } else {
          await this.loadScript();
        }
      } else {
        this.update();
      }
    }
  }

  window.BreakdanceFacebookSDK = BreakdanceFacebookSDK;
})();
