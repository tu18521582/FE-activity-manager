import { Provider } from 'react-redux';
import store from 'redux/store';
import 'antd/dist/antd.css';
import LandingContainer from './features/landing-page/LandingContainer';

const App = () => {
  return (
    <Provider store={store}>
      <LandingContainer />
    </Provider>
  );
};

export default App;
