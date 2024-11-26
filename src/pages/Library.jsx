import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import PromptCard from '../components/PromptCard';

function Library() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [prompts, setPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryColors, setCategoryColors] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch prompts
        const { data: promptsData, error: promptsError } = await supabase
          .from('prompts')
          .select('*');
        
        if (promptsError) throw promptsError;
        
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*');
        
        if (categoriesError) throw categoriesError;

        setPrompts(promptsData || []);
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

  // Filter prompts based on search query and selected category
  useEffect(() => {
    let filtered = [...prompts];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(prompt =>
        prompt.title.toLowerCase().includes(query) ||
        prompt.content.toLowerCase().includes(query)
      );
    }

    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(prompt => 
        String(prompt.category_id) === String(selectedCategory)
      );
    }

    setFilteredPrompts(filtered);
  }, [prompts, searchQuery, selectedCategory]);

  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams);
    const categoryParam = queryParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

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
    <div>
      <h1 className="text-4xl font-bold font-jost mb-8">Biblioteca de Prompts</h1>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Buscar prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex h-10 w-full md:w-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="all">Todas las Categorias</option>
            {categories.map(category => (
              <option key={category.id} value={String(category.id)}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No prompts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map(prompt => {
              const category = categories.find(cat => cat.id === prompt.category_id);
              return (
                <PromptCard
                  key={prompt.id}
                  title={prompt.title}
                  content={prompt.content}
                  createdAt={prompt.created_at}
                  category={category?.name || 'Uncategorized'}
                  categoryColor={category?.color}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Library;