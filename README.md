# Search Github Users

This is a web app that allows you to search for users on Github.

## Technologies Used

- React
- Vite
- Tailwind CSS
- Shadcn UI
- Typescript
- Github API
- Appollo Client

## Setup

- create a new directory

```bash
npm create vite@latest . -- --template react-ts
```

```bash
npm install
```

```bash
npm run dev
```

## Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

App.tsx

```tsx
const App = () => {
  return <h1 className='text-2xl font-bold'>Search Github Users</h1>;
};
export default App;
```

- remove App.css
- change title in index.html

```html
<title>Search Github Users</title>
```

## Shadcn UI

tsconfig.json

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

tsconfig.app.json

```json
{
  "compilerOptions": {
    // rest of the options
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

```bash
npm i -D @types/node

```

vite.config.ts

```ts
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- initialize shadcn

```bash
npx shadcn@latest init
```

- add components

```bash
npx shadcn@latest add button card chart input label skeleton toast
```

App.tsx

```tsx
import { Button } from '@/components/ui/button';
const App = () => {
  return (
    <div className='flex  items-center justify-center h-screen'>
      <div className='flex gap-4'>
        <Button>Click me</Button>
        <Button variant='outline' size='lg'>
          Click me
        </Button>
        <Button variant='destructive' size='sm'>
          Click me
        </Button>
      </div>
    </div>
  );
};
export default App;
```

## Structure

- setup local state in App.tsx
- create src/components/form/SearchForm.tsx
- create src/components/user/UserProfile.tsx
- render both components in App.tsx
- pass userName and setUserName to SearchForm
- pass userName to UserProfile

App.tsx

```tsx
const [userName, setUserName] = useState('quincylarson');
```

src/components/form/SearchForm.tsx

```tsx
type SearchFormProps = {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
};

const SearchForm = ({ userName, setUserName }: SearchFormProps) => {
  return <div>SearchForm</div>;
};
export default SearchForm;
```

src/components/user/UserProfile.tsx

```tsx
type UserProfileProps = {
  userName: string;
};

const UserProfile = ({ userName }: UserProfileProps) => {
  return <h1 className='text-2xl font-bold'>{userName}</h1>;
};
export default UserProfile;
```

src/App.tsx

```tsx
mport { useState } from 'react';
import SearchForm from './components/form/SearchForm';
import UserProfile from './components/user/UserProfile';

const App = () => {
  const [userName, setUserName] = useState('quincylarson');

  return (
    <main className='mx-auto max-w-6xl px-8 py-20'>
      <SearchForm userName={userName} setUserName={setUserName} />
      <UserProfile userName={userName} />
    </main>
  );
};
export default App;
```

## Search Form

```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type FormEvent } from 'react';
import { useState } from 'react';

type SearchFormProps = {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
};

const SearchForm = ({ userName, setUserName }: SearchFormProps) => {
  const [text, setText] = useState(userName);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text === '') {
      console.log('Please enter a username');
      return;
    }
    setUserName(text);
  };

  return (
    <form
      onSubmit={handleSearch}
      className='flex items-center gap-x-2 w-full lg:w-1/3 mb-8'
    >
      <Label htmlFor='search' className='sr-only'>
        Search
      </Label>
      <Input
        type='text'
        id='search'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Search Github User...'
        className='flex-grow bg-background'
      />
      <Button type='submit'>Search</Button>
    </form>
  );
};
export default SearchForm;
```

## Shadcn Toast

main.tsx

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
// import Toaster component
import { Toaster } from '@/components/ui/toaster';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>
);
```

src/components/form/SearchForm.tsx

```tsx
import { useToast } from '@/hooks/use-toast';

