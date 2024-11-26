import { useState } from 'react';
import { ClipboardIcon, ShareIcon } from '@heroicons/react/24/outline';
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

function PromptCard({ title, content, createdAt, category, colorScheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast({
      title: 'Contenido copiado',
      description: 'El contenido del prompt ha sido copiado al portapapeles.',
      duration: 3000,
    });
  };

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
          duration: 3000,
        });
      } catch (error) {
        toast({
          title: 'Error al compartir',
          description: 'No se pudo compartir el prompt.',
          variant: "destructive",
          duration: 3000,
        });
      }
    } else {
      toast({
        title: 'Función no disponible',
        description: 'Tu navegador no soporta la funcionalidad de compartir.',
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <div
        className="border rounded-md p-4 shadow-sm hover:shadow-md cursor-pointer bg-card"
        onClick={() => setIsOpen(true)}
      >
        <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold mb-2 bg-primary/10 text-primary`}>
          {category}
        </span>
        <h3 className="text-lg font-semibold mb-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold bg-primary/10 text-primary`}>
                {category}
              </span>
              <DialogTitle>{title}</DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Fecha: {new Date(createdAt).toLocaleDateString()}
            </p>
            <p className="text-foreground">
              {content}
            </p>
          </div>

          <DialogFooter>
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
              >
                <ClipboardIcon className="h-4 w-4" />
                <span className="sr-only">Copiar contenido</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
              >
                <ShareIcon className="h-4 w-4" />
                <span className="sr-only">Compartir contenido</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cerrar
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PromptCard;