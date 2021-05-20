import { useCallback } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { increaseCountByNumber, increaseCountAsync } from 'redux/AppActionCreators';
import routePath from 'routes/routePath';
import './home.scss';

interface HomeProps {
  counter: number;
  handleIncrementAsync: VoidFunction;
  handleIncrementByOne: VoidFunction;
  handleIncrementByTwo: VoidFunction;
}

const Home = (props: HomeProps & RouteComponentProps) => {
  const { handleIncrementByOne, handleIncrementByTwo, handleIncrementAsync, history } = props;
  const handleGo = useCallback(() => {
    history.push(routePath.welcomeReact);
  }, [history]);

  return (
    <div className="home">
      <h2>Hi there, I hope something good happens to you today!</h2>
      <div className="home__counter">
        <p>Play mini game:</p>
        <span className="home__counter__value">{props.counter}</span>
        <button onClick={handleIncrementByOne}>Increase by 1</button>
        <button onClick={handleIncrementByTwo}>Increase by 2</button>
        <button onClick={handleIncrementAsync}>Increase by 3 with delay</button>
      </div>

      <p>Ready to React?</p>
      <button onClick={handleGo}>Go!</button>
    </div>
  );
};

const mapStateToProps = (state: any) => ({ counter: state.counter });
const mapDispatchToProps = (dispatch: any) => ({
  handleIncrementByOne: () => dispatch(increaseCountByNumber(1)),
  handleIncrementByTwo: () => dispatch(increaseCountByNumber(2)),
  handleIncrementAsync: () => dispatch(increaseCountAsync(3, 1500)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
