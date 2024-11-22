'use client';

import { useState, useMemo } from 'react';
import { BarChart, Card, Divider, Switch } from '@tremor/react';

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

function valueFormatter(number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
}

export default function LowerVentas() {
  const [showComparison, setShowComparison] = useState(false);

  const data = useMemo(() => {
    const sortedData = Object.entries(rawData)
      .sort(([, a], [, b]) => a.total_vendido - b.total_vendido)
      .slice(0, 6)
      .map(([mes, valores]) => ({
        mes,
        total_vendido: valores.total_vendido,
        ingresos: valores.ingresos
      }));
    return sortedData;
  }, []);

  return (
    <div>
      <Card className="bg-slate-50 shadow-xl">
        <h3 className="mr-1 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Productos menos vendidos
        </h3>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Los 6 meses con menos ventas en el año actual
        </p>
        <BarChart
          data={data}
          index="mes"
          categories={showComparison ? ['total_vendido', 'ingresos'] : ['total_vendido']}
          colors={showComparison ? ['red', 'yellow'] : ['red']}
          valueFormatter={valueFormatter}
          yAxisWidth={80}
          className="mt-6 h-80"
        />
      </Card>
    </div>
  );
}

