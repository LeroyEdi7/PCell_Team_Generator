import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus, Users, Target } from 'lucide-react';

interface HomePageProps {
  onGenerateTeams: (teams: string[][]) => void;
}

const HomePage = ({ onGenerateTeams }: HomePageProps) => {
  const [numTeams, setNumTeams] = useState(2);
  const [playersPerTeam, setPlayersPerTeam] = useState(5);
  const [playerNames, setPlayerNames] = useState<string[]>(['']);

  const addPlayer = () => {
    setPlayerNames([...playerNames, '']);
  };

  const removePlayer = (index: number) => {
    if (playerNames.length > 1) {
      setPlayerNames(playerNames.filter((_, i) => i !== index));
    }
  };

  const updatePlayerName = (index: number, name: string) => {
    const updated = [...playerNames];
    updated[index] = name;
    setPlayerNames(updated);
  };

  const generateTeams = () => {
    const validPlayers = playerNames.filter(name => name.trim() !== '');
    
    if (validPlayers.length === 0) {
      alert('Please add at least one player!');
      return;
    }

    // Shuffle players
    const shuffled = [...validPlayers].sort(() => Math.random() - 0.5);
    
    // Create teams
    const teams: string[][] = Array.from({ length: numTeams }, () => []);
    
    shuffled.forEach((player, index) => {
      teams[index % numTeams].push(player);
    });

    onGenerateTeams(teams);
  };

  return (
    <div className="min-h-screen bg-background p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-gaming bg-clip-text text-transparent mb-4 animate-pulse-neon">
            TEAM GENERATOR
          </h1>
          <p className="text-xl text-muted-foreground">
            Create balanced teams for your gaming sessions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Team Configuration */}
          <Card className="border-glow bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Target className="w-5 h-5" />
                Team Configuration
              </CardTitle>
              <CardDescription>
                Set up your team parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Number of Teams */}
              <div className="space-y-2">
                <Label htmlFor="numTeams" className="text-foreground">Number of Teams</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNumTeams(Math.max(2, numTeams - 1))}
                    className="hover-glow"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    id="numTeams"
                    type="number"
                    value={numTeams}
                    onChange={(e) => setNumTeams(Math.max(2, parseInt(e.target.value) || 2))}
                    className="text-center bg-input/50 border-primary/30 focus:border-primary"
                    min="2"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNumTeams(numTeams + 1)}
                    className="hover-glow"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Players Per Team */}
              <div className="space-y-2">
                <Label htmlFor="playersPerTeam" className="text-foreground">Target Players Per Team</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPlayersPerTeam(Math.max(1, playersPerTeam - 1))}
                    className="hover-glow"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    id="playersPerTeam"
                    type="number"
                    value={playersPerTeam}
                    onChange={(e) => setPlayersPerTeam(Math.max(1, parseInt(e.target.value) || 1))}
                    className="text-center bg-input/50 border-primary/30 focus:border-primary"
                    min="1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPlayersPerTeam(playersPerTeam + 1)}
                    className="hover-glow"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Player Names */}
          <Card className="border-glow bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Users className="w-5 h-5" />
                Player Names
              </CardTitle>
              <CardDescription>
                Add all the players who will be in teams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {playerNames.map((name, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={name}
                      onChange={(e) => updatePlayerName(index, e.target.value)}
                      placeholder={`Player ${index + 1}`}
                      className="bg-input/50 border-primary/30 focus:border-primary"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removePlayer(index)}
                      disabled={playerNames.length === 1}
                      className="hover-glow"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <Button
                variant="outline"
                onClick={addPlayer}
                className="w-full mt-4 hover-glow"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Player
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Generate Button */}
        <div className="text-center mt-12">
          <Button
            onClick={generateTeams}
            size="lg"
            className="bg-gradient-gaming hover:glow-primary text-primary-foreground px-12 py-6 text-xl font-bold rounded-xl transform hover:scale-105 transition-all duration-300"
          >
            GENERATE TEAMS
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;