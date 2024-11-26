import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function PromptOfDay() {
  const [prompt, setPrompt] = useState(null); // Estado para el prompt aleatorio
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchRandomPrompt = async () => {
      setLoading(true);

      // Obtener todos los prompts con su categoría
      const { data: prompts, error } = await supabase
        .from('prompts')
        .select('*, categories(name)');
      
      if (error) {
        console.error('Error fetching prompts:', error);
        setLoading(false);
        return;
      }

      // Seleccionar un prompt aleatorio
      if (prompts && prompts.length > 0) {
        const randomIndex = Math.floor(Math.random() * prompts.length);
        setPrompt(prompts[randomIndex]);
      }

      setLoading(false);
    };

    fetchRandomPrompt();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto"></div>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="text-center py-12">
        <p>No se encontró ningún prompt.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md p-6 shadow-sm bg-card">
      <span className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-4">
        {prompt.categories.name}
      </span>
      <h3 className="text-xl font-semibold mb-4">
        {prompt.title}
      </h3>
      <p className="text-muted-foreground mb-4">
        {prompt.content}
      </p>
    </div>
  );
}

export default PromptOfDay;