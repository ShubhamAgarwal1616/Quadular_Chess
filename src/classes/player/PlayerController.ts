import {DomainColor, PieceColor} from "../constants";
import {Player} from "./Player";
import {getPieceColorForDomain} from "../helpers";
import {Piece} from "../pieces/Piece";

export class PlayerController {
    initialPlayers: Array<Player> = [];
    activePlayers: Array<Player> = [];

    constructor(domainsInOrder: Array<DomainColor>, timeInMinutes: number) {
        domainsInOrder.forEach((domain, idx) => {
            const player = new Player(`Player ${idx + 1}`, domain, getPieceColorForDomain(domain), timeInMinutes);
            this.initialPlayers.push(player);
            this.activePlayers.push(player);
        })
    }

    getNextPlayerInTurn() {
        const player = this.activePlayers.shift();
        player && this.activePlayers.push(player);
        return this.activePlayers[0];
    }

    getActivePlayerCount() {
        return this.activePlayers.length;
    }

    originalPlayerInGame(piece: Piece) {
        return this.activePlayers.some(player => player.originalPieceColor === piece.color)
    }

    deactivatePlayer(originalColor: PieceColor) {
        this.activePlayers = this.activePlayers.filter(player => player.originalPieceColor !== originalColor);
        this.activePlayers[0].addColorInControl(originalColor);
    }

    suspendPlayer(player: Player) {
        this.activePlayers = this.activePlayers.filter(activePlayer => player !== activePlayer);
    }

    getPlayerInControl(piece: Piece): Player | undefined {
        return this.activePlayers.find(player => player.canControlPiece(piece))
    }

    updateStateFromJson(json: PlayerController): PlayerController {
        const controller = new PlayerController([], 0);
        controller.activePlayers = json.activePlayers.map(playerJson => Player.updateStateFromJson(playerJson));
        controller.initialPlayers = json.initialPlayers.map(playerJson => {
            const activePlayer = controller.activePlayers.find(player => player.name === playerJson.name);
            return activePlayer ? activePlayer : Player.updateStateFromJson(playerJson);
        })
        return controller;
    }
}