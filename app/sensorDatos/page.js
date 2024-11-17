"use client";

import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";

export default function SensorDatosPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);
  const chartInstance = useRef(null);
  const pieChartInstance = useRef(null);

  console.log(data);

  useEffect(() => {
    async function fetchSensorData() {
      try {
        const res = await fetch(
          "https://sensores-backend-94t6.onrender.com/sensor_datos"
        );
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
      const ctx = chartRef.current.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const chartData = data
        .filter((item) => item.valor_fotoresistor !== null)
        .map((item) => ({
          x: new Date(item.tiempo_registro).getTime(),
          y: item.valor_fotoresistor,
          r: 5,
        }))
        .sort((a, b) => a.x - b.x);

      chartInstance.current = new Chart(ctx, {
        type: "bubble",
        data: {
          datasets: [
            {
              label: "Valores del Fotoresistor",
              data: chartData,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgb(75, 192, 192)",
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: "time",
              time: {
                unit: "hour",
              },
              title: {
                display: true,
                text: "Tiempo",
              },
            },
            y: {
              title: {
                display: true,
                text: "Valor del Fotoresistor",
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Valores del Fotoresistor",
            },
          },
        },
      });
    }
  }, [data]);

  // Pie chart for LED state
  useEffect(() => {
    if (data.length > 0 && pieChartRef.current) {
      const ledOnCount = data.filter((item) => item.modo_operacion === 1).length;
      const ledOffCount = data.filter((item) => item.modo_operacion === 0).length;

      const ctx = pieChartRef.current.getContext("2d");

      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }

      pieChartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Encendido", "Apagado"],
          datasets: [
            {
              data: [ledOnCount, ledOffCount],
              backgroundColor: ["rgba(75, 192, 192, 0.8)", "rgba(192, 75, 75, 0.8)"],
              borderColor: ["rgb(75, 192, 192)", "rgb(192, 75, 75)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            title: {
              display: true,
              text: "Porcentaje de Encendido vs Apagado",
            },
          },
        },
      });
    }
  }, [data]);

  if (error) {
    return <div className="text-red-500 font-bold">Error: {error}</div>;
  }

  // Calcula el promedio de valor del fotoresistor
  const averageValue =
    data
      .filter((item) => item.valor_fotoresistor !== null)
      .reduce((acc, item) => acc + item.valor_fotoresistor, 0) /
    data.filter((item) => item.valor_fotoresistor !== null).length;

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-3xl font-bold mt-10">Datos del Sensor Fotoresistor (LDR)</h1>
      <h2 className="text-xl font-bold mb-10">Equipo 4</h2>
      <button
        onClick={() => setShowTable(true)}
        className="mb-10 px-4 py-2 w-full rounded-full bg-green-500 text-white font-semibold md:w-[200px]"
      >
        Ver tabla principal
      </button>

      <div className="flex flex-col gap-4 items-start mx-auto lg:flex-row lg:gap-5 mb-10">
        <div className="w-full max-w-4xl flex flex-col gap-4">
            <div className="w-full max-w-4xl bg-gray-100 rounded-2xl p-5">
            {data.length > 0 && (
                <div className="mb-4 text-center flex w-full items-center">
                    <h3 className="text-3xl text-black font-bold mr-2">Fechas de registros:</h3>
                    <p className="text-2xl font-semibold text-gray-700">
                    <span className="font-bold">
                        {new Date(Math.min(...data.map(d => new Date(d.tiempo_registro)))).toLocaleDateString()} a {new Date(Math.max(...data.map(d => new Date(d.tiempo_registro)))).toLocaleDateString()}
                    </span>
                    </p>
                </div>
            )}

            <canvas
                ref={chartRef}
                style={{ maxWidth: "600px", margin: "0 auto", width: "100%" }}
            />
            </div>

            <div className="w-full flex gap-4">
                <div className="w-full bg-gray-100 rounded-2xl p-5 h-[250px] lg:h-auto">
                    <h3 className="text-xl font-bold text-black">Último valor registrado:</h3>
                    {Object.keys(data).length > 0 ? (
                        <p className="text-5xl mt-4 font-bold text-gray-800 text-center">
                        {Object.values(data)
                            .sort((a, b) => new Date(b.tiempo_registro) - new Date(a.tiempo_registro))[0]
                            .valor_fotoresistor ?? "N/A"}
                        </p>
                    ) : (
                        <p className="text-lg mt-4 text-gray-600 text-center">No hay datos disponibles</p>
                    )}
                </div>

                <div className="w-full max-w-4xl bg-gray-100 rounded-2xl p-5 h-[250px] lg:h-auto">
                    <h3 className="text-xl font-bold text-black">Valores registrados</h3>
                    <p className="text-lg mt-4 text-gray-600">
                    <strong>Promedio:</strong> <span className="text-2xl font-bold">{averageValue.toFixed(2)}</span>
                    </p>
                </div>

                <div className="w-full max-w-4xl bg-gray-100 rounded-2xl p-5 h-[250px] lg:h-auto">
                    <h3 className="text-xl font-bold text-black">Tiempo encendido hrs:</h3>
                    <p className="text-lg mt-4 text-gray-600">
                        <strong>Tiempo encendida hrs:</strong>{" "}
                        <span className="text-2xl font-bold">
                        {(
                            Object.values(data) // Convertir el objeto en un array
                            .filter((item) => item.modo_operacion === 1) // Filtrar los registros donde el LED está encendido
                            .sort((a, b) => new Date(a.tiempo_registro) - new Date(b.tiempo_registro)) // Ordenar por tiempo
                            .reduce((total, current, index, filteredArray) => {
                                if (index === 0) return total; // Saltar el primer elemento
                                const prev = new Date(filteredArray[index - 1].tiempo_registro);
                                const curr = new Date(current.tiempo_registro);
                                return total + (curr - prev) / (1000 * 60 * 60); // Convertir a horas
                            }, 0) || 0
                        ).toFixed(2)}
                        </span>
                    </p>
                </div>

            </div>
        </div>

        <div className="flex gap-5 flex-wrap w-full lg:flex-nowrap lg:w-auto">
          <div className="w-full max-w-4xl bg-gray-100 rounded-2xl p-5 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-black">Conteo del LED Encendido</h3>
            <p className="text-lg mt-4 text-gray-600">
              <strong>Total registros:</strong> <span className="text-2xl font-bold">{data.length}</span>
            </p>
            <p className="text-lg mt-2 text-gray-600">
              <strong>Encendido:</strong> <span className="text-2xl font-bold">{data.filter((item) => item.modo_operacion === 1).length}</span>
            </p>
            <p className="text-lg mt-2 text-gray-600">
              <strong>Apagado:</strong> <span className="text-2xl font-bold">{data.filter((item) => item.modo_operacion === 0).length}</span>
            </p>
            <canvas
              ref={pieChartRef}
              style={{ maxWidth: "300px", margin: "0 auto", width: "100%", marginTop: "20px" }}
            />
          </div>
        </div>
      </div>

      {showTable && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black rounded-lg shadow-lg w-11/12 lg:w-2/3 max-h-[80vh] overflow-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Tabla de Datos</h2>
            <button
              onClick={() => setShowTable(false)}
              className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-700"
            >
              &times; Ocultar
            </button>
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
                  <tr
                    key={dato.RS6_ID}
                    className="hover:bg-green-200 hover:text-emerald-950 hover:cursor-pointer"
                  >
                    <td className="px-4 py-2 border border-emerald-900">{dato.RS6_ID}</td>
                    <td className="px-4 py-2 border border-emerald-900">{dato.protoID}</td>
                    <td className="px-4 py-2 border border-emerald-900">{dato.sensorID}</td>
                    <td className="px-4 py-2 border border-emerald-900">
                      {new Date(dato.tiempo_registro).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border border-emerald-900">
                      {dato.valor_fotoresistor !== null
                        ? dato.valor_fotoresistor
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 border border-emerald-900">
                      {dato.modo_operacion !== null ? dato.modo_operacion : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
