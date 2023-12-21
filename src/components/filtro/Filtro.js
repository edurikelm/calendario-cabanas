import { cabanas } from "../../helpers/constantes";
import { ordenarDataArriendos } from "../../helpers/funciones";
import { getArriendosPorCabana } from "../../helpers/funcionesFirebase";

const Filtro = ({setEventos}) => {

  const handleChangeOption = async (e) => {
    const value = e.target.value
    const cabanasFiltradas = await getArriendosPorCabana(value)
    setEventos(ordenarDataArriendos(cabanasFiltradas))
  }

 

  return (
    <div>
      <select name="filtro" onChange={handleChangeOption}>
        <option value="Todos">Todos</option>
        {
          cabanas.map((item, index) => (<option key={index} value={item}>{item}</option>))
        }
      </select>
    </div>
  );
}

export default Filtro;
