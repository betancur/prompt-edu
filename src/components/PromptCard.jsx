import {
  Box,
  Heading,
  Text,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  IconButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ClipboardIcon, ShareIcon } from '@heroicons/react/24/outline'; // Importar íconos de Heroicons

function PromptCard({ title, content, createdAt, category, colorScheme }) {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook para el modal
  const toast = useToast(); // Para notificaciones

  // Manejar la copia del contenido
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast({
      title: 'Contenido copiado',
      description: 'El contenido del prompt ha sido copiado al portapapeles.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Manejar compartir
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Prompt: ${title}`,
          text: content,
        });
        toast({
          title: 'Prompt compartido',
          description: 'El prompt se ha compartido exitosamente.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Error al compartir',
          description: 'No se pudo compartir el prompt.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'Función no disponible',
        description: 'Tu navegador no soporta la funcionalidad de compartir.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {/* Tarjeta inicial */}
      <Box
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        p={4}
        shadow="sm"
        _hover={{ shadow: 'md' }}
        cursor="pointer"
        onClick={onOpen} // Abrir el modal al hacer clic
      >
        <Badge colorScheme={colorScheme} mb={2}>
          {category}
        </Badge>
        <Heading size="md" mb={2}>
          {title}
        </Heading>
        <Text color="gray.500" fontSize="sm">
          {new Date(createdAt).toLocaleDateString()}
        </Text>
      </Box>

      {/* Modal para mostrar la información completa */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex justifyContent="space-between" alignItems="center">
              <Badge colorScheme={colorScheme}>{category}</Badge>
              <Heading size="md">{title}</Heading>
            </Flex>
          </ModalHeader>
          <ModalBody>
            <Text color="gray.500" fontSize="sm" mb={4}>
              Fecha: {new Date(createdAt).toLocaleDateString()}
            </Text>
            <Text>{content}</Text>
          </ModalBody>
          <ModalFooter>
            <Flex gap={4} flexWrap="wrap">
              {/* Botón para copiar */}
              <IconButton
                icon={<ClipboardIcon style={{ width: 20, height: 20 }} />}
                colorScheme="blue"
                aria-label="Copiar contenido"
                onClick={handleCopy}
              />
              {/* Botón para compartir */}
              <IconButton
                icon={<ShareIcon style={{ width: 20, height: 20 }} />}
                colorScheme="green"
                aria-label="Compartir contenido"
                onClick={handleShare}
              />
              {/* Botón para cerrar */}
              <Button variant="ghost" onClick={onClose}>
                Cerrar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PromptCard;