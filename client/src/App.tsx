import { Route, Routes } from 'react-router'
import { SiteLayout } from './components/SiteLayout'
import { GamesPage } from './pages/GamesPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { WaterSortPuzzlePage } from './pages/games/WaterSortPuzzle'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="games" element={<GamesPage />} />
        <Route path="games/water-sort-puzzle" element={<WaterSortPuzzlePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
