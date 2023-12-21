import './app.css'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import Calendario from './components/calendario/Calendario';

function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className='app'>
        <Calendario />
      </div>
    </LocalizationProvider>
  );
}

export default App;
