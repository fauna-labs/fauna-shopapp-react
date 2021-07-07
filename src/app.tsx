import React, { FC } from 'react'
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './queryClient'
import { SessionProvider } from './components/session'
import { Home } from './components/home'
import { SignIn } from './components/signIn'
import { Cart } from './components/cart'

export const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <SessionProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/cart" component={Cart} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </SessionProvider>
  </QueryClientProvider>
)
