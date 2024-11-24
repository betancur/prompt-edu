import { 
  Box, 
  Heading, 
  Accordion, 
  AccordionItem, 
  AccordionButton, 
  AccordionPanel,
  AccordionIcon,
  Text
} from '@chakra-ui/react'

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
    <Box>
      <Heading mb={8}>Prompt Engineering Frameworks</Heading>
      
      <Accordion allowMultiple>
        {frameworks.map(framework => (
          <AccordionItem key={framework.name}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading size="md">{framework.name}</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Text mb={4}>{framework.description}</Text>
              
              <Heading size="sm" mb={2}>Examples</Heading>
              {framework.examples.map((example, i) => (
                <Text key={i} mb={2}>{example}</Text>
              ))}
              
              <Heading size="sm" mt={4} mb={2}>Tips</Heading>
              {framework.tips.map((tip, i) => (
                <Text key={i} mb={2}>{tip}</Text>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  )
}

export default Frameworks
