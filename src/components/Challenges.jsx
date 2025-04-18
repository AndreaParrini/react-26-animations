import { useContext, useState } from 'react';

import { ChallengesContext } from '../store/challenges-context.jsx';
import ChallengeItem from './ChallengeItem.jsx';
import ChallengeTabs from './ChallengeTabs.jsx';
import { AnimatePresence, motion } from 'framer-motion';

export default function Challenges() {
  const { challenges } = useContext(ChallengesContext);
  const [selectedType, setSelectedType] = useState('active');
  const [expanded, setExpanded] = useState(null);

  function handleSelectType(newType) {
    setSelectedType(newType);
  }

  function handleViewDetails(id) {
    setExpanded((prevId) => {
      if (prevId === id) {
        return null;
      }

      return id;
    });
  }

  const filteredChallenges = {
    active: challenges.filter((challenge) => challenge.status === 'active'),
    completed: challenges.filter(
      (challenge) => challenge.status === 'completed'
    ),
    failed: challenges.filter((challenge) => challenge.status === 'failed'),
  };

  const displayedChallenges = filteredChallenges[selectedType];

  return (
    <div id="challenges">
      <ChallengeTabs
        challenges={filteredChallenges}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        {/* Quando all'interno di un componente AnimatePresence ci sono più componenti, si deve indicare anche una proprietà chiamata key
        poi per non sincronizzare l'usicta a video dei due compoenenti si deve impostare la modalità su 'wait*/}
        <AnimatePresence mode='wait'>
          {displayedChallenges.length > 0 && (
            <motion.ol key='list' 
              initial={{y: -20, opacity: 0}} 
              animate={{opacity: 1, y: 0}} 
              exit={{y: -30, opacity:0}} 
              className="challenge-items"
            >
              <AnimatePresence>
                {displayedChallenges.map((challenge) => (
                  <ChallengeItem
                    key={challenge.id}
                    challenge={challenge}
                    onViewDetails={() => handleViewDetails(challenge.id)}
                    isExpanded={expanded === challenge.id}
                  />
                ))}
              </AnimatePresence>
            </motion.ol>
          )}
          
          {displayedChallenges.length === 0 && 
            <motion.p 
              key='fallback' 
              initial={{y: -20, opacity: 0}} 
              animate={{opacity: 1, y: 0}}
              exit={{y: -20, opacity: 0}}>
                No challenges found.
              </motion.p>}
        </AnimatePresence>
      </ChallengeTabs>
    </div>
  );
}
