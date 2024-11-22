'use client'

import { useState, useEffect, useMemo } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine, RiAddLine, RiCloseLine, RiEditLine } from '@remixicon/react';
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

const API_URL = 'http://localhost:3000/productos';
const REGISTRO_URL = 'http://localhost:3000/registro';

export default function ListProduct() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    marca: '',
    precio: 0,
    cantidadVendida: 0,
    stock: 0,
    descripcion: '',
    fechaVencimiento: '',
    categoria: '',
  });

  const pageSize = 8;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const createProduct = async (product) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newProduct = await response.json();
      setProducts(prevProducts => [...prevProducts, newProduct]);
      await sendRegistration(`se creó el producto ${newProduct.nombre}`);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const updateProduct = async (product) => {
    try {
      // Buscar el producto original antes de actualizar
      const originalProduct = products.find(p => p.id === product.id);

      if (!originalProduct) {
        throw new Error('Producto original no encontrado');
      }

      // Identificar los atributos modificados
      const changedAttributes = Object.keys(product)
        .filter(key => product[key] !== originalProduct[key])
        .map(key => `${key}: "${originalProduct[key]}" → "${product[key]}"`);

      if (changedAttributes.length === 0) {
        console.log('No se realizaron cambios en el producto');
        return;
      }

      const response = await fetch(`${API_URL}/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedProduct = await response.json();

      setProducts(prevProducts =>
        prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
      );

      // Crear el mensaje detallado de los cambios
      const changesMessage = changedAttributes.join(', ');
      await sendRegistration(
        `Se modificó el producto ${updatedProduct.nombre} => Cambios: ${changesMessage}`
      );
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const sendRegistration = async (motivo) => {
    try {
      const now = new Date();
      const registro = {
        fecha: now.toISOString().split('T')[0],
        hora: now.toTimeString().split(' ')[0].slice(0, 5),
        motivo: motivo
      };
      const response = await fetch(REGISTRO_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registro),
      });
      if (!response.ok) {
        throw new Error('Failed to send registration');
      }
    } catch (error) {
      console.error('Error sending registration:', error);
    }
  };

  const workspacesColumns = [
    {
      header: 'Nombre del Producto',
      accessorKey: 'nombre',
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
      header: 'Cantidad Vendida',
      accessorKey: 'cantidadVendida',
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
      cell: ({ row }) => `$${row.original.precio.toLocaleString()}`,
    },
    {
      header: 'Fecha de Caducidad',
      accessorKey: 'fechaVencimiento',
      meta: {
        align: 'text-right',
      },
    },
    {
      header: 'Acciones',
      accessorKey: 'actions',
      meta: {
        align: 'text-center',
      },
      cell: ({ row }) => (
        <Button
          icon={RiEditLine}
          variant="light"
          onClick={() => handleEdit(row.original)}
        >
          Editar
        </Button>
      ),
    },
  ];

  const data = useMemo(() => products, [products]);

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

  const handleNumberInputChange = (name, value) => {
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingProduct) {
      await updateProduct({ ...newProduct, id: editingProduct.id });
    } else {
      await createProduct(newProduct);
    }
    resetForm();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setNewProduct({
      nombre: '',
      marca: '',
      precio: 0,
      cantidadVendida: 0,
      stock: 0,
      descripcion: '',
      fechaVencimiento: '',
      categoria: '',
    });
    setEditingProduct(null);
    setIsModalOpen(false);
  };

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
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
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
              <Title>{editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}</Title>
              <Button
                variant="light"
                icon={RiCloseLine}
                onClick={resetForm}
                className="p-1"
              >
                <span className="sr-only">Cerrar</span>
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  name="nombre"
                  placeholder="Nombre del Producto"
                  value={newProduct.nombre}
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
                  onValueChange={(value) => handleNumberInputChange('stock', value)}
                  min={0}
                  required
                />
                <NumberInput
                  name="cantidadVendida"
                  placeholder="Cantidad Vendida"
                  value={newProduct.cantidadVendida}
                  onValueChange={(value) => handleNumberInputChange('cantidadVendida', value)}
                  min={0}
                  required
                />
                <NumberInput
                  name="precio"
                  placeholder="Precio"
                  value={newProduct.precio}
                  onValueChange={(value) => handleNumberInputChange('precio', value)}
                  min={0}
                  required
                />
                <TextInput
                  name="fechaVencimiento"
                  type="date"
                  value={newProduct.fechaVencimiento}
                  onChange={handleInputChange}
                  required
                />
                <TextInput
                  name="descripcion"
                  placeholder="Descripción"
                  value={newProduct.descripcion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="secondary" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </Card>
  );
}