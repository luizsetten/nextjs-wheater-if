import { format, compareAsc } from "date-fns";
import PtBR from "date-fns/locale/pt-BR";
import { SimpleGrid , Box } from '@chakra-ui/react';
import json from "../../../query_results-2021-12-08_81015.json";

import Chart from "../../components/Chart";

type DataType = { // wind_direction, wind_speed, pressure
  reference_date: string | Date;
  value: number;
}

type DataTypeThree = DataType & { // temperature, humidity, precipitation, solar_incidence
  valueMin: number;
  valueMax: number;
}

const formatter = (date: Date): string => format(date, "kk'h' dd/MM/yy", { locale: PtBR});

function Logs() {
  const wind_direction: DataType[] = []; //[{reference_date: formatter(new Date()), value: 2}, {reference_date: formatter(new Date()), value: 2},{reference_date: formatter(new Date()), value: 2}];
  const wind_speed: DataType[] = []; //[{reference_date: formatter(new Date()), value: 2}, {reference_date: formatter(new Date()), value: 2},{reference_date: formatter(new Date()), value: 2}];
  const pressure: DataType[] = []; //[{reference_date: formatter(new Date()), value: 2}, {reference_date: formatter(new Date()), value: 2},{reference_date: formatter(new Date()), value: 2}];
  const temperature: DataTypeThree[] = [];
  const precipitation: DataTypeThree[] = [];
  const solar_incidence: DataTypeThree[] = [];
  const humidity: DataTypeThree[] = []; //[{reference_date: formatter(new Date()), value: 2, valueMax: 3, valueMin: 1}, {reference_date: formatter(new Date()), value: 2, valueMax: 3, valueMin: 1},{reference_date: formatter(new Date()), value: 2, valueMax: 3, valueMin: 1}];

  const ordered = json.sort((obj1, obj2) => {
    return compareAsc(new Date(obj1.reference_date), new Date(obj2.reference_date));
  });

  ordered.forEach(item => {
    wind_direction.push({
      value: item.wind_direction_avg,
      reference_date: formatter(new Date(item.reference_date))
    });

    wind_speed.push({
      value: item.wind_speed_avg,
      reference_date: formatter(new Date(item.reference_date))
    });

    pressure.push({
      value: item.pressure_avg,
      reference_date: formatter(new Date(item.reference_date))
    });

    temperature.push({
      reference_date: formatter(new Date(item.reference_date)),
      value: item.temperature_avg,
      valueMin: item.temperature_min,
      valueMax: item.temperature_max
    });

    precipitation.push({
      reference_date: formatter(new Date(item.reference_date)),
      value: item.precipitation_avg,
      valueMin: item.precipitation_min,
      valueMax: item.precipitation_max
    });

    solar_incidence.push({
      reference_date: formatter(new Date(item.reference_date)),
      value: item.solar_incidence_avg,
      valueMin: item.solar_incidence_min,
      valueMax: item.solar_incidence_max
    });

    humidity.push({
      reference_date: formatter(new Date(item.reference_date)),
      value: item.humidity_avg,
      valueMin: item.humidity_min,
      valueMax: item.humidity_max
    });
  });


  console.log(temperature);

  return (
  <SimpleGrid columns={{sm: 1, lg: 2}} spacing={3}>  
    <Box p="1" m={{sm: 2, lg: 4}} borderWidth="1px" borderRadius="lg">
      <Chart dataSet={temperature} hasThree title="Temperatura" color="#5839" darkestColor="#5837" label="Temperatura (°C)"/>
    </Box>

    <Box p="1" m={{sm: 2, lg: 4}} borderWidth="1px" borderRadius="lg">
      <Chart dataSet={pressure} title="Pressão" color="#5839" darkestColor="#5837" label="Pressão (Pa)"/>
    </Box>

    <Box p="1" m={{sm: 2, lg: 4}} borderWidth="1px" borderRadius="lg">
      <Chart dataSet={humidity} hasThree title="Humidade" color="#5839" darkestColor="#5837" label="Humidade (%)"/>
    </Box>

    <Box p="1" m={{sm: 2, lg: 4}} borderWidth="1px" borderRadius="lg">
      <Chart dataSet={precipitation} hasThree title="Precipitação" color="#5839" darkestColor="#5837" label="Graus em relação ao Norte (°)"/>
    </Box>

    <Box p="1" m={{sm: 2, lg: 4}} borderWidth="1px" borderRadius="lg">
      <Chart dataSet={solar_incidence} hasThree title="Incidência solar" color="#5839" darkestColor="#5837" label="Incidência Solar (W/m²)"/>
    </Box>

    <Box p="1" m={{sm: 2, lg: 4}} borderWidth="1px" borderRadius="lg">
      <Chart dataSet={wind_speed} title="Velocidade do vento" color="#5839" darkestColor="#5837" label="Velocidade (km/h)"/>
    </Box>

    <Box p="1" m={{sm: 2, lg: 4}} borderWidth="1px" borderRadius="lg">
      <Chart dataSet={wind_direction} title="Direção do vento" color="#5839" darkestColor="#5837" label="Graus em relação ao Norte (°)"/>
    </Box>
  </SimpleGrid >
  );
}


export default Logs