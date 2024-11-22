'use client';

import { useState } from 'react';
import { BarChart, Card, Divider, Switch } from '@tremor/react';

const data = [
  { mes: 'enero', ingresos: 45900, total_vendido: 1200 },
  { mes: 'febrero', ingresos: 42100, total_vendido: 1100 },
  { mes: 'marzo', ingresos: 50000, total_vendido: 1300 },
  { mes: 'abril', ingresos: 47000, total_vendido: 1250 },
  { mes: 'mayo', ingresos: 52000, total_vendido: 1400 },
  { mes: 'junio', ingresos: 51000, total_vendido: 1350 },
  { mes: 'julio', ingresos: 46000, total_vendido: 1200 },
  { mes: 'agosto', ingresos: 47500, total_vendido: 1250 },
  { mes: 'septiembre', ingresos: 49500, total_vendido: 1300 },
  { mes: 'octubre', ingresos: 52000, total_vendido: 1400 },
  { mes: 'noviembre', ingresos: 54000, total_vendido: 1450 },
  { mes: 'diciembre', ingresos: 56000, total_vendido: 1500 },
];

function valueFormatter(number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
}

export default function UpVentas() {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div>
      <Card className="bg-slate-50 shadow-xl">
        <h3 className="mr-1 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Productos más vendidos
        </h3>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Ingresos y total vendido por mes en el año actual
        </p>
        <BarChart
          data={data}
          index="mes"
          categories={showComparison ? ['ingresos', 'total_vendido'] : ['ingresos']}
          colors={showComparison ? ['green', 'blue'] : ['green']}
          valueFormatter={valueFormatter}
          yAxisWidth={80}
          className="mt-6 h-80"
        />
      </Card>
    </div>
  );
}

