export const initialState = {
  players: [],
  waitingSecondPlayer: true
}
export const reducer = (state, action) => {
  switch (action.type) {
    case 'PLAYERS':
      return {
        ...state,
        players: action.players,
        waitingSecondPlayer: action.waitingSecondPlayer,
      }

  }
}
