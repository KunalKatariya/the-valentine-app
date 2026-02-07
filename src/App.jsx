import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import './index.css';

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  // Replace x/y transform state with explicit style state for Fixed positioning
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [noButtonInitialized, setNoButtonInitialized] = useState(false);
  const [heartbeatKey, setHeartbeatKey] = useState(0);

  // State for mobile detection & window size
  const [isMobile, setIsMobile] = useState(false);

  // Correctly use useEffect for window resize listener
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile(); // Check immediately
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const yesButtonScale = isMobile ? 1 : 1 + (noCount * 0.2);

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
    "Please?",
    "Pretty please?",
    "With a cherry on top?",
    "Don't do this to me!",
    "I'm literally begging",
    "Think of the memories!",
    "But why though?",
    "This is your last chance!",
    "I won't ask again...",
    "Okay I'll ask again",
    "Please please please?",
    "You're killing me here",
    "Is it something I said?",
    "Can we talk about this?",
    "I'll do anything!",
    "What if I said please?",
    "The 'Yes' button is right there!",
    "Just click 'Yes' already!",
    "Why are you like this?",
    "Fine, be that way...",
    "I'm not crying, you're crying",
    "This is just cruel now",
    "You're really testing me",
    "Okay but seriously...",
    "One more chance?",
    "I believe in second chances",
    "And third chances...",
    "And fourth chances...",
    "I'm very patient",
    "But my patience is running out",
    "PLEASE?!",
    "I'm running out of things to say",
    "Just... why?",
    "You know you want to say yes",
    "The 'Yes' button is getting bigger!",
    "Did you notice? 👀",
    "It's a sign!",
    "The universe wants you to say yes",
    "I want you to say yes",
    "Everyone wants you to say yes",
    "Say yes. Do it. Now.",
    "You've come this far...",
    "Don't give up on us!",
    "There is no 'us' without 'Yes'",
    "That was deep, right?",
    "I'm trying here!",
    "Meet me halfway?",
    "Quarter of the way?",
    "Any way at all?",
    "I'll take what I can get",
    "Okay fine, you win",
    "Just kidding, I never give up!",
    "Never gonna give you up 🎵",
    "Never gonna let you down 🎵",
    "Did I just Rick Roll you?",
    "Worth it though",
    "Now will you say yes?",
    "No? Still?",
    "Wow. Just wow.",
    "Your determination is admirable",
    "But also frustrating",
    "Very frustrating",
    "EXTREMELY frustrating",
    "You know what? Fine.",
    "I respect your choice",
    "Just kidding, say YES!",
    "PLEASE SAY YES",
    "I'M BEGGING YOU",
    "ON MY KNEES HERE",
    "Metaphorically speaking",
    "But still!",
    "This is getting ridiculous",
    "You're getting ridiculous",
    "We're all getting ridiculous",
    "Let's just say yes and end this",
    "The 'Yes' button is HUGE now!",
    "You literally can't miss it!",
    "It's right there!",
    "Just. Click. It.",
    "I dare you",
    "Double dare you",
    "Triple dog dare you!",
    "That's the highest level of dare!",
    "You have to do it now!",
    "It's the rules!",
    "I don't make the rules",
    "Actually I do, and the rule is: SAY YES",
    "Pretty please with sugar on top?",
    "And sprinkles?",
    "And a cherry?",
    "And whipped cream?",
    "I'm making myself hungry",
    "But also desperate",
    "Desperately hungry for a 'Yes'",
    "See what I did there?",
    "Clever, right?",
    "Say yes if you thought that was clever",
    "Say yes if you didn't",
    "Just say yes!",
    "Okay I'm actually running out now",
    "But I'll keep going!",
    "Forever if I have to!",
    "Or until you say yes",
    "Whichever comes first",
    "Spoiler: it'll be you saying yes",
    "Because I'm very persistent",
    "And you're very loved ❤️",
    "So what do you say?",
    "Yes? 👀",
    "Still no? Really?",
    "You're unbelievable",
    "Unbelievably stubborn!",
    "But I like that about you",
    "So... yes? 🥺",
  ];

  function handleNoClick() {
    setNoCount(noCount + 1);
  }

  function getNoButtonText() {
    return phrases[Math.min(noCount, phrases.length - 1)];
  }

  function handleYesClick() {
    setYesPressed(true);

    // Play celebration sound
    const audio = new Audio('/Yay-sound.mp3');
    audio.play().catch(err => console.log('Audio play failed:', err));

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

  function moveNoButton(e) {
    if (e && e.preventDefault) e.preventDefault();
    setNoCount(prev => prev + 1);

    if (isMobile) {
      setHeartbeatKey(prev => prev + 1);
    }

    const btnWidth = 200;
    const btnHeight = 60;
    const padding = 20;

    const minX = padding;
    const maxX = window.innerWidth - btnWidth - padding;
    const minY = padding;
    const maxY = window.innerHeight - btnHeight - padding;

    const randomX = Math.max(minX, minX + Math.random() * (maxX - minX));
    const randomY = Math.max(minY, minY + Math.random() * (maxY - minY));

    if (!noButtonInitialized) {
      setNoButtonInitialized(true);
    }

    setNoButtonStyle({
      position: 'fixed',
      left: `${randomX}px`,
      top: `${randomY}px`,
      zIndex: 50,
    });
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
            YAYYY!!!! {isMobile && <br />} I knew it!! ❤️
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

          <div className="btn-container" style={{ position: 'relative' }}>
            <motion.button
              key={heartbeatKey}
              className={`btn btn-primary ${isMobile && heartbeatKey > 0 ? 'heartbeat' : ''}`}
              initial={{ scale: yesButtonScale }}
              animate={{ scale: yesButtonScale }}
              whileHover={{ scale: yesButtonScale * 1.1 }}
              whileTap={{ scale: yesButtonScale * 0.9 }}
              onClick={handleYesClick}
            >
              Yes
            </motion.button>

            <div style={{ minWidth: isMobile ? '100%' : '180px', display: 'flex', justifyContent: 'center' }}>
              <motion.button
                className="btn btn-secondary"
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                onTouchStart={moveNoButton}
                style={noButtonStyle}
                animate={noButtonStyle}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
              >
                {getNoButtonText()}
              </motion.button>
            </div>
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
