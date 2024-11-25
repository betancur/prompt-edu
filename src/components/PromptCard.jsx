import { Box, Heading, Text, Badge } from '@chakra-ui/react';

function PromptCard({ title, content, createdAt, category }) {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      shadow="sm"
      _hover={{ shadow: 'md' }}
    >
      {/* Category Badge */}
      {category && (
        <Badge colorScheme="brand" mb={2}>
          {category}
        </Badge>
      )}
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Text color="gray.500" fontSize="sm" mb={4}>
        {new Date(createdAt).toLocaleDateString()}
      </Text>
      <Text>{content}</Text>
    </Box>
  );
}

export default PromptCard;