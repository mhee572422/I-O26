/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, ImgHTMLAttributes } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Timer,
  Volume2,
  VolumeX,
  Share2,
  Check,
  Smartphone,
  Music,
  Trophy,
  Users,
  Award,
  Sparkles,
  RefreshCw,
  Crown,
  Zap,
  Mail,
  Clock,
  BookOpen
} from 'lucide-react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import heroImage from './assets/Collection-Hero.jpg';
import geminiLogo from './assets/Gemini.png';
import confetti from 'canvas-confetti';

// Question Data
const QUIZ_DATA = [
  {
    id: 1,
    title: "Gemini Omni",
    topic: "Models",
    difficulty: "Easy",
    gradient: "gradient-blue",
    question: "Gemini Omni is our new model that can create anything from any _______ — starting with video.",
    options: [
      "A) Input",
      "B) Output",
      "C) Workflow",
      "D) Agent"
    ],
    correctAnswer: "A) Input",
    context: "Gemini Omni is our model that can create anything from any input, starting with video. It combines an intuitive understanding of physics with Gemini's knowledge of history, science and cultural context, bridging the gap from photorealism to meaningful storytelling. Try Gemini Omni Flash, the first model in the Omni family, rolling out now to all Google AI subscribers (Plus, Pro and Ultra) globally through the Gemini app and Google Flow. It’s also rolling out at no cost to users on YouTube Shorts and YouTube Create App starting this week.",
    url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni/",
    animation: "float-slow"
  },
  {
    id: 2,
    title: "Search agents",
    topic: "Agents",
    difficulty: "Easy",
    gradient: "gradient-green",
    question: "True or False: With information agents in Search, you can stay updated on whatever matters most to you.",
    options: ["TRUE", "FALSE"],
    correctAnswer: "TRUE",
    context: "We’re entering the era of Search agents, where you can easily create, customize and manage multiple AI agents for your many tasks, right in Search. We’re starting with information agents, which operate in the background, 24/7, intelligently reasoning across everything on the web, like blogs, news sites and social posts (plus our freshest data, such as real-time info on finance, shopping and sports). Your agents will then send you an intelligent, synthesized update, with the ability to take action. Information agents are rolling out this summer, starting first with Google AI Pro and Ultra subscribers.",
    url: "https://blog.google/products-and-platforms/products/search/search-io-2026/",
    animation: "float-fast"
  },
  {
    id: 3,
    title: "Agentic coding\nin Search",
    topic: "Tools",
    difficulty: "Medium",
    gradient: "gradient-red",
    question: "True or False: Search can build you custom dashboards or trackers for ongoing tasks.",
    options: ["TRUE", "FALSE"],
    correctAnswer: "TRUE",
    context: "We’re bringing the power of Google Antigravity and the agentic coding capabilities of Gemini 3.5 Flash right into Search. Search can now code entire custom experiences, like tools, dashboards or trackers, just for you. It’s like building your own mini apps with Search. They’re especially awesome for those long-running tasks where you want to keep coming back, like planning a wedding or managing your home move. You’ll be able to build custom experiences with Antigravity, right in Search in the coming months, starting first for Google AI Pro and Ultra subscribers in the U.S.",
    url: "https://blog.google/products-and-platforms/products/search/search-io-2026/",
    animation: "float-fast"
  },
  {
    id: 4,
    title: "Gemini 3.5 Flash",
    topic: "Models",
    difficulty: "Medium",
    gradient: "gradient-yellow",
    question: "True or False: Gemini 3.5 Flash is three times faster than other frontier models.",
    options: ["TRUE", "FALSE"],
    correctAnswer: "FALSE",
    context: "When it comes to output tokens per second, Gemini 3.5 Flash is *actually* four times faster than other frontier models. Gemini 3.5 Flash delivers performance that rivals large flagship models on multiple dimensions, at speeds you have come to expect from the Flash series. It’s rolling out globally to everyone in the Gemini app and AI Mode in Search. It's also generally available via our agent-first development platform Google Antigravity, the Gemini API in Google AI Studio and Android Studio via the API key.",
    url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/",
    animation: "float-slow"
  },
  {
    id: 5,
    title: "SynthID",
    topic: "Tools",
    difficulty: "Hard",
    gradient: "gradient-green",
    question: "SynthID verification for image, video and audio has been used globally _______ times since we added it to the Gemini app:",
    options: [
      "A) 20 million",
      "B) 45 million",
      "C) 50 million",
      "D) 785,000"
    ],
    correctAnswer: "C) 50 million",
    context: "Three years ago, we introduced SynthID, our industry-leading digital watermarking technology that embeds imperceptible signals into AI-generated content. Since then, we've integrated SynthID into our generative media models and products, watermarking over 100 billion images and videos and 60,000 years of audio, and brought SynthID verification to the Gemini app. We’re now expanding this verification capability to Search and, in the coming weeks, Chrome.",
    url: "https://blog.google/innovation-and-ai/products/identifying-ai-generated-media-online/",
    animation: "float-slow"
  },
  {
    id: 6,
    title: "Neural Expressive",
    topic: "Models",
    difficulty: "Easy",
    gradient: "gradient-blue",
    question: "True or False: Neural Expressive is the new design language that greets you when you open the Gemini app or visit the site.",
    options: ["TRUE", "FALSE"],
    correctAnswer: "TRUE",
    context: "We’ve redesigned the entire Gemini experience from the ground up, introducing a stunning new design language we call Neural Expressive. The interface now features fluid animations, vibrant colors, new typography and haptic feedback. Neural Expressive is rolling out globally across the web, Android and iOS for everyone.",
    url: "https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/",
    animation: "float-fast"
  },
  {
    id: 7,
    title: "Workspace",
    topic: "Tools",
    difficulty: "Medium",
    gradient: "gradient-red",
    question: "We’re bringing conversational voice capabilities to which of these products:",
    options: [
      "A) Gmail",
      "B) Docs",
      "C) Keep",
      "D) All of the above"
    ],
    correctAnswer: "D) All of the above",
    context: "We’re announcing new voice capabilities in Gmail, Docs and Keep to help you brainstorm, organize your thoughts and take action. For instance, search your inbox with Gmail Live, think it through — and write it out — with Docs Live and just talk to Keep to organize your thoughts. These new conversational features in Gmail, Docs and Keep are rolling out to Google AI Pro and Ultra subscribers and in preview to Google Workspace business customers this summer.",
    url: "https://blog.google/products-and-platforms/products/workspace/workspace-updates/",
    animation: "float-slow"
  },
  {
    id: 8,
    title: "Antigravity 2.0",
    topic: "Agents",
    difficulty: "Hard",
    gradient: "gradient-yellow",
    question: "True or False: With Google Antigravity 2.0, you can orchestrate multiple agents to execute tasks in parallel.",
    options: ["TRUE", "FALSE"],
    correctAnswer: "TRUE",
    context: "Google Antigravity 2.0 is a new standalone desktop application that delivers fully on an agent-optimized experience. It acts as a central home for agent interaction, allowing you to orchestrate multiple agents to execute tasks in parallel. It also features dynamic subagents for parallelized workflows, scheduled tasks for background automation and ecosystem integrations across Google AI Studio, Android and Firebase. Anyone can download the app from antigravity.google.",
    url: "https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/",
    animation: "float-fast"
  },
  {
    id: 9,
    title: "Gemini Spark",
    topic: "Agents",
    difficulty: "Medium",
    gradient: "gradient-blue",
    question: "Gemini Spark is a 24/7 personal AI agent that helps you navigate your digital life, takes action on your behalf and is under your direction. What can you do with it?",
    options: [
      "A) Set recurring tasks or triggers",
      "B) Teach it new skills",
      "C) Create complete workflows",
      "D) All of the above"
    ],
    correctAnswer: "D) All of the above",
    context: "Spark represents a big shift for Gemini, transforming it from an assistant that can answer your questions into an active partner that does real work on your behalf and under your direction. You choose whether to turn it on and what apps it connects to, and it’s designed to ask you first before performing high-stakes actions like spending money or sending emails. Gemini Spark will roll out to trusted testers this week, and we're planning to roll it out as a Beta for U.S. Google AI Ultra subscribers next week.",
    url: "https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/",
    animation: "float-fast"
  },
  {
    id: 10,
    title: "Universal Cart",
    topic: "Tools",
    difficulty: "Easy",
    gradient: "gradient-red",
    question: "True or False: Universal Cart will allow you to add things to your cart while you’re using Search, the Gemini app, YouTube or Gmail.",
    options: ["TRUE", "FALSE"],
    correctAnswer: "TRUE",
    context: "The Universal Cart is your new hub for shopping on Google. The moment you add a product to your cart, it gets to work in the background — finding deals and price drops, giving you insights on price history and alerting you when an item is back in stock. It also uses intelligent reasoning to anticipate your needs and help solve problems before they arise — like proactively flagging any product incompatibilities and suggesting alternatives. Universal Cart is rolling out across Search and the Gemini app in the U.S. this summer, with YouTube and Gmail to follow.",
    url: "https://blog.google/products-and-platforms/products/shopping/google-shopping-cart/",
    animation: "float-slow"
  },
  {
    id: 11,
    title: "Daily Brief",
    topic: "Agents",
    difficulty: "Hard",
    gradient: "gradient-yellow",
    question: "True or False: “Rise and Shine” is a new agent that gives you a personalized morning brief and organizes exactly what you need to know to start your day.",
    options: ["TRUE", "FALSE"],
    correctAnswer: "FALSE",
    context: "This new agent is actually called “Daily Brief.” It goes far beyond a simple summary. Daily Brief actively organizes and prioritizes based on your specific goals, even suggesting immediate next steps. You can easily steer it by giving responses a quick thumbs up or down over time. Daily Brief is rolling out to Google AI Plus, Pro and Ultra subscribers, starting in the U.S.",
    url: "https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/",
    animation: "float-fast"
  }
];

// Gradient Number Wrapper
const GradientNumber = ({ value, gradientId, size = 48 }: { value: number, gradientId: string, size?: number }) => {
  const gradientColors = {
    'gradient-blue': ['#4285F4', '#1A73E8'],
    'gradient-red': ['#EA4335', '#D93025'],
    'gradient-yellow': ['#FBBC04', '#F9AB00'],
    'gradient-green': ['#34A853', '#1E8E3E'],
  }[gradientId] || ['#000', '#000'];

  return (
    <div className="relative flex items-center justify-center font-black select-none leading-none" style={{ width: size, height: size, fontSize: size * 0.75 }}>
      <span style={{ 
        backgroundImage: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        padding: '0 0.1em',
      }}>
        {value}
      </span>
    </div>
  );
};

interface FallingEmoji {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  scale: number;
  rotation: number;
}

// Simple custom formatter for raw text wrapping *italicized* words
const renderFormattedText = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <span key={index} className="italic font-medium text-slate-800 mr-[0.2em]">
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
};

const playSound = (type: 'click' | 'success' | 'fail', enabled: boolean) => {
  if (!enabled) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'success') {
      // Gentle warm success sound: Arpeggio of notes [C5, E5, G5, C6]
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
        
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.25);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.25);
      });
    } else if (type === 'fail') {
      // Gentle sliding down tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.3);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (err) {
    console.error('Audio failed to play', err);
  }
};

