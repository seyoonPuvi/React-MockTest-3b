import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './component/Home'
import CourseItemDetails from './component/CourseItemDetails'
import NotFound from './component/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseItemDetails} />
    <Route exact path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
