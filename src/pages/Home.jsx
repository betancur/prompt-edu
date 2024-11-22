export default function Home() {
    const promptOfDay = {
      title: "Prompt del Día",
      content: "Explica [concepto] como si le estuvieras enseñando a un estudiante de [nivel]",
      category: "Educación General"
    };
  
    return (
      <div className="space-y-6">
        <section className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-4">{promptOfDay.title}</h1>
          <div className="bg-gray-50 p-4 rounded border">
            <p className="text-lg mb-2">{promptOfDay.content}</p>
            <span className="text-sm text-gray-600">{promptOfDay.category}</span>
          </div>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Prompts Populares</h2>
            <ul className="space-y-2">
              <li className="hover:bg-gray-50 p-2 rounded">Explicación de conceptos matemáticos</li>
              <li className="hover:bg-gray-50 p-2 rounded">Generación de ejercicios</li>
              <li className="hover:bg-gray-50 p-2 rounded">Evaluación de respuestas</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Frameworks Destacados</h2>
            <ul className="space-y-2">
              <li className="hover:bg-gray-50 p-2 rounded">ICE Framework</li>
              <li className="hover:bg-gray-50 p-2 rounded">CRAP Framework</li>
              <li className="hover:bg-gray-50 p-2 rounded">AID Framework</li>
            </ul>
          </div>
        </section>
      </div>
    );
  }