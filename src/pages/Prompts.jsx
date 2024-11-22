import { useState } from 'react';

export default function Prompts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const prompts = [
    { id: 1, title: "Explicación de conceptos", category: "matemáticas", content: "Explica [concepto matemático] usando analogías cotidianas" },
    { id: 2, title: "Generador de ejercicios", category: "ciencias", content: "Crea 5 ejercicios de [tema] para nivel [grado]" },
    { id: 3, title: "Evaluación formativa", category: "general", content: "Diseña una evaluación formativa para [tema]" }
  ];

  const filteredPrompts = prompts.filter(prompt => {
    return (
      (selectedCategory === 'all' || prompt.category === selectedCategory) &&
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar prompts..."
          className="p-2 border rounded flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Todas las categorías</option>
          <option value="matemáticas">Matemáticas</option>
          <option value="ciencias">Ciencias</option>
          <option value="general">General</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredPrompts.map(prompt => (
          <div key={prompt.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2">{prompt.title}</h3>
            <p className="text-gray-600 mb-2">{prompt.content}</p>
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">{prompt.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}