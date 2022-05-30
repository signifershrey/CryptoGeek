import { makeStyles } from '@material-ui/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header'
import HomePage from './Pages/HomePage';
import CoinPage from "./Pages/CoinPage";
import Alert from './components/Alert';

const userStyles = makeStyles({
  App:{
    backgroundColor : '#14161a',
    color:'white',
    minHeight : '100vh'
  }
})

function App() {
  const classes = userStyles();
  return (
    <div className={classes.App}>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/coins/:id' element={<CoinPage/>}/>
    </Routes>
    <Alert/>
    </BrowserRouter>
    </div>
  );
}

export default App;
