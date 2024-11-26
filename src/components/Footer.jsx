function Footer() {
  return (
    <footer className="mt-16 bg-white">
      <div className="container mx-auto max-w-[1200px] py-12">
        <div className="flex flex-col items-center">
          <div className="flex flex-col md:flex-row gap-8 mb-4 items-center justify-center">
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
        </div>
      </div>
    </footer>
  );
}

export default Footer;
