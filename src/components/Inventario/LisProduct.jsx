'use client'

import { useState, useMemo } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine, RiAddLine, RiCloseLine } from '@remixicon/react';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Card,
  Title,
  TextInput,
  NumberInput,
  Select,
  SelectItem,
  Button,
  Badge,
} from '@tremor/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const initialWorkspaces = [
  {
    nombreProducto: 'Paracetamol 500mg',
    marca: 'Farmacéutica XYZ',
    estado: 'Disponible',
    categoria: 'Medicamento',
    stock: 250,
    precio: '$5.50',
    fechaCaducidad: '23/09/2025',
  },
  {
    nombreProducto: 'Ibuprofeno 400mg',
    marca: 'SaludPlus',
    estado: 'Disponible',
    categoria: 'Medicamento',
    stock: 300,
    precio: '$6.99',
    fechaCaducidad: '22/09/2025',
  },
  {
    nombreProducto: 'Aspirina 100mg',
    marca: 'Medicor',
    estado: 'Agotado',
    categoria: 'Medicamento',
    stock: 0,
    precio: '$3.00',
    fechaCaducidad: '20/09/2024',
  },
  {
    nombreProducto: 'Gel Antibacterial 500ml',
    marca: 'CleanHands',
    estado: 'Disponible',
    categoria: 'Cuidado Personal',
    stock: 150,
    precio: '$4.50',
    fechaCaducidad: '21/09/2024',
  },
  {
    nombreProducto: 'Vitamina C 1000mg',
    marca: 'HealthyLife',
    estado: 'Disponible',
    categoria: 'Suplementos',
    stock: 500,
    precio: '$9.99',
    fechaCaducidad: '26/09/2025',
  },
  // Nuevo producto agregado
  {
    nombreProducto: 'Mascarilla KN95',
    marca: 'SafeBreath',
    estado: 'Disponible',
    categoria: 'Protección',
    stock: 1000,
    precio: '$2.50',
    fechaCaducidad: '31/12/2025',
  },
];

const workspacesColumns = [
  {
    header: 'Nombre del Producto',
    accessorKey: 'nombreProducto',
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Marca',
    accessorKey: 'marca',
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Estado',
    accessorKey: 'estado',
    meta: {
      align: 'text-left',
    },
    cell: ({ row }) => (
      <Badge color={row.original.estado === 'Disponible' ? 'green' : 'red'}>
        {row.original.estado}
      </Badge>
    ),
  },
  {
    header: 'Categoría',
    accessorKey: 'categoria',
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Stock',
    accessorKey: 'stock',
    meta: {
      align: 'text-right',
    },
  },
  {
    header: 'Precio',
    accessorKey: 'precio',
    meta: {
      align: 'text-right',
    },
  },
  {
    header: 'Fecha de Caducidad',
    accessorKey: 'fechaCaducidad',
    meta: {
      align: 'text-right',
    },
  },
];

const PaginationButton = ({ onClick, disabled, children }) => {
  return (
    <button
      type="button"
      className="group px-2.5 py-2 text-tremor-default disabled:cursor-not-allowed disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default function ListProduct() {
  const [workspaces, setWorkspaces] = useState(initialWorkspaces);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nombreProducto: '',
    marca: '',
    estado: 'Disponible',
    categoria: '',
    stock: 0,
    precio: '',
    fechaCaducidad: '',
  });

  const pageSize = 8;

  const data = useMemo(() => workspaces, [workspaces]);

  const table = useReactTable({
    data,
    columns: workspacesColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWorkspaces(prev => [...prev, newProduct]);
    setNewProduct({
      nombreProducto: '',
      marca: '',
      estado: 'Disponible',
      categoria: '',
      stock: 0,
      precio: '',
      fechaCaducidad: '',
    });
    setIsModalOpen(false);
  };

  return (
    <Card className="mt-6">
      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
        <div>
          <Title>Inventario de Productos</Title>
          <p className="mt-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Gestiona y visualiza todos los productos en stock
          </p>
        </div>
        <Button
          icon={RiAddLine}
          className="mt-4 w-full sm:mt-0 sm:w-auto"
          onClick={() => setIsModalOpen(true)}
        >
          Crear Nuevo Producto
        </Button>
      </div>
      <Table className="mt-6">
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b border-tremor-border dark:border-dark-tremor-border"
            >
              {headerGroup.headers.map((header) => (
                <TableHeaderCell
                  key={header.id}
                  scope="col"
                  className={classNames(header.column.columnDef.meta.align)}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHeaderCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={classNames(cell.column.columnDef.meta.align)}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-tremor-default tabular-nums text-tremor-content dark:text-dark-tremor-content">
          Página{' '}
          <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {`${table.getState().pagination.pageIndex + 1}`}
          </span>{' '}
          de
          <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {' '}
            {`${table.getPageCount()}`}
          </span>
        </p>
        <div className="inline-flex items-center rounded-tremor-full shadow-tremor-input ring-1 ring-inset ring-tremor-ring dark:shadow-dark-tremor-input dark:ring-dark-tremor-ring">
          <PaginationButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Anterior</span>
            <RiArrowLeftSLine
              className="size-5 text-tremor-content-emphasis group-hover:text-tremor-content-strong dark:text-dark-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-strong"
              aria-hidden={true}
            />
          </PaginationButton>
          <span
            className="h-5 border-r border-tremor-border dark:border-dark-tremor-border"
            aria-hidden={true}
          />
          <PaginationButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Siguiente</span>
            <RiArrowRightSLine
              className="size-5 text-tremor-content-emphasis group-hover:text-tremor-content-strong dark:text-dark-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-strong"
              aria-hidden={true}
            />
          </PaginationButton>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center">
          <Card className="w-full max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <Title>Crear Nuevo Producto</Title>
              <Button
                variant="light"
                icon={RiCloseLine}
                onClick={() => setIsModalOpen(false)}
                className="p-1"
              >
                <span className="sr-only">Cerrar</span>
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  name="nombreProducto"
                  placeholder="Nombre del Producto"
                  value={newProduct.nombreProducto}
                  onChange={handleInputChange}
                  required
                />
                <TextInput
                  name="marca"
                  placeholder="Marca"
                  value={newProduct.marca}
                  onChange={handleInputChange}
                  required
                />
                <Select
                  name="estado"
                  placeholder="Estado"
                  value={newProduct.estado}
                  onValueChange={(value) => setNewProduct(prev => ({ ...prev, estado: value }))}
                >
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="Agotado">Agotado</SelectItem>
                </Select>
                <TextInput
                  name="categoria"
                  placeholder="Categoría"
                  value={newProduct.categoria}
                  onChange={handleInputChange}
                  required
                />
                <NumberInput
                  name="stock"
                  placeholder="Stock"
                  value={newProduct.stock}
                  onValueChange={(value) => setNewProduct(prev => ({ ...prev, stock: value }))}
                  min={0}
                  required
                />
                <TextInput
                  name="precio"
                  placeholder="Precio (ej. $5.50)"
                  value={newProduct.precio}
                  onChange={handleInputChange}
                  required
                />
                <TextInput
                  name="fechaCaducidad"
                  placeholder="Fecha de Caducidad (ej. 23/09/2025)"
                  value={newProduct.fechaCaducidad}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Crear Producto
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </Card>
  );
}