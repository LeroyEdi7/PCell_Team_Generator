import React, { useState, useEffect } from 'react';
import LoadingPage from '@/components/LoadingPage';
import HomePage from '@/components/HomePage';
import TeamsPage from '@/components/TeamsPage';

const Index = () => {
  const [currentView, setCurrentView] = useState<'loading' | 'home' | 'teams'>('loading');
  const [generatedTeams, setGeneratedTeams] = useState<string[][]>([]);

  const handleLoadingComplete = () => {
    setCurrentView('home');
  };

  const handleGenerateTeams = (teams: string[][]) => {
    setGeneratedTeams(teams);
    setCurrentView('teams');
  };

  const handleRegenerate = () => {
    // Re-generate teams with the same data
    setCurrentView('home');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  if (currentView === 'loading') {
    return <LoadingPage onLoadingComplete={handleLoadingComplete} />;
  }

  if (currentView === 'teams') {
    return (
      <TeamsPage
        teams={generatedTeams}
        onRegenerate={handleRegenerate}
        onBackToHome={handleBackToHome}
      />
    );
  }

  return (
    <HomePage onGenerateTeams={handleGenerateTeams} />
  );
};

export default Index;
