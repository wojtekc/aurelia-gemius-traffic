# `aurelia-gemius-traffic`

This project is bootstrapped by [aurelia-cli](https://github.com/aurelia/cli).

Sposób użycia:

```js
.plugin(PLATFORM.moduleName('aurelia-gemius-traffic'), config => {
  config.init('<HITCOLLECTOR_PREFIX>', '<IDENTIFIER>', true);
  config.attach({
      getExtra: () => {
          return {
              SCREEN_HIT: document.title,
          };
      }
  });
})
```
