FROM ubuntu:23.10

WORKDIR /home/

COPY . .

RUN bash ./setup.sh

ENV PATH="/root/.cargo/bin:$PATH"
ENV PATH="/root/.local/share/solana/install/active_release/bin:$PATH"

RUN RUST_BACKTRACE=full cargo install --git https://github.com/project-serum/anchor avm --locked --force

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN avm install 0.29.0
RUN avm use 0.29.0

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 18.20.1

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

# install node, npm and yarn using nvm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default \
    && npm install -g yarn

# confirm installation
RUN node -v
RUN npm -v