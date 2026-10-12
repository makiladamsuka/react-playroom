import { Apple, SnakeEyes } from "./GameIcons";


export default function Board({ body = [], food, direction = "RIGHT" }) {

    const tileSize = 32;
    const boardWidth = 640;
    const boardHeight = 640;

    return (
        <div className="board">

            <div
                style={{
                    position: 'absolute',
                    left: `${food.x * tileSize}px`,
                    top: `${food.y * tileSize}px`,
                }}
            >
                <Apple size={tileSize} />
            </div>


            {body.map((segment, index) => {
                const isHead = index === 0

                return (
                    <div
                        key={`${segment.x}-${segment.y}-${index}`}
                        style={{
                            position: 'absolute',
                            left: `${segment.x * tileSize}px`,
                            top: `${segment.y * tileSize}px`,
                            width: `${tileSize}px`,
                            height: `${tileSize}px`,
                            backgroundColor: '#296cffff',
                            borderRadius: isHead ? '8px' : '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Only put eyes on the HEAD! */}
                        {isHead && <SnakeEyes size={tileSize} direction={direction} />}
                    </div>
                )
            })}


        </div>
    )
}