import {DomainColor} from "../constants";
import {Player} from "./Player";
import {getPieceColorForDomain} from "../helpers";

export class PlayerController {
    initialPlayers: Array<Player> = [];
    activePlayers: Array<Player> = [];

    constructor(domainsInOrder: Array<DomainColor>) {
        domainsInOrder.forEach(domain => {
            const player = new Player(getPieceColorForDomain(domain))
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
}