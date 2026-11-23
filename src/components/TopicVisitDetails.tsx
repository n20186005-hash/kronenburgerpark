import { nearbyText, placeMap } from '@/lib/nearby';
import { MAPS_SHARE_URL, MUNICIPALITY_URL } from '@/lib/site-data';

const localTopics = {
  kruittoren: {
    name: 'Kruittoren', address: 'Kronenburgerpark, Kronenburgersingel, Nijmegen', operator: true,
    directions: {
      en: 'From Nijmegen station, walk to Kronenburgersingel and follow the park path to the round tower by the pond.',
      nl: 'Loop vanaf station Nijmegen naar de Kronenburgersingel en volg het parkpad naar de ronde toren bij de vijver.',
      de: 'Gehe vom Bahnhof Nijmegen zum Kronenburgersingel und folge dem Parkweg zum Rundturm am Teich.',
      zh: '从奈梅亨火车站步行至 Kronenburgersingel，沿园路走到池塘旁的圆塔。',
    },
  },
  dierenweideKronenburgerpark: {
    name: 'Dierenweide Kronenburgerpark', address: 'Kronenburgersingel, Nijmegen', operator: true,
    directions: { nl: 'Loop vanaf station Nijmegen naar de Kronenburgersingel en volg in het park de paden naar de dierenweide.' },
  },
  parkerenKronenburgerpark: {
    name: 'Keizer Karelparkeergarage', address: 'Van Schaeck Mathonsingel 22, Nijmegen', operator: true,
    directions: { nl: 'Navigeer naar de Keizer Karelparkeergarage. Loop vandaar via het Keizer Karelplein en de Van Berchenstraat naar het Kronenburgerpark.' },
  },
  altstadtNijmegen: {
    name: 'Grote Markt', address: 'Grote Markt, Nijmegen', operator: true,
    directions: { de: 'Vom Bahnhof Nijmegen über den Kronenburgerpark und die Lange Hezelstraat zum Grote Markt gehen.' },
  },
  sehenswuerdigkeitenNijmegen: {
    name: 'Kronenburgerpark', address: 'Kronenburgersingel, Nijmegen', operator: false,
    directions: { de: 'Beginne am Bahnhof Nijmegen. Der Kronenburgerpark ist der erste Halt auf dem Stadtspaziergang. Die einzelnen Ziele findest du im Verzeichnis.' },
  },
};

type Topic = keyof typeof localTopics;

export default function TopicVisitDetails({ topic, locale }: { topic: Topic; locale: string }) {
  const copy = nearbyText(locale);
  const details = localTopics[topic];
  const directions: Record<string, string> = details.directions;
  const map = topic === 'sehenswuerdigkeitenNijmegen' ? MAPS_SHARE_URL : placeMap(details.name, details.address);

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="mx-auto grid max-w-5xl gap-6 rounded-2xl border p-6 sm:grid-cols-2"
        style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
        <div>
          <h2 className="mb-2 font-display text-xl font-semibold">{copy.location}</h2>
          <p>{details.address}</p>
          {details.operator && <p className="mt-3"><strong>{copy.operator}</strong><br />
            <a href={topic === 'parkerenKronenburgerpark' ? 'https://www.nijmegen.nl/parkeren/parkeergarages/' : MUNICIPALITY_URL} className="underline">Gemeente Nijmegen</a></p>}
        </div>
        <div>
          <h2 className="mb-2 font-display text-xl font-semibold">{copy.transport}</h2>
          <p>{directions[locale]}</p>
          <a className="mt-2 inline-block underline" href={map}>{copy.maps}</a>
        </div>
        <div>
          <h2 className="mb-2 font-display text-xl font-semibold">{copy.reviews}</h2>
          <a href={map} className="underline">{copy.current}</a>
        </div>
        <div>
          <a className="font-semibold underline" href={`/${locale}/nearby`}>{copy.title}</a>
        </div>
      </div>
    </section>
  );
}
