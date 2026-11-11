// Les dates du contenu sont au format AAAA-MM-JJ. On les lit à midi UTC pour
// qu'aucun décalage horaire ne fasse changer le jour affiché.
function lire(date: string) {
  return new Date(`${date}T12:00:00Z`);
}

export function formaterDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(lire(date));
}

export function formaterDateLongue(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(lire(date));
}

export function annee(date: string) {
  return date.slice(0, 4);
}
