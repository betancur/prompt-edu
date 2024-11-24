import { 
  Box, 
  Heading, 
  SimpleGrid, 
  Input, 
  Select, 
  Flex,
  Tag,
  TagLabel,
  TagCloseButton
} from '@chakra-ui/react'
import { useState } from 'react'
import PromptCard from '../components/PromptCard'

function Library() {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sort: 'newest'
  })

  const prompts = [
    {
      id: 1,
      title: 'Mathematical Word Problem Generator',
      description: 'Create engaging word problems that incorporate real-world scenarios...',
      category: 'Math',
      tags: ['algebra', 'word-problems'],
      examples: [
        'Problem 1: A farmer has 5 apples and sells 3. How many apples does he have left?',
        'Problem 2: If a car travels at 60 mph for 2 hours, how far will it go?'
      ]
    },
    {
      id: 2,
      title: 'Science Experiment Idea',
      description: 'Design an experiment to demonstrate a scientific concept...',
      category: 'Science',
      tags: ['experiments', 'science'],
      examples: [
        'Experiment 1: Create a simple water cycle using a glass, ice cubes, and a plastic bag.',
        'Experiment 2: Build a homemade lava lamp using oil, water, Alka-Seltzer, and food coloring.'
      ]
    },
    {
      id: 3,
      title: 'Language Arts Story Prompt',
      description: 'Write a short story that incorporates at least three language arts concepts...',
      category: 'Language Arts',
      tags: ['writing', 'language'],
      examples: [
        'Story 1: Create a narrative about a character who learns to read.',
        'Story 2: Write a descriptive paragraph about your favorite place.'
      ]
    },
    {
      id: 4,
      title: 'Social Studies Historical Event',
      description: 'Research and present an important historical event...',
      category: 'Social Studies',
      tags: ['history', 'social-studies'],
      examples: [
        'Event 1: Discuss the significance of the American Revolution.',
        'Event 2: Analyze the causes and effects of World War II.'
      ]
    }
  ]

  const filteredPrompts = prompts.filter(prompt => {
    if (filters.search) {
      return prompt.title.toLowerCase().includes(filters.search.toLowerCase()) ||
             prompt.description.toLowerCase().includes(filters.search.toLowerCase())
    }

    if (filters.category && filters.category !== 'all') {
      return prompt.category === filters.category
    }

    return true
  })

  const sortedPrompts = filteredPrompts.sort((a, b) => {
    if (filters.sort === 'newest') {
      return new Date(b.id) - new Date(a.id)
    } else if (filters.sort === 'popular') {
      // Assuming popularity is based on the number of examples
      return b.examples.length - a.examples.length
    }

    return 0
  })

  return (
    <Box>
      <Heading mb={8}>Prompt Library</Heading>
      
      <Flex gap={4} mb={6}>
        <Input
          placeholder="Search prompts..."
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
        />
        <Select
          value={filters.category}
          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
        >
          <option value="">All Categories</option>
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="language">Language Arts</option>
          <option value="social">Social Studies</option>
        </Select>
        <Select
          value={filters.sort}
          onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
        >
          <option value="newest">Newest First</option>
          <option value="popular">Most Popular</option>
        </Select>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {sortedPrompts.map(prompt => (
          <PromptCard key={prompt.id} {...prompt} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Library
