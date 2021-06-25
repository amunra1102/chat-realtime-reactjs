import { Route, Switch, BrowserRouter } from 'react-router-dom';

import AppProvider from './context/app-provider';
import AuthProvider from './context/auth-provider';

import { Login, ChatRoom, AddRoomModal, InviteMemberModal } from './components';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route component={Login} path='/login' />
            <Route component={ChatRoom} path='/' />
          </Switch>
          <AddRoomModal />
          <InviteMemberModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
