# qenv
provides an easy way for promised environments

## Usage
qenv looks for an qenv.yml that defines needed env vars. qenv dirst checks if they are already specified.
If not, qenv by default looks for a .nogit/env.yml file.
If any env var is not specified, qenv throws an error and exits.