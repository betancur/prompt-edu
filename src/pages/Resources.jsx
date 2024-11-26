import { Button } from "@/components/ui/button"

function Resources() {
  const resources = [
    {
      title: 'AI in Education Guide',
      description: 'Download our comprehensive guide on integrating AI into your classroom.',
      file: '/resources/ai-in-education-guide.pdf'
    },
    // Add more resources here
  ]

  return (
    <div className="container mx-auto max-w-[1200px] py-12">
      <div className="mb-4">
        <div className="title-decoration">
          <div className="title-slashes">//</div>
          <h1 className="text-4xl font-bold font-jost">Recursos Gratuitos</h1>
        </div>
      </div>
      <p className="text-xl text-muted-foreground mb-8">
        Descarga recursos útiles para mejorar tu enseñanza con IA
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map(resource => (
          <div 
            key={resource.title}
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6 flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">{resource.title}</h3>
              <p className="text-muted-foreground">{resource.description}</p>
              <Button asChild>
                <a href={resource.file} download>
                  Download PDF
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Resources
