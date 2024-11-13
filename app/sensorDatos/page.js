"use client";

import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

export default function SensorDatosPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [showTable, setShowTable] = useState(false); // Estado para mostrar/ocultar la tabla
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    async function fetchSensorData() {
      try {
        const res = await fetch('https://sensores-backend-94t6.onrender.com/sensor_datos');
        if (!res.ok) throw new Error("Failed to fetch data");
        const jsonData = await res.json();
        setData(jsonData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      }
    }

    fetchSensorData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const chartData = data
        .filter(item => item.valor_fotoresistor !== null)
        .map(item => ({
          x: new Date(item.tiempo_registro),
          y: item.valor_fotoresistor
        }))
        .sort((a, b) => a.x - b.x);

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            label: 'Valor del Fotoresistor',
            data: chartData,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'hour'
              },
              title: {
                display: true,
                text: 'Tiempo'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Valor del Fotoresistor'
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Valores del Fotoresistor a lo largo del tiempo'
            }
          }
        }
      });
    }
  }, [data]);

  if (error) {
    return <div className="text-red-500 font-bold">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mt-10">Datos del Sensor Fotoresistor (LDR)</h1>
      <h2 className="text-xl font-bold mb-20">Equipo 4</h2>
      <div className="flex flex-col gap-0 items-start mx-auto lg:flex-row lg:gap-20">
        <div className="mb-10 w-full max-w-4xl">
          <canvas ref={chartRef} style={{ maxWidth: '1200px', margin: '0 auto', width:'100%' }} />
        </div>
        <div className='flex flex-col w-full'>
            <button
            onClick={() => setShowTable(!showTable)}
            className="mb-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-sm"
            >
            {showTable ? 'Ocultar Tabla' : 'Mostrar Tabla'}
            </button>
            <div className="flex w-full max-w-4xl">
            {/* Solo muestra la tabla cuando showTable es verdadero */}
            {showTable && (
                <div className="overflow-x-auto w-full max-h-[300px]">
                <table className="min-w-full">
                    <thead>
                    <tr className="bg-emerald-950">
                        <th className="px-4 py-2 border border-emerald-800">RS6_ID</th>
                        <th className="px-4 py-2 border border-emerald-800">ProtoID</th>
                        <th className="px-4 py-2 border border-emerald-800">SensorID</th>
                        <th className="px-4 py-2 border border-emerald-800">Tiempo de Registro</th>
                        <th className="px-4 py-2 border border-emerald-800">Valor Fotoresistor</th>
                        <th className="px-4 py-2 border border-emerald-800">Modo de Operación</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((dato) => (
                        <tr key={dato.RS6_ID} className="hover:bg-green-200 hover:text-emerald-950 hover:cursor-pointer">
                        <td className="px-4 py-2 border border-emerald-900">{dato.RS6_ID}</td>
                        <td className="px-4 py-2 border border-emerald-900">{dato.protoID}</td>
                        <td className="px-4 py-2 border border-emerald-900">{dato.sensorID}</td>
                        <td className="px-4 py-2 border border-emerald-900">{new Date(dato.tiempo_registro).toLocaleString()}</td>
                        <td className="px-4 py-2 border border-emerald-900">{dato.valor_fotoresistor !== null ? dato.valor_fotoresistor : 'N/A'}</td>
                        <td className="px-4 py-2 border border-emerald-900">{dato.modo_operacion !== null ? dato.modo_operacion : 'N/A'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            )}
            </div>
        </div>
      </div>
    </div>
  );
}
