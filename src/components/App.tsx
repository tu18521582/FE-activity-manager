import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import store from 'redux/store';
import Routes from 'routes/routes';
import NotFound from './features/notfound/NotFound';

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {Routes.map((item) => {
              const Component = item.component;
              return (
                <Route
                  key={item.path}
                  path={item.path}
                  exact
                  render={(routeProps) => <Component {...routeProps} />}
                />
              );
            })}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </HashRouter>
    </Provider>
  );
};

export default App;
