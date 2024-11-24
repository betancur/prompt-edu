import { Box, useColorMode } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  const { colorMode } = useColorMode()

  return (
    <Box minH="100vh" bg={colorMode === 'light' ? 'gray.50' : 'gray.800'}>
      <Navbar />
      <Box as="main" maxW="1200px" mx="auto" px={4} py={8}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
