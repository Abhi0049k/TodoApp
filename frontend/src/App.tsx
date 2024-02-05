import { RecoilRoot } from 'recoil'
import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from 'pages/Router'

const App: FC = () => {

  return (
    <BrowserRouter>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App
