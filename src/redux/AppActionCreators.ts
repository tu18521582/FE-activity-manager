export const increaseCountByNumber = (number: number) => ({ type: 'INCREMENT', payload: number });

export const increaseCountAsync = (number: number, time: number) => (dispatch: any) =>
  setTimeout(() => dispatch({ type: 'INCREMENT', payload: number }), time);
