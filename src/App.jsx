import React from 'react'
import { DataPage, HomePage, LoginPage, SignUpPage, ProfilePage, RecordPage, RecordDetailPage} from './pages'
import { MainLayout } from './containers'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/record/:recordId' element={<MainLayout><RecordDetailPage /></MainLayout>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/profile' element={<MainLayout><ProfilePage /></MainLayout>} />
          <Route path='/data' element={<MainLayout><DataPage /></MainLayout>} />
          <Route path='/record' element={<MainLayout><RecordPage /></MainLayout>} />
          <Route path='*' element={<MainLayout><HomePage /></MainLayout>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App