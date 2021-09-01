const InitState = {
  user: null,
  marks: [],

  notifications: { notification: [], notificationValue: null },
};

const getInitState = () => {
  return InitState;
};

export default getInitState;
