import { 
  Box, 
  Heading, 
  Text, 
  Input, 
  SimpleGrid 
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { supabase } from '../lib/supabaseClient'; 
import PromptOfDay from '../components/PromptOfDay';
import CategoryCard from '../components/CategoryCard';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Hook para redirigir

  // Fetch categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        console.log('Fetched categories:', data);
        setCategories(data);
      }
    };
  
    fetchCategories();
  }, []);

  // Manejar clic en una categoría
  const handleCategoryClick = (categoryId) => {
    navigate(`/library?category=${categoryId}`); // Navegar con el ID de la categoría
  };

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
              onClick={() => handleCategoryClick(category.id)} // Redirigir al hacer clic
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Home;