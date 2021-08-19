import { createServer, Model } from 'miragejs';
import { AppConstant } from 'constants/index';
import { fakeUsers, fakeActivities, fakeFollowTable } from './data';

export function makeServer({ environment = 'test' } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model,
      activity: Model,
      followinfo: Model,
    },

    seeds(server) {
      fakeUsers.forEach((item) => server.create('user', item));
      fakeActivities.forEach((item) => server.create('activity', item));
      fakeFollowTable.forEach((item) => server.schema.followinfos.create(item));
    },

    routes() {
      this.namespace = AppConstant.BASE_URL;

      this.post('/user/login', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.users.findBy({
          email: attrs.email,
          password: attrs.password,
        });
      });

      this.post('/user/signup', (schema, request) => {
        const newUser = JSON.parse(request.requestBody);
        const testDistincUser = schema.users.findBy({
          email: newUser.email,
        });
        if (testDistincUser === null) {
          return schema.db.users.insert(newUser);
        }
        return null;
      });

      this.get('/users', (schema) => {
        return schema.users.all();
      });

      this.get('/activities', (schema) => {
        return schema.activities.all();
      });

      this.post('/activities', (schema, request) => {
        const newActivity = JSON.parse(request.requestBody);
        return schema.db.activities.insert(newActivity);
      });

      this.get('/follow', (schema) => {
        return schema.followinfos.all();
      });
    },
  });

  return server;
}
