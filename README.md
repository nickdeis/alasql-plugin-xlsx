## Plugin API: higher level goals by priority

1. No calls/requiring to/of alasql
 * We want alasql to be aware of things it can plugin, not for plugins to be aware of what they can plug into.
 * Also makes version incompablites a non-issue between plugins
 * alasql will control, based on it's current properties and state, if a plugin will work
 * For engine plugins this may not be an option
2. Stackable
 * Plugins should be able to define different apis for different runtimes
 * This example only has browser and server, but more granularity will probably be required
 * alasql then doesn't have to be so context aware
3. Build time with hopefully a UI build tool
 * Compilers are nice
 * But it would be nice to display all the different ways alasql can be served.

## Contents of this repo

### Browser/Server split

### Typescript interfaces

