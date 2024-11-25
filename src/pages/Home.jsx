import { 
  Box, 
  Heading, 
  Text, 
  Input, 
  SimpleGrid, 
  Card, 
  CardBody,
  Button,
  Image as ChakraImage,
  Flex,
  VStack,
  HStack,
  Spacer
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient' // Import Supabase client
import PromptOfDay from '../components/PromptOfDay'
import CategoryCard from '../components/CategoryCard'; // Import the default export

function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState([]) // Initialize state for categories

  // Fetch categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        console.log('Fetched categories:', data); // Log the fetched data
        setCategories(data);
      }
    };
  
    fetchCategories();
  }, []);

  return (
    <Box>
      <Box textAlign="center" mb={12}>
        <Heading size="2xl" mb={4}>
        Mejore su enseñanza con prompts de IA
        </Heading>
        <Text fontSize="xl" color="gray.600" mb={8}>
        Descubre y crea prompts efectivos para tu aula
        </Text>
        <Input
          maxW="600px"
          placeholder="Search prompts..."
          size="lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      <PromptOfDay />

      <Box mt={16}>
        <Heading size="xl" mb={8}>Categorías destacadas</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {categories.map(category => (
            <CategoryCard 
              key={category.id} 
              title={category.name} 
              count={category.description || 'Description not available'}
              icon={category.icon} 
            />
          ))}
        </SimpleGrid>
      </Box>

      <Box mt={16}>
        <Heading size="xl" mb={8}>Free AI Resources</Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          <Card>
            <CardBody>
              <Heading size="md">AI in Education Guide</Heading>
              <Text>Download our comprehensive guide on integrating AI into your classroom.</Text>
              <Button colorScheme="brand" mt={4} as="a" href="/resources/ai-in-education-guide.pdf" download>
                Download PDF
              </Button>
            </CardBody>
          </Card>

          {/* Add more resources here */}
        </SimpleGrid>
      </Box>

      <Box mt={16}>
        <Heading size="xl" mb={8}>Logos of Companies That Make This Possible</Heading>

        <Flex direction="column" align="center">
          <HStack spacing={4} mb={4}>
            <ChakraImage src="/path/to/logo1.png" alt="Company Logo 1" boxSize="60px" />
            <ChakraImage src="/path/to/logo2.png" alt="Company Logo 2" boxSize="60px" />
          </HStack>

          {/* Add more logos here */}
        </Flex>
      </Box>
    </Box>
  )
}

export default Home