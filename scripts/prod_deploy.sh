#!/bin/bash

#NOTE: Run this on server.

set -e

#git pull origin master

docker build --rm -t podbot .
docker rm -f podbot
docker run -e ENVIRONMENT=production --dns=8.8.8.8 --name podbot -d -p 8091:80 podbot
