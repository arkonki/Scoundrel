import React, { useState, useEffect } from 'react';
import { Heart, Shield, Sword, RefreshCw, X, Play, Info, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, t, getThematicName } from './i18n';

type Suit = 'clubs' | 'spades' | 'hearts' | 'diamonds';
type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

interface CardData {
  id: string;
  suit: Suit;
  rank: Rank;
}

interface LogEntry {
  id: number;
  text: string;
  type: 'neutral' | 'damage' | 'heal' | 'victory' | 'defeat';
}

interface PlayingCardProps {
  key?: React.Key;
  card: CardData | null;
  isSelected?: boolean;
  isShaking?: boolean;
  animateEntrance?: boolean;
  animationDelayMs?: number;
  onClick?: () => void;
  className?: string;
  showTooltip?: boolean;
  lang: Language;
}

const PlayingCard = ({ 
  card, 
  isSelected, 
  isShaking, 
  animateEntrance,
  animationDelayMs = 0,
  onClick, 
  className = '',
  showTooltip = false,
  lang
}: PlayingCardProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  if (!card) {
    const emptyContent = <div className={`w-16 h-24 sm:w-24 sm:h-36 border-2 border-emerald-900/30 rounded-xl bg-emerald-900/20 ${className}`}></div>;
    return animateEntrance ? (
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.8 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }} 
        transition={{ delay: animationDelayMs / 1000, type: 'spring', stiffness: 300, damping: 25 }}
      >
        {emptyContent}
      </motion.div>
    ) : emptyContent;
  }
  
  const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
  const colorClass = isRed ? 'text-red-600' : 'text-slate-900';
  
  const suitSymbols = { hearts: '♥', diamonds: '♦', clubs: '♣', spades: '♠' };
  const rankDisplay = { 11: 'J', 12: 'Q', 13: 'K', 14: 'A' }[card.rank] || card.rank;
  
  const baseClasses = `relative w-16 h-24 sm:w-24 sm:h-36 bg-slate-50 card-texture rounded-lg sm:rounded-xl shadow-lg border-2 border-white flex flex-col justify-between p-1 sm:p-2 select-none cursor-pointer transition-colors duration-200`;
  const stateClasses = isSelected && !isShaking ? 'ring-4 ring-yellow-400' : '';
  const shakingClasses = isShaking ? 'animate-shake shadow-[0_0_20px_rgba(239,68,68,0.8)] z-10 border-red-500 ring-4 ring-red-500' : '';

  const tooltipInfo = (() => {
    if (card.suit === 'hearts') return { title: getThematicName(card, lang), desc: t[lang].tooltipPotion(card.rank) };
    if (card.suit === 'diamonds') return { title: getThematicName(card, lang), desc: t[lang].tooltipWeapon(card.rank) };
    return { title: getThematicName(card, lang), desc: t[lang].tooltipMonster(card.rank) };
  })();

  const tooltip = showTooltip && (
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-48 sm:w-56 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-2xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[100] text-center flex flex-col gap-1 hidden sm:flex">
      <strong className="text-yellow-400 font-serif text-sm tracking-wide">{tooltipInfo.title}</strong>
      <span className="text-slate-300 leading-relaxed font-sans">{tooltipInfo.desc}</span>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-700"></div>
    </div>
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!onClick) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -20;
    const rotateY = ((x - rect.width / 2) / rect.width) * 20;
    setTilt({ x: rotateX, y: rotateY });
  };
  const handlePointerLeave = () => setTilt({ x: 0, y: 0 });

  const content = (
    <div 
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isSelected ? 1.05 : 1}, ${isSelected ? 1.05 : 1}, 1)` }}
      className={`group ${baseClasses} ${stateClasses} ${shakingClasses} ${className} transition-transform ease-out ${tilt.x === 0 ? 'duration-300' : 'duration-75'}`}
    >
      {tooltip}
      <div className={`text-sm sm:text-lg font-bold leading-none font-serif ${colorClass}`}>
        {rankDisplay}<br/>{suitSymbols[card.suit]}
      </div>
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl sm:text-4xl ${colorClass}`}>
        {suitSymbols[card.suit]}
      </div>
      <div className={`text-sm sm:text-lg font-bold leading-none rotate-180 font-serif ${colorClass}`}>
        {rankDisplay}<br/>{suitSymbols[card.suit]}
      </div>
    </div>
  );

  if (animateEntrance) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.8 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }} 
        transition={{ delay: animationDelayMs / 1000, type: 'spring', stiffness: 400, damping: 25 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const text = t[lang];

  const [hasStarted, setHasStarted] = useState(false);
  const [showRules, setShowRules] = useState(false);
  
  const [deck, setDeck] = useState<CardData[]>([]);
  const [room, setRoom] = useState<CardData[]>([]);
  const [discard, setDiscard] = useState<CardData[]>([]);
  
  const [health, setHealth] = useState(20);
  const [weapon, setWeapon] = useState<CardData | null>(null);
  const [monstersOnWeapon, setMonstersOnWeapon] = useState<CardData[]>([]);
  
  const [cardsFacedThisTurn, setCardsFacedThisTurn] = useState(0);
  const [hasFledThisDungeon, setHasFledThisDungeon] = useState(false);
  const [potionsUsedThisTurn, setPotionsUsedThisTurn] = useState(0);
  
  const [status, setStatus] = useState<'playing' | 'won' | 'lost' | 'stuck'>('playing');
  const [score, setScore] = useState(0);
  
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shakingCardId, setShakingCardId] = useState<string | null>(null);
  const [floatingTexts, setFloatingTexts] = useState<{id: number, amount: number, type: 'damage' | 'heal'}[]>([]);
  const [highScore, setHighScore] = useState<number | null>(null);
  
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [globalShake, setGlobalShake] = useState(false);
  const [hoverWeaponStack, setHoverWeaponStack] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('scoundrel_highscore');
    if (stored !== null) setHighScore(parseInt(stored, 10));
  }, []);

  useEffect(() => {
    if (status !== 'playing' || room.length === 0 || isAnimating) return;
    
    const onlyPotionsLeft = room.every(c => c.suit === 'hearts');
    if (deck.length === 0 && onlyPotionsLeft) {
      setStatus('won');
      const finalScore = calculateWinScore(health, room);
      setScore(finalScore);
      updateHighScore(finalScore);
      addLog(text.logSurvived, 'victory');
      return;
    }

    const playableCards = room.filter(c => c.suit !== 'hearts' || potionsUsedThisTurn === 0);
    const canFlee = !hasFledThisDungeon && cardsFacedThisTurn < 3;
    
    if (playableCards.length === 0 && !canFlee) {
      setStatus('stuck');
      const finalScore = calculateLossScore(health, deck, room);
      setScore(finalScore);
      updateHighScore(finalScore);
      addLog(text.logStuck, 'defeat');
    }
  }, [room, potionsUsedThisTurn, hasFledThisDungeon, cardsFacedThisTurn, status, isAnimating, health, deck, text]);

  const updateHighScore = (newScore: number) => {
    setHighScore(prev => {
      if (prev === null || newScore > prev) {
        localStorage.setItem('scoundrel_highscore', newScore.toString());
        return newScore;
      }
      return prev;
    });
  };

  const addLog = (msg: string, type: LogEntry['type'] = 'neutral') => {
    const id = Date.now() + Math.random();
    setLogs(prev => [...prev, { id, text: msg, type }]);
    setTimeout(() => {
      setLogs(prev => prev.filter(l => l.id !== id));
    }, 5000);
  };

  const triggerHaptic = (severity: 'light' | 'heavy') => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(severity === 'heavy' ? [50, 50, 50] : 15);
    }
  };

  const initializeGame = () => {
    const suits: Suit[] = ['clubs', 'spades', 'hearts', 'diamonds'];
    const newDeck: CardData[] = [];
    let idCounter = 0;
    
    suits.forEach(suit => {
      const maxRank = suit === 'diamonds' ? 10 : 14;
      for (let rank = 2; rank <= maxRank; rank++) {
        newDeck.push({ id: `card-${idCounter++}`, suit, rank: rank as Rank });
      }
    });

    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }

    const initialRoom = newDeck.splice(0, 4);

    setDeck(newDeck);
    setRoom(initialRoom);
    setDiscard([]);
    setHealth(20);
    setWeapon(null);
    setMonstersOnWeapon([]);
    setCardsFacedThisTurn(0);
    setHasFledThisDungeon(false);
    setPotionsUsedThisTurn(0);
    setStatus('playing');
    setScore(0);
    setSelectedCard(null);
    setIsAnimating(false);
    setShakingCardId(null);
    setFloatingTexts([]);
    setLogs([]);
    addLog(text.logEnter, 'neutral');
  };

  const calculateLossScore = (currentHealth: number, currentDeck: CardData[], currentRoom: CardData[]) => {
    let unplayedValue = 0;
    const remainingCards = [...currentDeck, ...currentRoom];
    remainingCards.forEach(c => { if (c.suit !== 'hearts') unplayedValue += c.rank; });
    return -unplayedValue;
  };

  const calculateWinScore = (currentHealth: number, currentRoom: CardData[]) => {
    let unplayedValue = 0;
    currentRoom.forEach(c => { if (c.suit !== 'hearts') unplayedValue += c.rank; });
    return currentHealth > 0 ? currentHealth - unplayedValue : calculateLossScore(currentHealth, [], currentRoom);
  };

  const spawnFloatingText = (amount: number, type: 'damage' | 'heal') => {
    const id = Date.now();
    setFloatingTexts(prev => [...prev, { id, amount, type }]);
    setTimeout(() => setFloatingTexts(prev => prev.filter(ft => ft.id !== id)), 800);
  };

  const handleFaceCard = (card: CardData) => {
    if (status !== 'playing' || isAnimating) return;

    if (card.suit === 'hearts' && potionsUsedThisTurn >= 1) {
      addLog(text.logPotionLimit, 'neutral');
      return;
    }

    const isMonster = card.suit === 'clubs' || card.suit === 'spades';
    let damage = 0;
    
    if (isMonster) {
      const monsterValue = card.rank;
      let effectiveWeaponValue = 0;
      let previousMonsterDefeatedRank = 0;
      
      if (weapon) {
        effectiveWeaponValue = weapon.rank;
        if (monstersOnWeapon.length > 0) {
          previousMonsterDefeatedRank = monstersOnWeapon[monstersOnWeapon.length - 1].rank;
        }
      }
      
      const canUseWeapon = weapon && (monstersOnWeapon.length === 0 || monsterValue < previousMonsterDefeatedRank);
      
      if (canUseWeapon) {
        damage = Math.max(0, monsterValue - effectiveWeaponValue);
      } else {
        damage = monsterValue; 
      }
    }

    if (damage > 0) {
      setIsAnimating(true);
      setShakingCardId(card.id);
      triggerHaptic(damage >= 10 ? 'heavy' : 'light');
      
      if (damage >= 10) {
        setGlobalShake(true);
        setTimeout(() => setGlobalShake(false), 500);
      }
      
      setTimeout(() => {
        resolveCardEffect(card, damage);
      }, 400);
    } else {
      triggerHaptic('light');
      resolveCardEffect(card, 0);
    }
  };

  const resolveCardEffect = (card: CardData, damage: number) => {
    let newHealth = health;
    let newWeapon = weapon;
    let newMonstersOnWeapon = [...monstersOnWeapon];
    let newPotionsUsed = potionsUsedThisTurn;

    const cardName = getThematicName(card, lang);

    if (card.suit === 'hearts') {
      const healAmount = Math.min(20 - health, card.rank);
      newHealth = Math.min(20, health + card.rank);
      newPotionsUsed++;
      addLog(text.logDrank(cardName, healAmount), 'heal');
    } else if (card.suit === 'diamonds') {
      newWeapon = card;
      newMonstersOnWeapon = [];
      addLog(text.logEquipped(cardName), 'neutral');
    } else {
      const monsterValue = card.rank;
      let previousMonsterDefeatedRank = monstersOnWeapon.length > 0 ? monstersOnWeapon[monstersOnWeapon.length - 1].rank : 0;
      const canUseWeapon = weapon && (monstersOnWeapon.length === 0 || monsterValue < previousMonsterDefeatedRank);
      
      newHealth -= damage;
      if (canUseWeapon) {
        newMonstersOnWeapon.push(card);
        addLog(text.logSlew(cardName, damage), damage > 0 ? 'damage' : 'neutral');
      } else {
        addLog(text.logFought(cardName, damage), 'damage');
      }
    }

    if (newHealth < health) spawnFloatingText(health - newHealth, 'damage');
    else if (newHealth > health) spawnFloatingText(newHealth - health, 'heal');

    const newRoom = room.filter(c => c.id !== card.id);
    const newCardsFaced = cardsFacedThisTurn + 1;
    
    if (newHealth <= 0) {
      const finalScore = calculateLossScore(newHealth, deck, newRoom);
      setStatus('lost');
      setScore(finalScore);
      updateHighScore(finalScore);
      addLog(text.logSuccumbed, 'defeat');
      setHealth(newHealth);
      setRoom(newRoom);
      setWeapon(newWeapon);
      setMonstersOnWeapon(newMonstersOnWeapon);
    } else {
      setHealth(newHealth);
      setWeapon(newWeapon);
      setMonstersOnWeapon(newMonstersOnWeapon);
      setPotionsUsedThisTurn(newPotionsUsed);
      setCardsFacedThisTurn(newCardsFaced);
      
      let currentDeck = [...deck];
      let currentRoom = [...newRoom];
      
      if (newCardsFaced >= 3 && currentDeck.length > 0) {
        while (currentRoom.length < 4 && currentDeck.length > 0) {
          const nextCard = currentDeck.shift();
          if (nextCard) currentRoom.push(nextCard);
        }
        setCardsFacedThisTurn(0);
        setPotionsUsedThisTurn(0);
        setHasFledThisDungeon(false);
        addLog(text.logProceed, 'neutral');
      }
      
      if (currentDeck.length === 0 && currentRoom.length <= 1) {
        const finalScore = calculateWinScore(newHealth, currentRoom);
        setStatus('won');
        setScore(finalScore);
        updateHighScore(finalScore);
        addLog(text.logSurvived, 'victory');
      }
      
      setDeck(currentDeck);
      setRoom(currentRoom);
      setDiscard([...discard, card]);
    }
    
    setSelectedCard(null);
    setIsAnimating(false);
    setShakingCardId(null);
  };

  const handleFlee = () => {
    if (status !== 'playing' || isAnimating || hasFledThisDungeon) return;
    
    let currentDeck = [...deck];
    room.forEach(c => currentDeck.push(c));
    
    for (let i = currentDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentDeck[i], currentDeck[j]] = [currentDeck[j], currentDeck[i]];
    }
    
    const newRoom = currentDeck.splice(0, 4);
    
    setDeck(currentDeck);
    setRoom(newRoom);
    setCardsFacedThisTurn(0);
    setHasFledThisDungeon(true);
    setPotionsUsedThisTurn(0);
    setSelectedCard(null);
    addLog(text.logFled, 'neutral');
    triggerHaptic('light');
  };

  const renderActionPanel = () => {
    if (!selectedCard) return (
      <div className="flex items-center justify-center h-full text-emerald-100/50 italic border-2 border-dashed border-emerald-800 rounded-xl p-4 font-serif text-center">
        {text.tapCard}
      </div>
    );

    const isMonster = selectedCard.suit === 'clubs' || selectedCard.suit === 'spades';
    const thematicName = getThematicName(selectedCard, lang);
    let actionText = '';
    let damagePreview = 0;
    
    if (selectedCard.suit === 'hearts') {
      if (potionsUsedThisTurn >= 1) {
        actionText = text.potionLimit;
      } else {
        const heal = Math.min(20 - health, selectedCard.rank);
        actionText = text.drinkPotion(heal);
      }
    } else if (selectedCard.suit === 'diamonds') {
      actionText = text.equipWeapon(selectedCard.rank);
    } else {
      const monsterValue = selectedCard.rank;
      let effectiveWeaponValue = 0;
      let previousMonsterDefeatedRank = 0;
      
      if (weapon) {
        effectiveWeaponValue = weapon.rank;
        if (monstersOnWeapon.length > 0) {
          previousMonsterDefeatedRank = monstersOnWeapon[monstersOnWeapon.length - 1].rank;
        }
      }
      
      const canUseWeapon = weapon && (monstersOnWeapon.length === 0 || monsterValue < previousMonsterDefeatedRank);
      
      if (canUseWeapon) {
        damagePreview = Math.max(0, monsterValue - effectiveWeaponValue);
        actionText = damagePreview > 0 
          ? text.fightWeaponDmg(damagePreview) 
          : text.fightWeaponNoDmg;
      } else {
        damagePreview = monsterValue;
        actionText = weapon 
          ? text.monsterTooStrong(damagePreview)
          : text.fightBarehanded(damagePreview);
      }
    }

    const canUse = selectedCard.suit !== 'hearts' || potionsUsedThisTurn === 0;

    return (
      <div className="flex flex-col h-full justify-between gap-4 p-2">
        <div>
          <h4 className="text-yellow-400 font-serif font-bold text-lg sm:text-xl mb-2 leading-tight">{thematicName}</h4>
          <p className="text-sm sm:text-base text-emerald-50 leading-relaxed font-sans">{actionText}</p>
        </div>
        <button 
          disabled={!canUse || isAnimating}
          onClick={() => handleFaceCard(selectedCard)}
          className={`w-full py-3 sm:py-4 rounded-xl font-bold font-serif text-lg sm:text-xl tracking-wide uppercase transition-all shadow-lg flex items-center justify-center gap-2 ${
            !canUse 
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
              : isMonster && damagePreview >= health
                ? 'bg-red-700 hover:bg-red-600 text-white animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isMonster ? <Sword size={20} /> : (selectedCard.suit === 'hearts' ? <Heart size={20} /> : <Shield size={20} />)}
          {isMonster ? text.engage : text.take}
        </button>
      </div>
    );
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-slate-950 bg-felt text-emerald-50 flex items-center justify-center p-4">
        <button 
          onClick={() => setLang(lang === 'en' ? 'et' : 'en')} 
          className="absolute top-4 right-4 bg-slate-900 border border-emerald-800 text-yellow-500 px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg hover:bg-slate-800 transition-colors font-bold"
        >
          <Globe size={18} /> {text.langToggle}
        </button>

        <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-emerald-900/50 relative">
          <div className="text-center space-y-2 mb-10">
            <h1 className="text-5xl sm:text-6xl font-black text-white font-serif tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">{text.title}</h1>
            <p className="text-emerald-400 text-lg font-medium font-serif tracking-wide italic">{text.subtitle}</p>
          </div>
          
          {highScore !== null && (
            <div className="flex justify-center mb-8">
              <div className="inline-block bg-slate-950 border border-yellow-600/30 rounded-xl px-8 py-4 shadow-[0_4px_20px_rgba(202,138,4,0.15)] text-center">
                <div className="text-yellow-600/80 text-xs sm:text-sm uppercase tracking-widest font-bold mb-1 font-sans">{text.bestScore}</div>
                <div className="text-4xl font-black text-yellow-500 drop-shadow-md font-serif">{highScore}</div>
              </div>
            </div>
          )}

          <div className="space-y-4 pt-4">
            <button 
              onClick={() => { initializeGame(); setHasStarted(true); }}
              className="w-full py-4 bg-yellow-600 hover:bg-yellow-500 text-slate-950 rounded-xl font-bold font-serif tracking-wide text-2xl shadow-[0_4px_14px_0_rgba(202,138,4,0.39)] transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <Play size={24} fill="currentColor" /> {text.enterDungeon}
            </button>
            <button 
              onClick={() => setShowRules(true)}
              className="w-full py-4 bg-transparent border-2 border-emerald-800 text-emerald-400 hover:bg-emerald-900/50 rounded-xl font-bold font-sans tracking-wide transition-colors flex items-center justify-center gap-2"
            >
              <Info size={20} /> {text.howToPlay}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showRules && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-slate-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-emerald-800 shadow-2xl my-8 relative"
              >
                <button 
                  onClick={() => setShowRules(false)}
                  className="absolute top-4 right-4 p-2 text-emerald-400 hover:text-white hover:bg-emerald-800 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
                <h2 className="text-3xl font-black text-white mb-6 font-serif">{text.rulesTitle}</h2>
                <div className="space-y-6 text-emerald-100/90 font-sans leading-relaxed text-sm sm:text-base">
                  <p><strong>{text.goal}</strong> {text.goalDesc}</p>
                  
                  <div>
                    <h3 className="text-yellow-500 font-bold text-lg mb-2 flex items-center gap-2"><Sword size={18}/> {text.monsters}</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>{text.monstersDesc1}</li>
                      <li>{text.monstersDesc2}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-yellow-500 font-bold text-lg mb-2 flex items-center gap-2"><Shield size={18}/> {text.weapons}</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>{text.weaponsDesc1}</li>
                      <li>{text.weaponsDesc2}</li>
                      <li>{text.weaponsDesc3}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-yellow-500 font-bold text-lg mb-2 flex items-center gap-2"><Heart size={18}/> {text.potions}</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>{text.potionsDesc1}</li>
                      <li>{text.potionsDesc2}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-yellow-500 font-bold text-lg mb-2">{text.roomFlee}</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>{text.roomFleeDesc1}</li>
                      <li>{text.roomFleeDesc2}</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-950 bg-felt text-slate-50 flex flex-col font-sans overflow-x-hidden ${globalShake ? 'animate-global-shake' : ''}`}>
      {/* Top HUD */}
      <header className="bg-slate-950/80 backdrop-blur-md border-b border-emerald-900/50 p-4 shadow-xl z-20">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="flex flex-col items-center relative">
              <div className="text-[10px] sm:text-xs text-emerald-500 uppercase tracking-widest font-bold mb-1">{text.health}</div>
              <div className={`text-2xl sm:text-4xl font-black font-serif ${health <= 5 ? 'text-red-500 animate-pulse drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'text-white'}`}>
                {health}<span className="text-emerald-700 text-lg sm:text-2xl">/20</span>
              </div>
              
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 pointer-events-none z-50">
                {floatingTexts.map(ft => (
                  <div 
                    key={ft.id} 
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 text-3xl font-black font-serif animate-float-up-fade whitespace-nowrap ${
                      ft.type === 'damage' ? 'text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,1)]' : 'text-green-400 drop-shadow-[0_0_12px_rgba(74,222,128,1)]'
                    }`}
                  >
                    {ft.type === 'damage' ? '-' : '+'}{ft.amount}
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleFlee}
              disabled={hasFledThisDungeon || status !== 'playing' || cardsFacedThisTurn >= 3}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold font-serif tracking-widest uppercase transition-all border-2 ${
                hasFledThisDungeon || status !== 'playing' || cardsFacedThisTurn >= 3
                  ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-transparent border-yellow-600 text-yellow-500 hover:bg-yellow-600/10 active:bg-yellow-600/20 shadow-[0_0_15px_rgba(202,138,4,0.1)] hover:shadow-[0_0_20px_rgba(202,138,4,0.3)]'
              }`}
            >
              {text.flee}
            </button>
          </div>

          <div className="flex gap-4 sm:gap-8 text-center">
            <div>
              <div className="text-[10px] sm:text-xs text-emerald-500 uppercase tracking-widest font-bold mb-1">{text.deck}</div>
              <div className="text-xl sm:text-2xl font-bold font-serif text-emerald-100">{deck.length}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-8 flex flex-col justify-between relative z-10">
        
        {/* The Room */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-slate-900/40 backdrop-blur-sm border border-emerald-800/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <h2 className="text-center text-emerald-600/80 font-serif font-black tracking-[0.3em] uppercase text-sm sm:text-base mb-6 sm:mb-8">{text.theRoom}</h2>
            
            <div className="flex justify-center gap-4 sm:gap-8 flex-wrap min-h-[120px] sm:min-h-[160px]">
              {room.map((card, index) => (
                <PlayingCard 
                  key={card.id} 
                  card={card} 
                  isSelected={selectedCard?.id === card.id}
                  isShaking={shakingCardId === card.id}
                  animateEntrance={true}
                  animationDelayMs={index * 120}
                  showTooltip={true}
                  lang={lang}
                  onClick={() => {
                    if (!isAnimating) setSelectedCard(card.id === selectedCard?.id ? null : card);
                  }} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Player Equipment & Action Panel */}
        <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-4 sm:gap-8 mt-4 sm:mt-8">
          
          {/* Equipment */}
          <div className="bg-slate-900/60 backdrop-blur-sm border border-emerald-800/50 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-between shadow-xl order-last sm:order-first">
            <h3 className="text-emerald-500 font-sans uppercase tracking-widest text-xs font-bold mb-4">{text.equippedWeapon}</h3>
            
            <div 
              className="relative w-16 h-24 sm:w-24 sm:h-36 mx-auto group cursor-pointer" 
              onPointerEnter={(e) => e.pointerType === 'mouse' && setHoverWeaponStack(true)} 
              onPointerLeave={(e) => e.pointerType === 'mouse' && setHoverWeaponStack(false)}
              onClick={() => setHoverWeaponStack(prev => !prev)}
            >
              <PlayingCard card={weapon} className="absolute top-0 left-0" showTooltip={true} lang={lang} />
              
              {monstersOnWeapon.map((m, i) => (
                <div 
                  key={m.id} 
                  className="absolute left-0 w-full z-10 transition-all duration-300 ease-out" 
                  style={{ top: (i + 1) * (hoverWeaponStack ? (window.innerWidth < 640 ? 32 : 48) : (window.innerWidth < 640 ? 16 : 24)) }}
                >
                  <PlayingCard card={m} className="shadow-[0_-4px_10px_rgba(0,0,0,0.6)]" showTooltip={true} lang={lang} />
                </div>
              ))}
            </div>
            <div className="h-6 mt-4">
              {weapon && monstersOnWeapon.length > 0 && (
                <span className="text-xs text-emerald-400/80 bg-emerald-900/30 px-3 py-1 rounded-full border border-emerald-800/50">
                  {text.defeatedMonsters(monstersOnWeapon.length)}
                </span>
              )}
            </div>
          </div>

          {/* Action Context */}
          <div className="bg-slate-900/60 backdrop-blur-sm border border-emerald-800/50 rounded-2xl p-4 sm:p-6 shadow-xl">
            {renderActionPanel()}
          </div>
        </div>
      </main>

      {/* Narrative Combat Log */}
      <div className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 w-64 sm:w-80 pointer-events-none z-50 flex flex-col gap-2 mask-image-top">
        <AnimatePresence>
          {logs.map(log => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              className={`text-xs sm:text-sm p-3 rounded-lg backdrop-blur-md shadow-lg border-l-4 ${
                log.type === 'damage' ? 'bg-red-950/80 border-red-500 text-red-200' :
                log.type === 'heal' ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200' :
                log.type === 'victory' ? 'bg-yellow-950/80 border-yellow-400 text-yellow-200 font-bold' :
                log.type === 'defeat' ? 'bg-slate-950/90 border-slate-700 text-slate-400 italic' :
                'bg-slate-900/80 border-slate-500 text-slate-300'
              }`}
            >
              {log.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Game Over Overlays */}
      <AnimatePresence>
        {status !== 'playing' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-4 text-center"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }}
              className={`max-w-md w-full bg-slate-900 border-2 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] ${status === 'won' ? 'border-yellow-500' : 'border-red-900'}`}
            >
              <h2 className={`text-5xl font-black font-serif mb-2 ${status === 'won' ? 'text-yellow-400' : 'text-red-600'}`}>
                {status === 'won' ? text.victory : (status === 'stuck' ? text.stuckTitle : text.defeated)}
              </h2>

              {status === 'stuck' && (
                <p className="text-slate-300 font-sans mt-4 text-sm sm:text-base leading-relaxed px-4">
                  {text.stuckInfo}
                </p>
              )}
              
              <div className="my-8 py-6 bg-slate-950 rounded-2xl border border-slate-800">
                <p className="text-slate-400 uppercase tracking-widest text-sm font-bold mb-1">{text.finalScore}</p>
                <p className={`text-6xl font-black font-serif ${score > 0 ? 'text-green-400' : 'text-slate-200'}`}>
                  {score > 0 ? `+${score}` : score}
                </p>
              </div>
              
              <button 
                onClick={initializeGame}
                className="w-full py-4 bg-slate-100 hover:bg-white text-slate-900 rounded-xl font-bold font-serif tracking-widest uppercase text-xl shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <RefreshCw size={24} /> {status === 'stuck' ? text.restartGame : text.playAgain}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
