import Image from 'next/image'
import './styles.css';

export default function Header() {
    return (
        <header className="header" id="header">
          <nav className="nav container">
            <a href="/" className="nav__logo">
            <Image
                src="/Logo_Mines_Blanc.png"
                width={500}
                height={500}
                alt="image"
              />
            </a>

            <div className="nav__menu" id="nav-menu">
              <ul className="nav__list">
                <li className="nav__item">
                  <a href="/" className="nav__link">ACCUEIL</a>
                </li>

                <li className="nav__item">
                  <a href="/apropos" className="nav__link">A PROPOS</a>
                </li>
                <li className="nav__item">
                  <a href="/mandat" className="nav__link">MANDAT</a>
                </li>

                <li className="nav__item">
                  <a href="/projets" className="nav__link">PROJETS</a>
                </li>

                <li className="nav__item">
                  <a href="/hall-of-fame" className="nav__link">HALL OF FAME</a>
                </li>

                <li className="nav__item">
                  <a href="https://minitel.wiki/" className="nav__link">WIKI</a>
                </li>

                <li className="nav__item">
                  <a href="/contact" className="nav__link">CONTACT</a>
                </li>
              </ul>

              <div className="nav__close" id="nav-close">
                <i className="ri-close-line"></i>
              </div>
            </div>

            <div className="nav__toggle" id="nav-toggle">
              <i className="ri-apps-2-fill"></i>
            </div>
          </nav>
        </header>
    )
}