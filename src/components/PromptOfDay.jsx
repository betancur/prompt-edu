import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useToast } from "@/components/ui/use-toast";

function PromptOfDay() {
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const contentRef = useRef(null);
  const hasFetched = useRef(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkContentHeight = () => {
      if (contentRef.current) {
        const needsToExpand = contentRef.current.scrollHeight > 200;
        setNeedsExpansion(needsToExpand);
        if (!needsToExpand) setIsExpanded(false);
      }
    };

    checkContentHeight();
    // Add resize listener for responsive behavior
    window.addEventListener('resize', checkContentHeight);
    return () => window.removeEventListener('resize', checkContentHeight);
  }, [prompt]);

  useEffect(() => {
    const fetchRandomPrompt = async () => {
      if (hasFetched.current) return;
      setLoading(true);

      const { data: prompts, error } = await supabase
        .from('prompts')
        .select('*, categories(name, color)');
      
      if (error) {
        console.error('Error fetching prompts:', error);
        setLoading(false);
        return;
      }

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      toast({
        title: "Copiado al portapapeles",
        description: "El prompt ha sido copiado exitosamente.",
      });
    } catch (err) {
      toast({
        title: "Error al copiar",
        description: "No se pudo copiar el prompt al portapapeles.",
        variant: "destructive",
      });
    }
  };

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
      <div className="flex items-center justify-between mb-4">
        <Badge 
          variant="outline"
          style={getBadgeStyle(prompt.categories.color)}
        >
          {prompt.categories.name}
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          title="Copiar prompt"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <span style={{ color: prompt.categories.color }} className="text-xl font-semibold">//</span>
        <h3 className="text-xl font-semibold">
          {prompt.title}
        </h3>
      </div>
      <div 
        ref={contentRef}
        className={`prose prose-sm dark:prose-invert max-w-none overflow-y-auto pr-2 
          scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 
          scrollbar-track-transparent hover:scrollbar-thumb-gray-400 
          dark:hover:scrollbar-thumb-gray-500 transition-all duration-300
          ${isExpanded ? 'max-h-[60vh]' : 'max-h-[200px]'}`}
      >
        <ReactMarkdown>{prompt.content}</ReactMarkdown>
      </div>
      {needsExpansion && (
        <Button
          variant="ghost"
          className="w-full mt-4 text-muted-foreground hover:text-foreground"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Ver menos_' : 'Ver más_'}
        </Button>
      )}
    </div>
  );
}

export default PromptOfDay;