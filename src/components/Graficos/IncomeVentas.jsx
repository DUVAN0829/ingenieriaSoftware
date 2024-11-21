// 'use client';

import { AreaChart, Card, List, ListItem } from '@tremor/react';
import React from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const data = [
  {
    date: 'Jan 23',
    Ingresos: 232,
  },
  {
    date: 'Feb 23',
    Ingresos: 241,
  },
  {
    date: 'Mar 23',
    Ingresos: 291,
  },
  {
    date: 'Apr 23',
    Ingresos: 101,
  },
  {
    date: 'May 23',
    Ingresos: 318,
  },
  {
    date: 'Jun 23',
    Ingresos: 205,
  },
  {
    date: 'Jul 23',
    Ingresos: 372,
  },
  {
    date: 'Aug 23',
    Ingresos: 341,
  },
  {
    date: 'Sep 23',
    Ingresos: 387,
  
  },
  {
    date: 'Oct 23',
    Ingresos: 220,
  },
  {
    date: 'Nov 23',
    Ingresos: 372,
  },
  {
    date: 'Dec 23',
    Ingresos: 321,
  },
];

const summary = [
  {
    name: 'Ingresos',
    value: 3273,
  },
];



const valueFormatter = (number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

const statusColor = {
  Ingresos: 'bg-blue-500',
 
};




export default function IncomeVentas() {
  return (
    <>
      <Card className="sm:mx-auto h-full  sm:max-w-lg bg-slate-50 shadow-xl">
        <h3 className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Ingreso Mensuales
        </h3>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Ingreso mensuales de los productos.
        </p>
        <AreaChart
          data={data}
          index="date"
          categories={['Ingresos', 'Sponsored']}
          colors={['blue', 'violet']}
          valueFormatter={valueFormatter}
          showLegend={false}
          showYAxis={false}
          showGradient={false}
          startEndOnly={false}
          className="mt-6 h-32"
        />
        <List className="mt-2">
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
    </>
  );
}



