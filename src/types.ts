export type LanguageEdge = {
  node: {
    name: string;
  };
  size: number;
};

export type Repository = {
  name: string;
  description: string;
  stargazerCount: number;
  forkCount: number;
  url: string;
  languages: {
    edges: LanguageEdge[];
  };
};

export type User = {
  name: string;
  avatarUrl: string;
  bio: string;
  url: string;
  repositories: {
    totalCount: number;
    nodes: Repository[];
  };
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  gists: {
    totalCount: number;
  };
};
export type UserData = {
  user: User;
};
