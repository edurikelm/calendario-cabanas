import './app.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import Calendario from './components/calendario/Calendario';
import { es } from 'date-fns/locale';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Calendario />
    </LocalizationProvider>
  );
}

export default App;
