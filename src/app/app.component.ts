import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('TicTacToeGame')
  public TicTacToeGame!: ElementRef;

  private PlayerTurn: number = 0;
  private ListPlayersSign = ['O', 'X'];

  private PlayerWon = false;

  public Player1 = {
    name: 'Player 1',
    points: 0,
  };

  public Player2 = {
    name: 'Player 2',
    points: 0,
  };

  private Board: number[][] | null[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  constructor() {}

  CliqueJogo(evento: any) {
    try {
      if (this.PlayerWon) return;

      const BrickClicked = evento.target as HTMLElement;

      if (BrickClicked.innerHTML.length > 0) return;

      BrickClicked.innerHTML = this.ListPlayersSign[this.PlayerTurn];

      const IndexSelected: string[] = BrickClicked.id.slice(5).split('');

      this.Board[parseInt(IndexSelected[0])][parseInt(IndexSelected[1])] =
        this.PlayerTurn;

      this.VerifyWin();

      this.PlayerTurn = this.PlayerTurn == 0 ? 1 : 0;
    } catch (error) {}
  }

  VerifyWin() {
    let PlayerWon = false,
      NoMoreMoves = true;

    const Verifications: string[][] = [
      ['00', '01', '02'],
      ['10', '11', '12'],
      ['20', '21', '22'],
      ['00', '10', '20'],
      ['01', '11', '21'],
      ['02', '12', '22'],
      ['00', '11', '22'],
      ['02', '11', '20'],
    ];

    Verifications.forEach((VerificationList: string[], index: number) => {
      let Play1: number[] = [
        parseInt(VerificationList[0].split('')[0]),
        parseInt(VerificationList[0].split('')[1]),
      ];

      let Play2: number[] = [
        parseInt(VerificationList[1].split('')[0]),
        parseInt(VerificationList[1].split('')[1]),
      ];

      let Play3: number[] = [
        parseInt(VerificationList[2].split('')[0]),
        parseInt(VerificationList[2].split('')[1]),
      ];

      if (
        this.Board[Play1[0]][Play1[1]] == null ||
        this.Board[Play2[0]][Play2[1]] == null ||
        this.Board[Play3[0]][Play3[1]] == null
      ) {
        NoMoreMoves = false;
        return;
      }

      if (
        this.Board[Play1[0]][Play1[1]] == this.Board[Play2[0]][Play2[1]] &&
        this.Board[Play2[0]][Play2[1]] == this.Board[Play3[0]][Play3[1]]
      ) {
        alert('Player Won');

        if (this.PlayerTurn == 0) {
          this.Player1.points++;
        } else {
          this.Player2.points++;
        }

        this.PlayerWon = true;
      }
    });
  }

  FinishGame() {
    this.ClearHTML();

    this.PlayerWon = false;
  }

  private ClearHTML() {
    const GameElem = this.TicTacToeGame.nativeElement as HTMLElement;

    GameElem.childNodes.forEach((Lines: any, indexLine: number) => {
      Lines.childNodes.forEach((Brick: any, indexItem: number) => {
        let BrickIterated = Brick as HTMLElement;

        BrickIterated.innerHTML = '';

        this.Board[indexLine][indexItem] = null;
      });
    });
  }
}
