import { format } from "date-fns";
import PtBR from "date-fns/locale/pt-BR"

import Chart from "../../components/Chart";

type DataType = {
  created_at: string | Date;
  value: number;
}

const formatter = (date: Date): string => format(date, "kk'h' dd/MM/yy", { locale: PtBR});


function Logs() {
  const data: DataType[] = [{created_at: formatter(new Date()), value: 2}, {created_at: formatter(new Date()), value: 2},{created_at: new Date(), value: 2}];

  return (
  <div style={{ display: "flex"}}>  
    <Chart dataSet={data} title="Grafico bonitoso" color="#5839" darkestColor="#5837" label="Temperatura"/>
    <Chart dataSet={data} title="Grafico bonitoso" color="#5839" darkestColor="#5837" label="Temperatura"/>
    <Chart dataSet={data} title="Grafico bonitoso" color="#5839" darkestColor="#5837" label="Temperatura"/>
  </div>
  );
}


export default Logs