const triggerHaptic = (type: 'tap' | 'success' | 'fail' | 'flip', enabled: boolean) => {
  if (!enabled) return;
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      switch (type) {
        case 'tap':
          // Elegant minimal haptic tap - 12ms representing modern Neural Expressive touch
          navigator.vibrate(12);
          break;
        case 'flip':
          // Fluid 3D rotation bubble wave: light tap, brief blank space, then a solid follow-up
          navigator.vibrate([15, 50, 25]);
          break;
        case 'success':
          // Harmonic warm pulse sequence: pleasant and progressive
          navigator.vibrate([20, 40, 45]);
          break;
        case 'fail':
          // Double buzz indicating mismatch/retry attention
          navigator.vibrate([45, 60, 45]);
          break;
      }
    } catch {
      // Ignore vibration failures if blocked by user settings/environment
    }
  }
};

export default function App() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [frontQuestionId, setFrontQuestionId] = useState<number | null>(null);
  const [backQuestionId, setBackQuestionId] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState<Set<number>>(new Set());
  const [correctAnsweredIds, setCorrectAnsweredIds] = useState<Set<number>>(new Set());
  const [showFinalScore, setShowFinalScore] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fallingEmojis, setFallingEmojis] = useState<FallingEmoji[]>([]);
  const [selectedResultsTopic, setSelectedResultsTopic] = useState<'Models' | 'Agents' | 'Tools' | null>(null);

  // Streak States
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('io_quiz_best_streak');
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [streakCelebration, setStreakCelebration] = useState<boolean>(false);

  // Lifetime completetions count state
  const [lifetimeCompletions, setLifetimeCompletions] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('io_quiz_lifetime_completions');
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [bestScore, setBestScore] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('io_quiz_best_score');
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [isNewHighScore, setIsNewHighScore] = useState<boolean>(false);

  const triggerConfettiCelebration = () => {
    // Immediate left/right sprays
    confetti({
      particleCount: 120,
      spread: 75,
      origin: { x: 0.1, y: 0.6 }
    });
    confetti({
      particleCount: 120,
      spread: 75,
      origin: { x: 0.9, y: 0.6 }
    });

    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.85 }
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.85 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    setTimeout(() => {
      requestAnimationFrame(frame);
    }, 150);
  };

  useEffect(() => {
    if (showFinalScore) {
      // 1. Increment completions counts
      setLifetimeCompletions(prev => {
        const nextVal = prev + 1;
        try {
          localStorage.setItem('io_quiz_lifetime_completions', nextVal.toString());
        } catch (e) {
          console.error(e);
        }
        return nextVal;
      });

      // 2. High score / Best score computation
      let isNewHigh = false;
      setBestScore(prevBest => {
        if (score > prevBest) {
          try {
            localStorage.setItem('io_quiz_best_score', score.toString());
          } catch (e) {
            console.error(e);
          }
          isNewHigh = true;
          return score;
        }
        return prevBest;
      });
      
      setIsNewHighScore(isNewHigh);

      // Trigger standard confetti celebration for a high score (new high score OR >= 80% accuracy)
      const accuracy = (score / QUIZ_DATA.length) * 100;
      if (isNewHigh || accuracy >= 80) {
        triggerConfettiCelebration();
      }
    } else {
      setIsNewHighScore(false);
    }
  }, [showFinalScore, score]);

  // Username and leaderboard states
  const [userName, setUserName] = useState<string>(() => {
    try {
      return localStorage.getItem('io_quiz_username') || '';
    } catch {
      return '';
    }
  });

  const [leaderboard, setLeaderboard] = useState<any[] | null>(null);
  const [leaderboardLoading, setLeaderboardLoading] = useState<boolean>(false);
  const [leaderboardError, setLeaderboardError] = useState<string | null>(null);

  const fetchLeaderboard = async (nameOverride?: string) => {
    setLeaderboardLoading(true);
    setLeaderboardError(null);
    try {
      const targetName = nameOverride !== undefined ? nameOverride : userName;
      const res = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score,
          totalQuestions: QUIZ_DATA.length,
          username: targetName || 'Anonymous Dev'
        })
      });
      if (!res.ok) {
        throw new Error('Server responded with an error');
      }
      const data = await res.json();
      if (data && Array.isArray(data.leaderboard)) {
        setLeaderboard(data.leaderboard);
      } else {
        throw new Error('Invalid leaderboard format');
      }
    } catch (err: any) {
      console.error(err);
      setLeaderboardError(err.message || 'Failed to fetch leaderboard');
    } finally {
      setLeaderboardLoading(false);
    }
  };

  useEffect(() => {
    if (showFinalScore) {
      fetchLeaderboard();
    }
  }, [showFinalScore]);

  // Countdown timer states for active quiz session
  const [timeLeft, setTimeLeft] = useState<number>(120); // 120 seconds (2:00) total quiz time
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  // Sound toggle state (defaults to true, persists in localStorage)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('io_quiz_sound');
      return stored !== 'false';
    } catch {
      return true;
    }
  });

  // Music toggle state (defaults to true, persists in localStorage)
  const [musicEnabled, setMusicEnabled] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('io_quiz_music');
      return stored !== 'false';
    } catch {
      return true;
    }
  });

  // Web Audio refs for generating gorgeous procedural ambient background music
  const audioContextRef = useRef<AudioContext | null>(null);
  const musicGainNodeRef = useRef<GainNode | null>(null);
  const musicIntervalRef = useRef<any>(null);
  const activeOscillatorsRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);

  const startBackgroundMusic = () => {
    if (musicIntervalRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      const masterGain = ctx.createGain();
      // Gain node initialized to silent then faded in gracefully
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      if (musicEnabled) {
        masterGain.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 1.2);
      }
      masterGain.connect(ctx.destination);
      musicGainNodeRef.current = masterGain;

      const activeOscillators = activeOscillatorsRef.current;
      
      // Gorgeous ambient, non-distracting modal pads representing Google's 'Neural Expressive' visual design language
      const chords = [
        [130.81, 196.00, 261.63, 329.63], // C major (C3, G3, C4, E4)
        [110.00, 164.81, 220.00, 261.63], // A minor (A2, E3, A3, C4)
        [87.31, 130.81, 174.61, 220.00],  // F major (F2, C3, F3, A3)
        [98.00, 146.83, 196.00, 246.94]   // G major (G2, D3, G3, B3)
      ];
      
      let chordIndex = 0;

      const playChord = () => {
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const currentChord = chords[chordIndex];
        chordIndex = (chordIndex + 1) % chords.length;

        currentChord.forEach((freq, i) => {
          try {
            const osc = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();
            const gainNode = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(320, ctx.currentTime); // warm lowpass cutoff

            gainNode.gain.setValueAtTime(0, ctx.currentTime);
            // Ultra-gentle low-volume targeting peak value of 0.008 for true non-obtrusive background music
            gainNode.gain.linearRampToValueAtTime(0.008, ctx.currentTime + 2.0 + i * 0.15);
            gainNode.gain.setValueAtTime(0.008, ctx.currentTime + 4.0 + i * 0.15);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 9.0);

            osc.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(masterGain);

            osc.start(ctx.currentTime + i * 0.15);
            osc.stop(ctx.currentTime + 9.5);

            const nodeRef = { osc, gain: gainNode };
            activeOscillators.push(nodeRef);

            setTimeout(() => {
              const idx = activeOscillators.indexOf(nodeRef);
              if (idx > -1) {
                activeOscillators.splice(idx, 1);
              }
            }, 10000);
          } catch (err) {
            console.warn('Procedural chord note generation error:', err);
          }
        });
      };

      // Play initially
      playChord();

      // Trigger every 8 seconds recursively/sequentially
      musicIntervalRef.current = setInterval(playChord, 8000);
    } catch (err) {
      console.error('Failed to construct full procedural synthesis system:', err);
    }
  };

  const stopBackgroundMusic = () => {
    if (musicIntervalRef.current) {
      clearInterval(musicIntervalRef.current);
      musicIntervalRef.current = null;
    }

    // Safely fade-out existing notes instantly to avoid clicking/scratches
    activeOscillatorsRef.current.forEach(({ gain }) => {
      try {
        gain.gain.setValueAtTime(gain.gain.value, 0);
        gain.gain.linearRampToValueAtTime(0, 0.4);
      } catch {}
    });

    setTimeout(() => {
      activeOscillatorsRef.current.forEach(({ osc }) => {
        try {
          osc.stop();
        } catch {}
      });
      activeOscillatorsRef.current = [];
    }, 450);

    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch {}
      audioContextRef.current = null;
    }
    musicGainNodeRef.current = null;
  };

  // Haptic vibration toggle state (defaults to true, persists in localStorage)
  const [hapticsEnabled, setHapticsEnabled] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('io_quiz_haptics');
      return stored !== 'false';
    } catch {
      return true;
    }
  });

  // Topic filter state (All, Models, Agents, Tools)
  const [selectedTopic, setSelectedTopic] = useState<'All' | 'Models' | 'Agents' | 'Tools'>('All');

  // Difficulty filter state ('All' | 'Easy' | 'Medium' | 'Hard')
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');

  // Experience level state ('Novice' | 'Pro' | null)
  const [experienceLevel, setExperienceLevel] = useState<'Novice' | 'Pro' | null>(() => {
    try {
      const stored = localStorage.getItem('io_quiz_experience');
      return (stored === 'Novice' || stored === 'Pro') ? stored : null;
    } catch {
      return null;
    }
  });

  const handleSelectExperience = (level: 'Novice' | 'Pro' | null) => {
    playSound('click', soundEnabled);
    triggerHaptic(level ? 'success' : 'tap', hapticsEnabled);
    setExperienceLevel(level);
    try {
      if (level === null) {
        localStorage.removeItem('io_quiz_experience');
      } else {
        localStorage.setItem('io_quiz_experience', level);
      }
    } catch (err) {
      console.error(err);
    }

    // Coordinate with selectedDifficulty:
    // If user selects Novice (Easy & Med) but current difficulty is Hard, reset difficulty to All
    // If user selects Pro (Med & Hard) but current difficulty is Easy, reset difficulty to All
    if (level === 'Novice' && selectedDifficulty === 'Hard') {
      setSelectedDifficulty('All');
    } else if (level === 'Pro' && selectedDifficulty === 'Easy') {
      setSelectedDifficulty('All');
    }
  };

  const handleSelectDifficulty = (difficulty: 'All' | 'Easy' | 'Medium' | 'Hard') => {
    playSound('click', soundEnabled);
    triggerHaptic('tap', hapticsEnabled);
    setSelectedDifficulty(difficulty);

    // Coordinate with experienceLevel:
    // If user selects Easy difficulty, but level is Pro (which only includes Medium and Hard), reset experienceLevel to null
    // If user selects Hard difficulty, but level is Novice (which only includes Easy and Medium), reset experienceLevel to null
    if (difficulty === 'Easy' && experienceLevel === 'Pro') {
      setExperienceLevel(null);
      try {
        localStorage.removeItem('io_quiz_experience');
      } catch (err) {
        console.error(err);
      }
    } else if (difficulty === 'Hard' && experienceLevel === 'Novice') {
      setExperienceLevel(null);
      try {
        localStorage.removeItem('io_quiz_experience');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('io_quiz_sound', String(next));
      } catch (err) {
        console.error(err);
      }
      if (next) {
        playSound('click', true);
      }
      triggerHaptic('tap', hapticsEnabled);
      return next;
    });
  };

  const toggleHaptics = () => {
    setHapticsEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('io_quiz_haptics', String(next));
      } catch (err) {
        console.error(err);
      }
      if (next) {
        triggerHaptic('tap', true);
      }
      playSound('click', soundEnabled);
      return next;
    });
  };

  const toggleMusic = () => {
    setMusicEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('io_quiz_music', String(next));
      } catch (err) {
        console.error(err);
      }

      // Live mute/unmute control logic using master audio node
      if (musicGainNodeRef.current && audioContextRef.current) {
        const ctx = audioContextRef.current;
        musicGainNodeRef.current.gain.cancelScheduledValues(ctx.currentTime);
        if (next) {
          musicGainNodeRef.current.gain.setValueAtTime(0, ctx.currentTime);
          musicGainNodeRef.current.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 1.2);
        } else {
          musicGainNodeRef.current.gain.setValueAtTime(musicGainNodeRef.current.gain.value, ctx.currentTime);
          musicGainNodeRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
        }
      } else if (next && timerActive && !showFinalScore) {
        startBackgroundMusic();
      }

      playSound('click', soundEnabled);
      triggerHaptic('tap', hapticsEnabled);
      return next;
    });
  };

  const [copied, setCopied] = useState(false);

  const handleShareScore = () => {
    playSound('click', soundEnabled);
    
    const difficultyText = experienceLevel === 'Novice' 
      ? '🌱 Novice (Easy & Med)' 
      : experienceLevel === 'Pro' 
        ? '🚀 Pro (Med & Hard)' 
        : 'All Levels';

    const percentage = Math.round((score / QUIZ_DATA.length) * 100);
    const starRating = '⭐️'.repeat(Math.min(5, Math.max(0, Math.ceil((score / QUIZ_DATA.length) * 5)))) || '💤';

    const topicStats = chartData.map(d => `• ${d.topic}: ${d.correct}/${d.total} (${d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0}% accuracy)`).join('\n');

    const textToCopy = `Google I/O 2026 AI Quiz Challenge 💻✨

Experience Level: ${difficultyText}
My Score: ${score}/${QUIZ_DATA.length} (${percentage}%) ${starRating}

Topic Performance:
${topicStats}

Play the Google I/O 2026 Quiz Challenge & test your AI knowledge!
👉 ${window.location.href}`;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        triggerHaptic('success', hapticsEnabled);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const getEmailShareUrl = () => {
    const difficultyText = experienceLevel === 'Novice' 
      ? '🌱 Novice (Easy & Med)' 
      : experienceLevel === 'Pro' 
        ? '🚀 Pro (Med & Hard)' 
        : 'All Levels';

    const percentage = Math.round((score / QUIZ_DATA.length) * 100);
    const starRating = '⭐️'.repeat(Math.min(5, Math.max(0, Math.ceil((score / QUIZ_DATA.length) * 5)))) || '💤';

    const topicStats = chartData.map(d => `• ${d.topic}: ${d.correct}/${d.total} (${d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0}% accuracy)`).join('\n');

    const subject = encodeURIComponent("My Google I/O 2026 AI Quiz Score Summary! 💻✨");
    const bodyText = `Google I/O 2026 AI Quiz Challenge 💻✨

Experience Level: ${difficultyText}
My Score: ${score}/${QUIZ_DATA.length} (${percentage}%) ${starRating}

Topic Performance:
${topicStats}

Play the Google I/O 2026 Quiz Challenge & test your AI knowledge!
👉 ${window.location.href}`;

    const body = encodeURIComponent(bodyText);
    return `mailto:?subject=${subject}&body=${body}`;
  };

  const frontScrollRef = useRef<HTMLDivElement>(null);
  const backScrollRef = useRef<HTMLDivElement>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimerEndRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (timerActive && !showFinalScore) {
      startBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
  }, [timerActive, showFinalScore]);

  useEffect(() => {
    if (!timerActive || showFinalScore) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerActive(false);
          setIsTimeUp(true);
          setShowFinalScore(true);
          // Close active questions
          setActiveQuestion(null);
          setFrontQuestionId(null);
          setBackQuestionId(null);
          setIsFlipped(false);
          setSelectedAnswer(null);
          setIsTransitioning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, showFinalScore]);

  useEffect(() => {
    if (showFinalScore) {
      const emojiPool = ['🌟', '🎉', '🥳', '🚀', '✨', '‼️'];
      const newEmojis: FallingEmoji[] = Array.from({ length: 75 }).map((_, i) => ({
        id: i,
        emoji: emojiPool[Math.floor(Math.random() * emojiPool.length)],
        x: Math.random() * 95, // horizontal position vw
        delay: Math.random() * 2.5, // staggered delay up to 2.5 seconds
        duration: 2.0 + Math.random() * 2.0, // waterfall duration 2.0s to 4.0s
        scale: 0.7 + Math.random() * 0.9, // scaling 0.7 to 1.6
        rotation: (Math.random() - 0.5) * 60, // rot angle
      }));
      setFallingEmojis(newEmojis);
    } else {
      setFallingEmojis([]);
    }
  }, [showFinalScore]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
      if (transitionTimerEndRef.current) {
        clearTimeout(transitionTimerEndRef.current);
      }
      stopBackgroundMusic();
    };
  }, []);

  useEffect(() => {
    if (frontScrollRef.current) {
      frontScrollRef.current.scrollTop = 0;
    }
    if (backScrollRef.current) {
      backScrollRef.current.scrollTop = 0;
    }
  }, [frontQuestionId, backQuestionId, isFlipped]);

  // Dynamically update document SEO/Open Graph properties for rich social sharing preview
  useEffect(() => {
    const updateMetaTag = (property: string, content: string, attr: 'name' | 'property' = 'property') => {
      let element = document.querySelector(`meta[${attr}="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const origin = window.location.origin;
    // Use the absolute URL referencing the beautiful collection hero design in assets
    const imageUrl = `${origin}/src/assets/Collection-Hero.jpg`;

    if (showFinalScore) {
      const percentage = Math.round((score / QUIZ_DATA.length) * 100);
      const level = experienceLevel === 'Novice'
        ? 'Novice 🌱'
        : experienceLevel === 'Pro'
          ? 'Pro 🚀'
          : 'All Levels';
      
      const dynamicTitle = `I scored ${score}/${QUIZ_DATA.length} (${percentage}%) on the Google I/O 2026 Quiz!`;
      const dynamicDescription = `Challenge completed under the ${level} tier. Show off your AI expertise and test your knowledge of Gemini, Agents, and Developer Tools!`;

      document.title = dynamicTitle;

      // Update Open Graph (og:) tags
      updateMetaTag('og:title', dynamicTitle);
      updateMetaTag('og:description', dynamicDescription);
      updateMetaTag('og:image', imageUrl);
      updateMetaTag('og:url', window.location.href);
      updateMetaTag('og:type', 'website');

      // Update Twitter Card tags for microblogging visual embeds
      updateMetaTag('twitter:card', 'summary_large_image', 'name');
      updateMetaTag('twitter:title', dynamicTitle, 'name');
      updateMetaTag('twitter:description', dynamicDescription, 'name');
      updateMetaTag('twitter:image', imageUrl, 'name');
    } else {
      // Restore standard site meta tags
      const defaultTitle = "Google I/O 2026 AI Quiz Challenge";
      const defaultDescription = "Interactive trivia on the latest Gemini innovations, AI Agents, and developer tooling announced at Google I/O 2026.";

      document.title = defaultTitle;

      updateMetaTag('og:title', defaultTitle);
      updateMetaTag('og:description', defaultDescription);
      updateMetaTag('og:image', imageUrl);
      updateMetaTag('og:url', window.location.href);
      updateMetaTag('og:type', 'website');

      updateMetaTag('twitter:card', 'summary_large_image', 'name');
      updateMetaTag('twitter:title', defaultTitle, 'name');
      updateMetaTag('twitter:description', defaultDescription, 'name');
      updateMetaTag('twitter:image', imageUrl, 'name');
    }
  }, [showFinalScore, score, experienceLevel]);

  const handleHotspotClick = (id: number) => {
    if (isTransitioning) return;
    playSound('click', soundEnabled);
    triggerHaptic('tap', hapticsEnabled);
    setActiveQuestion(id);
    setFrontQuestionId(id);
    setBackQuestionId(id);
    setIsFlipped(false);
    setSelectedAnswer(null);

    // Start countdown timer when user starts playing
    if (!timerActive && timeLeft > 0 && !showFinalScore) {
      setTimerActive(true);
    }
  };

  const handleAnswerClick = (answer: string) => {
    if (isTransitioning) return;
    if (activeQuestion && !questionsAnswered.has(activeQuestion)) {
      const question = QUIZ_DATA.find(q => q.id === activeQuestion);
      if (question && answer === question.correctAnswer) {
        setScore(prev => prev + 1);
        setCorrectAnsweredIds(prev => new Set(prev).add(activeQuestion));
        playSound('success', soundEnabled);
        triggerHaptic('success', hapticsEnabled);

        // Manage Streaks
        setCurrentStreak(prevStreak => {
          const newStreak = prevStreak + 1;
          if (newStreak > bestStreak) {
            setBestStreak(newStreak);
            try {
              localStorage.setItem('io_quiz_best_streak', newStreak.toString());
            } catch (e) {
              console.error(e);
            }
            setStreakCelebration(true);
            setTimeout(() => setStreakCelebration(false), 2400);
          }
          return newStreak;
        });
      } else {
        playSound('fail', soundEnabled);
        triggerHaptic('fail', hapticsEnabled);
        setCurrentStreak(0);
      }
      setQuestionsAnswered(prev => new Set(prev).add(activeQuestion));
    } else {
      triggerHaptic('flip', hapticsEnabled);
    }
    setSelectedAnswer(answer);
    setIsFlipped(true);
  };

  const closeModal = () => {
    playSound('click', soundEnabled);
    triggerHaptic('tap', hapticsEnabled);
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
    if (transitionTimerEndRef.current) {
      clearTimeout(transitionTimerEndRef.current);
      transitionTimerEndRef.current = null;
    }
    setActiveQuestion(null);
    setFrontQuestionId(null);
    setBackQuestionId(null);
    setIsFlipped(false);
    setSelectedAnswer(null);
    setIsTransitioning(false);
  };

  const handleNextQuestion = () => {
    if (isTransitioning) return;
    playSound('click', soundEnabled);
    triggerHaptic('tap', hapticsEnabled);

    if (!activeQuestion) return;
    const currentIndex = filteredQuizData.findIndex(q => q.id === activeQuestion);

    if (currentIndex !== -1 && currentIndex < filteredQuizData.length - 1) {
      setIsTransitioning(true);
      setIsFlipped(false);
      
      const nextQuestion = filteredQuizData[currentIndex + 1];
      const nextId = nextQuestion.id;
      // Instantly load the next question's front content so it's ready when the flip reaches 90°
      setFrontQuestionId(nextId);
      
      // Swap back content at 350-400ms (when completely hidden from view due to card angle)
      transitionTimerRef.current = setTimeout(() => {
        setActiveQuestion(nextId);
        setBackQuestionId(nextId);
        setSelectedAnswer(null);
        transitionTimerRef.current = null;
      }, 350);

      // Reset transition state lock once full rotation finishes
      transitionTimerEndRef.current = setTimeout(() => {
        setIsTransitioning(false);
        transitionTimerEndRef.current = null;
      }, 800);
    } else {
      closeModal();
      setShowFinalScore(true);
      setTimerActive(false); // Stop countdown when quiz finishes
    }
  };

  const handlePreviousQuestion = () => {
    if (isTransitioning) return;
    playSound('click', soundEnabled);
    triggerHaptic('tap', hapticsEnabled);

    if (!activeQuestion) return;
    const currentIndex = filteredQuizData.findIndex(q => q.id === activeQuestion);

    if (currentIndex > 0) {
      setIsTransitioning(true);
      setIsFlipped(false);
      
      const prevQuestion = filteredQuizData[currentIndex - 1];
      const prevId = prevQuestion.id;
      // Instantly load previous question's front content so it's ready when the flip reaches 90°
      setFrontQuestionId(prevId);
      
      // Swap back content at 350-400ms (when completely hidden from view due to card angle)
      transitionTimerRef.current = setTimeout(() => {
        setActiveQuestion(prevId);
        setBackQuestionId(prevId);
        setSelectedAnswer(null);
        transitionTimerRef.current = null;
      }, 350);

      // Reset transition state lock once full rotation finishes
      transitionTimerEndRef.current = setTimeout(() => {
        setIsTransitioning(false);
        transitionTimerEndRef.current = null;
      }, 800);
    }
  };

  const resetQuiz = () => {
    playSound('click', soundEnabled);
    triggerHaptic('success', hapticsEnabled); // Triumphant restart haptic sequence
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
    if (transitionTimerEndRef.current) {
      clearTimeout(transitionTimerEndRef.current);
      transitionTimerEndRef.current = null;
    }
    setScore(0);
    setCurrentStreak(0);
    setQuestionsAnswered(new Set());
    setCorrectAnsweredIds(new Set());
    setSelectedResultsTopic(null);
    setShowFinalScore(false);
    setActiveQuestion(null);
    setFrontQuestionId(null);
    setBackQuestionId(null);
    setIsTransitioning(false);

    // Reset countdown states
    setTimeLeft(120);
    setTimerActive(false);
    setIsTimeUp(false);
  };

  const currentData = activeQuestion ? QUIZ_DATA.find(q => q.id === activeQuestion) : null;
  const frontData = frontQuestionId ? QUIZ_DATA.find(q => q.id === frontQuestionId) : null;
  const backData = backQuestionId ? QUIZ_DATA.find(q => q.id === backQuestionId) : null;

  // Filtered quiz data and dynamic rows for centering visual balance
  const filteredQuizData = QUIZ_DATA.filter((item) => {
    const matchesTopic = selectedTopic === 'All' || item.topic === selectedTopic;
    let matchesExperience = true;
    if (experienceLevel === 'Novice') {
      matchesExperience = item.difficulty === 'Easy' || item.difficulty === 'Medium';
    } else if (experienceLevel === 'Pro') {
      matchesExperience = item.difficulty === 'Medium' || item.difficulty === 'Hard';
    }
    const matchesDifficulty = selectedDifficulty === 'All' || item.difficulty === selectedDifficulty;
    return matchesTopic && matchesExperience && matchesDifficulty;
  });
  const halfLength = Math.ceil(filteredQuizData.length / 2);
  const row1 = filteredQuizData.slice(0, halfLength);
  const row2 = filteredQuizData.slice(halfLength);

  const filteredActiveIndex = activeQuestion ? filteredQuizData.findIndex(q => q.id === activeQuestion) : -1;

  const chartData = [
    {
      topic: 'Models',
      correct: QUIZ_DATA.filter(q => q.topic === 'Models' && correctAnsweredIds.has(q.id)).length,
      wrong: QUIZ_DATA.filter(q => q.topic === 'Models' && questionsAnswered.has(q.id) && !correctAnsweredIds.has(q.id)).length,
      unanswered: QUIZ_DATA.filter(q => q.topic === 'Models' && !questionsAnswered.has(q.id)).length,
      total: QUIZ_DATA.filter(q => q.topic === 'Models').length,
      color: '#4285F4' // Google Blue
    },
    {
      topic: 'Agents',
      correct: QUIZ_DATA.filter(q => q.topic === 'Agents' && correctAnsweredIds.has(q.id)).length,
      wrong: QUIZ_DATA.filter(q => q.topic === 'Agents' && questionsAnswered.has(q.id) && !correctAnsweredIds.has(q.id)).length,
      unanswered: QUIZ_DATA.filter(q => q.topic === 'Agents' && !questionsAnswered.has(q.id)).length,
      total: QUIZ_DATA.filter(q => q.topic === 'Agents').length,
      color: '#34A853' // Google Green
    },
    {
      topic: 'Tools',
      correct: QUIZ_DATA.filter(q => q.topic === 'Tools' && correctAnsweredIds.has(q.id)).length,
      wrong: QUIZ_DATA.filter(q => q.topic === 'Tools' && questionsAnswered.has(q.id) && !correctAnsweredIds.has(q.id)).length,
      unanswered: QUIZ_DATA.filter(q => q.topic === 'Tools' && !questionsAnswered.has(q.id)).length,
      total: QUIZ_DATA.filter(q => q.topic === 'Tools').length,
      color: '#FBBC04' // Google Yellow
    },
  ];

  useEffect(() => {
    if (!activeQuestion || !frontData || !backData) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      // Numeric keys 1-4 for picking answer on front side
      if (!isFlipped && !isTransitioning) {
        if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
          const optionIndex = parseInt(e.key, 10) - 1;
          if (optionIndex < frontData.options.length) {
            handleAnswerClick(frontData.options[optionIndex]);
          }
        }
      }

      // Arrow key logic
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (isFlipped) {
          // On back, flip to front
          playSound('click', soundEnabled);
          setIsFlipped(false);
          triggerHaptic('flip', hapticsEnabled);
        } else if (!isFlipped && !isTransitioning && activeQuestion > 1) {
          // On front, go to previous question
          handlePreviousQuestion();
        }
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isFlipped && !isTransitioning) {
          // On front, only flip to back if already answered
          if (questionsAnswered.has(activeQuestion)) {
            playSound('click', soundEnabled);
            setIsFlipped(true);
            triggerHaptic('flip', hapticsEnabled);
          }
        } else if (isFlipped && !isTransitioning) {
          // On back, go to next question
          handleNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    activeQuestion,
    isFlipped,
    frontData,
    backData,
    isTransitioning,
    questionsAnswered,
    soundEnabled,
    handleAnswerClick,
    handleNextQuestion,
    handlePreviousQuestion
  ]);

  const completionPercentage = QUIZ_DATA.length > 0
    ? Math.round((questionsAnswered.size / QUIZ_DATA.length) * 100)
    : 0;

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-start bg-white iso-grid pt-12 pb-6">
      {/* Global Persistent Progress Bar */}
      <div 
        id="global-progress-bar-container"
        className="fixed top-0 left-0 right-0 w-full h-1.5 bg-slate-100 z-50 flex"
        role="progressbar"
        aria-valuenow={completionPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        title={`Quiz Completion: ${completionPercentage}%`}
      >
        <div 
          id="global-progress-bar"
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 transition-all duration-300 ease-out"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      {/* Onboarding Experience Selector Gate */}
      <AnimatePresence>
        {experienceLevel === null && (
          <motion.div
            id="experience-onboarding-gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-150 flex flex-col text-center z-50"
            >
              <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100/50">
                <img src={geminiLogo} alt="Gemini Logo" className="w-8 h-8 animate-pulse animate-duration-1500" />
              </div>
              
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight select-none">
                How's your AI knowledge?
              </h2>
              <p className="mt-1.5 text-sm text-slate-500 max-w-sm mx-auto leading-relaxed select-none">
                Choose an Experience Level to personalize the quiz. This filters the questions to prioritize your choice.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                {/* Novice Option */}
                <button
                  onClick={() => handleSelectExperience('Novice')}
                  className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-green-500 hover:bg-green-50/10 transition-all flex items-start gap-3.5 cursor-pointer group hover:-translate-y-0.5 active:scale-[0.99]"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center font-bold text-lg border border-green-100 select-none shrink-0 group-hover:scale-105 transition-transform">
                    🌱
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-green-600 transition-colors flex items-center gap-2 text-sm select-none">
                      Novice
                      <span className="px-1.5 py-0.5 bg-green-100 text-green-700 border border-green-200/50 rounded text-[8px] font-bold tracking-wide uppercase">Easy & Med</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-normal select-none">
                      Focuses on fundamental consumer announcements and features from Google I/O.
                    </p>
                  </div>
                </button>

                {/* Pro Option */}
                <button
                  onClick={() => handleSelectExperience('Pro')}
                  className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/10 transition-all flex items-start gap-3.5 cursor-pointer group hover:-translate-y-0.5 active:scale-[0.99]"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-lg border border-rose-100 select-none shrink-0 group-hover:scale-105 transition-transform">
                    🚀
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors flex items-center gap-2 text-sm select-none">
                      Pro
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 border border-amber-200/50 rounded text-[8px] font-bold tracking-wide uppercase">Med & Hard</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-normal select-none">
                      For seasoned developers and AI aficionados. Emphasizes agents, architectures, and developer systems.
                    </p>
                  </div>
                </button>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-medium leading-relaxed select-none">
                You can change this or select "All Levels" any time from the dashboard filters.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score Keeper Banner */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative mx-auto mb-6 md:fixed md:top-6 md:right-6 md:z-40 md:m-0 bg-white/85 backdrop-blur-md px-5 py-2 rounded-full border border-slate-100 shadow-xl flex items-center gap-4 md:gap-5"
      >
        <div className="flex flex-col text-center md:text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Progress</span>
          <span className="text-sm font-black text-slate-800">
            {questionsAnswered.size} / {QUIZ_DATA.length}
          </span>
        </div>
        <div className="h-8 w-[1px] bg-slate-100" />
        <div className="flex flex-col text-center md:text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Stats</span>
          <span className="text-sm font-black text-slate-800">
            {score} / {QUIZ_DATA.length} Correct
          </span>
        </div>
        <div className="h-8 w-[1px] bg-slate-100" />
        <div className="flex flex-col text-center md:text-left relative">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Streak</span>
          <div className="flex items-center gap-1 select-none">
            <span className={`text-sm font-black transition-all ${currentStreak > 0 ? 'text-amber-500 scale-105 filter drop-shadow-[0_0_2px_rgba(245,158,11,0.2)] animate-pulse' : 'text-slate-400'}`}>
              🔥 {currentStreak}
            </span>
            {bestStreak > 0 && (
              <span className="text-[9px] font-bold text-slate-400 font-mono">
                (Max: {bestStreak})
              </span>
            )}
          </div>

          {/* New Streak Record Celebration Pop */}
          <AnimatePresence>
            {streakCelebration && (
              <motion.div
                initial={{ opacity: 0, scale: 0.4, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: -28 }}
                exit={{ opacity: 0, scale: 0.8, y: -45 }}
                className="absolute left-1/2 -translate-x-1/2 -top-12 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-[9px] px-2.5 py-1 rounded-full whitespace-nowrap shadow-lg z-50 flex items-center gap-1 border border-amber-300 tracking-wider uppercase"
              >
                <Sparkles className="w-2.5 h-2.5 text-yellow-200 animate-spin" />
                New Record!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="h-8 w-[1px] bg-slate-100" />
        <div className="flex items-center gap-2">
          <Timer className={`w-4 h-4 shrink-0 transition-all ${
            timeLeft <= 20 && timerActive 
              ? 'text-rose-500 animate-bounce' 
              : timerActive 
                ? 'text-blue-500 animate-pulse' 
                : 'text-slate-300'
          }`} />
          <div className="flex flex-col text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Time Left</span>
            <span className={`text-sm font-black font-mono transition-colors ${
              timeLeft <= 20 && timerActive 
                ? 'text-rose-600 font-extrabold' 
                : timerActive 
                  ? 'text-slate-800' 
                  : 'text-slate-400'
            }`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        <div className="h-8 w-[1px] bg-slate-100" />
        <button
          onClick={toggleSound}
          id="sound-toggle-btn"
          className={`flex items-center justify-center p-1.5 rounded-full transition-all group cursor-pointer ${
            soundEnabled 
              ? 'bg-slate-50 hover:bg-blue-50 text-blue-600 hover:text-blue-700' 
              : 'bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600'
          }`}
          title={soundEnabled ? "Mute Sounds" : "Enable Sounds"}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 transition-transform group-hover:scale-110" />
          ) : (
            <VolumeX className="w-4 h-4 transition-transform group-hover:scale-110" />
          )}
        </button>
        <button
          onClick={toggleMusic}
          id="music-toggle-btn"
          className={`flex items-center justify-center p-1.5 rounded-full transition-all group cursor-pointer ${
            musicEnabled 
              ? 'bg-slate-50 hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700' 
              : 'bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600'
          }`}
          title={musicEnabled ? "Mute Music" : "Enable Music"}
        >
          <Music className={`w-4 h-4 transition-transform group-hover:scale-110 ${musicEnabled && timerActive && !showFinalScore ? 'animate-pulse' : ''}`} />
        </button>
        <button
          onClick={toggleHaptics}
          id="haptics-toggle-btn"
          className={`flex items-center justify-center p-1.5 rounded-full transition-all group cursor-pointer ${
            hapticsEnabled 
              ? 'bg-slate-50 hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700' 
              : 'bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600'
          }`}
          title={hapticsEnabled ? "Disable Haptics" : "Enable Haptics"}
        >
          <Smartphone className={`w-4 h-4 transition-transform group-hover:scale-110 ${hapticsEnabled ? 'animate-pulse' : ''}`} />
        </button>
      </motion.div>

      {/* Hero Content */}
      <div className="text-center z-10 mb-4 flex flex-col items-center px-4">
        <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 mb-2 uppercase">
          Google I/O 2026: Pop Quiz
        </h1>
        <p className="text-slate-500 font-medium">
          Click each icon to test your knowledge of our <a href="https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">I/O announcements</a> about new Gemini models, Search updates and more.
        </p>
      </div>

      {/* Hero Collection Image - Moved above icons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative w-full max-w-4xl mb-0 flex justify-center z-10"
      >
        <div className="relative w-full">
          <img 
            src={heroImage} 
            alt="Google I/O Collection Hero" 
            className="w-full h-auto" 
          />
          {/* Fade effect to blend into the white background on both ends */}
          <div className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-white to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-white to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Category / Topic / Experience Filters */}
      <div className="flex flex-col items-center gap-3.5 md:gap-4 z-10 mb-2 mt-4 w-full max-w-2xl px-4 animate-fade-in select-none">
        {/* Simple Stats Dashboard */}
        {!activeQuestion && !showFinalScore && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="w-full max-w-lg bg-white/70 backdrop-blur-md border border-slate-150 rounded-2xl p-4 grid grid-cols-3 divide-x divide-slate-200 z-10 select-none shadow-xs mb-2"
          >
            <div className="flex flex-col items-center text-center px-1">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1">
                <Crown size={11} className="text-amber-500 animate-pulse animate-duration-3000" />
                Completed
              </span>
              <span className="text-xs md:text-sm font-black text-slate-800 font-sans truncate">
                {lifetimeCompletions} {lifetimeCompletions === 1 ? 'Quiz' : 'Quizzes'}
              </span>
            </div>
            <div className="flex flex-col items-center text-center px-1">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1 font-sans">
                <Zap size={11} className="text-orange-500 animate-bounce animate-duration-1500" />
                Max Streak
              </span>
              <span className="text-xs md:text-sm font-black text-slate-800 font-sans">
                🔥 {bestStreak} {bestStreak === 1 ? 'Ans' : 'Ans'}
              </span>
            </div>
            <div className="flex flex-col items-center text-center px-1">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1 font-sans">
                <Trophy size={11} className="text-yellow-500 animate-pulse animate-duration-2500" />
                Best Score
              </span>
              <span className="text-xs md:text-sm font-black text-slate-800 font-sans">
                ⭐ {bestScore} / {QUIZ_DATA.length}
              </span>
            </div>
          </motion.div>
        )}

        {/* Experience Level Selector on Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3"
        >
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1 select-none">
            Experience Level:
          </span>
          {[
            { key: 'All', label: 'All Levels', desc: 'Show all 11 questions', activeBg: 'bg-slate-900 border-slate-900 text-white shadow-md', inactiveBg: 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' },
            { key: 'Novice', label: '🌱 Novice', desc: 'Prioritizes Easy & Medium questions', activeBg: 'bg-green-600 border-green-600 text-white shadow-md shadow-green-100', inactiveBg: 'bg-white border-slate-200 text-slate-600 hover:bg-green-50/50 hover:border-green-200 hover:text-green-600' },
            { key: 'Pro', label: '🚀 Pro', desc: 'Prioritizes Medium & Hard questions', activeBg: 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100', inactiveBg: 'bg-white border-slate-200 text-slate-600 hover:bg-indigo-50/50 hover:border-indigo-200 hover:text-indigo-600' }
          ].map((level) => {
            const isActive = (level.key === 'All' && experienceLevel === null) || experienceLevel === level.key;
            return (
              <button
                key={level.key}
                onClick={() => {
                  playSound('click', soundEnabled);
                  if (level.key === 'All') {
                    handleSelectExperience(null);
                  } else {
                    handleSelectExperience(level.key as any);
                  }
                }}
                className={`px-3.5 py-1 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                  isActive ? level.activeBg : level.inactiveBg
                }`}
                title={level.desc}
              >
                <span>{level.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Difficulty Filter Selector on Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3"
        >
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1 select-none">
            Difficulty Filter:
          </span>
          {[
            { key: 'All', label: 'All', count: QUIZ_DATA.length, activeBg: 'bg-slate-900 border-slate-900 text-white shadow-md', inactiveBg: 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' },
            { key: 'Easy', label: '🟢 Easy', count: QUIZ_DATA.filter(q => q.difficulty === 'Easy').length, activeBg: 'bg-green-600 border-green-600 text-white shadow-md shadow-green-100', inactiveBg: 'bg-white border-slate-200 text-slate-600 hover:bg-green-50/50 hover:border-green-200 hover:text-green-600' },
            { key: 'Medium', label: '🟡 Medium', count: QUIZ_DATA.filter(q => q.difficulty === 'Medium').length, activeBg: 'bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-100', inactiveBg: 'bg-white border-slate-200 text-slate-600 hover:bg-amber-50/50 hover:border-amber-200 hover:text-amber-550 hover:text-amber-600' },
            { key: 'Hard', label: '🔴 Hard', count: QUIZ_DATA.filter(q => q.difficulty === 'Hard').length, activeBg: 'bg-rose-600 border-rose-600 text-white shadow-md shadow-rose-100', inactiveBg: 'bg-white border-slate-200 text-slate-600 hover:bg-rose-50/50 hover:border-rose-200 hover:text-rose-600' }
          ].map((df) => {
            const isActive = selectedDifficulty === df.key;
            return (
              <button
                key={df.key}
                onClick={() => handleSelectDifficulty(df.key as any)}
                className={`px-3.5 py-1 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                  isActive ? df.activeBg : df.inactiveBg
                }`}
              >
                <span>{df.label}</span>
                <span className={`text-[10px] py-0.5 px-1.5 rounded-full font-mono transition-colors ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {df.count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Category / Topic Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3"
        >
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1 select-none">
            Topic Filter:
          </span>
          {[
            { key: 'All', label: 'All Topics', count: QUIZ_DATA.length, activeBg: 'bg-slate-900 border-slate-900 text-white shadow-md', inactiveBg: 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' },
            { key: 'Models', label: 'Models', count: QUIZ_DATA.filter(q => q.topic === 'Models').length, activeBg: 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100', inactiveBg: 'bg-white border-slate-200 text-slate-600 hover:bg-blue-50/50 hover:border-blue-200 hover:text-blue-600' },
            { key: 'Agents', label: 'Agents', count: QUIZ_DATA.filter(q => q.topic === 'Agents').length, activeBg: 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-100', inactiveBg: 'bg-white border-slate-200 text-slate-600 hover:bg-emerald-50/50 hover:border-emerald-200 hover:text-emerald-600' },
            { key: 'Tools', label: 'Tools', count: QUIZ_DATA.filter(q => q.topic === 'Tools').length, activeBg: 'bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-100', inactiveBg: 'bg-white border-slate-200 text-slate-600 hover:bg-amber-50/50 hover:border-amber-200 hover:text-amber-500 hover:text-amber-600' }
          ].map((filter) => {
            const isActive = selectedTopic === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => {
                  playSound('click', soundEnabled);
                  setSelectedTopic(filter.key as any);
                }}
                className={`px-3.5 py-1 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                  isActive ? filter.activeBg : filter.inactiveBg
                }`}
              >
                <span>{filter.label}</span>
                <span className={`text-[10px] py-0.5 px-1.5 rounded-full font-mono transition-colors ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {filter.count}
                </span>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Main Hotspot Canvas - Dynamic layouts depending on filter */}
      <div className="flex flex-col items-center justify-center gap-6 px-4 md:px-10 w-full max-w-7xl relative z-10 py-6 min-h-[300px]">
        {/* Row 1 */}
        {row1.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-6 w-full">
            {row1.map((item) => (
              <motion.button
                key={item.id}
                id={`hotspot-${item.id}`}
                onClick={() => handleHotspotClick(item.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.id * 0.1 }}
                className={`flex flex-col items-center justify-center group cursor-pointer flex-shrink-0 ${item.animation}`}
              >
                {/* The 3D Container */}
                <div className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-5 transform transition-transform relative">
                  <GradientNumber value={item.id} gradientId={item.gradient} size={48} />
                  {questionsAnswered.has(item.id) && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </div>
                  )}
                </div>
                
                {/* Label */}
                <div className="mt-4 text-center">
                  <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 group-hover:text-slate-800 transition-colors whitespace-pre-line">
                    {item.title}
                  </span>
                  <div className="flex items-center justify-center gap-1.5 mt-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider font-sans border select-none ${
                      item.topic === 'Models'
                        ? 'bg-blue-50 border-blue-100 text-blue-500'
                        : item.topic === 'Agents'
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-500'
                          : 'bg-amber-50 border-amber-100 text-amber-500'
                    }`}>
                      {item.topic}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider font-sans border select-none ${
                      item.difficulty === 'Easy'
                        ? 'bg-green-50 border-green-100 text-green-600'
                        : item.difficulty === 'Medium'
                          ? 'bg-amber-50 border-amber-100 text-amber-600'
                          : 'bg-rose-50 border-rose-100 text-rose-600'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center">
            <span className="text-sm font-bold text-slate-400 animate-pulse">No questions found for this topic</span>
          </div>
        )}

        {/* Row 2 */}
        {row2.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-6 w-full border-t border-slate-50/50 pt-4">
            {row2.map((item) => (
              <motion.button
                key={item.id}
                id={`hotspot-${item.id}`}
                onClick={() => handleHotspotClick(item.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.id * 0.1 }}
                className={`flex flex-col items-center justify-center group cursor-pointer flex-shrink-0 ${item.animation}`}
              >
                {/* The 3D Container */}
                <div className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-5 transform transition-transform relative">
                  <GradientNumber value={item.id} gradientId={item.gradient} size={48} />
                  {questionsAnswered.has(item.id) && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </div>
                  )}
                </div>
                
                {/* Label */}
                <div className="mt-4 text-center">
                  <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 group-hover:text-slate-800 transition-colors whitespace-pre-line">
                    {item.title}
                  </span>
                  <div className="flex items-center justify-center gap-1.5 mt-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider font-sans border select-none ${
                      item.topic === 'Models'
                        ? 'bg-blue-50 border-blue-100 text-blue-500'
                        : item.topic === 'Agents'
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-500'
                          : 'bg-amber-50 border-amber-100 text-amber-500'
                    }`}>
                      {item.topic}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider font-sans border select-none ${
                      item.difficulty === 'Easy'
                        ? 'bg-green-50 border-green-100 text-green-600'
                        : item.difficulty === 'Medium'
                          ? 'bg-amber-50 border-amber-100 text-amber-600'
                          : 'bg-rose-50 border-rose-100 text-rose-600'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Gemini Logo at bottom */}
      {!activeQuestion && !showFinalScore && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 mb-4 flex flex-col items-center"
        >
          <img src={geminiLogo} alt="Gemini Logo" className="w-12 h-auto" />
        </motion.div>
      )}

      {/* Final Score Modal */}
      <AnimatePresence>
        {showFinalScore && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFinalScore(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4"
          >
            {/* Falling Emojis Full Screen Waterfall container */}
            <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
              {fallingEmojis.map((emojiObj) => (
                <motion.div
                  key={emojiObj.id}
                  initial={{ 
                    y: '-10vh', 
                    x: `${emojiObj.x}vw`, 
                    scale: emojiObj.scale, 
                    rotate: emojiObj.rotation,
                    opacity: 0
                  }}
                  animate={{ 
                    opacity: [0, 1, 1, 0], // fades in, stays visible, fades out near bottom
                    y: '110vh',
                    rotate: emojiObj.rotation + (emojiObj.id % 2 === 0 ? 360 : -360)
                  }}
                  transition={{
                    duration: emojiObj.duration,
                    delay: emojiObj.delay,
                    ease: "linear",
                  }}
                  className="absolute text-4xl select-none android-emoji"
                  style={{ left: 0, top: 0 }}
                >
                  {emojiObj.emoji}
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[40px] shadow-2xl p-6 md:p-10 max-w-4xl w-full text-center md:text-left border border-slate-100 flex flex-col relative overflow-y-auto max-h-[92vh] z-20"
            >
              {/* Close X Button */}
              <button 
                onClick={() => setShowFinalScore(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors z-20"
              >
                <X size={24} className="text-slate-400" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-4">
                {/* Left Side: Score & Retake */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 uppercase tracking-tighter mt-4 relative z-10 w-full">
                    {isTimeUp ? "⏰ Time's Up!" : "Your Final Score"}
                  </h2>
                  <p className="text-slate-500 font-medium mb-6 relative z-10">
                    {isTimeUp 
                      ? `The countdown expired! You answered ${questionsAnswered.size} questions and got ${score} correct.` 
                      : `You correctly answered ${score} out of ${QUIZ_DATA.length} Google I/O questions!`}
                  </p>

                  {/* Circular/Visual Display for overall score */}
                  <div className="relative flex items-center justify-center mb-8 bg-slate-50 border border-slate-100 h-32 w-32 md:h-36 md:w-36 rounded-full shadow-inner mx-auto md:mx-0">
                    <div className="text-center">
                      <span className="text-4xl md:text-5xl font-black text-slate-900">
                        {Math.round((score / QUIZ_DATA.length) * 100)}%
                      </span>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        Success Rate
                      </span>
                    </div>
                  </div>
                  
                  {/* High Score Celebration Badge */}
                  {isNewHighScore && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="mb-6 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl flex items-center gap-2.5 shadow-md w-full max-w-sm select-none animate-bounce inline-flex"
                    >
                      <Crown size={18} className="text-white fill-white shrink-0 animate-pulse" />
                      <div className="text-left font-sans">
                        <span className="block text-[9px] font-extrabold uppercase tracking-widest text-amber-100 leading-none">New Personal Best!</span>
                        <span className="text-xs font-black block mt-0.5 leading-tight">All-Time High Score Smashed!</span>
                      </div>
                    </motion.div>
                  )}

                  <div className="w-full space-y-3 relative z-10">
                    <button 
                      id="share-score-button"
                      onClick={handleShareScore}
                      className={`w-full py-4 font-bold rounded-2xl transition-all uppercase tracking-widest text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm border ${
                        copied 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-250 animate-pulse' 
                          : 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check size={16} />
                          Copied Score Summary!
                        </>
                      ) : (
                        <>
                          <Share2 size={16} />
                          Share Score
                        </>
                      )}
                    </button>
                    <a 
                      href={getEmailShareUrl()}
                      onClick={() => {
                        playSound('click', soundEnabled);
                        triggerHaptic('tap', hapticsEnabled);
                      }}
                      className="w-full py-4 bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 font-bold rounded-2xl transition-all uppercase tracking-widest text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Mail size={16} />
                      Email Score
                    </a>
                    <a 
                      href="https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-collection/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors uppercase tracking-widest text-xs tracking-wider flex items-center justify-center gap-2"
                    >
                      Even more about I/O 2026 <ExternalLink size={16} />
                    </a>
                    <button 
                      onClick={resetQuiz}
                      className="w-full py-4 bg-white text-slate-900 border-2 border-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-colors uppercase tracking-widest text-xs tracking-wider cursor-pointer"
                    >
                      Retake Quiz
                    </button>
                  </div>
                </div>

                {/* Right Side: Recharts Progress Overview Custom Area */}
                <div className="w-full bg-slate-50/50 rounded-3xl p-6 border border-slate-100 flex flex-col">
                  <h3 className="text-lg font-black text-slate-800 mb-1 uppercase tracking-tight">Progress Overview</h3>
                  <p className="text-xs text-slate-400 font-semibold mb-3 uppercase tracking-wider">Performance by Topic</p>

                  {/* Strongest Topic Highlight Badge */}
                  {(() => {
                    const sortedTopics = [...chartData]
                      .map(data => ({
                        ...data,
                        accuracy: data.total > 0 ? (data.correct / data.total) * 100 : 0
                      }))
                      .sort((a, b) => b.accuracy - a.accuracy || b.correct - a.correct);
                    
                    const strongest = sortedTopics[0];
                    const hasCorrect = strongest && strongest.correct > 0;

                    let title = "Systems Pathfinder";
                    let prefix = "Explorer";
                    let colorClass = "from-slate-50 to-slate-100 text-slate-700 border-slate-200";
                    let badgeColor = "bg-slate-500 text-white";

                    if (hasCorrect) {
                      if (strongest.topic === 'Models') {
                        title = "Master of Models";
                        prefix = "Neural Architect";
                        colorClass = "from-blue-50/80 to-indigo-50/50 text-indigo-950 border-blue-200";
                        badgeColor = "bg-blue-600 text-white animate-pulse";
                      } else if (strongest.topic === 'Agents') {
                        title = "Master of Agents";
                        prefix = "Orchestration Wizard";
                        colorClass = "from-emerald-50/80 to-teal-50/50 text-emerald-950 border-emerald-200";
                        badgeColor = "bg-emerald-600 text-white animate-pulse";
                      } else if (strongest.topic === 'Tools') {
                        title = "Master of Tools";
                        prefix = "Function Maestro";
                        colorClass = "from-amber-50/80 to-yellow-50/55 text-amber-950 border-amber-200";
                        badgeColor = "bg-amber-600 text-white animate-pulse";
                      }
                    }

                    return (
                      <div className={`mb-5 p-3.5 rounded-2xl border bg-gradient-to-r ${colorClass} flex items-center gap-3 shadow-sm select-none`}>
                        <div className={`p-2 rounded-xl ${badgeColor} shadow-inner flex items-center justify-center shrink-0`}>
                          {strongest.topic === 'Models' && hasCorrect ? (
                            <Sparkles className="w-4 h-4" />
                          ) : strongest.topic === 'Agents' && hasCorrect ? (
                            <Crown className="w-4 h-4" />
                          ) : strongest.topic === 'Tools' && hasCorrect ? (
                            <Zap className="w-4 h-4" />
                          ) : (
                            <Award className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex flex-col text-left min-w-0">
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                            Strongest Domain • {prefix}
                          </span>
                          <span className="text-xs md:text-sm font-black tracking-tight mt-0.5 flex items-center gap-1.5 text-slate-900 truncate">
                            {title}
                            <span className="text-[10px] font-bold text-indigo-600 font-mono">
                              ({Math.round(strongest.accuracy)}% Accuracy)
                            </span>
                          </span>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="w-full h-[180px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={chartData}
                        margin={{ top: 0, right: 10, left: -20, bottom: 0 }}
                      >
                        <XAxis type="number" domain={[0, 4]} hide />
                        <YAxis dataKey="topic" type="category" stroke="#64748b" fontSize={11} fontWeight={700} width={70} axisLine={false} tickLine={false} />
                        <Tooltip 
                          cursor={{ fill: 'rgba(0, 0, 0, 0.02)', radius: 8 }}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white border border-slate-100 p-3 rounded-2xl shadow-xl text-left text-xs">
                                  <span className="font-bold text-slate-800 block mb-1.5">{data.topic}</span>
                                  <div className="space-y-1 font-semibold text-slate-500 font-sans">
                                    <div className="flex items-center justify-between gap-6">
                                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.color }} /> Correct:</span>
                                      <span className="font-bold text-slate-800">{data.correct} / {data.total}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-6">
                                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-450" style={{ backgroundColor: '#f43f5e' }} /> Wrong:</span>
                                      <span className="font-bold text-slate-800">{data.wrong}</span>
                                    </div>
                                    {data.unanswered > 0 && (
                                      <div className="flex items-center justify-between gap-6">
                                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-350" style={{ backgroundColor: '#cbd5e1' }} /> Unanswered:</span>
                                        <span className="font-bold text-slate-800">{data.unanswered}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                         <Bar 
                          dataKey="correct" 
                          radius={8} 
                          background={{ fill: '#e2e8f0', radius: 8 }} 
                          barSize={16}
                          style={{ cursor: 'pointer' }}
                        >
                          {chartData.map((entry, index) => {
                            const isSelected = selectedResultsTopic === entry.topic;
                            return (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={isSelected ? '#1e293b' : entry.color} 
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  playSound('click', soundEnabled);
                                  triggerHaptic('tap', hapticsEnabled);
                                  setSelectedResultsTopic(prev => prev === entry.topic ? null : entry.topic as any);
                                }}
                              />
                            );
                          })}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Custom Legend / Category Details List */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100">
                    {chartData.map((data) => {
                      const isSelected = selectedResultsTopic === data.topic;
                      return (
                        <button
                          key={data.topic}
                          onClick={() => {
                            playSound('click', soundEnabled);
                            triggerHaptic('tap', hapticsEnabled);
                            setSelectedResultsTopic(prev => prev === data.topic ? null : data.topic as any);
                          }}
                          className={`flex flex-col items-center text-center p-2 rounded-2xl border transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-slate-900 border-slate-900 text-white shadow-md scale-105 animate-duration-300' 
                              : 'bg-white border-slate-150 text-slate-700 hover:bg-slate-50 hover:border-slate-200 active:scale-95'
                          }`}
                        >
                          <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 justify-center ${
                            isSelected ? 'text-slate-200' : 'text-slate-400'
                          }`}>
                            <span className="w-2 h-2 rounded-full shrink-0 shadow-inner" style={{ backgroundColor: data.color }} />
                            {data.topic}
                          </span>
                          <span className={`text-sm font-black mt-1 ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                            {data.correct} / {data.total}
                          </span>
                          <span className={`text-[9.5px]/none font-bold mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                            {data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0}% Acc
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Missed Questions Category Viewer */}
                  <AnimatePresence mode="wait">
                    {selectedResultsTopic && (() => {
                      const missed = QUIZ_DATA.filter(q => 
                        q.topic === selectedResultsTopic && 
                        !correctAnsweredIds.has(q.id)
                      );

                      return (
                        <motion.div
                          id="missed-questions-section"
                          key={selectedResultsTopic}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 pt-4 border-t border-slate-150 overflow-hidden flex flex-col align-stretch text-left w-full"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs font-black text-slate-700 uppercase tracking-tight flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                              Missed in {selectedResultsTopic} ({missed.length})
                            </h4>
                            <button
                              onClick={() => {
                                playSound('click', soundEnabled);
                                triggerHaptic('tap', hapticsEnabled);
                                setSelectedResultsTopic(null);
                              }}
                              className="text-[9px] font-black text-indigo-600 hover:text-indigo-850 uppercase tracking-widest cursor-pointer px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
                            >
                              Clear
                            </button>
                          </div>

                          {missed.length === 0 ? (
                            <div className="bg-emerald-50/65 border border-emerald-100/80 rounded-2xl p-4 text-center select-none flex flex-col items-center gap-1">
                              <span className="text-xl">🏆</span>
                              <span className="text-xs font-black text-emerald-800 leading-tight">Mastery Achieved!</span>
                              <span className="text-[10px] font-medium text-emerald-600">You got every question correct in this topic.</span>
                            </div>
                          ) : (
                            <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1.5 scrollbar-thin">
                              {missed.map((q) => {
                                const wasAnswered = questionsAnswered.has(q.id);
                                return (
                                  <div key={q.id} className="p-3 bg-white border border-slate-150 rounded-2xl shadow-xs text-left text-xs flex flex-col items-start gap-1">
                                    <div className="flex items-center justify-between w-full gap-2">
                                      <span className="font-extrabold font-mono text-[9px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full uppercase leading-none">
                                        Q{q.id}
                                      </span>
                                      <span className={`text-[9px] font-extrabold uppercase leading-none px-1.5 py-0.5 rounded-full ${
                                        wasAnswered ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'
                                      }`}>
                                        {wasAnswered ? '❌ Wrong Answer' : '⏳ Unanswered'}
                                      </span>
                                    </div>
                                    <p className="font-black text-slate-800 leading-tight mt-1 select-text">
                                      {q.question}
                                    </p>
                                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-2 w-full mt-1">
                                      <span className="text-[9px] font-extrabold uppercase text-slate-400 block tracking-wider leading-none">Correct Answer</span>
                                      <span className="font-bold text-emerald-700 text-[11px] mt-1 block leading-tight select-text">
                                        {q.correctAnswer}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>

                  {!selectedResultsTopic && (
                    <p className="text-[10px] font-bold text-center text-slate-400 mt-5 uppercase tracking-wider select-none animate-pulse">
                      💡 Click a topic or legend bar/button to view missed questions
                    </p>
                  )}
                </div>
              </div>

              {/* Personalized Dynamic Performance Summary Box */}
              {(() => {
                const currentUserEntry = leaderboard?.find((p: any) => p.isCurrentUser);
                const userRank = currentUserEntry ? currentUserEntry.rank : null;
                
                // Helper to get custom summary details
                const getPersonalizedSummary = (userScore: number, total: number, rank: number | null) => {
                  const percent = Math.round((userScore / total) * 100);
                  
                  if (rank === 1 || percent === 100) {
                    return {
                      title: "Rank #1: Top 1% Global AI Mastermind",
                      description: "Sensational deployment! You have achieved supreme command of Google's 2026 developer ecosystem—from multi-modal Gemini 2.0 architectures to serverless Firestore scaling.",
                      badge: "Neural Architect",
                      bgColor: "from-amber-50/90 to-amber-100/30 border-amber-200 text-amber-900",
                      badgeBg: "bg-amber-600 text-white",
                    };
                  } else if (rank !== null && rank <= 3) {
                    return {
                      title: `Rank #${rank}: Top 3% Lead Developer`,
                      description: "Outstanding execution! You have secured an elite placement on the global leaderboard. Your neural parameters are exceptionally aligned.",
                      badge: "Principal Engineer",
                      bgColor: "from-indigo-50/95 to-indigo-100/30 border-indigo-200 text-indigo-900",
                      badgeBg: "bg-indigo-600 text-white",
                    };
                  } else if (percent >= 85) {
                    return {
                      title: "Top 10% Global AI Developer",
                      description: "Excellent output! Your deep familiarity with Gemini multi-agent systems and Web Audio APIs places you in the upper echelons of the community.",
                      badge: "Systems Architect",
                      bgColor: "from-emerald-50/95 to-emerald-100/30 border-emerald-200 text-emerald-950",
                      badgeBg: "bg-emerald-600 text-white",
                    };
                  } else if (percent >= 60) {
                    return {
                      title: "Top 25% Developer Innovator",
                      description: "A highly optimized baseline! You have demonstrated great command of Google's core I/O 2026 concepts and tooling. Keep building and scaling!",
                      badge: "Senior Builder",
                      bgColor: "from-blue-50/95 to-blue-100/30 border-blue-200 text-blue-900",
                      badgeBg: "bg-blue-600 text-white",
                    };
                  } else if (percent >= 40) {
                    return {
                      title: "Top 50% Tech Enthusiast",
                      description: "Solid parameters! You're navigating the search space effectively. With some additional prompt tuning, you will easily break into the next performance tier.",
                      badge: "Full-Stack Developer",
                      bgColor: "from-slate-50/95 to-slate-100/30 border-slate-200 text-slate-800",
                      badgeBg: "bg-slate-600 text-white",
                    };
                  } else {
                    return {
                      title: "Climbing the Developer Spectrum",
                      description: "You've successfully initiated your neural journey! Continue training your models and experimenting with Gemini live frameworks to rise up the scales.",
                      badge: "Trainee Promptsmith",
                      bgColor: "from-slate-50/95 to-slate-105/30 border-slate-200 text-slate-700",
                      badgeBg: "bg-slate-500 text-white",
                    };
                  }
                };

                const summary = getPersonalizedSummary(score, QUIZ_DATA.length, userRank);

                return (
                  <motion.div
                    id="personalized-summary-box"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`mt-6 p-5 rounded-3xl bg-gradient-to-br ${summary.bgColor} border flex flex-col md:flex-row items-start gap-4 shadow-sm select-none`}
                  >
                    <div className="flex flex-col items-start gap-2 w-full text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${summary.badgeBg} shadow-sm leading-none`}>
                          {summary.badge}
                        </span>
                        <span className="text-xs font-black text-slate-300 select-none">•</span>
                        <span className="text-[10px] font-bold font-mono tracking-tight text-slate-400 uppercase flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" /> Calculated Rank Placement
                        </span>
                      </div>
                      <h4 className="text-lg md:text-xl font-black tracking-tight mt-1 text-slate-900 leading-tight">
                        {summary.title}
                      </h4>
                      <p className="text-xs md:text-sm font-medium mt-1 text-slate-600 leading-relaxed font-sans max-w-3xl">
                        {summary.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })()}

              {/* Simulated Global Leaderboard */}
              <div id="leaderboard-section" className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-stretch text-left w-full">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                      <Trophy className="text-amber-500 w-5 h-5" /> 
                      Global I/O '26 Leaderboard
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      Simulated dynamically by Gemini 3.5 Flash based on actual score distributions.
                    </p>
                  </div>

                  {/* Username Submission Input */}
                  <div className="flex items-center gap-2 w-full md:w-auto max-w-sm">
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => {
                        const val = e.target.value;
                        setUserName(val);
                        localStorage.setItem('io_quiz_username', val);
                      }}
                      placeholder="Add handle (e.g. Vikas_Dev)..."
                      className="grow px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-800 placeholder-slate-400 font-sans"
                    />
                    <button
                      onClick={() => fetchLeaderboard()}
                      disabled={leaderboardLoading}
                      className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-1.5 px-3 rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-sm font-sans font-sans"
                    >
                      {leaderboardLoading ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        "Join"
                      )}
                    </button>
                  </div>
                </div>

                {leaderboardLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-3">
                    <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
                    <span className="text-xs font-bold uppercase tracking-wider animate-pulse font-sans">Consulting Gemini's Leaderboard...</span>
                  </div>
                ) : leaderboardError ? (
                  <div className="text-center py-10 border border-red-50 bg-red-50/20 rounded-2xl">
                    <p className="text-xs font-bold text-rose-500">{leaderboardError}</p>
                    <button 
                      onClick={() => fetchLeaderboard()}
                      className="mt-2 text-xs font-black underline text-indigo-600 hover:text-indigo-700 cursor-pointer font-sans"
                    >
                      Retry Generation
                    </button>
                  </div>
                ) : leaderboard && leaderboard.length > 0 ? (
                  <div className="bg-slate-50/50 border border-slate-100 rounded-3xl overflow-hidden shadow-inner">
                    <div className="grid grid-cols-12 gap-3 px-4 py-2 bg-slate-100/60 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none font-sans">
                      <span className="col-span-2 text-center">Rank</span>
                      <span className="col-span-4 pl-1">Handle</span>
                      <span className="col-span-4 pl-1">Vibe & Status</span>
                      <span className="col-span-2 text-center">Correct</span>
                    </div>

                    <div className="divide-y divide-slate-100/80">
                      {leaderboard.map((player: any, idx: number) => {
                        const isUser = player.isCurrentUser;
                        return (
                          <motion.div
                            key={`${player.name}-${idx}`}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.04 }}
                            className={`grid grid-cols-12 gap-3 items-center px-4 py-3 text-xs transition-colors ${
                              isUser 
                                ? 'bg-indigo-50/80 font-bold text-indigo-900 border-l-[3.5px] border-indigo-600 animate-fade-in' 
                                : 'text-slate-700 hover:bg-slate-50/80'
                            }`}
                          >
                            {/* Rank Column */}
                            <div className="col-span-2 flex items-center justify-center font-black">
                              {player.rank === 1 ? (
                                <span className="flex items-center justify-center w-6 h-6 bg-amber-100 text-amber-700 rounded-full border border-amber-200 text-xs shadow-sm">🥇</span>
                              ) : player.rank === 2 ? (
                                <span className="flex items-center justify-center w-6 h-6 bg-slate-100 text-slate-700 rounded-full border border-slate-200 text-xs shadow-sm">🥈</span>
                              ) : player.rank === 3 ? (
                                <span className="flex items-center justify-center w-6 h-6 bg-amber-50/80 text-amber-800 rounded-full border border-amber-150 text-xs shadow-sm">🥉</span>
                              ) : (
                                <span className="text-slate-400 text-[11px] font-sans">#{player.rank}</span>
                              )}
                            </div>

                            {/* Name Column */}
                            <div className="col-span-4 flex items-center gap-1.5 font-sans min-w-0">
                              <span className="truncate font-bold tracking-tight">
                                {player.name}
                              </span>
                              {isUser && (
                                <span className="shrink-0 text-[8px] bg-indigo-600 text-white font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest leading-none shadow-sm flex items-center gap-0.5">
                                  <Sparkles className="w-2 h-2" /> YOU
                                </span>
                              )}
                            </div>

                            {/* Status Column */}
                            <span className="col-span-4 text-slate-500 italic truncate pr-2 font-medium">
                              {player.status || 'Thinking...'}
                            </span>

                            {/* Score Column */}
                            <div className="col-span-2 text-center">
                              <span className={`font-black text-xs md:text-sm px-2 py-0.5 rounded-lg font-sans ${
                                isUser 
                                  ? 'bg-indigo-100 text-indigo-700' 
                                  : 'bg-slate-100 text-slate-600'
                              }`}>
                                {player.score} <span className="text-[10px] text-slate-400 font-normal">/ {QUIZ_DATA.length}</span>
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-200 rounded-3xl">
                    <p className="text-xs font-bold text-slate-400 font-sans">Initialize the leaderboard to view top performers!</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz Modal Overlay */}
      <AnimatePresence>
        {activeQuestion && frontData && backData && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[500px] h-full max-h-[600px] perspective-1500"
            >
              {/* The Flipping Card */}
              <motion.div 
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, cubicBezier: [0.175, 0.885, 0.32, 1.275] }}
                className="w-full h-full relative preserve-3d"
              >
                {/* FRONT: Question Side */}
                <div 
                  ref={frontScrollRef}
                  className="absolute inset-0 w-full h-full bg-white rounded-[24px] md:rounded-[40px] shadow-2xl p-6 md:p-10 flex flex-col border border-slate-100 backface-hidden overflow-y-auto"
                >
                  {/* Close X Button */}
                  <button 
                    onClick={closeModal}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors z-20"
                  >
                    <X size={24} className="text-slate-400" />
                  </button>

                  <div className="flex items-center justify-between mb-4 md:mb-6 select-none">
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 font-black text-white text-xl md:text-2xl ${frontData.gradient}`}>
                      {frontData.id}
                    </div>
                    {/* Meta badges in the modal card */}
                    <div className="flex gap-2 mr-12 md:mr-14">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-sans border ${
                        frontData.topic === 'Models'
                          ? 'bg-blue-50 border-blue-100 text-blue-500'
                          : frontData.topic === 'Agents'
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-500'
                            : 'bg-amber-50 border-amber-100 text-amber-500'
                      }`}>
                        {frontData.topic}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-sans border ${
                        frontData.difficulty === 'Easy'
                          ? 'bg-green-50 border-green-100 text-green-600'
                          : frontData.difficulty === 'Medium'
                            ? 'bg-amber-50 border-amber-100 text-amber-600'
                            : 'bg-rose-50 border-rose-100 text-rose-600'
                      }`}>
                        {frontData.difficulty}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight mb-6 md:mb-8">
                    {frontData.question}
                  </h2>

                  <div className="grid grid-cols-1 gap-2 md:gap-3 mb-auto">
                    {frontData.options.map((option, index) => (
                      <button
                        key={option}
                        onClick={() => handleAnswerClick(option)}
                        className="w-full text-left p-3 md:p-4 rounded-xl md:rounded-2xl border-2 border-slate-100 hover:border-slate-300 font-semibold text-slate-700 transition-all hover:bg-slate-50 flex justify-between items-center group text-sm md:text-base cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <kbd className="hidden md:inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold font-mono text-slate-400 bg-slate-50/80 rounded border border-slate-200 shadow-xs shrink-0 select-none">
                            {index + 1}
                          </kbd>
                          <span>{option}</span>
                        </div>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] md:text-xs text-slate-400 text-center uppercase tracking-widest font-semibold mt-4 md:mt-6 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
                    <span>Select your answer</span>
                    <span className="hidden md:inline text-slate-300 font-light">•</span>
                    <span className="text-slate-400 font-mono text-[9px] md:text-[10px] mt-0.5 md:mt-0 font-normal">
                      Keys <span className="bg-slate-100 px-1 py-0.5 rounded border border-slate-200">1-4</span> to select, <span className="bg-slate-100 px-1 py-0.5 rounded border border-slate-200">←</span> / <span className="bg-slate-100 px-1 py-0.5 rounded border border-slate-200">→</span> to flip
                    </span>
                  </p>
                </div>

                {/* BACK: Result Side */}
                <div 
                  ref={backScrollRef}
                  className="absolute inset-0 w-full h-full bg-white rounded-[24px] md:rounded-[40px] shadow-2xl p-6 md:p-10 flex flex-col border-4 backface-hidden rotate-y-180 overflow-y-auto"
                  style={{ borderColor: selectedAnswer === backData.correctAnswer ? '#34A853' : '#EA4335' }}
                >
                  {/* Close X Button */}
                  <button 
                    onClick={closeModal}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors z-20"
                  >
                    <X size={24} className="text-slate-400" />
                  </button>

                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4 md:mb-6 border-b border-slate-100 pb-4 select-none">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl shrink-0 ${
                        selectedAnswer === backData.correctAnswer ? 'bg-[#34A853]' : 'bg-[#EA4335]'
                      }`}>
                        {selectedAnswer === backData.correctAnswer ? '✓' : '✕'}
                      </div>
                      <h3 className={`text-2xl md:text-3xl font-black ${
                        selectedAnswer === backData.correctAnswer ? 'text-[#34A853]' : 'text-[#EA4335]'
                      }`}>
                        {selectedAnswer === backData.correctAnswer ? 'Correct' : 'Incorrect'}
                      </h3>
                    </div>
                    {/* Meta badges on back */}
                    <div className="flex gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-sans border ${
                        backData.topic === 'Models'
                          ? 'bg-blue-50 border-blue-100 text-blue-500'
                          : backData.topic === 'Agents'
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-500'
                            : 'bg-amber-50 border-amber-100 text-amber-500'
                      }`}>
                        {backData.topic}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-sans border ${
                        backData.difficulty === 'Easy'
                          ? 'bg-green-50 border-green-100 text-green-600'
                          : backData.difficulty === 'Medium'
                            ? 'bg-amber-50 border-amber-100 text-amber-600'
                            : 'bg-rose-50 border-rose-100 text-rose-600'
                      }`}>
                        {backData.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 mb-4 md:mb-6 flex-grow">
                    <p className="text-slate-600 leading-relaxed text-base md:text-lg whitespace-pre-wrap">
                      {renderFormattedText(backData.context)}
                    </p>
                  </div>

                  {/* Estimated Reading Time Display */}
                  {(() => {
                    const wordCount = backData.context ? backData.context.split(/\s+/).filter(Boolean).length : 0;
                    const briefSeconds = Math.max(12, Math.round((wordCount / 200) * 60));
                    const fullMinutes = Math.max(3, Math.ceil((750 + wordCount) / 220));

                    return (
                      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-4 p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-2xl select-none">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl text-white shadow-sm flex items-center justify-center">
                            <Clock size={16} className="animate-pulse" />
                          </div>
                          <div className="text-left w-full">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 block leading-none">Estimated Reading Time</span>
                            <span className="text-[11px] font-semibold text-slate-500 block leading-tight mt-1">Want to learn more? Check out the full link!</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 ml-auto">
                          {/* Brief Indicator */}
                          <div className="flex flex-col items-end text-right bg-white/70 border border-slate-100 rounded-xl px-2.5 py-1 min-w-[70px] shadow-3xs">
                            <span className="text-[8px] font-extrabold uppercase tracking-widest text-slate-400 leading-none">Summary</span>
                            <span className="text-xs font-black text-slate-700 mt-1 leading-none">{briefSeconds}s</span>
                          </div>
                          {/* Deep Dive Indicator */}
                          <div className="flex flex-col items-end text-right bg-white/70 border border-slate-100 rounded-xl px-2.5 py-1 min-w-[70px] shadow-3xs">
                            <span className="text-[8px] font-extrabold uppercase tracking-widest text-indigo-500 leading-none">Full Story</span>
                            <span className="text-xs font-black text-indigo-600 mt-1 leading-none flex items-center gap-0.5">
                              ~{fullMinutes}m
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Read More Tile */}
                  {backData.url && (
                    <a 
                      href={backData.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-shadow mb-4 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${backData.gradient} text-white`}>
                           <ExternalLink size={18} />
                        </div>
                        <span className="font-bold text-slate-800">Read the full story</span>
                      </div>
                      <ArrowRight size={18} className="text-slate-300 group-hover:text-slate-800 transition-colors" />
                    </a>
                  )}

                  <div className="flex justify-between items-center mt-auto w-full">
                    <div className="flex justify-start">
                      {filteredActiveIndex > 0 && (
                        <button 
                          onClick={handlePreviousQuestion}
                          className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg cursor-pointer"
                          title="Previous Question"
                        >
                          <ArrowLeft size={20} />
                        </button>
                      )}
                    </div>

                    {/* Centered Keyboard Control Guide */}
                    <div className="hidden md:flex flex-col items-center">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-sans animate-fade-in">Keyboard Guide</span>
                      <span className="text-[10px] font-bold text-slate-500 font-mono mt-0.5 flex gap-1.5 items-center bg-slate-50/80 border border-slate-100 px-2.5 py-0.5 rounded-full shadow-2xs">
                        <kbd className="font-sans text-[8px] font-bold bg-white border border-slate-200 px-1 py-0.2 rounded shadow-3xs font-mono">←</kbd> Question
                        <span className="text-slate-300">•</span>
                        <kbd className="font-sans text-[8px] font-bold bg-white border border-slate-200 px-1 py-0.2 rounded shadow-3xs font-mono">→</kbd> Next
                      </span>
                    </div>

                    <div className="flex justify-end">
                      {filteredActiveIndex === filteredQuizData.length - 1 ? (
                        <button 
                          onClick={handleNextQuestion}
                          className="px-6 md:px-8 h-12 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-colors shadow-lg uppercase tracking-widest text-[10px] md:text-sm flex items-center justify-center gap-2 cursor-pointer"
                          title="Finish Quiz"
                        >
                          See your score <ArrowRight size={20} />
                        </button>
                      ) : (
                        <button 
                          onClick={handleNextQuestion}
                          className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg cursor-pointer"
                          title="Next Question"
                        >
                          <ArrowRight size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
