import { 
  Box, 
  Heading, 
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Button
} from '@chakra-ui/react'

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
    <Box>
      <Heading mb={8}>Free AI Resources</Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {resources.map(resource => (
          <Card key={resource.title}>
            <CardBody>
              <Heading size="md">{resource.title}</Heading>
              <Text>{resource.description}</Text>
              <Button colorScheme="brand" mt={4} as="a" href={resource.file} download>
                Download PDF
              </Button>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Resources
