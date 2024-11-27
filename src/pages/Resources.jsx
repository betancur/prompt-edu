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

function Resources() {
  const featuredResource = {
    title: "Error del Prompt",
    description: "Guía para potenciar la mente y desatar la creatividad con inteligencia artificial",
    type: "PDF",
    date: "Marzo 2024",
    link: "/resources/ErrordelPrompt_nodo.pdf"
  };

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

  const guides = [
    {
      title: "Manual del Profesor Digital",
      description: "Guía completa para la transformación digital en el aula",
      type: "PDF",
      link: "#",
      coverImage: null
    },
    {
      title: "Plantillas de Prompts Educativos",
      description: "Colección de prompts listos para usar en diferentes materias",
      type: "PDF",
      link: "#",
      coverImage: null
    },
    {
      title: "Evaluación con IA",
      description: "Estrategias para la evaluación asistida por IA",
      type: "PDF",
      link: "#",
      coverImage: null
    }
  ];

  const videos = [
    {
      title: "Tutorial ChatGPT",
      description: "Aprende a usar ChatGPT para crear material didáctico",
      duration: "15:30",
      link: "#"
    },
    {
      title: "IA en el Aula",
      description: "Casos de éxito y ejemplos prácticos",
      duration: "22:45",
      link: "#"
    },
    {
      title: "Prompts Efectivos",
      description: "Cómo escribir prompts que generen mejores resultados",
      duration: "18:20",
      link: "#"
    }
  ];

  const tools = [
    {
      title: "Generador de Ejercicios",
      description: "Crea ejercicios personalizados para tus estudiantes",
      status: "Gratis",
      link: "#"
    },
    {
      title: "Asistente de Planificación",
      description: "Planifica tus clases con ayuda de IA",
      status: "Gratis",
      link: "#"
    },
    {
      title: "Evaluador de Textos",
      description: "Analiza y evalúa textos estudiantiles",
      status: "Gratis",
      link: "#"
    }
  ];

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

      {/* Recurso Destacado del Mes */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Recurso Destacado del Mes</h2>
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 flex flex-col h-full">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {featuredResource.date}
                </Badge>
                <CardTitle className="text-2xl mb-2">{featuredResource.title}</CardTitle>
                <CardDescription className="text-base">
                  {featuredResource.description}
                </CardDescription>
              </div>
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
        </Card>
      </section>

      {/* Comenzar con IA */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Comenzar con IA</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gettingStartedResources.map((resource, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow flex flex-col h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <resource.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button variant="link" className="p-0">
                  Explorar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Guías y documentos */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Guías y documentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((guide, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow flex flex-col h-full">
              <CardHeader>
                <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600" />
                  </div>
                  {guide.coverImage && (
                    <img
                      src={guide.coverImage}
                      alt={guide.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
                <CardTitle className="text-xl">{guide.title}</CardTitle>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button className="gap-2">
                  <Download size={16} />
                  Descargar {guide.type}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Videoteca */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Videoteca</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow flex flex-col h-full">
              <CardHeader>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                  <Play className="w-12 h-12 text-gray-400" />
                </div>
                <CardTitle className="text-xl">{video.title}</CardTitle>
                <CardDescription>{video.description}</CardDescription>
                <div className="text-sm text-muted-foreground mt-2">
                  Duración: {video.duration}
                </div>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button variant="secondary" className="gap-2">
                  <Play size={16} />
                  Ver video
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Herramientas prácticas */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Herramientas prácticas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow flex flex-col h-full">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <Badge variant="secondary">{tool.status}</Badge>
                </div>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button variant="outline">
                  Acceder
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Resources;
