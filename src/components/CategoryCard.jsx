import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import * as HeroIcons from '@heroicons/react/24/outline';

function CategoryCard({ title, count, icon }) {
  // Transform the database icon name to PascalCase with "Icon" suffix
  const pascalCaseIconName = icon
    .split('-') // Split on hyphen
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1)) // Capitalize each part
    .join('') + 'Icon'; // Join and add "Icon" suffix

  // Resolve the Heroicon dynamically
  const HeroIcon = HeroIcons[pascalCaseIconName];

  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      textAlign="center"
    >
      <VStack spacing={3}>
        {HeroIcon ? (
          <HeroIcon style={{ width: '40px', height: '40px', color: '#4A5568' }} />
        ) : (
          <Box fontSize="3xl">❓</Box> // Fallback icon
        )}
        <Heading size="md">{title}</Heading>
        <Text color="gray.500">{count}</Text>
      </VStack>
    </Box>
  );
}

export default CategoryCard;