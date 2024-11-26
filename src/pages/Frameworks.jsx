import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function Frameworks() {
  const frameworks = [
    {
      name: 'CARE',
      description: 'El framework CARE proporciona una estructura sistemática para crear prompts efectivos, considerando el contexto, la acción deseada, el resultado esperado y la evaluación del proceso.',
      examples: [
        '**Contexto**: "Como profesor de matemáticas de secundaria..."',
        '**Acción**: "Genera un problema de geometría que..."',
        '**Resultado**: "El problema debe evaluar la comprensión de..."',
        '**Evaluación**: "Verifica que el problema sea apropiado para el nivel..."'
      ],
      tips: [
        'Sé específico con el contexto educativo',
        'Define claramente la acción que deseas que realice la IA',
        'Especifica los resultados esperados en términos medibles',
        'Incluye criterios de evaluación claros'
      ]
    },
    {
      name: 'PaRDeS',
      description: 'PaRDeS es un framework que promueve el pensamiento crítico y el aprendizaje profundo a través de un proceso estructurado de propuesta, respuesta, análisis, discusión y evaluación.',
      examples: [
        '**Proponer**: "Genera tres analogías diferentes para explicar el concepto de fotosíntesis"',
        '**Responder**: "Analiza la efectividad de cada analogía para diferentes estilos de aprendizaje"',
        '**Discutir**: "Compara y contrasta las analogías, identificando fortalezas y limitaciones"',
        '**Evaluar**: "Determina cuál analogía sería más efectiva para tu contexto específico"'
      ],
      tips: [
        'Comienza con propuestas claras y específicas',
        'Solicita respuestas detalladas y fundamentadas',
        'Promueve la discusión crítica y reflexiva',
        'Establece criterios de evaluación objetivos'
      ]
    },
    {
      name: 'RISE',
      description: 'RISE es un framework diseñado para mejorar la comprensión y el análisis de contenido educativo, siguiendo un proceso de lectura, interpretación, síntesis y evaluación.',
      examples: [
        '**Read** (Leer): "Analiza el siguiente texto sobre el cambio climático..."',
        '**Interpret** (Interpretar): "Identifica los conceptos clave y sus relaciones..."',
        '**Synthesize** (Sintetizar): "Crea un resumen conciso que conecte las ideas principales..."',
        '**Evaluate** (Evaluar): "Determina la relevancia y aplicabilidad del contenido..."'
      ],
      tips: [
        'Proporciona material de lectura claro y relevante',
        'Guía la interpretación con preguntas específicas',
        'Solicita síntesis que demuestren comprensión',
        'Incluye criterios de evaluación significativos'
      ]
    },
    {
      name: 'ERA',
      description: 'ERA es un framework enfocado en la creación de evaluaciones educativas efectivas, considerando la especificación del tipo de evaluación, los requerimientos específicos y las adaptaciones necesarias para diferentes contextos.',
      examples: [
        '**Especificación**: "Diseña una evaluación formativa para el tema de ecuaciones cuadráticas..."',
        '**Requerimientos**: "La evaluación debe incluir problemas contextualizados y rúbrica detallada..."',
        '**Adaptaciones**: "Incluye versiones alternativas para estudiantes con diferentes niveles..."'
      ],
      tips: [
        'Define claramente el tipo de evaluación y su propósito',
        'Especifica los criterios de evaluación detalladamente',
        'Considera las necesidades diversas del alumnado',
        'Incluye instrucciones claras para cada adaptación'
      ]
    },
    {
      name: 'A.P.E',
      description: 'A.P.E es un framework que estructura la creación de actividades educativas efectivas a través de tres componentes clave: la Acción a realizar, el Propósito educativo y las Expectativas de aprendizaje.',
      examples: [
        '**Action**: "Crea una actividad interactiva para practicar verbos irregulares..."',
        '**Purpose**: "El objetivo es reforzar el uso correcto de verbos en contexto..."',
        '**Expectation**: "Los estudiantes deberán demostrar dominio en situaciones cotidianas..."'
      ],
      tips: [
        'Especifica la actividad de manera concreta y clara',
        'Alinea el propósito con los objetivos curriculares',
        'Define expectativas medibles y observables',
        'Considera el nivel y contexto de los estudiantes'
      ]
    },
    {
      name: 'MCA',
      description: 'MCA es un marco estructurado para optimizar instrucciones a IAs, organizando la comunicación en tres componentes esenciales: Meta general, Contexto relevante y Acción específica.',
      examples: [
        '**Meta**: "Desarrollar material didáctico para enseñar programación básica..."',
        '**Contexto**: "Grupo de estudiantes de secundaria sin experiencia previa en programación..."',
        '**Acción**: "Genera una secuencia de ejercicios progresivos que introduzcan conceptos básicos..."'
      ],
      tips: [
        'Define una meta clara y medible',
        'Proporciona todo el contexto relevante para la tarea',
        'Especifica las acciones paso a paso',
        'Incluye criterios de éxito específicos'
      ]
    }
  ]

  return (
    <div className="container mx-auto max-w-[1200px] py-12">
      <h1 className="text-4xl font-bold font-jost mb-4">Marcos de Trabajo</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Frameworks para estructurar tus prompts educativos de manera efectiva
      </p>

      <div className="mb-12">
        <h2 className="text-2xl font-bold font-jost mb-4">¿Qué son los Frameworks de Prompts?</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Como docentes, sabemos que la estructura es fundamental para el aprendizaje efectivo. De la misma manera que utilizamos planificaciones didácticas para organizar nuestras clases, los frameworks de prompts son estructuras que nos ayudan a comunicarnos de manera efectiva con la Inteligencia Artificial.
          </p>
          <p>
            Estos marcos de trabajo nos permiten formular nuestras solicitudes de manera organizada y obtener respuestas más precisas y relevantes para nuestros objetivos pedagógicos.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {frameworks.map(framework => (
          <Card key={framework.name} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <span className="text-green-500 font-bold">//</span> {framework.name}
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                {framework.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Ejemplos</h3>
                  <div className="space-y-2">
                    {framework.examples.map((example, i) => (
                      <p 
                        key={i} 
                        className="text-sm text-muted-foreground"
                        dangerouslySetInnerHTML={{
                          __html: example.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Tips</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {framework.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-muted-foreground">{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Frameworks
