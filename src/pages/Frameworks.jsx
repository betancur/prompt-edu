import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

export default function Frameworks() {
  const [expandedId, setExpandedId] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const frameworks = [
    {
      id: 1,
      name: "ICE Framework",
      category: "basic",
      description: "Instrucción, Contexto, Ejemplos - Un marco para estructurar prompts educativos.",
      steps: [
        {
          title: "Instrucción",
          description: "Define la instrucción clara y específica que deseas que la IA siga."
        },
        {
          title: "Contexto",
          description: "Proporciona el contexto educativo relevante y nivel de los estudiantes."
        },
        {
          title: "Ejemplos",
          description: "Incluye ejemplos específicos del tipo de respuesta que esperas."
        }
      ],
      example: 'Instrucción: Explica el concepto de fotosíntesis\nContexto: Para estudiantes de 6to grado\nEjemplos: Usa analogías con cocina'
    },
    {
      id: 2,
      name: "CRAP Framework",
      category: "advanced",
      description: "Contexto, Rol, Acción, Parámetros - Estructura para prompts específicos.",
      steps: [
        {
          title: "Contexto",
          description: "Establece el escenario y situación educativa."
        },
        {
          title: "Rol",
          description: "Define el papel que la IA debe asumir."
        },
        {
          title: "Acción",
          description: "Especifica la tarea o acción a realizar."
        },
        {
          title: "Parámetros",
          description: "Define límites, formato y requisitos específicos."
        }
      ],
      example: 'Contexto: Clase de historia, tema Guerra Fría\nRol: Profesor de historia\nAcción: Crear un cuestionario\nParámetros: 5 preguntas, nivel bachillerato'
    },
    {
      id: 3,
      name: "AID Framework",
      category: "basic",
      description: "Audiencia, Intención, Detalles - Para personalizar prompts según el estudiante.",
      steps: [
        {
          title: "Audiencia",
          description: "Identifica las características de tus estudiantes."
        },
        {
          title: "Intención",
          description: "Clarifica el objetivo de aprendizaje."
        },
        {
          title: "Detalles",
          description: "Añade especificaciones sobre el formato y enfoque."
        }
      ],
      example: 'Audiencia: Estudiantes ESL nivel intermedio\nIntención: Práctica de tiempos verbales\nDetalles: Usar situaciones cotidianas'
    }
  ];

  const filteredFrameworks = activeTab === 'all' 
    ? frameworks 
    : frameworks.filter(f => f.category === activeTab);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Frameworks para Prompt Engineering
        </h1>
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded ${
              activeTab === 'all' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveTab('basic')}
            className={`px-4 py-2 rounded ${
              activeTab === 'basic' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Básicos
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`px-4 py-2 rounded ${
              activeTab === 'advanced' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Avanzados
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredFrameworks.map(framework => (
          <Card key={framework.id}>
            <CardHeader 
              className="cursor-pointer"
              onClick={() => setExpandedId(expandedId === framework.id ? null : framework.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{framework.name}</CardTitle>
                  <p className="text-gray-600 mt-2">{framework.description}</p>
                </div>
                <span className="text-xl">{expandedId === framework.id ? '▼' : '▶'}</span>
              </div>
            </CardHeader>

            {expandedId === framework.id && (
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Pasos a seguir:</h3>
                    <div className="space-y-3">
                      {framework.steps.map((step, index) => (
                        <div key={index} className="flex space-x-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium">{step.title}</h4>
                            <p className="text-gray-600 text-sm">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Ejemplo:</h3>
                    <pre className="bg-white p-3 rounded text-sm whitespace-pre-wrap">
                      {framework.example}
                    </pre>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}