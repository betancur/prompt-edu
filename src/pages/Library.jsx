import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Star, ChevronDown } from 'lucide-react';
import PromptCard from '../components/PromptCard';
import { Button } from "../components/ui/button";
import { secureStorage } from '../middleware/security';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { cn } from "../lib/utils";

function Library() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFavorites, setShowFavorites] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryColors, setCategoryColors] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const itemsPerPageOptions = [30, 60, 90];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch prompts
        const { data: promptsData, error: promptsError } = await supabase
          .from('prompts')
          .select('*');
        
        if (promptsError) throw promptsError;
        
        // Sort prompts by creation date (newest first)
        const sortedPrompts = promptsData?.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        ) || [];

        setPrompts(sortedPrompts);
        
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*');
        
        if (categoriesError) throw categoriesError;

        setCategories(categoriesData || []);
        
        // Set colors for categories
        const colors = {};
        categoriesData?.forEach(category => {
          colors[category.id] = 'primary';
        });
        setCategoryColors(colors);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter prompts based on search query, selected category, and favorites
  useEffect(() => {
    let filtered = [...prompts];
    const favorites = secureStorage.get('favorites') || [];

    if (showFavorites) {
      filtered = filtered.filter(prompt => favorites.includes(prompt.id));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      filtered = filtered.filter(prompt =>
        prompt.title.toLowerCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .includes(query) ||
        prompt.content.toLowerCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .includes(query)
      );
    }

    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(prompt => 
        String(prompt.category_id) === String(selectedCategory)
      );
    }

    setFilteredPrompts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [prompts, searchQuery, selectedCategory, showFavorites]);

  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams);
    const categoryParam = queryParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPrompts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPrompts = filteredPrompts.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const handleFavoriteChange = (promptId, isFavorite) => {
    if (showFavorites && !isFavorite) {
      setFilteredPrompts(prev => prev.filter(p => p.id !== promptId));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[1200px] py-12">
      <div className="mb-4">
        <div className="title-decoration">
          <div className="title-slashes">//</div>
          <h1 className="text-4xl font-bold font-jost">Biblioteca de Prompts</h1>
        </div>
      </div>
      <p className="text-xl text-muted-foreground mb-8">
        Explora y descubre prompts educativos efectivos
      </p>

      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Buscar prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[280px]">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                Todas las Categorias
              </SelectItem>
              {categories.map(category => (
                <SelectItem 
                  key={category.id} 
                  value={String(category.id)}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant={showFavorites ? "default" : "outline"}
            className="w-full md:w-auto flex items-center gap-2"
            onClick={() => setShowFavorites(!showFavorites)}
          >
            <Star className={`h-4 w-4 ${showFavorites ? 'fill-white' : ''}`} />
            Favoritos
          </Button>
        </div>

        {/* Items per page selector */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Prompts por página:</span>
          <div className="flex gap-2">
            {itemsPerPageOptions.map(option => (
              <Button
                key={option}
                variant={itemsPerPage === option ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setItemsPerPage(option);
                  setCurrentPage(1);
                }}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {showFavorites 
                ? "No tienes prompts favoritos."
                : "No se encontraron prompts."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPrompts.map(prompt => {
                const category = categories.find(cat => cat.id === prompt.category_id);
                return (
                  <PromptCard
                    key={prompt.id}
                    id={prompt.id}
                    title={prompt.title}
                    content={prompt.content}
                    createdAt={prompt.created_at}
                    category={category?.name || 'Uncategorized'}
                    categoryColor={category?.color}
                    onFavoriteChange={handleFavoriteChange}
                  />
                );
              })}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  if (pageNumber <= totalPages) {
                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </Button>
                    );
                  }
                  return null;
                })}
                
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="mx-1">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground mt-4">
              Mostrando {startIndex + 1}-{Math.min(endIndex, filteredPrompts.length)} de {filteredPrompts.length} prompts
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Library;