const SearchForm = ({ userName, setUserName }: SearchFormProps) => {
  const { toast } = useToast();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text === '') {
      toast({
        description: 'Please enter a valid username',
      });
      return;
    }
    setUserName(text);
  };

  return <form>...</form>;
};
export default SearchForm;
```

## Graphql

GraphQL is a modern query language and runtime for APIs that allows clients to request specific data they need and nothing more. Unlike traditional REST APIs where you get fixed data from multiple endpoints, GraphQL provides a single endpoint where you can specify exactly what data you want to receive.

- **Schema**: The blueprint that defines all available data types and operations in your API
- **Query**: A request to read or fetch data (similar to GET in REST)
- **Mutation**: A request to create, update, or delete data (similar to POST/PUT/DELETE in REST)
- **Fields**: The individual pieces of data you can request (like user.name or post.title)
- **Arguments**: Parameters you can pass to fields to filter or modify the results (like limit: 10)
- **Types**: The different kinds of data objects available (like User, Post, Comment)
- **Nodes**: Objects in a GraphQL schema that have a unique identifier, typically representing entities in your data model (like a specific user or post)

[Practice API's](https://www.apollographql.com/blog/8-free-to-use-graphql-apis-for-your-projects-and-demos)

## Github GraphQL Explorer

[Github GraphQL Explorer](https://docs.github.com/en/graphql/overview/explorer)

## Github Personal Access Token

[Github](https://github.com/)

- profile
- settings
- developer settings
- personal access token
- generate new token
- create .env.local file
- add token to .env.local file

.env.local

```
VITE_GITHUB_TOKEN=YOUR_TOKEN_HERE
```

## Apollo Client

Apollo Client is a comprehensive state management library for JavaScript applications that helps you manage both local and remote data with GraphQL. It makes it easy to fetch, cache, and modify application data while automatically handling important concerns like tracking loading and error states. The library integrates especially well with React applications and provides features like automatic caching, optimistic UI updates, and error handling out of the box.

[Apollo Client](https://www.apollographql.com/docs/react/get-started/)

```bash
npm install @apollo/client graphql
```

- src/apolloClient.ts

```ts
// Core Apollo Client imports for GraphQL functionality
// ApolloClient: Main client class for making GraphQL requests
// InMemoryCache: Caching solution for storing query results
// HttpLink: Configures HTTP connection to GraphQL endpoint
// ApolloLink: Enables creation of middleware chain for request/response handling
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';

// Error handling middleware for Apollo Client
// Provides detailed error information for both GraphQL and network errors
import { onError } from '@apollo/client/link/error';

// GitHub GraphQL API endpoint
const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';

// Configure error handling middleware
// This will intercept and log any GraphQL or network errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  // Handle GraphQL-specific errors (e.g., validation, resolver errors)
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  // Handle network-level errors (e.g., connection issues)
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Configure HTTP connection to GitHub's GraphQL API
// Including authentication token from environment variables
const httpLink = new HttpLink({
  uri: GITHUB_GRAPHQL_API,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // GitHub Personal Access Token
  },
});

// Create the Apollo Link chain
// Order matters: errorLink will run before httpLink
const link = ApolloLink.from([errorLink, httpLink]);

// Initialize Apollo Client with:
// - Configured link chain for network requests
// - In-memory cache for storing query results
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
```

src/main.tsx

```tsx
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from '@/components/ui/toaster';
// Apollo Provider
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
    <Toaster />
  </ApolloProvider>
);
```

## Query and Type

src/queries.ts

```ts
import { gql } from '@apollo/client';

export const GET_USER = gql`
  query ($login: String!) {
    user(login: $login) {
      name
      avatarUrl
      bio
      url
      repositories(first: 100) {
        totalCount
        nodes {
          name
          description
          stargazerCount
          forkCount
          url
          languages(first: 5) {
            edges {
              node {
                name
              }
              size
            }
          }
        }
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
      gists {
        totalCount
      }
    }
  }
`;
```

src/types.ts

```ts
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
```

## Query Hook

src/components/user/UserProfile.tsx

```tsx
import { useQuery } from '@apollo/client';
import { GET_USER } from '@/queries';
import { UserData } from '@/types';

type UserProfileProps = {
  userName: string;
};

