import { useState } from 'react';

import NewChallenge from './NewChallenge.jsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      {/* 
      Questo speciale compoentne fornito da fremer motion serve per dire far si che framer motion capisce che c'è un animazione in uscita 
      e prima di rimuovere il compoente immediatamente effettua prima l'animazione 
      */}
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>
      

      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button 
          whileHover={{scale: 1.2}}
          transition={{type: 'spring', stiffness: '500'}}
          onClick={handleStartAddNewChallenge} 
          className="button">
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
