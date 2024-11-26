import { useState } from 'react';
import { Copy, Share2 } from 'lucide-react';
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

function PromptCard({ title, content, category, createdAt, categoryColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copiado al portapapeles",
        description: "El prompt ha sido copiado exitosamente.",
      });
    } catch (err) {
      toast({
        title: "Error al copiar",
        description: "No se pudo copiar el prompt al portapapeles.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: title,
        text: content,
      });
      toast({
        title: "Compartido",
        description: "El prompt ha sido compartido exitosamente.",
      });
    } catch (err) {
      if (err.name !== 'AbortError') {
        toast({
          title: "Error al compartir",
          description: "No se pudo compartir el prompt.",
          variant: "destructive",
        });
      }
    }
  };

  const getBadgeStyle = (color) => {
    if (!color) return {};
    return {
      backgroundColor: color,
      color: '#FFFFFF',
      borderColor: 'transparent'
    };
  };

  return (
    <>
      <Card 
        className="cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setIsOpen(true)}
      >
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge 
              variant="outline" 
              style={getBadgeStyle(categoryColor)}
              className="transition-colors"
            >
              {category}
            </Badge>
            <span className="text-sm text-gray-500">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: categoryColor }} className="text-lg font-semibold">//</span>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        </CardHeader>
        <div className="mt-4 pt-4 border-t border-gray-100 px-6 pb-6">
          <button className="text-sm text-gray-600 hover:text-green-500 transition-colors duration-200">
            Conoce más_
          </button>
        </div>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge 
                variant="outline" 
                style={getBadgeStyle(categoryColor)}
                className="transition-colors"
              >
                {category}
              </Badge>
              <span className="text-sm text-gray-500">
                {new Date(createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: categoryColor }} className="text-xl font-semibold">//</span>
              <h2 className="text-xl font-semibold">{title}</h2>
            </div>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <p className="text-gray-700">{content}</p>
          </div>

          <DialogFooter className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
            >
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PromptCard;