const UserProfile = ({ userName }: UserProfileProps) => {
  const { loading, error, data } = useQuery<UserData>(GET_USER, {
    variables: { login: userName },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <h2 className='text-xl'>{error.message}</h2>;
  if (!data) return <h2 className='text-xl'>User Not Found.</h2>;

  const {
    avatarUrl,
    name,
    bio,
    url,
    repositories,
    followers,
    following,
    gists,
  } = data.user;

  return (
    <div>
      <h1>{bio}</h1>
    </div>
  );
};

export default UserProfile;
```

## User Card

src/components/user/UserCard.tsx

```tsx
import { Button } from '@/components/ui/button';
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';

type UserCardProps = {
  avatarUrl: string;
  name: string;
  bio: string;
  url: string;
};
const UserCard = ({ avatarUrl, name, bio, url }: UserCardProps) => {
  return (
    <Card className='w-full lg:w-1/2 mb-8'>
      <CardHeader className='flex-row gap-x-8 items-center'>
        <img
          src={avatarUrl}
          alt={name}
          className='w-36 h-36  rounded object-cover'
        />
        <div className='flex flex-col gap-y-2'>
          <CardTitle>{name || 'Coding Addict'}</CardTitle>
          <CardDescription>
            {bio || 'Passionate about coding and technology.'}
          </CardDescription>
          <Button asChild size='sm' className='w-1/2 mt-2'>
            <a href={url} target='_blank' rel='noreferrer'>
              Follow
            </a>
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};
export default UserCard;
```

- UserProfile.tsx

```tsx
return (
  <div>
    <UserCard avatarUrl={avatarUrl} name={name} bio={bio} url={url} />
  </div>
);
```

## Stats Card

```tsx
import { Card, CardTitle, CardDescription } from '../ui/card';

type StatsCardProps = {
  title: string;
  count: number;
};

function StatsCard({ title, count }: StatsCardProps) {
  return (
    <Card>
      <div className='flex flex-row justify-between items-center p-6'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{count}</CardDescription>
      </div>
    </Card>
  );
}

export default StatsCard;
```

## Stats Container

```tsx
import StatsCard from './StatsCard';

type StatsContainerProps = {
  totalRepos: number;
  followers: number;
  following: number;
  gists: number;
};

const StatsContainer = (props: StatsContainerProps) => {
  const { totalRepos, followers, following, gists } = props;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 mb-8 '>
      <StatsCard title='Total Repositories' count={totalRepos} />
      <StatsCard title='Followers' count={followers} />
      <StatsCard title='Following' count={following} />
      <StatsCard title='Gists' count={gists} />
    </div>
  );
};
export default StatsContainer;
```

UserProfile.tsx

```tsx
return (
  <div>
    <UserCard avatarUrl={avatarUrl} name={name} bio={bio} url={url} />
    <StatsContainer
      totalRepos={repositories.totalCount}
      followers={followers.totalCount}
      following={following.totalCount}
      gists={gists.totalCount}
    />
  </div>
);
```

## Util Functions

And once we are done with the Stats container, we can start working on the charts, but since charts will need very specific data, first we will need to create some util functions to help us generate such data.

src/utils.ts

```ts
import { Repository } from './types';

/**
 * Calculates the top 5 most forked repositories
 * @param repositories Array of repository data from GitHub API
 * @returns Array of objects containing repository names and their fork counts
 * Example return: [{ repo: "react", count: 1000 }, { repo: "vue", count: 500 }]
 */
export const calculateMostForkedRepos = (
  repositories: Repository[]
): { repo: string; count: number }[] => {
  if (repositories.length === 0) {
    return [];
  }

  // Transform repository data into simplified objects containing only name and fork count
  const forkedRepos = repositories
    .map((repo) => ({
      repo: repo.name, // Extract repository name
      count: repo.forkCount, // Extract number of forks
    }))
    .sort((a, b) => b.count - a.count) // Sort by fork count in descending order
    .slice(0, 5); // Take only the top 5 repositories

  return forkedRepos;
};

/**
 * Calculates the top 5 most starred repositories
 * @param repositories Array of repository data from GitHub API
 * @returns Array of objects containing repository names and their star counts
 * Example return: [{ repo: "tensorflow", stars: 5000 }, { repo: "linux", stars: 4000 }]
 */
export const calculateMostStarredRepos = (
  repositories: Repository[]
): { repo: string; stars: number }[] => {
  if (repositories.length === 0) {
    return [];
  }

  // Transform repository data into simplified objects containing only name and star count
  const starredRepos = repositories
    .map((repo) => ({
      repo: repo.name, // Extract repository name
      stars: repo.stargazerCount, // Extract number of stars (stargazers)
    }))
    .sort((a, b) => b.stars - a.stars) // Sort by star count in descending order
    .slice(0, 5); // Take only the top 5 repositories

  return starredRepos;
};

/**
 * Calculates the top 5 most used programming languages across all repositories
 * @param repositories Array of repository data from GitHub API
 * @returns Array of objects containing language names and their occurrence count
 * Example return: [{ language: "JavaScript", count: 10 }, { language: "Python", count: 7 }]
 */

export const calculatePopularLanguages = (
  repositories: Repository[]
): { language: string; count: number }[] => {
  // Return empty array if no repositories are provided
  if (repositories.length === 0) {
    return [];
  }

  // Initialize a map to track how many times each language appears
  // Example: { "JavaScript": 5, "Python": 3, "TypeScript": 2 }
  const languageMap: { [key: string]: number } = {};

  repositories.forEach((repo) => {
    // Skip repositories with no languages
    if (repo.languages.edges.length === 0) {
      return;
    }

    // Iterate through each language in the repository
    // languages.edges comes from GitHub's GraphQL API structure
    repo.languages.edges.forEach((language) => {
      const { name } = language.node;
      // Increment the count for this language, initializing to 1 if it's the first occurrence
      languageMap[name] = (languageMap[name] || 0) + 1;
    });
  });

  // If no languages were found in any repository, return empty array
  if (Object.keys(languageMap).length === 0) {
    return [];
  }

  // Convert the language map into an array of objects and sort them
  return (
    Object.entries(languageMap)
      // Convert entries into array of [language, count] pairs
      .sort(([, a], [, b]) => b - a) // Sort by count in descending order
      .slice(0, 5) // Take only the top 5 languages
      .map(([language, count]) => ({ language, count }))
  ); // Transform into required object format
};
```

## Charts

- components/charts/UsedLanguages.tsx
- components/charts/PopularRepos.tsx
- components/charts/ForkedRepos.tsx

UserProfile.tsx

```tsx
{
  repositories.totalCount > 0 && (
    <div className='grid md:grid-cols-2 gap-4'>
      <UsedLanguages repositories={repositories.nodes} />
      <PopularRepos repositories={repositories.nodes} />
      <ForkedRepos repositories={repositories.nodes} />
    </div>
  );
}
```

## Used Languages

components/charts/UsedLanguages.tsx

```tsx
import { type Repository } from '@/types';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { calculatePopularLanguages } from '@/utils';

const UsedLanguages = ({ repositories }: { repositories: Repository[] }) => {
  // Calculate popular languages
  //  [{language: string, count: number}]
  const popularLanguages = calculatePopularLanguages(repositories);

  // Configuration for the chart's styling and labels
  // color sets the color of the bars

  const chartConfig = {
    language: {
      label: 'Language',
      color: '#2563eb',
    },
  } satisfies ChartConfig;
  return (
    <div>
      <h2 className='text-2xl font-semibold text-center mb-4'>
        Used Languages
      </h2>
      {/* ChartContainer handles responsive sizing and theme variables */}
      <ChartContainer config={chartConfig} className='h-100 w-full'>
        {/* BarChart is the main container for the bar chart visualization */}
        {/* accessibilityLayer adds ARIA labels for better screen reader support */}
        <BarChart accessibilityLayer data={popularLanguages}>
          {/* CartesianGrid adds horizontal guide lines */}
          <CartesianGrid vertical={false} />

          {/* XAxis configures the horizontal axis showing language names */}
          <XAxis
            dataKey='language'
            tickLine={false} // Removes tick marks
            tickMargin={10} // Adds spacing between labels and axis
          />

          {/* YAxis configures the vertical axis showing count values */}
          <YAxis dataKey='count' />

          {/* ChartTooltip shows details when hovering over bars */}
          <ChartTooltip content={<ChartTooltipContent />} />

          {/* Bar component defines how each data point is rendered */}
          {/* Uses CSS variable for color and adds rounded corners */}
          <Bar dataKey='count' fill='var(--color-language)' radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default UsedLanguages;
```

## Popular Repos

components/charts/PopularRepos.tsx

```tsx
import { type Repository } from '@/types';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { calculateMostStarredRepos } from '@/utils';

const PopularRepos = ({ repositories }: { repositories: Repository[] }) => {
  // Calculate most starred repositories and return array of {repo: string, stars: number}
  const popularRepos = calculateMostStarredRepos(repositories);

  // Configuration for the chart's styling and labels
  const chartConfig = {
    repo: {
      label: 'Repository',
      color: '#e11c47', // Red color for the bars
    },
  } satisfies ChartConfig;

  return (
    <div>
      <h2 className='text-2xl font-semibold text-center mb-4'>Popular Repos</h2>
      {/* ChartContainer: Custom wrapper component that handles responsive sizing and theme */}
      <ChartContainer config={chartConfig} className='h-100 w-full'>
        {/* BarChart: Main chart component from recharts */}
        {/* accessibilityLayer adds ARIA labels for better screen reader support */}
        <BarChart accessibilityLayer data={popularRepos}>
          {/* CartesianGrid: Adds horizontal guide lines (vertical disabled) */}
          <CartesianGrid vertical={false} />

          {/* XAxis: Horizontal axis showing repository names */}
          {/* tickFormatter truncates long repository names to 10 characters */}
          <XAxis
            dataKey='repo'
            tickLine={false}
            tickMargin={10}
            tickFormatter={(value) => value.slice(0, 10)}
          />

          {/* YAxis: Vertical axis showing star counts */}
          <YAxis dataKey='stars' />

          {/* ChartTooltip: Custom tooltip component that appears on hover */}
          {/* ChartTooltipContent: Renders the actual content inside the tooltip */}
          <ChartTooltip content={<ChartTooltipContent />} />

          {/* Bar: The actual bar elements of the chart */}
          {/* fill uses CSS variable for consistent theming */}
          {/* radius adds rounded corners to the bars */}
          <Bar dataKey='stars' fill='var(--color-repo)' radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default PopularRepos;
```

## Forked Repos

components/charts/ForkedRepos.tsx

```tsx
import { type Repository } from '@/types';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { calculateMostForkedRepos } from '@/utils';

const ForkedRepos = ({ repositories }: { repositories: Repository[] }) => {
  // Calculate most forked repositories and return array of {repo: string, count: number}
  const mostForkedRepos = calculateMostForkedRepos(repositories);

  // Define chart configuration for styling and labels
  const chartConfig = {
    repo: {
      label: 'Repository',
      color: '#facd12',
    },
  } satisfies ChartConfig;

  return (
    <div>
      <h2 className='text-2xl font-semibold text-center mb-4'>Forked Repos</h2>
      {/* ChartContainer handles responsive sizing and theme variables */}
      <ChartContainer config={chartConfig} className='h-100 w-full'>
        {/* BarChart is the main container for the bar chart visualization */}
        {/* accessibilityLayer adds ARIA labels for better screen reader support */}
        <BarChart accessibilityLayer data={mostForkedRepos}>
          {/* CartesianGrid adds background gridlines, vertical lines disabled */}
          <CartesianGrid vertical={false} />

          {/* XAxis configures the horizontal axis */}
          <XAxis
            dataKey='repo' // Uses 'repo' property from data for labels
            tickLine={true} // Shows small lines at each tick mark
            tickMargin={10} // Space between tick line and label
            axisLine={false} // Hides the main axis line
            tickFormatter={(value) => value.slice(0, 10)} // Truncates long repo names
          />

          {/* YAxis configures the vertical axis, showing fork counts */}
          <YAxis dataKey='count' />

          {/* ChartTooltip shows details when hovering over bars */}
          <ChartTooltip content={<ChartTooltipContent />} />

          {/* Bar component defines the actual bars in the chart */}
          {/* Uses CSS variable for color and rounded corners (radius) */}
          <Bar dataKey='count' fill='var(--color-repo)' radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ForkedRepos;
```

## Loading

src/components/user/Loading.tsx

```tsx
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Loading component that displays placeholder content while data is being fetched
 * Uses shadcn/ui's Skeleton component to create loading animations
 */
const Loading = () => {
  return (
    <div>
      {/* Large header skeleton
          - h-[194px]: Fixed height of 194px
          - w-full: Full width on mobile
          - lg:w-1/2: Half width on large screens
          - mb-8: Bottom margin of 2rem */}
      <Skeleton className='h-[194px] w-full lg:w-1/2 mb-8 rounded ' />

      {/* Grid container for smaller skeletons
          - grid-cols-1: Single column on mobile
          - lg:grid-cols-2: 2 columns on large screens
          - xl:grid-cols-4: 4 columns on extra large screens
          - gap-2: Small gap between grid items */}
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-2 mb-8'>
        {/* Four identical skeleton items
            - h-[70px]: Fixed height of 70px
            - rounded: Rounded corners */}
        <Skeleton className=' h-[70px] rounded' />
        <Skeleton className=' h-[70px] rounded' />
        <Skeleton className=' h-[70px] rounded' />
        <Skeleton className=' h-[70px] rounded' />
      </div>
    </div>
  );
};

export default Loading;
```

UserProfile.tsx

```tsx
if (loading) return <Loading />;
```
