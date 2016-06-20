# qenv
provides an easy way for promised environments

## Usage
qenv works with two files:

* **qenv.yml** - specifies which ENV vars are required.
* **env.yml** - specifies all env vars that are not already set in the current environment.

Now obviously you can set build specific env vars in many CI environments.
So there we do not need an **env.yml** since all ENV vars are in place
However when on another machine you can have a env.yml that will be added to the environment by qenv.

```typescript
import {Qenv} from "qenv";

myQenv = new Qenv("path/to/dir/where/qenv.yml/is/","path/to/dir/where/env.yml/is(");

``` 