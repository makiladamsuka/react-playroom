import { Apple, SnakeEyes } from "./GameIcons";


export default function Board() {

    const tileSize = 32;
    const boardWidth = 640;
    const boardHeight = 640;
    const body = [
        { x: Math.floor(Math.random(0, boardWidth)), y: Math.floor(Math.random(0, boardHeight)) }
    ]
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
                            backgroundColor: '#296cffff',  // Player color
                            borderRadius: isHead ? '8px' : '4px', // Rounded head
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Only put eyes on the HEAD! */}
                        {isHead && <SnakeEyes size={tileSize} direction="RIGHT" />}
                    </div>
                )
            })}


        </div>
    )
}