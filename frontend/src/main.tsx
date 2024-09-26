import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { routes } from './App.tsx'
import './index.css';
import Modal from './components/modal/modal.tsx';
import { Provider } from 'react-redux';
import store from './utils/store.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Modal />
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>,
)
