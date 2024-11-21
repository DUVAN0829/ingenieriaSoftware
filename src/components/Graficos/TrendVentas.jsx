// 'use client';

import { Card, LineChart, List, ListItem } from '@tremor/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const data = [
  {
    date: 'Jan 23',
    Acetaminofen: 232,
    Advil: 0,
    Naproxeno: 49,
  },
  {
    date: 'Feb 23',
    Acetaminofen: 241,
    Advil: 0,
    Naproxeno: 61,
  },
  {
    date: 'Mar 23',
    Acetaminofen: 291,
    Advil: 0,
    Naproxeno: 55,
  },
  {
    date: 'Apr 23',
    Acetaminofen: 101,
    Advil: 0,
    Naproxeno: 21,
  },
  {
    date: 'May 23',
    Acetaminofen: 318,
    Advil: 0,
    Naproxeno: 66,
  },
  {
    date: 'Jun 23',
    Acetaminofen: 205,
    Advil: 0,
    Naproxeno: 69,
  },
  {
    date: 'Jul 23',
    Acetaminofen: 372,
    Advil: 0,
    Naproxeno: 55,
  },
  {
    date: 'Aug 23',
    Acetaminofen: 341,
    Advil: 0,
    Naproxeno: 74,
  },
  {
    date: 'Sep 23',
    Acetaminofen: 387,
    Advil: 120,
    Naproxeno: 190,
  },
  {
    date: 'Oct 23',
    Acetaminofen: 220,
    Advil: 0,
    Naproxeno: 89,
  },
  {
    date: 'Nov 23',
    Acetaminofen: 372,
    Advil: 0,
    Naproxeno: 44,
  },
  {
    date: 'Dec 23',
    Acetaminofen: 321,
    Advil: 0,
    Naproxeno: 93,
  },
];

const summary = [
  {
    name: 'Acetaminofen',
    value: 3273,
  },
  {
    name: 'Advil',
    value: 120,
  },
  {
    name: 'Naproxeno',
    value: 866,
  },
];

const valueFormatter = (number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

const statusColor = {
  Acetaminofen: 'bg-blue-500',
  Advil: 'bg-violet-500',
  Naproxeno: 'bg-fuchsia-500',
};

export default function TrendVentas() {
  return (
    <>
      <Card className="sm:mx-auto  bg-slate-50 shadow-xl">
        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Tendencia de productos
        </h3>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Productos con popularidad con momento determinado
        </p>
        <LineChart
          data={data}
          index="date"
          categories={['Acetaminofen', 'Advil', 'Naproxeno']}
          colors={['blue', 'violet', 'fuchsia']}
          valueFormatter={valueFormatter}
          showLegend={false}
          showYAxis={false}
          startEndOnlyAcetaminofen
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