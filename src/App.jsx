import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import './index.css';

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const yesButtonScale = 1 + (noCount * 0.2);

  const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance?",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
  ];

  function handleNoClick() {
    setNoCount(noCount + 1);
  }

  function getNoButtonText() {
    return phrases[Math.min(noCount, phrases.length - 1)];
  }

  function handleYesClick() {
    setYesPressed(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#e11d48', '#fbcfe8']
    });

    const end = Date.now() + 3000;
    const colors = ['#ff69b4', '#e11d48', '#fbcfe8'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }

  function moveNoButton() {
    setNoCount(prev => prev + 1); // Increment count to grow Yes button!
    const x = Math.random() * (window.innerWidth - 200) - (window.innerWidth / 2 - 100);
    const y = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100);
    setNoPosition({ x, y });
  }

  return (
    <div className="container">
      {yesPressed ? (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="success-container"
        >
          <img
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
            alt="bear kissing"
            style={{ maxWidth: '300px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          />
          <h1 className="success-message" style={{ marginTop: '2rem', fontSize: '3rem' }}>
            YAYYY!!!! I knew it!! ❤️
          </h1>
          <p style={{ fontSize: '1.5rem', marginTop: '1rem', color: '#db2777' }}>
            See? It wasn't that hard! 😉
          </p>
        </motion.div>
      ) : (
        <>
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="header-image"
            src="https://media.tenor.com/VIChDQ6ejRQAAAAi/jumping-bear-hearts-no-png.gif"
            alt="cute bear"
            style={{ maxWidth: '200px', borderRadius: '15px', marginBottom: '2rem' }}
          />

          <h1>Will you be my Valentine?</h1>

          <div className="btn-container">
            <motion.button
              className="btn btn-primary"
              animate={{ scale: yesButtonScale }}
              whileHover={{ scale: yesButtonScale * 1.1 }}
              whileTap={{ scale: yesButtonScale * 0.9 }}
              onClick={handleYesClick}
            >
              Yes
            </motion.button>

            <motion.button
              className="btn btn-secondary"
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              onTouchStart={moveNoButton} // For mobile
              animate={{
                x: noPosition.x,
                y: noPosition.y
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {getNoButtonText()}
            </motion.button>
          </div>
        </>
      )}

      {/* Floating Hearts Animation */}
      <div className="floating-hearts">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              fontSize: `${Math.random() * 20 + 20}px`
            }}
          >
            ❤️
          </div>
        ))}
      </div>
    </div>
  );
}
