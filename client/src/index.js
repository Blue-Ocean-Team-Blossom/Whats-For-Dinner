import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { RootProvider } from './state_&_contexts/RootContext';

ReactDOM.render(
  <RootProvider>
    <App />
  </RootProvider>,
  document.getElementById('app'),
);
