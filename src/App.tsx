import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import Quotes from "./components/quotes/quotes";
import About from "./components/about/about";
import "./app.scss";

const App = () => {
	return (
		<div className="body">
			<div className="menu">
				<NavLink exact to="/" className="link" activeClassName="active">
					О приложении
				</NavLink>
				<NavLink to="/quotes/1" className="link" activeClassName="active">
					Котировки А
				</NavLink>
				<NavLink to="/quotes/2" className="link" activeClassName="active">
					Котировки Б
				</NavLink>
			</div>
			<div className="content">
				<div className="scroll">
					<Switch>
						<Route path="/quotes/:id" render={() => <Quotes />} />
						<Route path="/quotes" render={() => <Quotes />} />
						<Route exact path="/" render={() => <About />} />
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default App;
