import { Box, Heading, SimpleGrid, Text, VStack, Input, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // Import Supabase client
import PromptCard from '../components/PromptCard'; // Component for individual prompts

function Library() {
  const [prompts, setPrompts] = useState([]); // State for storing fetched prompts
  const [filteredPrompts, setFilteredPrompts] = useState([]); // State for filtered prompts
  const [categories, setCategories] = useState([]); // State for categories
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
  const [error, setError] = useState(null); // State for handling errors
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch prompts and categories from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Fetch prompts
      const { data: promptsData, error: promptsError } = await supabase
          .from('prompts')
          .select('id, title, content, created_at, category_id, categories(name)');
      if (promptsError) {
        console.error('Error fetching prompts:', promptsError);
        setError('Failed to load prompts.');
      } else {
        setPrompts(promptsData);
        setFilteredPrompts(promptsData); // Initialize filtered prompts
      }

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase.from('categories').select('*');
      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
        setError('Failed to load categories.');
      } else {
        setCategories(categoriesData);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  // Handle search input changes
  useEffect(() => {
    let filtered = prompts;
  
    console.log('Selected Category:', selectedCategory); // Debug selected category
    console.log('Search Query:', searchQuery); // Debug search query
  
    if (searchQuery) {
      filtered = filtered.filter(
        (prompt) =>
          prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    if (selectedCategory) {
      filtered = filtered.filter((prompt) => prompt.category_id === selectedCategory.toString());
      console.log('Filtered Prompts After Category:', filtered); // Debug filtered prompts
    }
  
    setFilteredPrompts(filtered);
  }, [searchQuery, selectedCategory, prompts]);

  // Render error message if there’s an issue
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
        Explore Prompts
      </Heading>

      {/* Search and Filter */}
      <Box mb={6} display="flex" gap={4} flexDirection={{ base: 'column', md: 'row' }}>
        {/* Search Bar */}
        <Input
          placeholder="Search prompts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          maxW={{ base: '100%', md: '50%' }}
        />

        {/* Category Filter */}
        <Select
          placeholder="Filter by category"
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

      {/* Loading */}
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
    // Log prompt and category IDs
    console.log('Prompt category_id:', prompt.category_id);
    console.log('Categories:', categories);

    // Find the category name using the category_id
    const categoryName = categories.find((cat) => cat.id === prompt.category_id)?.name || 'Uncategorized';

    return (
      <PromptCard
        key={prompt.id}
        title={prompt.title}
        content={prompt.content}
        createdAt={prompt.created_at}
        category={categoryName} // Pass the category name
      />
    );
  })}
</SimpleGrid>
      )}
    </Box>
  );
}

export default Library;