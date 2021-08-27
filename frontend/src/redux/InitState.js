const InitState = {
  user: null
}

const getInitState = () => {
  const stateFromLS = JSON.parse(window.localStorage.getItem('user'))
  return stateFromLS || InitState
}

export default getInitState
