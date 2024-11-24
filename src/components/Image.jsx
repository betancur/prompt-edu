import { Image as ChakraImage } from '@chakra-ui/react'

function Image({ src, alt }) {
  return (
    <ChakraImage src={src} alt={alt} width="100%" height="auto" />
  )
}

export default Image
