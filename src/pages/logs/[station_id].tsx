import { format, compareAsc } from "date-fns";
import PtBR from "date-fns/locale/pt-BR";
import { SimpleGrid , Box, Input, Button } from '@chakra-ui/react';
import json from "../../../query_results-2021-12-08_81015.json";

import Chart from "../../components/Chart";
import { axiosInstance } from "../../services/axios";
import { useState } from "react";

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
  const [logs, setLogs] = useState([]);
  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());

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

  async function loadData() {
    try {
      // const {data} = await axiosInstance.get(`logs/5663b746-744a-40a4-a590-a7ac9abc48d8/2021-12-05T21:00:00.000Z/2021-12-06T01:00:00.000Z`)
      const {data} = await axiosInstance.get(`logs/5663b746-744a-40a4-a590-a7ac9abc48d8/${minDate.toISOString()}/${maxDate.toISOString()}`)
      
      console.log("chegou", data, minDate, maxDate);
    } catch {

    }
  }

  async function downloadCSV() {
    try {
      const {data} = await axiosInstance.get(`logs/5663b746-744a-40a4-a590-a7ac9abc48d8/${minDate.toISOString()}/${maxDate.toISOString()}/download`)

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.csv');
      document.body.appendChild(link);
      link.click();
    } catch {

    }
  }


  console.log(temperature);

  return (
  <Box>
    <SimpleGrid columns={{sm: 2, md: 4}} spacing={3} m="4" p="4" borderWidth='1px' borderRadius='lg' overflow='hidden' justifyContent="center">
      <Box maxW="10rem">
        <Input type="date" onChange={event => setMinDate(new Date(event.target.value))} />
      </Box>
      <Box maxW="10rem">
        <Input type="date" onChange={event => setMaxDate(new Date(event.target.value))}/>
      </Box>
      <Box>
        <Button onClick={loadData} colorScheme='blue'>Carregar</Button>
      </Box>
      <Box>
        <Button onClick={downloadCSV} colorScheme='blue'>Download CSV</Button>
      </Box>
    </SimpleGrid>
    <SimpleGrid columns={{sm: 1, lg: 2}} spacing={3}>  
      <Box p="1" m={{sm: 2, lg: 4}} borderWidth="1px" borderRadius="lg">
        <Chart dataSet={temperature} hasThree title="Temperatura" color="#5839" darkestColor="#5837" label="Temperatura (°C)"/>
      </Box>

      <Box p="1" m={{sm: 2, lg: 4}} borderWidth="1px" borderRadius="lg">
        <Chart dataSet={pressure} title="Pressão" color="#5839" darkestColor="#5837" label="Pressão (Pa)"/>
      </Box>

      <Box p="1" m={{sm: 2, lg: 4}} borderWidth="1px" borderRadius="lg">
        <Chart dataSet={humidity} hasThree title="Umidade" color="#5839" darkestColor="#5837" label="Umidade (%)"/>
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
  </Box>

  );
}


export default Logs