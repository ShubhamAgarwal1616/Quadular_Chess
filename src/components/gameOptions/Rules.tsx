import {FC} from "react";
import Image from "next/image";
import placementImage from "../../assets/images/piecePlacement.png";
import Throne from "../../assets/images/throne.jpeg";
import Pawn from "../../assets/images/pawn.png";
import Prince from "../../assets/images/prince.png";
import YoungKing from "../../assets/images/youngKing.png";
import Queen from "../../assets/images/queen.png";
import Bishop from "../../assets/images/bishop.png";
import Knight from "../../assets/images/knight.png";
import Rook from "../../assets/images/rook.png";
import King from "../../assets/images/king.png";
import styles from './Rules.module.scss';
import {OptionButton} from "./OptionButton";

interface RulesProps {
    setShowRules: (val: boolean) => void;
}

export const Rules: FC<RulesProps> = ({setShowRules}) => {
    const backButton = (
        <div className={styles.buttonContainer}>
            <OptionButton textOption handleClick={() => setShowRules(false)} className={styles.backButton}>
                <span>&#x27A4;</span>
            </OptionButton>
        </div>
    )
    return (
        <div className={styles.container}>
            {backButton}
            <h2>Game Pieces Initial Placement:</h2>
            <ul>
                <li>the <b className={styles.pieceName}><i>King</i></b> sits on the triangular cell called <b className={styles.pieceName}><i>Throne</i></b></li>
                <li>On next row in front of <b className={styles.pieceName}><i>King</i></b> sits <b className={styles.pieceName}><i>Bishop</i></b>, On left
                    of <b className={styles.pieceName}><i>Bishop</i></b> sits <b className={styles.pieceName}><i>Queen</i></b> and right of <b className={styles.pieceName}><i>Bishop</i></b></li>
                <li>On next row
                    sits <b className={styles.pieceName}><i>Rook</i></b>, <b className={styles.pieceName}><i>Knight</i></b>, <b className={styles.pieceName}><i>Bishop</i></b>, <b className={styles.pieceName}><i>Knight</i></b> and <b className={styles.pieceName}><i>Rook</i></b> in
                    same order as described.
                </li>
                <li>On next row sits all five <b className={styles.pieceName}><i>Pawns</i></b>.</li>
            </ul>
            <Image className={styles.placementImage} src={placementImage} alt="board-placement"/>

            <h2>Game Terminologies:</h2>
            <ul>
                <li>
                    <h3>Throne:</h3>
                    <p>The triangular cell on which the king sits when the game starts is called Throne. A Throne is
                        connected vertically and diagonally to all 3 squares in front of it as shown in image below.</p>
                    <Image className={styles.throneImage} src={Throne} alt="throne"/>
                </li>
                <li>
                    <h3>Domain:</h3>
                    <p>The colored squares represents a domain. A domain is not active if pieces are not set up on it
                        while start of game in case of 2-3 players.</p>
                </li>
            </ul>

            <h2>Game Instructions:</h2>
            <ul>
                <li>You can play this game 2-4 players. Each player needs to capture the king of all his opponents to
                    win the game.
                </li>
                <li>Checkmating and Castling is not allowed, a player needs to kill his king to knock him out of game.
                </li>
                <li>EnPassant is allowed as usual.</li>
                <li>Only <b className={styles.pieceName}><i>King</i></b> can move in and out of Throne freely, other pieces can only capture his
                    opponent piece inside the throne.
                </li>
                <li>If a player's <b className={styles.pieceName}><i>King</i></b> gets killed, and he has a <b className={styles.pieceName}><i>Young King</i></b> on his side then
                    his <b className={styles.pieceName}><i>Young King</i></b> is replaced with <b className={styles.pieceName}><i>King</i></b> and game continues. Otherwise, the
                    player is out of the game.
                </li>
                <li>When a player captures his opponent <b className={styles.pieceName}><i>King</i></b> and his opponent has no <b className={styles.pieceName}><i>Young King</i></b> available
                    on the board, the player gets to control his opponent pieces as his own, but he can not promote his
                    opponents <b className={styles.pieceName}><i>Prince</i></b> or <b className={styles.pieceName}><i>Pawn</i></b>.
                </li>
                <li>A player is knocked out of game if his timer expires but his pieces are then not controlled by any
                    other player. They just sit idle on the board and other players can capture them.
                </li>
                <li>No Piece can jump over other piece or kill their own ally pieces.</li>
                <li>Information about each piece is given as below:</li>
            </ul>

            <h3>Pawn: <Image className={styles.pieceImage} src={Pawn} alt="pawn"/></h3>
            <ul>
                <li>a <b className={styles.pieceName}><i> Pawn</i></b> can move freely in forward, left and right direction by one square away from
                    his own domain.
                </li>
                <li>a <b className={styles.pieceName}><i> Pawn</i></b> can kill diagonally only.</li>
                <li>while making, it's first move a <b className={styles.pieceName}><i> Pawn</i></b> can move forward with 2 squares.</li>
                <li>a <b className={styles.pieceName}><i> Pawn</i></b> gets promoted
                    to <b className={styles.pieceName}><i> Bishop</i></b>, <b className={styles.pieceName}><i> Queen</i></b> or <b className={styles.pieceName}><i> knight</i></b> when it reaches an opponent
                    domain.
                </li>
                <li>In case of 2-3 players a pawn does not get promoted if it reaches a domain that was not part of the
                    game.
                </li>
                <li>a <b className={styles.pieceName}><i> pawn</i></b> can move diagonally towards his domain when he is entering in his opponents
                    domain and killing an opponents piece.
                </li>
            </ul>

            <h3>Prince: <Image className={styles.pieceImage} src={Prince} alt="prince"/></h3>
            <ul>
                <li> a <b className={styles.pieceName}><i> Prince</i></b> can move freely in all directions by two squares.</li>
                <li> a <b className={styles.pieceName}><i> Prince</i></b> gets promoted to <b className={styles.pieceName}><i> Young King</i></b> when it reaches an opponent
                    domain.
                </li>
                <li> a <b className={styles.pieceName}><i> prince</i></b> can kill in any direction.</li>
            </ul>

            <h3>Young King: <Image className={styles.pieceImage} src={YoungKing} alt="youngKing"/></h3>
            <ul>
                <li> a <b className={styles.pieceName}><i> Young King</i></b> can move freely in all directions by any number of squares.</li>
                <li> a <b className={styles.pieceName}><i> Young King</i></b> gets promoted to <b className={styles.pieceName}><i> Kng</i></b> if the <b className={styles.pieceName}><i> King</i></b> gets
                    killed.
                </li>
                <li> a <b className={styles.pieceName}><i> Young King</i></b> can kill in any direction.</li>
                <li> a <b className={styles.pieceName}><i> Young King</i></b> is not present initially in the game and comes on board only
                    when <b className={styles.pieceName}><i> Prince</i></b> gets promoted.
                </li>
            </ul>

            <h3>Queen: <Image className={styles.pieceImage} src={Queen} alt="queen"/></h3>
            <ul>
                <li> a <b className={styles.pieceName}><i> Queen</i></b> can move freely in all directions by any number of squares.</li>
                <li> a <b className={styles.pieceName}><i> Queen</i></b> can kill in any direction.</li>
            </ul>

            <h3>Bishop: <Image className={styles.pieceImage} src={Bishop} alt="bishop"/></h3>
            <ul>
                <li> a <b className={styles.pieceName}><i> Bishop</i></b> can move freely in both diagonal directions by any number of squares.</li>
                <li> a <b className={styles.pieceName}><i> Bishop</i></b> can kill in any diagonal direction.</li>
                <li> while coming out of throne a <b className={styles.pieceName}><i> Bishop</i></b> can move on same coloured squares as it was on
                    while entering the throne.
                </li>
            </ul>

            <h3>Knight: <Image className={styles.pieceImage} src={Knight} alt="knight"/></h3>
            <ul>
                <li> a <b className={styles.pieceName}><i> Knight</i></b> can move L shaped in any direction.</li>
                <li> a <b className={styles.pieceName}><i> Knight</i></b> can kill in any direction.</li>
            </ul>

            <h3>Rook: <Image className={styles.pieceImage} src={Rook} alt="rook"/></h3>
            <ul>
                <li> a <b className={styles.pieceName}><i> Rook</i></b> can move freely in forward, left, right and bottom directions by any number
                    of squares.
                </li>
                <li> a <b className={styles.pieceName}><i> Rook</i></b> can kill in any vertical direction.</li>
            </ul>

            <h3>King: <Image className={styles.pieceImage} src={King} alt="king"/></h3>
            <ul>
                <li> a <b className={styles.pieceName}><i> King</i></b> can move freely in all directions by one square.</li>
                <li> a <b className={styles.pieceName}><i> King</i></b> can kill in all direction.</li>
            </ul>
            {backButton}
        </div>
    )
}