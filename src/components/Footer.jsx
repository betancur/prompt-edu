import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-16 bg-white dark:bg-background">
      <div className="container mx-auto max-w-[1200px] py-12">
        <div className="flex flex-col items-center">
          <div className="flex flex-col md:flex-row gap-8 mb-4 items-center justify-center">
            <div className="h-[200px]">
              <img
                src="/resources/Logo-Eafit.png"
                alt="Universidad Eafit"
                className="h-full w-auto object-contain dark:invert dark:brightness-0 dark:contrast-200"
              />
            </div>
            <div className="h-[200px]">
              <img
                src="/resources/Logo-GilbertoEcheverri.png"
                alt="Corporación Gilberto Echeverri Mejia"
                className="h-full w-auto object-contain dark:invert dark:brightness-0 dark:contrast-200"
              />
            </div>
            <div className="h-[200px]">
              <img
                src="/resources/Logo-Gobernacion.png"
                alt="Gobernación de Antioquia"
                className="h-full w-auto object-contain dark:invert dark:brightness-0 dark:contrast-200"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              Curado con ❤️ por{" "}
              <a
                href="https://es.nodoeafit.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
              >
                Nodo Eafit
              </a>
            </p>
            <span>•</span>
            <Link
              to="/privacy-policy"
              className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
            >
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
