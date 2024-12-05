'use client';

import { Card, LineChart, List, ListItem } from '@tremor/react';
import { useMemo } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const rawData = [
  {
    "nombre": "Paracetamol 500mg",
    "marca": "Novartis",
    "ventasAnuales": 3600,
    "ventasPorMes": {
      "enero": 300, "febrero": 280, "marzo": 310, "abril": 290, "mayo": 300, "junio": 310,
      "julio": 320, "agosto": 300, "septiembre": 280, "octubre": 310, "noviembre": 290, "diciembre": 310
    }
  },
  {
    "nombre": "Gotas Ocularis",
    "marca": "Alcon",
    "ventasAnuales": 2400,
    "ventasPorMes": {
      "enero": 200, "febrero": 190, "marzo": 210, "abril": 200, "mayo": 190, "junio": 210,
      "julio": 220, "agosto": 200, "septiembre": 190, "octubre": 210, "noviembre": 200, "diciembre": 210
    }
  },
  {
    "nombre": "Vitamina C 1000mg",
    "marca": "Solgar",
    "ventasAnuales": 3600,
    "ventasPorMes": {
      "enero": 300, "febrero": 310, "marzo": 320, "abril": 310, "mayo": 320, "junio": 300,
      "julio": 310, "agosto": 320, "septiembre": 310, "octubre": 320, "noviembre": 300, "diciembre": 320
    }
  }
];

const valueFormatter = (number) =>
  new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(number);

const statusColor = {
  "Paracetamol 500mg": 'bg-blue-500',
  "Gotas Ocularis": 'bg-violet-500',
  "Vitamina C 1000mg": 'bg-fuchsia-500',
};

export default function TrendVentas() {
  const data = useMemo(() => {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return months.map((month, index) => ({
      mes: month,
      "Paracetamol 500mg": rawData[0].ventasPorMes[month],
      "Gotas Ocularis": rawData[1].ventasPorMes[month],
      "Vitamina C 1000mg": rawData[2].ventasPorMes[month],
    }));
  }, []);

  const summary = useMemo(() => 
    rawData.map(product => ({
      name: product.nombre,
      value: product.ventasAnuales,
    }))
  , []);

  return (
    <Card className="sm:mx-auto bg-slate-50 shadow-xl">
      <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Tendencia de productos
      </h3>
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Ventas mensuales de los productos más populares
      </p>
      <LineChart
        data={data}
        index="mes"
        categories={rawData.map(product => product.nombre)}
        colors={['blue', 'violet', 'fuchsia']}
        valueFormatter={valueFormatter}
        showLegend={true}
        showYAxis={true}
        yAxisWidth={50}
        minValue={150}
        maxValue={350}
        showAnimation={true}
        curveType="natural"
        className="mt-6 h-80"
      />
      {/* <List className="mt-4">
        {summary.map((item) => (
          <ListItem key={item.name}>
            <div className="flex items-center space-x-2">
              <span
                className={classNames(statusColor[item.name], 'h-0.5 w-3')}
                aria-hidden={true}
              />
              <span>{item.name}</span>
            </div>
            <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {valueFormatter(item.value)}
            </span>
          </ListItem>
        ))}
      </List> */}
    </Card>
  );
}

