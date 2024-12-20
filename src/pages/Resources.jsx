import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Play, BookOpen, Wrench, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from 'react-router-dom';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTrackDownload } from '../hooks/useTrackDownload';

function Resources() {
  const [resources, setResources] = useState([]);
  const [featuredResource, setFeaturedResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    slidesToScroll: 1,
    loop: true,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

  const [emblaRefDocs, emblaApiDocs] = useEmblaCarousel({ 
    align: 'start',
    slidesToScroll: 1,
    loop: true,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

  const [emblaRefVideos, emblaApiVideos] = useEmblaCarousel({ 
    align: 'start',
    slidesToScroll: 1,
    loop: true,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

  const [emblaRefTools, emblaApiTools] = useEmblaCarousel({ 
    align: 'start',
    slidesToScroll: 1,
    loop: true,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexDocs, setSelectedIndexDocs] = useState(0);
  const [selectedIndexVideos, setSelectedIndexVideos] = useState(0);
  const [selectedIndexTools, setSelectedIndexTools] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [scrollSnapsDocs, setScrollSnapsDocs] = useState([]);
  const [scrollSnapsVideos, setScrollSnapsVideos] = useState([]);
  const [scrollSnapsTools, setScrollSnapsTools] = useState([]);
  const { trackAndDownload } = useTrackDownload();

  const handleDownload = (resource, isFeature = false) => {
    trackAndDownload({
      title: resource.title,
      type: resource.type || 'pdf',
      category: 'Resource',
      source: isFeature ? 'featured_resource' : 'resource_library',
      link: resource.link
    });
  };

  useEffect(() => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList());
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
    if (emblaApiDocs) {
      setScrollSnapsDocs(emblaApiDocs.scrollSnapList());
      emblaApiDocs.on('select', () => {
        setSelectedIndexDocs(emblaApiDocs.selectedScrollSnap());
      });
    }
    if (emblaApiVideos) {
      setScrollSnapsVideos(emblaApiVideos.scrollSnapList());
      emblaApiVideos.on('select', () => {
        setSelectedIndexVideos(emblaApiVideos.selectedScrollSnap());
      });
    }
    if (emblaApiTools) {
      setScrollSnapsTools(emblaApiTools.scrollSnapList());
      emblaApiTools.on('select', () => {
        setSelectedIndexTools(emblaApiTools.selectedScrollSnap());
      });
    }
  }, [emblaApi, emblaApiDocs, emblaApiVideos, emblaApiTools]);

  const scrollTo = {
    docs: (index) => emblaApiDocs && emblaApiDocs.scrollTo(index),
    videos: (index) => emblaApiVideos && emblaApiVideos.scrollTo(index),
    tools: (index) => emblaApiTools && emblaApiTools.scrollTo(index)
  };

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Set the first PDF resource with 'featured' status as featured resource
      const featured = data.find(resource => resource.type === 'PDF' && resource.status === 'featured');
      setFeaturedResource(featured || null);

      // Set all resources
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

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
    <>
      <Helmet>
        <title>Recursos y Herramientas | Aula Prompts</title>
        <meta name="description" content="Explora nuestra colección de recursos y herramientas para mejorar tus habilidades en la creación de prompts educativos." />
      </Helmet>
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
                      <Badge className="mb-2 bg-[#4A5AB9] text-white hover:bg-[#4A5AB9]/90">
                        {featuredResource.status || 'Nuevo'}
                      </Badge>
                      <CardTitle className="text-2xl mb-2">{featuredResource.title}</CardTitle>
                      <CardDescription className="text-base">
                        {featuredResource.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button 
                      className="gap-2" 
                      onClick={() => handleDownload(featuredResource, true)}
                    >
                      <Download size={16} />
                      Descargar {featuredResource.type}
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Guías y documentos</h2>
            </div>
            
            <div className="overflow-hidden" ref={emblaRefDocs}>
              <div className="flex gap-6">
                {pdfResources.map((resource) => (
                  <div className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]" key={resource.id}>
                    <Card className="flex flex-col h-full">
                      <CardHeader>
                        {resource.status && (
                          <Badge className="mb-2 w-fit bg-[#4A5AB9] text-white hover:bg-[#4A5AB9]/90">
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
                        <Button 
                          className="gap-2" 
                          onClick={() => handleDownload(resource)}
                        >
                          <Download size={16} />
                          Descargar PDF
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => emblaApiDocs?.scrollPrev()}
                  className="rounded-full border-[#4A5AB9] text-[#4A5AB9] hover:bg-[#4A5AB9] hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => emblaApiDocs?.scrollNext()}
                  className="rounded-full border-[#4A5AB9] text-[#4A5AB9] hover:bg-[#4A5AB9] hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <Button variant="outline" asChild>
                <Link to="/documents">Ver todos</Link>
              </Button>
              
              <div className="flex gap-2">
                {scrollSnapsDocs.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === selectedIndexDocs
                        ? 'bg-[#4A5AB9]'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => scrollTo.docs(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Videoteca */}
        {videoResources.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Videoteca</h2>
            
            <div className="overflow-hidden" ref={emblaRefVideos}>
              <div className="flex gap-6">
                {videoResources.map((resource) => (
                  <div className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]" key={resource.id}>
                    <Card key={resource.id} className="flex flex-col h-full">
                      <CardHeader>
                        {resource.status && (
                          <Badge variant="secondary" className="mb-2 w-fit">
                            {resource.status}
                          </Badge>
                        )}
                        <div className="h-[200px] mb-4">
                          <a href={resource.link} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                            <img 
                              src={resource.image || '/placeholder-video.png'} 
                              alt={resource.title}
                              className="w-full h-full object-cover rounded-lg hover:opacity-80 transition-opacity"
                            />
                          </a>
                        </div>
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
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => emblaApiVideos?.scrollPrev()}
                  className="rounded-full border-[#4A5AB9] text-[#4A5AB9] hover:bg-[#4A5AB9] hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => emblaApiVideos?.scrollNext()}
                  className="rounded-full border-[#4A5AB9] text-[#4A5AB9] hover:bg-[#4A5AB9] hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                {scrollSnapsVideos.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === selectedIndexVideos
                        ? 'bg-[#4A5AB9]'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => scrollTo.videos(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Herramientas prácticas */}
        {linkResources.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Herramientas prácticas</h2>
            
            <div className="overflow-hidden" ref={emblaRefTools}>
              <div className="flex gap-6">
                {linkResources.map((resource) => (
                  <div className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]" key={resource.id}>
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
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => emblaApiTools?.scrollPrev()}
                  className="rounded-full border-[#4A5AB9] text-[#4A5AB9] hover:bg-[#4A5AB9] hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => emblaApiTools?.scrollNext()}
                  className="rounded-full border-[#4A5AB9] text-[#4A5AB9] hover:bg-[#4A5AB9] hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                {scrollSnapsTools.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === selectedIndexTools
                        ? 'bg-[#4A5AB9]'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => scrollTo.tools(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default Resources;
