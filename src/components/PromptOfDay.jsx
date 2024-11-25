import { Box, Heading, Text, Badge, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function PromptOfDay() {
  const [prompt, setPrompt] = useState(null); // Estado para el prompt aleatorio
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchRandomPrompt = async () => {
      setLoading(true);

      // Obtener todos los prompts con su categoría
      const { data: prompts, error } = await supabase
        .from('prompts')
        .select('*, categories(name)');
      
      if (error) {
        console.error('Error fetching prompts:', error);
        setLoading(false);
        return;
      }

      // Seleccionar un prompt aleatorio
      if (prompts && prompts.length > 0) {
        const randomIndex = Math.floor(Math.random() * prompts.length);
        setPrompt(prompts[randomIndex]);
      }

      setLoading(false);
    };

    fetchRandomPrompt();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" py={12}>
        <Spinner size="lg" />
      </Box>
    );
  }

  if (!prompt) {
    return (
      <Box textAlign="center" py={12}>
        <Text>No se encontró ningún prompt.</Text>
      </Box>
    );
  }

  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      p={6}
      shadow="sm"
      bg="white"
    >
      <Badge colorScheme="blue" mb={4}>
        {prompt.categories.name}
      </Badge>
      <Heading size="md" mb={4}>
        {prompt.title}
      </Heading>
      <Text color="gray.700" mb={4}>
        {prompt.content}
      </Text>
    </Box>
  );
}

export default PromptOfDay;