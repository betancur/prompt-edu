import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { Button } from '@/components/ui/button'
import PromptOfDay from '../components/PromptOfDay'
import CategoryCard from '../components/CategoryCard'

function Home() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        console.log('Fetched categories:', data);
        setCategories(data);
      }
    };
  
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId, categoryName) => {
    navigate(`/library?category=${categoryId}`, { 
      state: { categoryName } 
    });
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Mejore su enseñanza con prompts de IA
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Descubre y crea prompts efectivos para tu aula
        </p>
        <input
          className="max-w-[600px] w-full px-4 py-2 rounded-md border bg-background"
          placeholder="Search prompts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <PromptOfDay />

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Categorías destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <CategoryCard 
              key={category.id} 
              title={category.name} 
              count={category.description || 'Description not available'}
              icon={category.icon}
              onClick={() => handleCategoryClick(category.id, category.name)}
            />
          ))}
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
  )
}

export default Home