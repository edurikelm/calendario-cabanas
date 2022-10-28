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
        <option value="Regional Uno">Regional Uno</option>
        <option value="Regional Dos">Regional Dos</option>
        <option value="Regional Tres">Regional Tres</option>
        <option value="Teja Uno">Teja Uno</option>
        <option value="Teja Dos">Teja Dos</option>
      </select>
    </div>
  );
}

export default Filtro;
