import Router from './Routes/Router';
import './App.css';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// pick a date util library
import DateFnsUtils from '@date-io/date-fns';
import AutoLogout from './component/AutoLogout';




function App() {
  AutoLogout();
  return (
    <div className="App">
       <MuiPickersUtilsProvider utils={DateFnsUtils}>
       <Router />
       </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
