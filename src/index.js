import { AureliaGemiusTraffic } from './aurelia-gemius-traffic';

export function configure(aurelia, configCallback) {
  console.log('XX: configure');
  const instance = aurelia.container.get(AureliaGemiusTraffic);
  if (configCallback !== undefined && typeof configCallback === 'function') {
    configCallback(instance);
  }
  aurelia.singleton(instance);
}
