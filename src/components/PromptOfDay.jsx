import { Box, Card, CardBody, Heading, Text, Badge } from '@chakra-ui/react'

function PromptOfDay() {
  return (
    <Card>
      <CardBody>
        <Badge colorScheme="brand" mb={2}>Prompt of the Day</Badge>
        <Heading size="md" mb={4}>
          Create a Story Using Scientific Concepts
        </Heading>
        <Text>
          Write a short story that incorporates at least three scientific concepts 
          we've learned this week (e.g., photosynthesis, cell division, and energy 
          transformation). The story should be engaging while accurately representing 
          these concepts.
        </Text>
      </CardBody>
    </Card>
  )
}

export default PromptOfDay
