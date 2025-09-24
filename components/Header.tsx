import React, { useState } from 'react';
import { Theme } from '../types';
import { THEMES } from '../constants';
import { View } from '../App';
import KnotIcon from './icons/KnotIcon';
import SettingsIcon from './icons/SettingsIcon';
import HomeIcon from './icons/HomeIcon';
import SearchIcon from './icons/SearchIcon';
import AddIcon from './icons/AddIcon';
import MessageIcon from './icons/MessageIcon';
import ProfileIcon from './icons/ProfileIcon';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
}

const NavItem: React.FC<{
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
    theme: Theme;
    isDesktop?: boolean;
}> = ({ label, icon, isActive, onClick, theme, isDesktop = false }) => (
    <button
        onClick={onClick}
        aria-label={label}
        className={`flex items-center transition-colors duration-200 group ${ isDesktop 
          ? `w-full space-x-4 p-3 rounded-lg hover:${theme.secondary}`
          : `flex-col justify-center space-y-1 w-16`
        } ${isActive ? theme.textPrimary : theme.textSecondary} hover:${theme.textPrimary}`}
    >
      <div className={isActive && isDesktop ? `${theme.accent.replace('bg-','text-')}` : ''}>
        {icon}
      </div>
      <span className={`text-xs md:text-base font-semibold ${ isDesktop ? 'lg:inline hidden' : '' } ${isActive ? 'font-bold' : ''}`}>
        {label}
      </span>
    </button>
);


const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, currentTheme, setCurrentTheme }) => {
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
  
  const navItems: { view: View, label: string, icon: React.ReactNode}[] = [
    { view: 'feed', label: 'Home', icon: <HomeIcon className="w-7 h-7"/> },
    { view: 'search', label: 'Search', icon: <SearchIcon className="w-7 h-7"/> },
    { view: 'upload', label: 'Upload', icon: <AddIcon className="w-7 h-7"/> },
    { view: 'messages', label: 'Messages', icon: <MessageIcon className="w-7 h-7"/> },
    { view: 'profile', label: 'Profile', icon: <ProfileIcon className="w-7 h-7"/> },
  ]

  return (
    <>
      {/* --- Desktop Sidebar --- */}
      <header className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 hidden md:flex flex-col p-4 border-r border-white/10 w-20 lg:w-64 ${currentTheme.background}`}>
        <div className="flex items-center justify-center lg:justify-start space-x-2 mb-10 p-2">
          <KnotIcon className={`w-8 h-8 flex-shrink-0 ${currentTheme.accent.replace('bg-', 'text-')}`} />
          <h1 className={`text-xl font-bold tracking-tighter hidden lg:block ${currentTheme.textPrimary}`}>School Swap</h1>
        </div>

        <nav className="flex flex-col space-y-2">
          {navItems.map(item => (
            <NavItem 
              key={item.view}
              label={item.label} 
              icon={item.icon} 
              isActive={currentView === item.view} 
              onClick={() => setCurrentView(item.view)} 
              theme={currentTheme}
              isDesktop
            />
          ))}
        </nav>

        <div className="mt-auto relative">
           {isThemeSelectorOpen && (
              <div className={`absolute bottom-full left-0 mb-2 w-56 p-2 rounded-lg shadow-2xl ${currentTheme.cardBg} border border-white/10`}>
                  <p className={`text-sm font-semibold px-2 pb-1 ${currentTheme.textSecondary}`}>Theme Palette</p>
                  {THEMES.map((theme) => (
                      <button
                          key={theme.name}
                          onClick={() => {
                              setCurrentTheme(theme);
                              // FIX: Corrected typo in function call from `setIsThemeSelector-Open` to `setIsThemeSelectorOpen`
                              setIsThemeSelectorOpen(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 text-sm rounded-md flex items-center space-x-2 ${currentTheme.textPrimary} hover:${theme.primary} hover:${currentTheme.buttonText}`}
                      >
                          <div className={`w-4 h-4 rounded-full ${theme.primary}`}></div>
                          <span>{theme.name}</span>
                      </button>
                  ))}
              </div>
          )}
          <button onClick={() => setIsThemeSelectorOpen(!isThemeSelectorOpen)} className={`w-full flex items-center space-x-4 p-3 rounded-lg hover:${currentTheme.secondary} ${currentTheme.textSecondary} hover:${currentTheme.textPrimary}`}>
            <SettingsIcon className="w-7 h-7" />
            <span className="lg:inline hidden font-semibold">Settings</span>
          </button>
        </div>

      </header>
      
       {/* --- Mobile Bottom Nav --- */}
      <div className="fixed bottom-4 inset-x-0 z-50 md:hidden">
        <nav className={`max-w-sm mx-auto p-2 rounded-full shadow-lg shadow-black/30 ${currentTheme.cardBg}`}>
            <div className="flex justify-around items-center">
              {navItems.map(item => (
                 <NavItem 
                    key={item.view}
                    label={item.label} 
                    icon={item.icon} 
                    isActive={currentView === item.view} 
                    onClick={() => setCurrentView(item.view)} 
                    theme={currentTheme}
                  />
              ))}
            </div>
        </nav>
      </div>
    </>
  );
};

export default Header;