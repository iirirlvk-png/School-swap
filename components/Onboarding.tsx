import React, { useState } from 'react';
import { Theme } from '../types';
import { OFFER_CATEGORIES, THEMES } from '../constants';
import KnotIcon from './icons/KnotIcon';

interface OnboardingProps {
  onComplete: (offers: string[]) => void;
  theme: Theme;
  themes: Theme[];
  setCurrentTheme: (theme: Theme) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, theme, themes, setCurrentTheme }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [selectedOffers, setSelectedOffers] = useState<string[]>([]);

  const toggleOffer = (offer: string) => {
    setSelectedOffers(prev =>
      prev.includes(offer)
        ? prev.filter(item => item !== offer)
        : [...prev, offer]
    );
  };

  const renderStepOne = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-2">Welcome to School Swap</h2>
      <p className={`mb-8 ${theme.textSecondary}`}>
        A place to exchange knowledge, not just notes.
        <br />
        Let's get you signed up.
      </p>
      <div className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter an adult's email for safety"
          className={`w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:${theme.accent.replace('bg-', 'ring-')} ${theme.secondary} ${theme.textPrimary} placeholder:${theme.textSecondary}`}
        />
        <button
          onClick={() => setStep(2)}
          disabled={!email.includes('@')}
          className={`w-full py-3 rounded-xl font-semibold transition ${theme.primary} ${theme.buttonText} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Choose Your Palette</h2>
        <p className={`mb-8 ${theme.textSecondary}`}>
            Select a theme that fits your style. You can change it later.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-8">
            {themes.map(t => (
                <button
                    key={t.name}
                    onClick={() => setCurrentTheme(t)}
                    className={`p-3 rounded-lg text-left border-2 transition-all ${theme.name === t.name ? theme.accent.replace('bg-','border-') : 'border-transparent'}`}
                    style={{ background: `linear-gradient(to right, ${getHexColor(t.gradientFrom)}, ${getHexColor(t.gradientTo, 0.5)})` }}
                >
                    <span className="font-semibold text-white mix-blend-difference">{t.name}</span>
                </button>
            ))}
        </div>
        <button
            onClick={() => setStep(3)}
            className={`w-full py-3 rounded-xl font-semibold transition ${theme.primary} ${theme.buttonText}`}
        >
            Next
        </button>
    </div>
  );
  
  const getHexColor = (twClass: string | undefined, opacity: number = 1): string => {
      if (!twClass) return '#000000';
      // This is a simplified map for demonstration. A real app would need a more robust solution.
      const colorMap: { [key: string]: string } = {
          'from-slate-900': '#0f172a',
          'to-emerald-900/30': `rgba(6, 78, 59, ${opacity})`,
          'from-gray-900': '#111827',
          'to-indigo-900/40': `rgba(30, 41, 59, ${opacity})`,
          'from-green-50': '#f0fdf4',
          'to-yellow-100/50': `rgba(254, 249, 195, ${opacity})`,
          'from-orange-50': '#fff7ed',
          'to-teal-100/50': `rgba(204, 251, 241, ${opacity})`,
          'to-sky-900/40': `rgba(12, 74, 110, ${opacity})`
      };
      return colorMap[twClass] || '#000000';
  };

  const renderStepThree = () => (
    <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">What can you offer?</h2>
        <p className={`mb-8 ${theme.textSecondary}`}>
            Select all that apply. This helps others find what you have.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
            {OFFER_CATEGORIES.map(offer => (
                <button
                    key={offer}
                    onClick={() => toggleOffer(offer)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200 ${selectedOffers.includes(offer) ? `${theme.accent} border-transparent text-white` : `${theme.secondary} ${theme.accent.replace('bg-', 'border-')} ${theme.textPrimary}`}`}
                >
                    {offer}
                </button>
            ))}
        </div>
        <button
            onClick={() => onComplete(selectedOffers)}
            className={`w-full py-3 rounded-xl font-semibold transition ${theme.primary} ${theme.buttonText}`}
        >
            Finish Setup & Explore
        </button>
    </div>
  );

  const renderCurrentStep = () => {
    switch (step) {
        case 1: return renderStepOne();
        case 2: return renderStepTwo();
        case 3: return renderStepThree();
        default: return renderStepOne();
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {step > 1 && (
            <div className="flex justify-center mb-8 animate-fade-in">
                <KnotIcon className={`w-16 h-16 ${theme.accent.replace('bg-', 'text-')}`} />
            </div>
        )}
        <div className={`p-8 rounded-3xl shadow-2xl shadow-emerald-500/10 ${theme.cardBg} border border-white/10 ${step === 1 ? 'mt-32' : ''}`}>
            {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;