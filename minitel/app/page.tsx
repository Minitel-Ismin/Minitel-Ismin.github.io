import Image from 'next/image'

// Yarn dev pour voir les changements

export default function Home() {
  return (
  <>
    <main>
       <section className="home">
          <div className="home__container container">
             <div className="home__data">
                <h2 className="home__subtitle">Association Réseau de l'ISMIN</h2>

                <h1 className="home__title">
                   MINITEL                    
                </h1>

                <p className="home__description">
                   MINITEL est l'association réseau de l'École des Mines de Saint-Étienne sur le Campus Aix-Marseille-Provence.
                </p>

                <a href="/apropos" className="home__button">EN SAVOIR PLUS</a>
             </div>

             <div className="home__images">

                <div className="home__swiper swiper">
                      <article className="home__article swiper-slide">
                         <Image src="/Logo_MINITEL_full_blanc.png" width={800} height={800} alt="image" className="home__shoe"/>
                      </article>
                </div>     
                
                <div className="swiper-pagination"></div> 
             </div>
          </div>
       </section>
    </main>
    </>
);
}
