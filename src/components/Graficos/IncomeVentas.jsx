'use client';

import { AreaChart, Card, List, ListItem } from '@tremor/react';
import React, { useMemo } from 'react';

const rawData = {
  "enero": { "total_vendido": 1200, "ingresos": 45900, "margen_beneficio": 45 },
  "febrero": { "total_vendido": 1100, "ingresos": 42100, "margen_beneficio": 40 },
  "marzo": { "total_vendido": 1300, "ingresos": 50000, "margen_beneficio": 48 },
  "abril": { "total_vendido": 1250, "ingresos": 47000, "margen_beneficio": 46 },
  "mayo": { "total_vendido": 1400, "ingresos": 52000, "margen_beneficio": 50 },
  "junio": { "total_vendido": 1350, "ingresos": 51000, "margen_beneficio": 47 },
  "julio": { "total_vendido": 1200, "ingresos": 46000, "margen_beneficio": 44 },
  "agosto": { "total_vendido": 1250, "ingresos": 47500, "margen_beneficio": 45 },
  "septiembre": { "total_vendido": 1300, "ingresos": 49500, "margen_beneficio": 48 },
  "octubre": { "total_vendido": 1400, "ingresos": 52000, "margen_beneficio": 50 },
  "noviembre": { "total_vendido": 1450, "ingresos": 54000, "margen_beneficio": 52 },
  "diciembre": { "total_vendido": 1500, "ingresos": 56000, "margen_beneficio": 55 }
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const valueFormatter = (number) => 
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(number);

const statusColor = {
  Ingresos: 'bg-blue-500',
};

export default function IncomeVentas() {
  const data = useMemo(() => {
    return Object.entries(rawData).map(([month, values]) => ({
      mes: month,
      Ingresos: values.ingresos,
    }));
  }, []);

  const totalIncome = useMemo(() => {
    return Object.values(rawData).reduce((sum, month) => sum + month.ingresos, 0);
  }, []);

  const summary = [
    {
      name: 'Ingresos',
      value: totalIncome,
    },
  ];

  return (
    <Card className="bg-slate-50 shadow-xl">
      <h3 className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Ingresos Mensuales
      </h3>
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Ingresos mensuales de los productos durante el año.
      </p>
      <AreaChart
        data={data}
        index="mes"
        categories={['Ingresos']}
        colors={['blue']}
        valueFormatter={valueFormatter}
        showLegend={false}
        showYAxis={true}
        showGradient={true}
        startEndOnly={true}
        className="mt-6 h-64"
      />
      <List className="mt-4 pt-2">
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
      </List>
    </Card>
  );
}

