import { inject } from 'aurelia-dependency-injection';
import { LogManager } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class AureliaGemiusTraffic {
  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.logger = LogManager.getLogger('gemius-traffic-plugin');
    this.initialized = false;
  }

  init(prefix, identifier, debug = false) {
    this.prefix = prefix;
    this.identifier = identifier;
    this.debug = debug;
    this.loadScript();
    this.initialized = true;
  }

  attach(options = { getExtra: () => {}}) {
    this.log('debug', 'attach');
    if (!this.initialized) {
      const errorMessage = 'Gemius Traffic must be initialized before use.';
      this.log('error', errorMessage);
      throw new Error(errorMessage);
    }
    this.options = options;
    this.attachPageTracker();
  }

  log(level, message) {
    if (!this.debug) {
      return;
    }
    this.logger[level](message);
  }

  loadScript() {
    this.log('debug', 'loadScript');
    const script = document.createElement('script');
    script.text =
      'var pp_gemius_identifier = "' +
      this.identifier +
      '";' +
      'function gemius_pending(i) { window[i] = window[i] || function() {' +
      'var x = window[i+"_pdata"] = window[i+"_pdata"] || []; x[x.length]=arguments;};};' +
      'gemius_pending("gemius_hit"); gemius_pending("gemius_event");' +
      'gemius_pending("pp_gemius_hit"); gemius_pending("pp_gemius_event");' +
      '(function(d,t) {try {var gt=d.createElement(t),s=d.getElementsByTagName(t)[0],l="http"+((location.protocol=="https:")?"s":""); gt.setAttribute("async","async");' +
      'gt.setAttribute("defer","defer"); gt.src=l+"://' +
      this.prefix +
      '.hit.gemius.pl/xgemius.js"; s.parentNode.insertBefore(gt,s);} catch (e) {}})(document,"script");';
    document.querySelector('body').appendChild(script);
  }

  attachPageTracker() {
    this.eventAggregator.subscribe('router:navigation:success', payload => {
      this.trackPage();
    });
  }

  trackPage() {
    this.log('debug', 'trackPage');
    if (!this.initialized) {
      this.log('warn', "Try calling 'init()' before calling 'attach()'.");
      return;
    }
    const extra = this.options.getExtra();
    const extraParameter = Object.keys(extra)
      .map((key) => key + '=' + String(extra[key]).replace(/\|/g, '_'));
    gemius_hit(this.identifier, ...extraParameter);
  }
}
