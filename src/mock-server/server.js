import { createServer, Model } from 'miragejs';
import { AppConstant } from 'constants/index';
import routePath from 'routes/routePath';
import { fakeUsers, fakeActivities } from './data';
import { cloneDeep } from 'lodash';

export function makeServer({ environment = 'test' } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model,
      activity: Model,
    },

    seeds(server) {
      fakeUsers.forEach((item) => server.create('user', item));
      fakeActivities.forEach((item) => server.create('activity', item));
    },

    routes() {
      this.namespace = AppConstant.BASE_URL;

      this.post(routePath.user.login, (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const model = schema.users.findBy({
          email: attrs.email,
          password: attrs.password,
        });
        let result = cloneDeep(model);
        if (result?.attrs) {
          delete result.attrs['password'];
        }
        return result;
      });

      this.get(routePath.activity.all, (schema) => {
        return schema.activities.all();
      });
    },
  });

  return server;
}
