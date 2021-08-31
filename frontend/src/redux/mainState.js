const InitState = {
  user: null,
  marks: []
}

const getInitState = () => {
  const stateFromLS = JSON.parse(window.localStorage.getItem('user'))
  return stateFromLS || InitState
}

export default getInitState
