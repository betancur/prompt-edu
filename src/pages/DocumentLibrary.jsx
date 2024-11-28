import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Search, Download, FileText } from 'lucide-react';
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";

function DocumentLibrary() {
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('type', 'PDF')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const handleDownload = (url, filename) => {
    window.open(url, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
      <div className="title-decoration">
          <div className="title-slashes">//</div>
          <h1 className="text-4xl font-bold font-jost">Guías y documentos</h1>
        </div>
        <p className="text-gray-600">Explora nuestra colección de recursos y documentación</p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar documentos..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-8">Cargando documentos...</div>
      ) : (
        <div>
          {!loading && filteredDocuments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No se encontraron documentos que coincidan con tu búsqueda.
            </div>
          )}

          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="flex flex-col h-full">
                  <CardHeader>
                    {doc.status && (
                      <Badge className="mb-2 w-fit bg-[#4A5AB9] text-white hover:bg-[#4A5AB9]/90">
                        {doc.status}
                      </Badge>
                    )}
                    <div className="h-[250px] mb-4">
                      <img 
                        src={doc.image || '/placeholder-pdf.png'} 
                        alt={doc.title}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <CardTitle className="text-xl mb-2">{doc.title}</CardTitle>
                    {doc.description && (
                      <CardDescription>{doc.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="mt-auto pt-4">
                    <Button className="gap-2" asChild>
                      <a href={doc.link} target="_blank" rel="noopener noreferrer">
                        <Download size={16} />
                        Descargar PDF
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DocumentLibrary;
