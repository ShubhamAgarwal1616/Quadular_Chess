import {DomainColor, PieceColor} from "../constants";
import {Player} from "./Player";
import {getPieceColorForDomain} from "../helpers";
import {Piece} from "../pieces/Piece";

export class PlayerController {
    initialPlayers: Array<Player> = [];
    activePlayers: Array<Player> = [];

    constructor(domainsInOrder: Array<DomainColor>) {
        domainsInOrder.forEach(domain => {
            const player = new Player(domain, getPieceColorForDomain(domain))
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
}