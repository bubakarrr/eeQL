import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../eeQL/src/components/Home/Home'
import CodeEditor from '../../eeQL/src/components/CodeEditor/CodeEditor'
import Directory from '../../eeQL/src/components/Directory/Directory'

const App = () => (
      <div>
         <CodeEditor/>
         <Directory/>
         <Switch>
            <Route exact path='/' component={Home} />
         </Switch>
      </div>
);

export default App;
