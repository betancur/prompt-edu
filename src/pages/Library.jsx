import { Box, Heading, SimpleGrid, Text, VStack, Input, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Importar useLocation para leer los parámetros de la URL
import { supabase } from '../lib/supabaseClient';
import PromptCard from '../components/PromptCard';

function Library() {
  const [prompts, setPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryColors, setCategoryColors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation(); // Hook para obtener la URL actual

  // Leer el ID de la categoría desde la URL al cargar el componente
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search); // Parsear parámetros de la URL
    const categoryParam = queryParams.get('category'); // Obtener el ID de la categoría
    if (categoryParam) {
      setSelectedCategory(categoryParam); // Preseleccionar la categoría si está en la URL
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Fetch prompts
      const { data: promptsData, error: promptsError } = await supabase.from('prompts').select('*');
      if (promptsError) {
        console.error('Error fetching prompts:', promptsError);
        setError('Failed to load prompts.');
      } else {
        setPrompts(promptsData);
        setFilteredPrompts(promptsData);
      }

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase.from('categories').select('*');
      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
        setError('Failed to load categories.');
      } else {
        setCategories(categoriesData);

        // Generate random colors for categories
        const colors = {};
        categoriesData.forEach((category) => {
          colors[category.id] = getRandomColor(); // Assign random color
        });
        setCategoryColors(colors);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  // Function to generate random Chakra UI color schemes
  const getRandomColor = () => {
    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'teal', 'cyan'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    let filtered = prompts;

    if (searchQuery) {
      filtered = filtered.filter(
        (prompt) =>
          prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((prompt) => prompt.category_id === selectedCategory);
    }

    setFilteredPrompts(filtered);
  }, [searchQuery, selectedCategory, prompts]);

  if (error) {
    return (
      <Box textAlign="center" mt={16}>
        <Text color="red.500" fontSize="lg">
          {error}
        </Text>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Heading size="xl" mb={8}>
        Biblioteca de Prompts
      </Heading>

      <Box mb={6} display="flex" gap={4} flexDirection={{ base: 'column', md: 'row' }}>
        <Input
          placeholder="Buscar prompts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          maxW={{ base: '100%', md: '50%' }}
        />

        <Select
          placeholder="Filtrar por categoría"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          maxW={{ base: '100%', md: '50%' }}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </Box>

      {loading ? (
        <Text textAlign="center" color="gray.600">
          Loading prompts...
        </Text>
      ) : filteredPrompts.length === 0 ? (
        <Text textAlign="center" color="gray.600">
          No prompts found.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredPrompts.map((prompt) => {
            const categoryName = categories.find((cat) => cat.id === prompt.category_id)?.name || 'Uncategorized';
            const colorScheme = categoryColors[prompt.category_id] || 'gray'; // Get the color scheme for this category

            return (
              <PromptCard
                key={prompt.id}
                title={prompt.title}
                content={prompt.content}
                createdAt={prompt.created_at}
                category={categoryName}
                colorScheme={colorScheme} // Pass the color scheme
              />
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default Library;