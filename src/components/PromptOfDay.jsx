import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Badge } from "@/components/ui/badge";

function PromptOfDay() {
  const [prompt, setPrompt] = useState(null); // Estado para el prompt aleatorio
  const [loading, setLoading] = useState(true); // Estado de carga
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchRandomPrompt = async () => {
      if (hasFetched.current) return;
      setLoading(true);

      // Obtener todos los prompts con su categoría
      const { data: prompts, error } = await supabase
        .from('prompts')
        .select('*, categories(name, color)');
      
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
      hasFetched.current = true;
    };

    fetchRandomPrompt();

    return () => {
      hasFetched.current = false;
    };
  }, []);

  const getBadgeStyle = (color) => {
    if (!color) return {};
    return {
      backgroundColor: color,
      color: '#FFFFFF',
      borderColor: 'transparent'
    };
  };

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
      <Badge 
        variant="outline"
        style={getBadgeStyle(prompt.categories.color)}
        className="mb-4"
      >
        {prompt.categories.name}
      </Badge>
      <div className="flex items-center gap-2 mb-4">
        <span style={{ color: prompt.categories.color }} className="text-xl font-semibold">//</span>
        <h3 className="text-xl font-semibold">
          {prompt.title}
        </h3>
      </div>
      <p className="text-muted-foreground mb-4">
        {prompt.content}
      </p>
    </div>
  );
}

export default PromptOfDay;