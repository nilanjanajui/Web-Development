import { lazy, Suspense, createElement } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Layout from "./components/Layout";
import SparkleTrail from "./components/SparkleTrail";
import { CharactersProvider } from "./context/CharactersContext";

const Home = lazy(() => import("./components/home/Home"));
const Movies = lazy(() => import("./components/movies/Movies"));
const Characters = lazy(() => import("./components/characterdir/Characters"));
const FavCharacters = lazy(() => import("./components/characterdir/favcharacters/FavCharacters"));
const CharacterProfile = lazy(() => import("./components/characterdir/characterprofile/CharacterProfile"));
const WizardStats = lazy(() => import("./components/wizardstats/WizardStats"));
const NotFound = lazy(() => import("./components/NotFound"));
const SortingHat = lazy(() => import("./components/SortingHat"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center">
      <span className="material-symbols-outlined text-primary text-5xl animate-spin">
        autorenew
      </span>
    </div>
  );
}

function withSuspense(Component) {
  return (
    <Suspense fallback={<PageLoader />}>
      {createElement(Component)}
    </Suspense>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <CharactersProvider>
      <SparkleTrail spawnRate={3} />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={withSuspense(Home)} />
            <Route path="/movies" element={withSuspense(Movies)} />
            <Route path="/characters" element={withSuspense(Characters)} />
            <Route path="/characters/:name" element={withSuspense(CharacterProfile)} />
            <Route path="/favorites" element={withSuspense(FavCharacters)} />
            <Route path="/stats" element={withSuspense(WizardStats)} />
            <Route path="/sorting-hat" element={withSuspense(SortingHat)} />
            <Route path="*" element={withSuspense(NotFound)} />
          </Route>
        </Routes>
      </Router>
      </CharactersProvider>
    </FavoritesProvider>
  );
}