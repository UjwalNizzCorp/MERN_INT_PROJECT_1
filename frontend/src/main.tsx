import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'

createRoot(document.getElementById('root')!).render(
<BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {/* <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit" element={<EditProfile />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
)
