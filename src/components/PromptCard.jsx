import { 
  Card, 
  CardBody, 
  Heading, 
  Text, 
  Badge, 
  HStack,
  IconButton
} from '@chakra-ui/react'
import { HeartIcon, ShareIcon } from '@heroicons/react/24/solid'

function PromptCard({ title, description, category, tags, examples }) {
  return (
    <Card>
      <CardBody>
        <Badge colorScheme="brand" mb={2}>{category}</Badge>
        <Heading size="md" mb={2}>{title}</Heading>
        <Text noOfLines={3} mb={4}>{description}</Text>
        
        <HStack spacing={2} mb={4}>
          {tags.map(tag => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </HStack>

        <Heading size="sm" mb={2}>Examples</Heading>
        {examples.map((example, i) => (
          <Text key={i} mb={2}>{example}</Text>
        ))}

        <HStack justify="flex-end">
          <IconButton
            icon={<HeartIcon style={{width: 20}} />}
            variant="ghost"
            aria-label="Favorite"
          />
          <IconButton
            icon={<ShareIcon style={{width: 20}} />}
            variant="ghost"
            aria-label="Share"
          />
        </HStack>
      </CardBody>
    </Card>
  )
}

export default PromptCard
