import Image from "next/image";

export default function Page() {
    return (
        <main className="main">
            <section className="about section">
                <div className="about__container container">
                    <div className="about__data">
                        <h2 className="section__title">Présentation de MINITEL</h2>
                        
                        <p className="about__description">
                            MINITEL est l'association réseau de l'École des Mines de Saint-Étienne sur le campus Georges Charpak, ses principales missions consistent à :
                        </p>

                        <ul className="about__list">
                            <li className="about__item">
                                <i className="ri-checkbox-circle-line"></i>
                                Maintenir l'accès à internet depuis la résidence (filaire et sans-fil)
                            </li>
                            <li className="about__item">
                                <i className="ri-checkbox-circle-line"></i>
                                Optimiser et améliorer l'accès à internet (débit et fiabilité de la connexion)
                            </li>
                            <li className="about__item">
                                <i className="ri-checkbox-circle-line"></i>
                                Assister les élèves quant à leurs problèmes informatiques (ordinateurs, téléphones et logiciels)
                            </li>
                            <li className="about__item">
                                <i className="ri-checkbox-circle-line"></i>
                                Supporter techniquement les autres associations dans leurs projets informatiques
                            </li>
                            <li className="about__item">
                                <i className="ri-checkbox-circle-line"></i>
                                Participer à la vie étudiante du campus en animant des challenges informatiques (Nuit de l'Info)
                            </li>
                            <li className="about__item">
                                <i className="ri-checkbox-circle-line"></i>
                                Proposer des solutions d'emprunt de matériel informatique aux élèves et associations
                            </li>
                        </ul>
                    </div>

                    <div className="about__image">
                        <Image src="/Logo_MINITEL_full_blanc.png" width={800} height={800} alt="MINITEL Logo" className="about__img"/>
                    </div>
                </div>
            </section>
        </main>
    )
}