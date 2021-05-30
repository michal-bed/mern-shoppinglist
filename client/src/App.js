//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from "./components/ItemModal";
import { Container } from 'reactstrap';
import store from './redux/store'
import { Provider } from 'react-redux'
import { loadUser } from './redux/authActions';
import { useEffect } from 'react';

function App() {
  
  useEffect (() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          {/* <h1>Hello! Welcome to Michał's site!</h1> */}
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
