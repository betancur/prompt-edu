import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

function Frameworks() {
  const frameworks = [
    {
      name: 'CARE Framework',
      description: 'Context, Action, Result, Evaluation framework for creating structured prompts.',
      examples: ['Example 1...', 'Example 2...'],
      tips: ['Tip 1...', 'Tip 2...']
    },
    {
      name: 'PaRDeS Framework',
      description: 'Propose, Respond, Analyze, Discuss, Evaluate framework for fostering critical thinking.',
      examples: ['Example 1...', 'Example 2...'],
      tips: ['Tip 1...', 'Tip 2...']
    },
    {
      name: 'RISE Framework',
      description: 'Read, Interpret, Synthesize, Evaluate framework for enhancing comprehension and analysis.',
      examples: ['Example 1...', 'Example 2...'],
      tips: ['Tip 1...', 'Tip 2...']
    }
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Prompt Engineering Frameworks</h1>
      
      <Accordion type="multiple" className="w-full">
        {frameworks.map(framework => (
          <AccordionItem key={framework.name} value={framework.name}>
            <AccordionTrigger className="text-xl font-semibold">
              {framework.name}
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-4 text-muted-foreground">{framework.description}</p>
              
              <h3 className="text-lg font-semibold mb-2">Examples</h3>
              {framework.examples.map((example, i) => (
                <p key={i} className="mb-2">{example}</p>
              ))}
              
              <h3 className="text-lg font-semibold mt-4 mb-2">Tips</h3>
              {framework.tips.map((tip, i) => (
                <p key={i} className="mb-2">{tip}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default Frameworks
