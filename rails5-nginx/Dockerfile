FROM ruby:2.5.1 as assets

RUN curl -sL https://deb.nodesource.com/setup_11.x | bash - && \
    apt-get install -y nodejs

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -y yarn

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --help
RUN yarn --version
RUN yarn install --frozen-lockfile

COPY Gemfile Gemfile.lock ./
RUN bundle install --frozen --without development test --path=vendor

# master key can be passed as env var to docker build
COPY . .
RUN echo "2c498ac13a201b498910d0a167d1fb52" > config/master.key

RUN bundle exec rake assets:precompile RAILS_ENV=staging

# ===================================================================================
FROM nginx as nginx
COPY --from=assets /app/public /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY run-nginx /app/run-nginx

CMD /app/run-nginx

# ===================================================================================
FROM ruby:2.5.1 as app

RUN curl -sL https://deb.nodesource.com/setup_11.x | bash - && \
    apt-get install -y nodejs


RUN mkdir /app
WORKDIR /app

# master key can be passed as env var to docker build
COPY . .
RUN echo "2c498ac13a201b498910d0a167d1fb52" > config/master.key
COPY --from=assets /app/vendor vendor
COPY --from=assets /app/public public

RUN bundle install --frozen --without development test --path=vendor

EXPOSE 3000
CMD ./bin/dockup
