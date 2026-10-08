import './App.css'
import { usePlayersList, myPlayer, isHost } from 'playroomkit'

function App() {
  // 1 line replaces useState, useEffect, onPlayerJoin, and onQuit!
  const players = usePlayersList()
  const me = myPlayer()

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
    </div>
  )
}

export default App