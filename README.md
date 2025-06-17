<p align="center">
    <img alt="  <picture>
" src="./screenshot.png">
  </picture>
</p>

# GitHub Repositories Explorer

A modern React TypeScript application that allows users to search for GitHub users and explore their public repositories. Built with React Context API, Material-UI, Framer Motion, and powered by the GitHub API.

## 🚀 Features

- **User Search**: Search for GitHub users by username
- **Repository Explorer**: View user's public repositories with detailed information
- **Responsive Design**: Fully responsive interface built with Material-UI
- **Smooth Animations**: Enhanced user experience with Framer Motion animations
- **Loading States**: Skeleton loaders for better UX during data fetching
- **Expandable Interface**: Click on users to expand and view their repositories
- **Pagination**: Load more repositories with pagination support

## 🛠️ Tech Stack

### Core Technologies

- **React 19.1.0** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### UI & Styling

- **Material-UI (MUI) 7.1.1** - React component library
- **Emotion** - CSS-in-JS styling solution
- **Framer Motion 12.18.1** - Animation library
- **Plus Jakarta Sans** - Modern typography

### State Management

- **React Context API** - Global state management
- **Custom Hooks** - Reusable stateful logic

### API & Data Fetching

- **Octokit/REST 22.0.0** - Official GitHub API client

### Development Tools

- **Vitest** - Fast unit testing framework
- **Testing Library** - React component testing utilities
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

### Utilities

- **Lodash** - Utility functions (debouncing, etc.)

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager
- **GitHub Personal Access Token** (for API access)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/github-repositories-explorer.git
cd github-repositories-explorer
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add your GitHub Personal Access Token:

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token_here
```

**How to get a GitHub Personal Access Token:**

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Select scopes: `public_repo` and `read:user`
4. Copy the generated token and paste it in your `.env` file

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 📁 Project Structure

```
github-repositories-explorer/
├── public/                     # Static assets
│   └── vite.svg
├── src/
│   ├── assets/                 # Images, icons, and static files
│   │   └── icons/             # SVG icons
│   ├── components/            # React components
│   │   ├── app-context-provider.tsx
│   │   ├── github-context-provider.tsx
│   │   ├── github-repositories-explorer.tsx
│   │   ├── github-repository-item.tsx
│   │   ├── github-user-item.tsx
│   │   ├── header.tsx
│   │   ├── searcbar.tsx
│   │   └── *.test.tsx         # Component tests
│   ├── contexts/              # React Context definitions
│   │   ├── app.context.tsx
│   │   ├── github.context.tsx
│   │   └── index.ts
│   ├── hooks/                 # Custom React hooks
│   │   ├── useApp.hook.ts
│   │   ├── useGithub.hook.ts
│   │   └── index.ts
│   ├── plugins/               # Third-party integrations
│   │   ├── @mui/              # Material-UI theme configuration
│   │   ├── axios/             # Axios configuration
│   │   └── octokit/           # GitHub API client setup
│   ├── services/              # API services and data fetching
│   │   └── github.api.ts
│   ├── test/                  # Test configuration
│   │   └── setup.ts
│   ├── types/                 # TypeScript type definitions
│   │   ├── app.d.ts
│   │   └── github.d.ts
│   ├── App.tsx                # Main App component
│   ├── main.tsx               # Application entry point
│   └── vite-env.d.ts          # Vite environment types
├── dist/                      # Production build output
├── node_modules/              # Dependencies
├── .env                       # Environment variables (create this)
├── eslint.config.js           # ESLint configuration
├── package.json               # Project dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── README.md                  # Project documentation
```

## 🏗️ Architecture Overview

### State Management

The application uses **React Context API** for global state management with two main contexts:

1. **AppContext** (`src/contexts/app.context.tsx`)

   - Manages application-wide settings (theme, etc.)
   - Provides `isDark` state for theme switching

2. **GithubContext** (`src/contexts/github.context.tsx`)
   - Manages GitHub-related data and state
   - Handles users list, repositories, loading states, and UI interactions

### Component Hierarchy

```
App
├── AppContextProvider
│   ├── GithubContextProvider
│   │   ├── MuiThemeProvider
│   │   │   ├── Header
│   │   │   └── GithubRepositoriesExplorer
│   │   │       ├── SearchBar
│   │   │       └── GithubUserItem[]
│   │   │           └── GithubRepositoryItem[]
```

### Data Flow

1. User types in the search bar (debounced input)
2. `GitHubApi.fetchSearchUsers()` is called
3. Results are stored in `GithubContext`
4. User clicks on a user item
5. `GitHubApi.fetchRepositories()` fetches user's repositories
6. Repositories are displayed with expand/collapse animation

### API Integration

- **GitHub REST API** via Octokit client
- **Search Users**: `/search/users` endpoint
- **User Repositories**: `/users/{username}/repos` endpoint
- **User Data**: `/user/{account_id}` endpoint for repository count

## 🎯 Usage

1. **Search for Users**: Type a GitHub username in the search bar
2. **View Results**: Up to 5 matching users will be displayed
3. **Explore Repositories**: Click on any user to expand and view their repositories
4. **Load More**: Use "Load More" button to fetch additional repositories
5. **Visit GitHub**: Click the arrow icon to open the user's GitHub profile

## 🧪 Testing

The project includes comprehensive unit tests using **Vitest** and **Testing Library**:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm run test src/components/github-user-item.test.tsx
```

### Test Coverage

- Component rendering and interactions
- API service mocking
- Context provider functionality
- User event handling

## 🔧 Key Features Explained

### Search Functionality

- **Debounced Search**: Uses Lodash debounce to prevent excessive API calls
- **Real-time Results**: Updates results as you type
- **Error Handling**: Graceful handling of API errors and rate limits

### Repository Display

- **Expandable Cards**: Smooth animations using Framer Motion
- **Pagination**: Load repositories in chunks of 10
- **Repository Details**: Shows name, description, language, stars, and forks
- **Empty States**: Handles users with no public repositories

### Performance Optimizations

- **React.memo**: Prevents unnecessary re-renders of user items
- **useCallback**: Optimizes event handlers and API calls
- **useMemo**: Caches computed values like pagination logic
- **Skeleton Loading**: Provides visual feedback during data fetching

### Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Breakpoint System**: Uses Material-UI's responsive breakpoints
- **Flexible Layouts**: Adapts to different screen sizes

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy the dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new components
- Use Material-UI components when possible
- Follow the existing code structure and naming conventions
- Run `npm run lint` and `npm run format` before committing

## 📝 Environment Variables

| Variable            | Description                  | Required |
| ------------------- | ---------------------------- | -------- |
| `VITE_GITHUB_TOKEN` | GitHub Personal Access Token | Yes      |

## 🐛 Known Issues

- GitHub API rate limiting (60 requests per hour for unauthenticated requests)
- Some users might have private repositories that won't be displayed

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing the data
- [Material-UI](https://mui.com/) for the beautiful components
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Vite](https://vitejs.dev/) for the fast development experience

## 👨‍💻 Author
Made with ❤️ by [Rizki Muhamad s](https://github.com/hiriski).
