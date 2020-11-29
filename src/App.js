import React from 'react';
import socket from './socket';
import styled from 'styled-components';
import Player from './components/Player';
import {reducer, initialState} from './reducer';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
  justify-content: center;
  text-align: center;
  margin: 50px auto;
  height: 100%;
  margin-top: ${props => props.marginTop || '50px'}
`;


function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const updatePlayers = (room) => {
    dispatch({
      type: 'PLAYERS',
      players: room.players,
      waitingSecondPlayer: room.players.length !== 2,
    })
  }
  React.useEffect(async () => {
    // http://localhost:3000/#YOUR-NAME -> YOUR-NAME
    const name = window.location.hash.slice(1);
    socket.emit('ADD_PLAYER', {name})
    socket.on('PLAYER_CONNECTED', ({room}) => {
      updatePlayers(room);
    });
    socket.on('PLAYER_DISCONNECTED', ({room}) => {
      updatePlayers(room);
    });
  }, [])
  return (
    <Container marginTop={'50px'}>
      {
        state.players.map(item => {
          return (
            <Player key={item.id} item={item} />
          )
        })
      }
    </Container>
  );
}

export default App;
