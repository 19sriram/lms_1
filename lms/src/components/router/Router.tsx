
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";
import LayoutComp from "../layout/Layout";
import { LoginComponent } from "../login/Login";
import {Protected} from './Protected';

export const RouterComponent=()=> {
  return (
    <BrowserRouter>
      <div>
        <Switch>
        <Route exact path="/" component={LoginComponent} />
          <Protected exact path="/layout" component={LayoutComp} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}


