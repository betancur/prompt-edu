import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import PromptOfDay from '@/components/PromptOfDay';
import * as HeroIcons from '@heroicons/react/24/outline';
import { Button } from "@/components/ui/button";

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
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id, category.name)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 cursor-pointer transition-shadow"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  {HeroIcon ? (
                    <HeroIcon className="w-10 h-10 text-gray-600" />
                  ) : (
                    <div className="text-3xl">❓</div>
                  )}
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="text-sm text-gray-600 hover:text-green-500 transition-colors duration-200">
                    Conoce más_
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">
          Free AI Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-4">
              AI in Education Guide
            </h3>
            <p className="mb-4">
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
          </div>
          {/* Add more resources here */}
        </div>
      </div>

      <div className="mt-16">
        <div className="flex flex-col items-center">
          <div className="flex gap-8 mb-4">
            <div className="h-[200px]">
              <img
                src="/resources/Logo-Eafit.png"
                alt="Universidad Eafit"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="h-[200px]">
              <img
                src="/resources/Logo-GilbertoEcheverri.png"
                alt="Corporación Gilberto Echeverri Mejia"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="h-[200px]">
              <img
                src="/resources/Logo-Gobernacion.png"
                alt="Gobernación de Antioquia"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
          {/* Add more logos here */}
        </div>
      </div>
    </div>
  );
}

export default Home;