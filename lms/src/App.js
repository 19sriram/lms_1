
import LayoutComp from './components/layout/Layout';
import { useHistory } from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';
import { LoginComponent } from './components/login/Login';
import {RouterComponent} from './components/router/Router';
function App() {
  const history = useHistory();
  return (
    <div className="App">
      <RouterComponent/>
    {/* <SiderComponent/>
    <LoginComponent/> */}
    </div>
  );
}

export default App;
