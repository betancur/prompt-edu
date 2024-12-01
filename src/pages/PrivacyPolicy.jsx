import React from 'react';
import { Helmet } from 'react-helmet-async';

function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Política de Privacidad | Aula Prompts</title>
        <meta name="description" content="Conoce nuestra política de privacidad y cómo protegemos tus datos en Aula Prompts." />
      </Helmet>
      <div className="container mx-auto max-w-[1200px] py-12">
        <div className="mb-4">
          <div className="title-decoration">
            <div className="title-slashes">//</div>
            <h1 className="text-4xl font-bold font-jost">Política de Privacidad</h1>
          </div>
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            En Nodo Eafit, nos tomamos muy en serio la privacidad de nuestros usuarios.
          </p>

          <section className="mb-8">
            <h2>Información que Recolectamos</h2>
            <p>
              Recopilamos información que nos proporcionas directamente cuando:
            </p>
            <ul>
              <li>Te registras en nuestra plataforma</li>
              <li>Utilizas nuestros servicios</li>
              <li>Te comunicas con nosotros</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Uso de la Información</h2>
            <p>
              Utilizamos la información recopilada para:
            </p>
            <ul>
              <li>Proporcionar y mantener nuestros servicios</li>
              <li>Mejorar y personalizar tu experiencia</li>
              <li>Comunicarnos contigo sobre actualizaciones o cambios</li>
              <li>Desarrollar nuevas características y servicios</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Protección de Datos</h2>
            <p>
              Implementamos medidas de seguridad diseñadas para proteger tu información, incluyendo:
            </p>
            <ul>
              <li>Encriptación de datos sensibles</li>
              <li>Acceso restringido a la información personal</li>
              <li>Monitoreo regular de nuestros sistemas</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Compartir Información</h2>
            <p>
              No vendemos ni compartimos tu información personal con terceros, excepto:
            </p>
            <ul>
              <li>Cuando sea necesario para proporcionar nuestros servicios</li>
              <li>Cuando sea requerido por ley</li>
              <li>Con tu consentimiento explícito</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Tus Derechos</h2>
            <p>
              Tienes derecho a:
            </p>
            <ul>
              <li>Acceder a tu información personal</li>
              <li>Corregir datos inexactos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tu información</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Proveedores de servicios</h2>
            <p>
              Podemos emplear a empresas e individuos de terceros para facilitar nuestro Servicio ("Proveedores de Servicios"), para proporcionar el Servicio en nuestro nombre, para realizar servicios relacionados con el Servicio o para ayudarnos a analizar cómo se utiliza nuestro Servicio.
            </p>
            <p>
              Estos terceros tienen acceso a sus Datos Personales solo para realizar estas tareas en nuestro nombre y están obligados a no divulgarlos ni utilizarlos para ningún otro propósito.
            </p>
          </section>

          <section className="mb-8">
            <h2>Enlaces a otros sitios</h2>
            <p>
              Nuestro Servicio puede contener enlaces a otros sitios que no son operados por nosotros. Si hace clic en un enlace de terceros, será dirigido al sitio de ese tercero. Le recomendamos encarecidamente que revise la Política de Privacidad de cada sitio que visite.
            </p>
            <p>
              No tenemos control ni asumimos ninguna responsabilidad por el contenido, las políticas de privacidad o las prácticas de ningún sitio o servicio de terceros.
            </p>
          </section>

          <section className="mb-8">
            <h2>Cambios en la Política</h2>
            <p>
              Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento.
              Te notificaremos sobre cambios significativos a través de un aviso visible en nuestra plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2>Contacto</h2>
            <p>
              Si tienes preguntas sobre nuestra política de privacidad, puedes contactarnos en:{" "}
              <a href="mailto:nodo@eafit.edu.co" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                nodo@eafit.edu.co
              </a>
            </p>
          </section>

          <div className="text-sm text-muted-foreground mt-12">
            Última actualización: Noviembre 2024
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
