import { useEffect, useState, useRef   } from 'react'
import './App.css'
import { usePlayersList, myPlayer, isHost } from 'playroomkit'
import Board from './components/Board';

const ARENA_WIDTH = 600;
const ARENA_HEIGHT = 400;
const MOVE_SPEED = 40;
const SPEED_MS = 150;
const GRID_SIZE = 20; 

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1, name: "UP" },
  ArrowDown: { x: 0, y: 1, name: "DOWN" },
  ArrowLeft: { x: -1, y: 0, name: "LEFT" },
  ArrowRight: { x: 1, y: 0, name: "RIGHT" },
};


const OPPOSITES = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
};




function App() {
  const players = usePlayersList(true)
  const me = myPlayer()

  const [body, setBody] = useState([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
  ])

  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("RIGHT");
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const directionRef = useRef("RIGHT");

  useEffect(() => {
    if (me && !me.getState('pos')) {
      const randomX = Math.floor(Math.random() * (ARENA_WIDTH - 50))
      const randomY = Math.floor(Math.random() * (ARENA_HEIGHT - 50))
      me.setState('pos', { x: randomX, y: randomY });
    }

  }, [me])

  useEffect(() => {
    const handleKeys = (e) => {
      const move = DIRECTIONS[e.key];
      if (!move) return;

      e.preventDefault();

      // Prevent 180° self-reversal into the snake's neck
      if (move.name !== OPPOSITES[directionRef.current]) {
        directionRef.current = move.name;
        setDirection(move.name);
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, []);

  const resetGame = () => {
    setBody([
      { x: 10, y: 10 },
      { x: 9, y: 10 },
    ]);
    directionRef.current = "RIGHT";
    setDirection("RIGHT");
    setFood({ x: 5, y: 5 });
    setScore(0);
    setIsGameOver(false);
  };


  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      setBody((prevBody) => {
        const head = prevBody[0];
        const dir = directionRef.current;
        let nextX = head.x;
        let nextY = head.y;
        if (dir === "UP") nextY -= 1;
        if (dir === "DOWN") nextY += 1;
        if (dir === "LEFT") nextX -= 1;
        if (dir === "RIGHT") nextX += 1;
        // Wall collision check
        if (nextX < 0 || nextX >= GRID_SIZE || nextY < 0 || nextY >= GRID_SIZE) {
          setIsGameOver(true);
          return prevBody;
        }
        // Self collision check (hitting own tail)
        const hitSelf = prevBody.some((seg) => seg.x === nextX && seg.y === nextY);
        if (hitSelf) {
          setIsGameOver(true);
          return prevBody;
        }
        const newHead = { x: nextX, y: nextY };
        // Eat Apple
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 1);
          setFood({
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          });
          // Grow: Add new head and keep whole body
          return [newHead, ...prevBody];
        }
        // Regular step: Add new head and remove tail
        return [newHead, ...prevBody.slice(0, -1)];
      });
    }, SPEED_MS);
    return () => clearInterval(interval);
  }, [food, isGameOver]);


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
      <h1>Multiplayer Lobby</h1>
      <p>
        <strong>Your Role:</strong> {isHost() ? '👑 Host' : '🎮 Player'}
      </p>

      <h2>Connected Players ({players.length})</h2>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {players.map((player) => {
          const profile = player.getProfile()
          const isMe = player.id === me?.id

          return (
            <div
              key={player.id}
              style={{
                border: isMe ? '3px solid #4CAF50' : '2px solid #ccc',
                borderRadius: '12px',
                padding: '1rem 1.5rem',
                backgroundColor: profile?.color?.hex ? `${profile.color.hex}22` : '#f9f9f9',
                minWidth: '140px',
              }}
            >
              <div style={{ fontSize: '2rem' }}>
                {profile?.avatar ? (
                  <img src={profile.avatar} width="48" height="48" alt="avatar" />
                ) : (
                  '👤'
                )}
              </div>
              <h3 style={{ margin: '0.5rem 0', color: profile?.color?.hex || '#333' }}>
                {profile?.name} {isMe && '(You)'}
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>ID: {player.id.slice(0, 4)}</span>
            </div>
          )
        })}
      </div>
      {players.map((player) => {
        const profile = player.getProfile()
        const isMe = player.id === me?.id
        return (
          <div key={player.name}>
            <h4>{profile?.name}</h4>
            <p>X: {player.getState('pos')?.x}</p>
            <p>Y: {player.getState('pos')?.y}</p>
          </div>
        )
      })}

      <div style={{ margin: '1rem 0' }}>
        <p style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0.5rem 0' }}>Score: {score}</p>
        {isGameOver && (
          <div style={{ marginBottom: '1rem' }}>
            <h2 style={{ color: '#ef4444', margin: '0.5rem 0' }}>Game Over!</h2>
            <button
              onClick={resetGame}
              style={{
                padding: '8px 20px',
                fontSize: '1rem',
                fontWeight: 'bold',
                backgroundColor: '#22c55e',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <Board body={body} food={food} direction={direction} />
    </div>
  )
}

export default App