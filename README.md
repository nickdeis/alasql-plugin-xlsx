## Plugin API: higher level goals by priority

1. No calls/requiring to/of alasql
 * We want alasql to be aware of things it can plugin, not for plugins to be aware of what they can plug into.
 * Also makes version incompatibles a non-issue between plugins
 * alasql will control, based on it's current properties and state, if a plugin will work
 * For engine plugins this may not be an option
2. Stackable
 * Plugins should be able to define different apis for different runtimes
 * This example only has browser and server, but more granularity will probably be required
 * alasql then doesn't have to be so context aware
3. Build time with hopefully a UI build tool
 * Compilers are nice
 * But it would be nice to display all the different ways alasql can be served.
4. Interfaces
  * They go hand in hand with plugins

## Contents of this repo

### Browser/Server split

### Plugins

#### From plugins
* Plugins that implement the AlaSQLFrom interface
* The "I" in IO. Read from files, the dom, etc.
* If the Function#name is opened, it will be attached to **alasql.from**

#### Into plugins
* Plugins that implement the AlaSQLInto interface
* The "O" in IO. Output into files, csv, etc.
* If the Function#name is opened, it will be attached to **alasql.into**

