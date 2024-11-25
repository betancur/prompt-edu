import { 
  Box, 
  Flex, 
  Button, 
  useColorMode, 
  IconButton,
  Link as ChakraLink
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box as="nav" py={4} px={8} borderBottom="1px" borderColor="gray.200">
      <Flex maxW="1200px" mx="auto" justify="space-between" align="center">
        <Flex gap={8}>
          <ChakraLink as={Link} to="/" fontSize="xl" fontWeight="bold">
            PromptEd
          </ChakraLink>
          <ChakraLink as={Link} to="/library">Library</ChakraLink>
          <ChakraLink as={Link} to="/frameworks">Frameworks</ChakraLink>
          <ChakraLink as={Link} to="/resources">Resources</ChakraLink>
        </Flex>
        <Flex gap={4}>
          <IconButton
            icon={colorMode === 'light' ? <MoonIcon style={{width: 20}} /> : <SunIcon style={{width: 20}} />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar
