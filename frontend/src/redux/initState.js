const initState = {
  marks: [],
}

const getInitState = () => {
  const stateFromLS = JSON.parse(window.localStorage.getItem('marks')) //вытаскивается весь стор, как юзеры так и посты
  return stateFromLS ? stateFromLS : initState
}

export default getInitState
