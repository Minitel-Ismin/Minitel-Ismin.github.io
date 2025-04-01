import Image from "next/image"
import Form from 'next/form'
import './globals.css';

export default function Page() {
    return (
        <>
        <main className="main">
        <section className="projets section">
           <div className="container">
              <h2 className="section__title">Nos Projets & Événements</h2>

              <div className="search-filter">
                 <Form action="/search" className="search-box">
                    <input type="text" className="search-input" placeholder="Rechercher un projet..." id="searchInput"/>
                 </Form>
                 <div className="filter-tags" id="filterTags">
                    <span className="filter-tag active" data-tag="all">Tous</span>
                    <span className="filter-tag" data-tag="Événement">Événement</span>
                    <span className="filter-tag" data-tag="Formation">Formation</span>
                    <span className="filter-tag" data-tag="Gaming">Gaming</span>
                    <span className="filter-tag" data-tag="Cyber">Cyber</span>
                    <span className="filter-tag" data-tag="Réseau">Réseau</span>
                    <span className="filter-tag" data-tag="DevOps">DevOps</span>
                 </div>
              </div>

              <div className="projets-section">
                 <h3 className="section__subtitle">Projets en cours</h3>
                 <div className="projets__grid">
                    <a href="projets/nuit-info.html" className="projet__card">
                       <div className="projet__image">
                          <Image src="/projet1.jpg" alt="Projet 1" width={500} height={500}/>
                          <div className="projet__overlay">
                             <i className="ri-links-line"></i>
                          </div>
                       </div>
                       <div className="projet__content">
                          <h3 className="projet__title">Nuit de l'Info</h3>
                          <p className="projet__description">
                             Un événement annuel où les étudiants développent des projets informatiques en une seule nuit.
                          </p>
                          <div className="projet__tags">
                             <span className="projet__tag">Événement</span>
                             <span className="projet__tag">Formation</span>
                          </div>
                       </div>
                    </a>

                    <a href="projets/tournoi-gaming.html" className="projet__card">
                       <div className="projet__image">
                          <Image src="/projet2.jpg" alt="Projet 2" width={800} height={800} />
                          <div className="projet__overlay">
                             <i className="ri-links-line"></i>
                          </div>
                       </div>
                       <div className="projet__content">
                          <h3 className="projet__title">Tournoi Gaming</h3>
                          <p className="projet__description">
                             Organisation de tournois de jeux vidéo pour les étudiants du campus.
                          </p>
                          <div className="projet__tags">
                             <span className="projet__tag">Gaming</span>
                             <span className="projet__tag">Événement</span>
                          </div>
                       </div>
                    </a>

                    <a href="projets/formation-reseau.html" className="projet__card">
                       <div className="projet__image">
                          <Image src="/projet3.jpg" alt="Projet 3" width={800} height={800} />
                          <div className="projet__overlay">
                             <i className="ri-links-line"></i>
                          </div>
                       </div>
                       <div className="projet__content">
                          <h3 className="projet__title">Formation Réseau</h3>
                          <p className="projet__description">
                             Sessions de formation sur les réseaux et la sécurité informatique.
                          </p>
                          <div className="projet__tags">
                             <span className="projet__tag">Formation</span>
                             <span className="projet__tag">Réseau</span>
                          </div>
                       </div>
                    </a>
                 </div>
              </div>

              <div className="projets-section">
                 <h3 className="section__subtitle">Événements passés</h3>
                 <div className="projets__grid">
                    <a href="projets/ctf-2023.html" className="projet__card">
                       <div className="projet__image">
                          <Image src="/event1.jpg" alt="Event 1"  width={800} height={800} />
                          <div className="projet__overlay">
                             <i className="ri-links-line"></i>
                          </div>
                       </div>
                       <div className="projet__content">
                          <h3 className="projet__title">CTF 2023</h3>
                          <p className="projet__description">
                             Capture The Flag organisé en partenariat avec d'autres écoles.
                          </p>
                          <div className="projet__tags">
                             <span className="projet__tag">Cyber</span>
                             <span className="projet__tag">Événement</span>
                          </div>
                       </div>
                    </a>

                    <a href="projets/workshop-docker.html" className="projet__card">
                       <div className="projet__image">
                          <Image src="/event2.jpg" alt="Event 2"  width={800} height={800} />
                          <div className="projet__overlay">
                             <i className="ri-links-line"></i>
                          </div>
                       </div>
                       <div className="projet__content">
                          <h3 className="projet__title">Workshop Docker</h3>
                          <p className="projet__description">
                             Formation sur la conteneurisation avec Docker.
                          </p>
                          <div className="projet__tags">
                             <span className="projet__tag">Formation</span>
                             <span className="projet__tag">DevOps</span>
                          </div>
                       </div>
                    </a>
                 </div>
              </div>
           </div>
        </section>
     </main>
     </>
    )
}