import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { DataPage, HomePage, LoginPage, SignUpPage, ProfilePage, RecordPage, RecordDetailPage} from './pages'
import { ProtectedMainLayout } from './containers'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/record/:recordId' element={<ProtectedMainLayout><RecordDetailPage /></ProtectedMainLayout>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/profile' element={<ProtectedMainLayout><ProfilePage /></ProtectedMainLayout>} />
            <Route path='/data' element={<ProtectedMainLayout><DataPage /></ProtectedMainLayout>} />
            <Route path='/record' element={<ProtectedMainLayout><RecordPage /></ProtectedMainLayout>} />
            <Route path='*' element={<ProtectedMainLayout><HomePage /></ProtectedMainLayout>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App