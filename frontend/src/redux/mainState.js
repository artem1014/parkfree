const InitState = {
  user: null,
  marks: [],
  notifications: { notification: [], notificationValue: null },
};

const getInitState = () => {
    const stateFromLS = JSON.parse(window.localStorage.getItem('user'))
    return stateFromLS ? stateFromLS : InitState
};

export default getInitState;
