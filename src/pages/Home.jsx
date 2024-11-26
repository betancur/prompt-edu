import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import PromptOfDay from '@/components/PromptOfDay';
import * as HeroIcons from '@heroicons/react/24/outline';
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      
      if (error) {
        console.error('Error:', error);
      } else {
        setCategories(data || []);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/library?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (categoryId, categoryName) => {
    navigate(`/library?category=${categoryId}`, { 
      state: { categoryName } 
    });
  };

  // Function to get HeroIcon component
  const getHeroIcon = (iconName) => {
    if (!iconName) return null;
    const pascalCaseIconName = iconName
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('') + 'Icon';
    return HeroIcons[pascalCaseIconName];
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-jost mb-4">
          Mejore su enseñanza con prompts de IA
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Descubre y crea prompts efectivos para tu aula
        </p>
        <input
          className="max-w-[600px] w-full px-4 py-2 rounded-md border bg-background"
          placeholder="Buscar prompts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <PromptOfDay />

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Categorías destacadas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map(category => {
            const HeroIcon = getHeroIcon(category.icon);
            return (
              <Card 
                key={category.id}
                onClick={() => handleCategoryClick(category.id, category.name)}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-center mb-2">
                    {HeroIcon ? (
                      <HeroIcon className="w-12 h-12 text-green-500" />
                    ) : (
                      <div className="text-4xl">❓</div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    <p className="text-muted-foreground mt-2">{category.description}</p>
                  </div>
                </CardHeader>
                <div className="mt-4 pt-4 border-t border-border px-6 pb-6">
                  <button className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Conoce más_
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">
          Free AI Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">
              AI in Education Guide
            </h3>
            <p className="mb-4 text-muted-foreground">
              Download our comprehensive guide on integrating AI into your classroom.
            </p>
            <Button
              asChild
              className="w-full"
            >
              <a href="/resources/ai-in-education-guide.pdf" download>
                Download PDF
              </a>
            </Button>
          </Card>
          {/* Add more resources here */}
        </div>
      </div>
    </div>
  );
}

export default Home;