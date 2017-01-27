FROM ubuntu:14.04.2

ENV DEBIAN_FRONTEND noninteractive

RUN apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install -y \
  curl xz-utils && \
  curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && \
  apt-get install -y nodejs yarn && \
  apt-get autoremove -y && \
  apt-get clean all && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ENV PORT 80
CMD ["yarn", "run", "start"]

# Based on https://hackernoon.com/using-yarn-with-docker-c116ad289d56#.cokflxe9a
# Install packages using Yarn
ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn --ignore-engines
RUN mkdir -p /sodiofiles && cd /sodiofiles && ln -s /tmp/node_modules

WORKDIR /sodiofiles
ADD . /sodiofiles
