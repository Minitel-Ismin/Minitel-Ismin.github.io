import styles from "./camion-reseau.module.css";

const ENCRE = "#0f110f";
const CLAIR = "#e7ebe4";

function Roue() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30">
      <circle cx="15" cy="15" r="13.5" fill={ENCRE} stroke="#9ba597" strokeWidth="3" />
      <circle cx="15" cy="15" r="7" fill={CLAIR} />
    </svg>
  );
}

// Animation décorative : le camion MINITEL (logo wifi sur la remorque) qui roule
// devant des antennes-relais.
export function CamionReseau() {
  return (
    <div className={styles.scene} aria-hidden>
      <div className={styles.loader}>
        <div className={styles.camion}>
          <div className={styles.carrosserie}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 198 93">
              {/* Cabine */}
              <path
                d="M135 22.5H176.5C177.5 22.5 178.4 23.1 178.8 24L192.2 56.6C192.4 56.9 192.5 57.3 192.5 57.6V89C192.5 90.4 191.4 91.5 190 91.5H135C133.6 91.5 132.5 90.4 132.5 89V25C132.5 23.6 133.6 22.5 135 22.5Z"
                fill="#69ff0a"
                stroke={ENCRE}
                strokeWidth="3"
              />
              {/* Vitre */}
              <path
                d="M146 33.5H181.2C182.2 33.5 183.1 34.1 183.5 35.1L189.9 51.9C190.5 53.6 189.3 55.5 187.5 55.5H146C144.6 55.5 143.5 54.4 143.5 53V36C143.5 34.6 144.6 33.5 146 33.5Z"
                fill="#1e221d"
                stroke={ENCRE}
                strokeWidth="3"
              />
              <ellipse cx="146.5" cy="65" rx="3.5" ry="2" fill={ENCRE} />
              <rect x="187" y="63" width="5" height="7" rx="1" fill="#fffcab" stroke={ENCRE} strokeWidth="2" />
              <rect x="193" y="81" width="4" height="11" rx="1" fill={ENCRE} stroke={ENCRE} strokeWidth="2" />
              {/* Remorque */}
              <rect x="6.5" y="1.5" width="121" height="90" rx="2.5" fill={CLAIR} stroke={ENCRE} strokeWidth="3" />
              <rect x="1" y="84" width="6" height="4" rx="2" fill={CLAIR} stroke={ENCRE} strokeWidth="2" />
              {/* Logo wifi */}
              <g stroke={ENCRE} strokeWidth="5" strokeLinecap="round" fill="none">
                <path d="M47.2 32.2A28 28 0 0 1 86.8 32.2" />
                <path d="M53.6 38.6A19 19 0 0 1 80.4 38.6" />
                <path d="M59.9 44.9A10 10 0 0 1 74.1 44.9" />
              </g>
              <circle cx="67" cy="52" r="3.5" fill={ENCRE} />
              <text
                x="67"
                y="76"
                textAnchor="middle"
                fill={ENCRE}
                fontFamily="ui-monospace, monospace"
                fontSize="13"
                fontWeight="700"
                letterSpacing="2"
              >
                MINITEL
              </text>
            </svg>
          </div>
          <div className={styles.roues}>
            <Roue />
            <Roue />
          </div>
          <div className={styles.route} />
          {/* Antenne-relais qui défile (remplace le lampadaire d'origine) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60 120"
            fill="none"
            stroke="#9ba597"
            strokeWidth="3"
            strokeLinecap="round"
            className={styles.antenne}
          >
            <path d="M30 34V120M30 60L18 120M30 60L42 120M22 96H38" />
            <circle cx="30" cy="28" r="5" fill="#69ff0a" stroke="none" />
            <path d="M19 17A16 16 0 0 0 19 39M41 17A16 16 0 0 1 41 39" />
            <path d="M12 10A26 26 0 0 0 12 46M48 10A26 26 0 0 1 48 46" />
          </svg>
        </div>
      </div>
    </div>
  );
}
