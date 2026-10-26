import { useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import hatImg from "../assets/hat.png";

const QUESTIONS = [
    {
        id: 1,
        question: "A fellow student is being bullied. What do you do?",
        options: [
            { text: "Step in immediately, no matter the risk", house: "Gryffindor" },
            { text: "Quietly report it to a teacher", house: "Hufflepuff" },
            { text: "Devise a clever plan to expose the bully", house: "Ravenclaw" },
            { text: "Use it as leverage later if needed", house: "Slytherin" },
        ],
    },
    {
        id: 2,
        question: "What would you most like to be known for?",
        options: [
            { text: "My courage in the face of danger", house: "Gryffindor" },
            { text: "My loyalty and kindness to others", house: "Hufflepuff" },
            { text: "My wisdom and knowledge", house: "Ravenclaw" },
            { text: "My ambition and achievements", house: "Slytherin" },
        ],
    },
    {
        id: 3,
        question: "You find a wallet full of gold on the street. What do you do?",
        options: [
            { text: "Return it — it's the right thing to do", house: "Hufflepuff" },
            { text: "Keep it, you deserve a break", house: "Slytherin" },
            { text: "Turn it in but make sure everyone knows", house: "Gryffindor" },
            { text: "Investigate to find the rightful owner", house: "Ravenclaw" },
        ],
    },
    {
        id: 4,
        question: "Which subject would you excel at most at Hogwarts?",
        options: [
            { text: "Defense Against the Dark Arts", house: "Gryffindor" },
            { text: "Herbology", house: "Hufflepuff" },
            { text: "Arithmancy", house: "Ravenclaw" },
            { text: "Potions", house: "Slytherin" },
        ],
    },
    {
        id: 5,
        question: "How do you handle failure?",
        options: [
            { text: "Get back up and try harder", house: "Gryffindor" },
            { text: "Lean on friends for support", house: "Hufflepuff" },
            { text: "Analyze what went wrong and improve", house: "Ravenclaw" },
            { text: "Ensure no one sees you fail", house: "Slytherin" },
        ],
    },
    {
        id: 6,
        question: "What do you value most in a friend?",
        options: [
            { text: "Bravery — someone who stands by you", house: "Gryffindor" },
            { text: "Loyalty — someone who never leaves", house: "Hufflepuff" },
            { text: "Intelligence — someone who challenges you", house: "Ravenclaw" },
            { text: "Ambition — someone who pushes you forward", house: "Slytherin" },
        ],
    },
    {
        id: 7,
        question: "You are offered forbidden knowledge. Do you take it?",
        options: [
            { text: "Yes — knowledge is always worth having", house: "Ravenclaw" },
            { text: "Yes — power requires sacrifice", house: "Slytherin" },
            { text: "No — some lines shouldn't be crossed", house: "Hufflepuff" },
            { text: "Only to protect others from it", house: "Gryffindor" },
        ],
    },
];

const HOUSE_DATA = {
    Gryffindor: {
        colors: "from-red-900/60 to-yellow-900/40",
        border: "border-red-600/50",
        badge: "bg-red-700 text-yellow-300",
        text: "text-yellow-400",
        glow: "shadow-red-700/30",
        icon: "shield",
        traits: ["Brave", "Daring", "Chivalrous", "Nerve"],
        description:
            "You belong in Gryffindor, where dwell the brave at heart. You charge headfirst into danger, driven by courage and a fierce sense of justice.",
        members: "Harry Potter • Hermione Granger • Ron Weasley",
    },
    Slytherin: {
        colors: "from-green-950/60 to-slate-900/60",
        border: "border-green-700/50",
        badge: "bg-green-900 text-green-300",
        text: "text-green-400",
        glow: "shadow-green-700/30",
        icon: "psychology",
        traits: ["Ambitious", "Cunning", "Resourceful", "Determined"],
        description:
            "Slytherin will help you on your way to greatness. You are driven, strategic, and will stop at nothing to achieve your goals.",
        members: "Draco Malfoy • Severus Snape • Merlin",
    },
    Ravenclaw: {
        colors: "from-blue-950/60 to-slate-900/60",
        border: "border-blue-600/50",
        badge: "bg-blue-900 text-blue-200",
        text: "text-blue-400",
        glow: "shadow-blue-700/30",
        icon: "menu_book",
        traits: ["Wise", "Witty", "Curious", "Creative"],
        description:
            "Or yet in wise old Ravenclaw, if you've a ready mind. You thirst for knowledge and approach every problem with sharp intellect.",
        members: "Luna Lovegood • Cho Chang • Filius Flitwick",
    },
    Hufflepuff: {
        colors: "from-yellow-950/60 to-slate-900/60",
        border: "border-yellow-600/50",
        badge: "bg-yellow-700 text-yellow-100",
        text: "text-yellow-400",
        glow: "shadow-yellow-700/30",
        icon: "favorite",
        traits: ["Loyal", "Patient", "Fair", "Hardworking"],
        description:
            "Sweet Hufflepuff, from valley broad — you value fairness, loyalty, and hard work above all else. You are the most trusted friend anyone could have.",
        members: "Cedric Diggory • Nymphadora Tonks • Newt Scamander",
    },
};

function calculateHouse(answers) {
    const counts = { Gryffindor: 0, Slytherin: 0, Ravenclaw: 0, Hufflepuff: 0 };
    answers.forEach((house) => { if (house) counts[house]++; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

export default function SortingHat() {
    const [step, setStep] = useState("intro"); // intro | quiz | result
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [result, setResult] = useState(null);
    const [isThinking, setIsThinking] = useState(false);

    const savedResult = localStorage.getItem("hogwarts-house");

    const startQuiz = () => {
        localStorage.removeItem("hogwarts-house");
        setAnswers([]);
        setCurrentQ(0);
        setSelected(null);
        setResult(null);
        setStep("quiz");
    };

    const handleAnswer = (house) => {
        if (selected) return;
        setSelected(house);
    };

    const handleNext = () => {
        if (!selected) return;
        const newAnswers = [...answers, selected];

        if (currentQ < QUESTIONS.length - 1) {
            setAnswers(newAnswers);
            setCurrentQ((q) => q + 1);
            setSelected(null);
        } else {
            // Last question — calculate result
            setIsThinking(true);
            setTimeout(() => {
                const house = calculateHouse(newAnswers);
                localStorage.setItem("hogwarts-house", house);
                setResult(house);
                setIsThinking(false);
                setStep("result");
            }, 2500);
        }
    };

    const house = result ? HOUSE_DATA[result] : null;
    const progress = ((currentQ) / QUESTIONS.length) * 100;

    return (
        <div className="min-h-screen bg-background-dark font-display text-slate-100">

            <main className="max-w-3xl mx-auto px-6 py-12 lg:px-0">

                {/* ── INTRO ── */}
                <AnimatePresence mode="wait">
                    {step === "intro" && (
                        <Motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center text-center gap-8 py-16"
                        >
                            {/* Hat Icon */}
                            <Motion.div
                                animate={{ rotate: [-5, 5, -5] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                className="w-45 h-45 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center"
                            >
                                <img src={hatImg} alt="Sorting Hat" className="w-35 h-35 object-contain" />
                            </Motion.div>

                            <div>
                                <p className="text-primary text-xs uppercase tracking-widest font-bold mb-3">
                                    The Sorting Ceremony
                                </p>
                                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-tight mb-4">
                                    Which House
                                    <br />
                                    <span className="text-primary italic">Are You?</span>
                                </h1>
                                <p className="text-slate-400 text-lg max-w-md mx-auto">
                                    Answer {QUESTIONS.length} questions and the Sorting Hat will
                                    reveal your true Hogwarts house.
                                </p>
                            </div>

                            {/* Previous result */}
                            {savedResult && (
                                <div className={`flex items-center gap-3 px-5 py-3 rounded-xl border ${HOUSE_DATA[savedResult].border} bg-white/5`}>
                                    <span className="material-symbols-outlined text-primary">history</span>
                                    <p className="text-sm text-slate-300">
                                        Last result:{" "}
                                        <span className={`font-bold ${HOUSE_DATA[savedResult].text}`}>
                                            {savedResult}
                                        </span>
                                    </p>
                                </div>
                            )}

                            {/* House previews */}
                            <div className="grid grid-cols-4 gap-4 w-full">
                                {Object.entries(HOUSE_DATA).map(([name, data]) => (
                                    <div
                                        key={name}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${data.border} bg-white/5`}
                                    >
                                        <span className={`material-symbols-outlined ${data.text} text-2xl`}>
                                            {data.icon}
                                        </span>
                                        <span className="text-xs font-bold text-slate-300">{name}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={startQuiz}
                                className="flex items-center gap-3 bg-primary text-background-dark px-12 py-4 rounded-full font-black text-lg uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-primary/20"
                            >
                                <span className="material-symbols-outlined">auto_fix_high</span>
                                Begin the Sorting
                            </button>
                        </Motion.div>
                    )}

                    {/* ── QUIZ ── */}
                    {step === "quiz" && !isThinking && (
                        <Motion.div
                            key={`question-${currentQ}`}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.35 }}
                            className="flex flex-col gap-8 py-8"
                        >
                            {/* Progress */}
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between text-xs text-slate-500 font-bold uppercase tracking-widest">
                                    <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
                                    <span>{Math.round(progress)}% complete</span>
                                </div>
                                <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
                                    <Motion.div
                                        className="h-full bg-primary rounded-full"
                                        initial={{ width: `${progress}%` }}
                                        animate={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </div>
                            </div>

                            {/* Question */}
                            <div className="flex flex-col gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-black text-lg">
                                    {currentQ + 1}
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                                    {QUESTIONS[currentQ].question}
                                </h2>
                            </div>

                            {/* Options */}
                            <div className="flex flex-col gap-3">
                                {QUESTIONS[currentQ].options.map((option, i) => {
                                    const houseData = HOUSE_DATA[option.house];
                                    const isSelected = selected === option.house;
                                    return (
                                        <Motion.button
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.08 }}
                                            onClick={() => handleAnswer(option.house)}
                                            className={`w-full text-left px-6 py-4 rounded-xl border transition-all duration-200 flex items-center gap-4 ${isSelected
                                                ? `${houseData.border} bg-white/10 ${houseData.text} shadow-lg ${houseData.glow}`
                                                : "border-primary/10 bg-white/5 text-slate-300 hover:border-primary/30 hover:bg-white/10"
                                                }`}
                                        >
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isSelected ? `${houseData.border} bg-primary/20` : "border-slate-600"
                                                }`}>
                                                {isSelected && (
                                                    <span className="material-symbols-outlined text-sm text-primary">check</span>
                                                )}
                                            </div>
                                            <span className="font-medium">{option.text}</span>
                                            {isSelected && (
                                                <span className={`ml-auto text-xs font-bold uppercase tracking-widest ${houseData.text}`}>
                                                    {option.house}
                                                </span>
                                            )}
                                        </Motion.button>
                                    );
                                })}
                            </div>

                            {/* Next button */}
                            <div className="flex justify-between items-center">
                                <button
                                    onClick={() => {
                                        if (currentQ === 0) { setStep("intro"); }
                                        else { setCurrentQ((q) => q - 1); setSelected(answers[currentQ - 1] || null); setAnswers((a) => a.slice(0, -1)); }
                                    }}
                                    className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-bold"
                                >
                                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                                    Back
                                </button>

                                <button
                                    onClick={handleNext}
                                    disabled={!selected}
                                    className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold uppercase tracking-widest transition-all ${selected
                                        ? "bg-primary text-background-dark hover:scale-105 shadow-lg shadow-primary/20"
                                        : "bg-primary/20 text-primary/40 cursor-not-allowed"
                                        }`}
                                >
                                    {currentQ === QUESTIONS.length - 1 ? "Reveal My House" : "Next"}
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </Motion.div>
                    )}

                    {/* ── THINKING ── */}
                    {isThinking && (
                        <Motion.div
                            key="thinking"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center gap-6 py-32 text-center"
                        >
                            <Motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary"
                            />
                            <div>
                                <p className="text-primary font-bold text-xl mb-2">Hmm...</p>
                                <p className="text-slate-400 italic">
                                    "A difficult choice... very difficult indeed."
                                </p>
                            </div>
                        </Motion.div>
                    )}

                    {/* ── RESULT ── */}
                    {step === "result" && house && (
                        <Motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="flex flex-col items-center gap-8 py-10 text-center"
                        >
                            {/* House Card */}
                            <Motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className={`w-full rounded-2xl border-2 ${house.border} bg-linear-to-br ${house.colors} p-10 flex flex-col items-center gap-6 shadow-2xl ${house.glow}`}
                            >
                                {/* Confetti burst */}
                                <Motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: [0, 1.3, 1] }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className={`w-24 h-24 rounded-full bg-white/10 border-2 ${house.border} flex items-center justify-center`}
                                >
                                    <span className={`material-symbols-outlined text-5xl ${house.text}`}>
                                        {house.icon}
                                    </span>
                                </Motion.div>

                                <div>
                                    <p className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-2">
                                        The Sorting Hat declares...
                                    </p>
                                    <Motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className={`text-6xl md:text-7xl font-black uppercase tracking-tight ${house.text}`}
                                    >
                                        {result}
                                    </Motion.h2>
                                </div>

                                <Motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="text-slate-300 text-lg leading-relaxed max-w-lg italic border-l-2 border-primary/30 pl-4 text-left"
                                >
                                    "{house.description}"
                                </Motion.p>

                                {/* Traits */}
                                <Motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                    className="flex flex-wrap gap-2 justify-center"
                                >
                                    {house.traits.map((trait) => (
                                        <span
                                            key={trait}
                                            className={`px-4 py-1.5 rounded-full text-sm font-bold ${house.badge}`}
                                        >
                                            {trait}
                                        </span>
                                    ))}
                                </Motion.div>

                                {/* Notable members */}
                                <Motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.1 }}
                                    className="text-center"
                                >
                                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-1">
                                        Notable Members
                                    </p>
                                    <p className={`text-sm font-medium ${house.text}`}>
                                        {house.members}
                                    </p>
                                </Motion.div>
                            </Motion.div>

                            {/* Actions */}
                            <Motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                className="flex flex-wrap gap-4 justify-center"
                            >
                                <button
                                    onClick={startQuiz}
                                    className="flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary rounded-full font-bold uppercase tracking-widest hover:bg-primary/10 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">refresh</span>
                                    Retake Quiz
                                </button>
                                <Link
                                    to="/characters"
                                    className="flex items-center gap-2 px-8 py-3 bg-primary text-background-dark rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-primary/20"
                                >
                                    <span className="material-symbols-outlined text-sm">groups</span>
                                    Meet Your Housemates
                                </Link>
                            </Motion.div>
                        </Motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}