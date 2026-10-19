import { BrowserRouter, Route, Routes } from 'react-router'
import { GamesPage } from '@/features/games-catalog/GamesPage'
import { HomePage } from '@/features/home/HomePage'
import { WaterSortPage } from '@/features/water-sort/WaterSortPage'
import { NotFoundPage } from './NotFoundPage'
import { SiteLayout } from './SiteLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="games/water-sort-puzzle" element={<WaterSortPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
