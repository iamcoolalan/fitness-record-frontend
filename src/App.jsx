import React from 'react'
import { DataPage, HomePage, LoginPage, SignUpPage, ProfilePage, RecordPage} from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignUpPage />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='data' element={<DataPage />} />
          <Route path='record' element={<RecordPage />} />
          <Route path='*' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App