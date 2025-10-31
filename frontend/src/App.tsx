import { RecoilRoot } from 'recoil'
import { FC, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from 'pages/Router'
import { useSetRecoilState } from 'recoil'
import { tokenAtom } from 'store/TokenAtom'

// Component to initialize authentication state
const AuthInitializer: FC = () => {
  const setToken = useSetRecoilState(tokenAtom);

  useEffect(() => {
    // Restore token from localStorage on app initialization
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, [setToken]);

  return null;
};

const App: FC = () => {

  return (
    <BrowserRouter>
      <RecoilRoot>
        <AuthInitializer />
          <Router />
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App
