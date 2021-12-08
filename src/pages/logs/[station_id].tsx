import { format } from "date-fns";
import PtBR from "date-fns/locale/pt-BR";
import { SimpleGrid , Box } from '@chakra-ui/react';

import Chart from "../../components/Chart";

type DataType = {
  created_at: string | Date;
  value: number;
}

const formatter = (date: Date): string => format(date, "kk'h' dd/MM/yy", { locale: PtBR});

function Logs() {
  const data: DataType[] = [{created_at: formatter(new Date()), value: 2}, {created_at: formatter(new Date()), value: 2},{created_at: formatter(new Date()), value: 2}];

  return (
  <SimpleGrid columns={{sm: 1, lg: 2}} spacing={3}>  
    <Box p="1" m={{sm: 2, lg: 4}} borderWidth="1px" borderRadius="lg">
      <Chart dataSet={data} title="Grafico bonitoso" color="#5839" darkestColor="#5837" label="Temperatura (°C)"/>
    </Box>

    <Box p="1" m={{sm: 2, lg: 4}} borderWidth="1px" borderRadius="lg">
      <Chart dataSet={data} title="Grafico bonitoso" color="#5839" darkestColor="#5837" label="Temperatura"/>
    </Box>

    <Box p="1" m={{sm: 2, lg: 4}} borderWidth="1px" borderRadius="lg">
      <Chart dataSet={data} title="Grafico bonitoso" color="#5839" darkestColor="#5837" label="Temperatura"/>
    </Box>

    <Box p="1" m={{sm: 2, lg: 4}} borderWidth="1px" borderRadius="lg">
      <Chart dataSet={data} title="Grafico bonitoso" color="#5839" darkestColor="#5837" label="Temperatura"/>
    </Box>

    <Box p="1" m={{sm: 2, lg: 4}} borderWidth="1px" borderRadius="lg">
      <Chart dataSet={data} title="Grafico bonitoso" color="#5839" darkestColor="#5837" label="Temperatura"/>
    </Box>
  </SimpleGrid >
  );
}


export default Logs