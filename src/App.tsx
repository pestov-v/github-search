import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import style from './App.module.scss';
import SearchScreen from './pages/SearchScreen/SearchScreen';
import UserScreen from './pages/UserScreen/UserScreen';

function App() {
  return (
    <main className={style.main}>
      <h1 className={style.title}>GitHub Searcher</h1>
      <Switch>
        <Route exact path='/' component={SearchScreen} />
        <Route exact path='/user/:login' component={UserScreen} />
        <SearchScreen />
        <Redirect to='/' />
      </Switch>
    </main>
  );
}

export default App;
