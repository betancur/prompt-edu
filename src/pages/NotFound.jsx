import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Navbar from '../components/Navbar';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-[1200px]">
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-6 px-4">
            <h1 className="text-6xl md:text-8xl font-bold text-primary">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Página no encontrada
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Lo sentimos, la página que estás buscando no existe o ha sido movida.
            </p>
            <div className="space-y-4">
              <Link to="/">
                <Button className="bg-primary hover:bg-primary/90">
                  Volver al inicio_
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
