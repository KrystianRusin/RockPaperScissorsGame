class rpsGame {

  constructor(p1, p2) {
    this.players = [p1, p2];
    this.turns = [null, null];

    this.players.forEach((player, i) => {
      player.on('turn', (turn) => {
        this.onTurn(i, turn);

      });
    });
  }

  sendToPlayers(msg) {
    p1.emit('message', msg);
    p2.emit('message', msg);
  }

  onTurn(pIndex, turn) {
    this.turns[pIndex] = turn;
    this.players[pIndex].emit('message', `You selected ${turn}`);

    this.checkGame(pIndex);
  }

  checkGame(pIndex) {
    var turns = this.turns;

    if (turns[0] && turns[1]) {
      this.players[pIndex].emit('Round over' + turns.join(' : '));
      this.result();

      this.turns = [null, null];
      this.players[0].emit('message', 'New Round');
      this.players[1].emit('message', 'New Round');
    }
  }

  result() {
    switch (this.turns[0]) {
      case 'rock':
        switch (this.turns[1]) {
          case 'rock':
            this.players[0].emit('message', 'DRAW');
            this.players[1].emit('message', 'DRAW');
            return 0;
          case 'paper':
          this.players[0].emit('message', 'LOSER');
          this.players[1].emit('message', 'WINNER');
            return -1;
          case 'scissors':
            this.players[0].emit('message', 'WINNER');
            this.players[1].emit('message', 'LOSER');
            return 1;
        }
        case 'paper':
          switch (this.turns[1]) {
            case 'rock':
            this.players[0].emit('message', 'WINNER');
            this.players[1].emit('message', 'LOSER');
              return 1;
            case 'paper':
            this.players[0].emit('message', 'DRAW');
            this.players[1].emit('message', 'DRAW');
              return 0;
            case 'scissors':
            this.players[0].emit('message', 'LOSER');
            this.players[1].emit('message', 'WINNER');
              return -1
          }
          case 'scissors':
            switch (this.turns[1]) {
              case 'rock':
              this.players[0].emit('message', 'LOSER');
              this.players[1].emit('message', 'WINNER');
                return -1;
              case 'paper':
              this.players[0].emit('message', 'WINNER');
              this.players[1].emit('message', 'LOSER');
                return 1;
              case 'scissors':
              this.players[0].emit('message', 'DRAW');
              this.players[1].emit('message', 'DRAW');
                return 0;
            }
    }

  }



}

module.exports = rpsGame;
