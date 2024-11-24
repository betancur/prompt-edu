import { Card, CardBody, Heading, Text, Flex, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import {
  CalculatorIcon,
  BeakerIcon,
  BookOpenIcon,
  GlobeAmericasIcon
} from '@heroicons/react/24/solid'

const categoryIcons = {
  Math: CalculatorIcon,
  Science: BeakerIcon,
  'Language Arts': BookOpenIcon,
  'Social Studies': GlobeAmericasIcon
}

function CategoryCard({ title, count }) {
  const Icon = categoryIcons[title]

  return (
    <Card 
      as={Link} 
      to={`/library?category=${title.toLowerCase()}`} 
      _hover={{ transform: 'translateY(-4px)', transition: '0.2s' }}
    >
      <CardBody>
        <Flex align="center" gap={4}>
          <Box color="brand.500">
            <Icon style={{width: 32, height: 32}} />
          </Box>
          <Box>
            <Heading size="md">{title}</Heading>
            <Text color="gray.600">{count} prompts</Text>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  )
}

export default CategoryCard
