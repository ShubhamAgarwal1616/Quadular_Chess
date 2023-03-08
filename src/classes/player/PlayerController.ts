import {DomainColor, PieceColor} from "../constants";
import {Player} from "./Player";

export class PlayerController {
    domainsInGame: Array<DomainColor> = [];
    initialPlayers: Array<Player> = [];
    activePlayers: Array<Player> = [];

    constructor(domainsInOrder: Array<DomainColor>) {
        domainsInOrder.forEach(domain => {
            const player = new Player(PlayerController.getPieceColorForDomain(domain))
            this.initialPlayers.push(player);
            this.activePlayers.push(player);
        })
    }

    private static getPieceColorForDomain(domain: DomainColor): PieceColor {
        switch (domain) {
            case DomainColor.BLACK: return PieceColor.BLACK;
            case DomainColor.ORANGE: return PieceColor.ORANGE;
            case DomainColor.YELLOW: return PieceColor.YELLOW;
            default: return PieceColor.WHITE;
        }
    }

    getNextPlayerInTurn() {
        const player = this.activePlayers.shift();
        player && this.activePlayers.push(player);
        return this.activePlayers[0];
    }

    getActivePlayerCount() {
        return this.activePlayers.length;
    }
}