import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Play, BookOpen, Wrench, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

function Resources() {
  const [resources, setResources] = useState([]);
  const [featuredResource, setFeaturedResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Set the first PDF as featured resource
      const featured = data.find(resource => resource.type === 'PDF');
      setFeaturedResource(featured || null);

      // Set all resources
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter resources by type
  const pdfResources = resources.filter(resource => resource.type === 'PDF');
  const linkResources = resources.filter(resource => resource.type === 'Link');
  const videoResources = resources.filter(resource => resource.type === 'Video');

  const gettingStartedResources = [
    {
      title: "¿Qué es la IA en educación?",
      description: "Una introducción simple a la IA y su papel en la educación moderna",
      icon: BookOpen,
      link: "#"
    },
    {
      title: "Primeros pasos",
      description: "Guía paso a paso para comenzar a utilizar IA en tu aula",
      icon: ArrowRight,
      link: "#"
    },
    {
      title: "Mejores prácticas",
      description: "Consejos y estrategias probadas para la implementación de IA",
      icon: Wrench,
      link: "#"
    }
  ];

  if (loading) {
    return (
      <div className="container mx-auto max-w-[1200px] py-12">
        <p>Cargando recursos...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[1200px] py-12">
      <div className="mb-4">
        <div className="title-decoration">
          <div className="title-slashes">//</div>
          <h1 className="text-4xl font-bold font-jost">Centro de recursos</h1>
        </div>
      </div>
      <p className="text-xl text-muted-foreground mb-12">
        Todo lo que necesitas para integrar IA en tu aula
      </p>

      {/* Recurso destacado del mes */}
      {featuredResource && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Recurso destacado del mes</h2>
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 p-6 flex items-center">
                <div className="h-[250px] w-full">
                  <img 
                    src={featuredResource.image || '/placeholder-pdf.png'} 
                    alt={featuredResource.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3 flex flex-col">
                <CardHeader>
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {featuredResource.status || 'Nuevo'}
                    </Badge>
                    <CardTitle className="text-2xl mb-2">{featuredResource.title}</CardTitle>
                    <CardDescription className="text-base">
                      {featuredResource.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button className="gap-2" asChild>
                    <a href={featuredResource.link} download>
                      <Download size={16} />
                      Descargar {featuredResource.type}
                    </a>
                  </Button>
                </CardContent>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Comenzar con IA */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Comenzar con IA</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gettingStartedResources.map((resource, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <resource.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Guías y documentos */}
      {pdfResources.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Guías y documentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pdfResources.map((resource) => (
              <Card key={resource.id} className="flex flex-col h-full">
                <CardHeader>
                  {resource.status && (
                    <Badge variant="secondary" className="mb-2 w-fit">
                      {resource.status}
                    </Badge>
                  )}
                  <div className="h-[250px] mb-4">
                    <img 
                      src={resource.image || '/placeholder-pdf.png'} 
                      alt={resource.title}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                  {resource.description && (
                    <CardDescription>{resource.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="mt-auto pt-4">
                  <Button className="gap-2" asChild>
                    <a href={resource.link} download>
                      <Download size={16} />
                      Descargar PDF
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Videoteca */}
      {videoResources.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Videoteca</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoResources.map((resource) => (
              <Card key={resource.id} className="flex flex-col h-full">
                <CardHeader>
                  {resource.status && (
                    <Badge variant="secondary" className="mb-2 w-fit">
                      {resource.status}
                    </Badge>
                  )}
                  <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                  {resource.description && (
                    <CardDescription>{resource.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="mt-auto pt-4">
                  <Button className="gap-2" asChild>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      <Play size={16} />
                      Ver video
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Herramientas prácticas */}
      {linkResources.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Herramientas prácticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {linkResources.map((resource) => (
              <Card key={resource.id} className="flex flex-col h-full">
                <CardHeader>
                  {resource.status && (
                    <Badge variant="secondary" className="mb-2 w-fit">
                      {resource.status}
                    </Badge>
                  )}
                  <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                  {resource.description && (
                    <CardDescription>{resource.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="mt-auto pt-4">
                  <Button className="gap-2" asChild>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      <ArrowRight size={16} />
                      Acceder
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Resources;
