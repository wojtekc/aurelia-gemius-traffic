// regenerator-runtime is to support async/await syntax in ESNext.
// If you don't use async/await, you can remove regenerator-runtime.
import { PLATFORM } from 'aurelia-pal';
import 'regenerator-runtime/runtime';
import environment from './environment';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    // load the plugin ../src
    // The "resources" is mapped to "../src" in aurelia.json "paths"
    .feature('resources');

  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-gemius-traffic'));
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-gemius-traffic'), config => {
    config.init('tvpgapl', 'zZnrQCNKAMdi6K8omTHr4tWZzZCNcYNaICcvCsg8.gP.y7');
    config.attach({
      getExtra: () => {
        return {
          SCREEN_HIT: document.title,
        };
      }
    });
  });

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
