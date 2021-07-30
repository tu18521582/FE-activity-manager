import { Provider } from 'react-redux';
import store from 'redux/store';
import LandingPageContainer from './features/LandingPage/LandingPageContainer';
import 'antd/dist/antd.css';

const App = () => {
  return (
    <Provider store={store}>
      <LandingPageContainer />
    </Provider>
  );
};

export default App;
