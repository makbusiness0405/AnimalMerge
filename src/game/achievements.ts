import { LucideIcon } from 'lucide-react';
import {
  Sparkles, Flame, Trophy, Crown, Star, Target, Zap, Award, Rocket, Gem,
} from 'lucide-react';

export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  reward: number;
  check: (stats: AchievementStats) => boolean;
}

export interface AchievementStats {
  bestScore: number;
  bestTile: number;
  totalGames: number;
  streak: number;
  discoveredCount: number;
  totalAnimals: number;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'first_game',
    name: 'First Steps',
    description: 'Play your first game',
    icon: Sparkles,
    reward: 10,
    check: (s) => s.totalGames >= 1,
  },
  {
    id: 'score_500',
    name: 'Getting Warm',
    description: 'Reach a score of 500',
    icon: Flame,
    reward: 10,
    check: (s) => s.bestScore >= 500,
  },
  {
    id: 'score_2000',
    name: 'Hot Streak',
    description: 'Reach a score of 2,000',
    icon: Zap,
    reward: 20,
    check: (s) => s.bestScore >= 2000,
  },
  {
    id: 'score_5000',
    name: 'High Roller',
    description: 'Reach a score of 5,000',
    icon: Trophy,
    reward: 30,
    check: (s) => s.bestScore >= 5000,
  },
  {
    id: 'tile_128',
    name: 'Bear Hug',
    description: 'Reach the Bear (128)',
    icon: Star,
    reward: 15,
    check: (s) => s.bestTile >= 128,
  },
  {
    id: 'tile_256',
    name: 'Koala Friend',
    description: 'Reach the Koala (256)',
    icon: Target,
    reward: 25,
    check: (s) => s.bestTile >= 256,
  },
  {
    id: 'tile_512',
    name: 'Tiger Tamer',
    description: 'Reach the Tiger (512)',
    icon: Award,
    reward: 40,
    check: (s) => s.bestTile >= 512,
  },
  {
    id: 'tile_1024',
    name: 'Lion King',
    description: 'Reach the Lion (1024)',
    icon: Crown,
    reward: 60,
    check: (s) => s.bestTile >= 1024,
  },
  {
    id: 'tile_2048',
    name: 'Dragon Slayer',
    description: 'Reach the Dragon (2048)',
    icon: Rocket,
    reward: 100,
    check: (s) => s.bestTile >= 2048,
  },
  {
    id: 'streak_3',
    name: 'Habit Forming',
    description: 'Play 3 days in a row',
    icon: Flame,
    reward: 20,
    check: (s) => s.streak >= 3,
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Play 7 days in a row',
    icon: Flame,
    reward: 40,
    check: (s) => s.streak >= 7,
  },
  {
    id: 'collection_half',
    name: 'Collector',
    description: 'Discover 6 different animals',
    icon: Gem,
    reward: 25,
    check: (s) => s.discoveredCount >= 6,
  },
  {
    id: 'collection_all',
    name: 'Master Collector',
    description: 'Discover all 12 animals',
    icon: Crown,
    reward: 80,
    check: (s) => s.discoveredCount >= s.totalAnimals,
  },
  {
    id: 'games_10',
    name: 'Dedicated',
    description: 'Play 10 games',
    icon: Star,
    reward: 20,
    check: (s) => s.totalGames >= 10,
  },
  {
    id: 'games_50',
    name: 'Devoted',
    description: 'Play 50 games',
    icon: Trophy,
    reward: 50,
    check: (s) => s.totalGames >= 50,
  },
];

export function checkAchievements(stats: AchievementStats, earned: string[]): string[] {
  const newlyEarned: string[] = [];
  for (const ach of ACHIEVEMENTS) {
    if (!earned.includes(ach.id) && ach.check(stats)) {
      newlyEarned.push(ach.id);
    }
  }
  return newlyEarned;
}
