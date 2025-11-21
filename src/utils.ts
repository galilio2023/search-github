import { Repository } from "@/types";

export const calculateMostForkedRepos = (
  repositories: Repository[]
): { repo: string; count: number }[] => {
  if (repositories.length === 0) {
    return [];
  }

  const forkRepos = repositories
    .map((repo) => {
      return {
        repo: repo.name,
        count: repo.forkCount,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  return forkRepos;
};

export const calculateMostStarredRepos = (
  repositories: Repository[]
): { repo: string; stars: number }[] => {
  if (repositories.length === 0) {
    return [];
  }
  const starredRepos = repositories
    .map((repo) => {
      return { repo: repo.name, stars: repo.stargazerCount };
    })
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 5);
  return starredRepos;
};

export const calculatePopularLanguages = (
  repositories: Repository[]
): { language: string; count: number }[] => {
  if (repositories.length === 0) {
    return [];
  }

  const languageMap: { [key: string]: number } = {};
  repositories.forEach((repo) => {
    if (repo.languages.edges.length === 0) {
      return;
    }
    repo.languages.edges.forEach((language) => {
      const { name } = language.node;
      languageMap[name] = (languageMap[name] || 0) + 1;
    });
  });
  if (Object.keys(languageMap).length === 0) {
    return [];
  }
  return Object.entries(languageMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([language, count]) => ({ language, count }));
};
