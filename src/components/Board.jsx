import { Apple, SnakeEyes } from "./GameIcons";

const tileSize = 32;
export default function Board() {
    return (
        <div className="board">

            <div
                style={{
                    position: 'absolute',
                    left: `${5 * tileSize}px`,
                    top: `${8 * tileSize}px`,
                }}
            >
                <Apple size={tileSize} />
            </div>

            <SnakeEyes />
        </div>
    )
}