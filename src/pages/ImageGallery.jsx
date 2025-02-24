import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getGeneratedImages } from '@/lib/openaiService';
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchImages() {
      try {
        const imageData = await getGeneratedImages();
        setImages(imageData);
      } catch (error) {
        console.error('Error fetching images:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las imágenes. Por favor, intenta de nuevo.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [toast]);

  return (
    <>
      <Helmet>
        <title>Galería de Imágenes | Historial de imágenes generadas</title>
        <meta name="description" content="Historial de imágenes generadas con inteligencia artificial para tu clase." />
      </Helmet>

      <div className="container mx-auto max-w-[1200px] py-12">
        <div className="mb-4">
          <div className="title-decoration">
            <div className="title-slashes">//</div>
            <h1 className="text-4xl font-bold font-jost">Galería de Imágenes</h1>
          </div>
        </div>
        <p className="text-xl text-muted-foreground mb-8">
          Historial de imágenes generadas con DALL-E
        </p>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-xl text-muted-foreground">No hay imágenes generadas todavía</p>
            <p className="mt-2">Ve a la página de generación de imágenes para crear una</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div key={image.id} className="bg-muted rounded-lg overflow-hidden flex flex-col">
                <div className="relative pb-[100%]">
                  <img 
                    src={image.url} 
                    alt={image.prompt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {image.prompt}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(image.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ImageGallery;