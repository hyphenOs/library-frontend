import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Books from "./pages/books/components/Books";
// import Members from "./pages/members/components/Members";
import Dashboard from "./pages/dashboard/components/Dashboard";
import { Button } from "@material-ui/core";

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <Button>
              <Link to="/">Dashboard</Link>
            </Button>
            <Button>
              <Link to="/books">Books</Link>
            </Button>
            {/* <Button><Link to="/members">Members</Link></Button> */}
          </nav>

          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/books" component={Books} />
            {/* <Route path="/members" component={Members} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}
