import { RecoilRoot } from 'recoil'
import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from 'pages/Router'

const App: FC = () => {

  return (
    <BrowserRouter>
      <RecoilRoot>
        <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
          <Router />
        </div>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App
