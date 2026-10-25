#!/bin/zsh
set -eu
cd -- "${0:A:h}/Deluxe"
exec /usr/bin/python3 server.py --open
