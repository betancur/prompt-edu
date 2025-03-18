import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateImage } from '@/lib/openaiService';

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Campo requerido",
        description: "Por favor, describe la imagen que deseas generar.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const imageUrl = await generateImage(prompt);
      setGeneratedImage(imageUrl);

      toast({
        title: "¡Imagen generada!",
        description: "Tu imagen ha sido generada exitosamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "No se pudo generar la imagen. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePromptKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleGenerate();
    }
  };

  return (
    <>
      <Helmet>
        <title>Generador de Imágenes IA | Crea imágenes para tu clase</title>
        <meta name="description" content="Genera imágenes únicas para tu clase usando inteligencia artificial." />
      </Helmet>

      <div className="container mx-auto max-w-[1200px] py-12">
        <div className="mb-4">
          <div className="title-decoration">
            <div className="title-slashes">//</div>
            <h1 className="text-4xl font-bold font-jost">Generador de Imágenes IA</h1>
          </div>
        </div>
        <p className="text-xl text-muted-foreground mb-8">
          Crea imágenes únicas para tus clases usando DALL-E
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <label
                htmlFor="prompt"
                className="block text-sm font-medium text-foreground"
              >
                Describe la imagen que deseas crear
              </label>
              <textarea
                id="prompt"
                rows={4}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Ejemplo: Un aula moderna con estudiantes colaborando en un proyecto creativo, con colores brillantes y ambiente positivo"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handlePromptKeyDown}
                disabled={isGenerating}
              />
              <p className="text-sm text-muted-foreground">
                Presiona Ctrl + Enter para generar
              </p>
            </div>

          </div>

          {/* Preview Section */}
          <div className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center min-h-[300px] relative">
            {generatedImage ? (
              <img
                src={generatedImage}
                alt="Imagen generada"
                className="max-w-full h-auto rounded-md"
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <p>Tu imagen generada aparecerá aquí</p>
                <p className="text-sm mt-2">Formato: 1024x1024</p>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Tips para mejores resultados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Sé específico</h3>
              <p className="text-sm text-muted-foreground">
                Incluye detalles sobre el estilo, colores y ambiente que deseas en la imagen.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Contexto educativo</h3>
              <p className="text-sm text-muted-foreground">
                Menciona el contexto educativo específico para obtener imágenes más relevantes.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Evita términos ambiguos</h3>
              <p className="text-sm text-muted-foreground">
                Usa términos claros y concretos en lugar de descripciones vagas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageGenerator;