import type { Locale } from '@/i18n/routing';
import type { Place } from './nearby';

type Localized = Record<Locale, string>;
const localized = (en: string, nl: string, de: string, zh: string): Localized => ({en, nl, de, zh});

type VisitFacts = {
  hours?: Localized;
  hoursUrl?: string;
  ticket?: Localized;
  ticketUrl?: string;
  price?: number;
  minimumAge?: number;
};

const facts: Record<string, VisitFacts> = {
  stevenskerk: {
    hoursUrl: 'https://www.stevenskerk.nl/plan-je-bezoek/openingstijden',
    ticketUrl: 'https://www.stevenskerk.nl/plan-je-bezoek',
    ticket: localized('Tours, tower visits and concerts have separate arrangements.', 'Rondleidingen, torenbezoek en concerten hebben aparte regelingen.', 'Für Führungen, Turmbesuche und Konzerte gelten gesonderte Bedingungen.', '导览、登塔及音乐会各有独立预约或购票安排。'),
  },
  marienburgkapel: {
    hours: localized('Tue 14:00–17:00, Wed–Sat 11:00–17:00, Sun 13:00–17:00. Closed Monday.', 'Di 14:00–17:00, wo–za 11:00–17:00, zo 13:00–17:00. Maandag gesloten.', 'Di 14:00–17:00, Mi–Sa 11:00–17:00, So 13:00–17:00. Montag geschlossen.', '周二 14:00–17:00，周三至周六 11:00–17:00，周日 13:00–17:00，周一闭馆。'),
    hoursUrl: 'https://www.huisvandenijmeegsegeschiedenis.nl/bezoek/',
    ticket: localized('Exhibitions are free. Individual activities may require registration.', 'Tentoonstellingen zijn gratis. Voor losse activiteiten kan aanmelden nodig zijn.', 'Die Ausstellungen sind kostenlos. Für einzelne Veranstaltungen kann eine Anmeldung erforderlich sein.', '展览免费。个别活动可能需要报名。'),
  },
  'valkhof-museum': {
    hours: localized('Tue–Fri 11:00–17:00, Sat–Sun 10:00–17:00. Check holiday exceptions.', 'Di–vr 11:00–17:00, za–zo 10:00–17:00. Controleer afwijkingen op feestdagen.', 'Di–Fr 11:00–17:00, Sa–So 10:00–17:00. Prüfe Abweichungen an Feiertagen.', '周二至周五 11:00–17:00，周末 10:00–17:00，节假日以馆方公告为准。'),
    hoursUrl: 'https://valkhofmuseum.nl/nl/bezoek/praktische-info',
    price: 19.50, ticketUrl: 'https://tickets.museumhetvalkhof.nl/en/tickets',
  },
  'de-bastei': {
    hours: localized('Usually daily 10:00–17:00. Check holiday exceptions.', 'Doorgaans dagelijks 10:00–17:00. Controleer afwijkingen op feestdagen.', 'In der Regel täglich 10:00–17:00. Prüfe Abweichungen an Feiertagen.', '通常每日 10:00–17:00，节假日可能调整。'),
    hoursUrl: 'https://www.debastei.nl/en/plan-your-visit/opening-hours',
    price: 15, ticketUrl: 'https://www.debastei.nl/nl/plan-je-bezoek/entreeprijzen',
  },
  'museumpark-orientalis': {
    hours: localized('Seasonal programme. Regular visits pause during preparations for the 2026 Festival of Light. The organiser lists festival visits from 15 December 2026.', 'Seizoensprogramma. Regulier bezoek is niet mogelijk tijdens de voorbereiding van het Feest van Licht 2026. Festivalbezoek staat gepland vanaf 15 december 2026.', 'Saisonprogramm. Während der Vorbereitung des Lichterfests 2026 pausieren reguläre Besuche. Das Festival ist ab 15. Dezember 2026 angekündigt.', '按季节开放。2026 年灯光节筹备期间暂停常规散客参观，主办方公布灯光节自 2026 年 12 月 15 日起开放。'),
    hoursUrl: 'https://www.museumparkorientalis.nl/en/opening-hours/',
    ticketUrl: 'https://tickets.museumparkorientalis.nl/nl/tickets',
    ticket: localized('Regular admission and festival tickets are sold separately. Check the price for your chosen date.', 'Reguliere entree en festivaltickets worden apart verkocht. Bekijk de prijs voor je datum.', 'Regulärer Eintritt und Festivaltickets werden getrennt verkauft. Prüfe den Preis für deinen Termin.', '常规门票与灯光节票分别销售，请按日期查询售价。'),
  },
  vrijheidsmuseum: {
    hours: localized('Mon–Sat 10:00–17:00, Sun 12:00–17:00. Holiday exceptions apply.', 'Ma–za 10:00–17:00, zo 12:00–17:00. Feestdagen kunnen afwijken.', 'Mo–Sa 10:00–17:00, So 12:00–17:00. An Feiertagen gelten Ausnahmen.', '周一至周六 10:00–17:00，周日 12:00–17:00，节假日以公告为准。'),
    hoursUrl: 'https://vrijheidsmuseum.nl/plan-je-bezoek/openingstijden',
    price: 18.50, ticketUrl: 'https://vrijheidsmuseum.nl/plan-je-bezoek/entreeprijzen',
  },
  doornenburg: {
    hours: localized('Opening days vary by season. Guided and self-guided slots are listed in the castle’s ticket calendar.', 'Openingsdagen wisselen per seizoen. De ticketkalender toont rondleidingen en zelfstandige bezoeken.', 'Die Öffnungstage variieren saisonal. Der Ticketkalender zeigt Führungen und Einzelbesuche.', '开放日期随季节变化。城堡售票日历可查看导览与自行参观时段。'),
    hoursUrl: 'https://tickets.kasteeldoornenburg.nl/nl/tickets',
    price: 12.50, minimumAge: 13, ticketUrl: 'https://tickets.kasteeldoornenburg.nl/nl/tickets',
  },
  'kasteel-hernen': {
    hours: localized('Seasonal schedule. In November and December 2026 the published schedule is Sunday 13:00–16:00, last entry 15:00. Check for exceptions and new dates.', 'Seizoensrooster. In november en december 2026 is het zondag 13:00–16:00, laatste toegang 15:00. Controleer uitzonderingen en nieuwe data.', 'Saisonplan. Im November und Dezember 2026 sonntags 13:00–16:00, letzter Einlass 15:00. Prüfe Ausnahmen und neue Termine.', '季节性开放。2026 年 11–12 月公布的时段为周日 13:00–16:00，末次入场 15:00。请核对例外和新日期。'),
    hoursUrl: 'https://www.glk.nl/hernen/kasteel-hernen/plan-je-bezoek',
    price: 13.50, ticketUrl: 'https://www.glk.nl/hernen/kasteel-hernen/plan-je-bezoek',
  },
  'kasteel-wijchen': {
    hours: localized('Tue–Sun 10:00–17:00. Closed Monday except when announced otherwise.', 'Di–zo 10:00–17:00. Maandag gesloten, tenzij anders aangekondigd.', 'Di–So 10:00–17:00. Montag geschlossen, sofern nicht anders angekündigt.', '周二至周日 10:00–17:00。周一闭馆，以节日特别公告为准。'),
    hoursUrl: 'https://www.museumwijchen.nl/openingstijden/',
    price: 13, ticketUrl: 'https://www.museumwijchen.nl/toegangsprijzen/',
  },
  'de-vereeniging': { hoursUrl: 'https://www.stadsschouwburgendevereeniging.nl/locaties-route-en-parkeren-f16q' },
  stadsschouwburg: { hoursUrl: 'https://www.stadsschouwburgendevereeniging.nl/locaties-route-en-parkeren-f16q' },
  goffertstadion: { hoursUrl: 'https://www.nec-nijmegen.nl/' },
};

const copy = {
  intro: localized('Discover', 'Ontdek', 'Entdecken', '探索'),
  highlights: localized('Highlights', 'Hoogtepunten', 'Besonderheiten', '景区特色'),
  hours: localized('Opening hours', 'Openingstijden', 'Öffnungszeiten', '开放时间'),
  tickets: localized('Admission and tickets', 'Entree en tickets', 'Eintritt und Tickets', '门票价格'),
  notice: localized('Before you go', 'Voor vertrek', 'Vor dem Besuch', '游览须知'),
  experience: localized('History, architecture and experience', 'Geschiedenis, architectuur en beleving', 'Geschichte, Architektur und Erlebnis', '发现魅力：历史、建筑与体验'),
  stay: localized('Where to stay', 'Waar overnachten?', 'Wo übernachten?', '住宿建议'),
  guide: localized('Address and map', 'Adres en kaart', 'Adresse und Karte', '交通指南'),
  type: localized('Attraction type', 'Type locatie', 'Art des Ziels', '景点类型'),
  time: localized('Suggested visit time', 'Aanbevolen bezoektijd', 'Empfohlene Besuchsdauer', '建议停留'),
  rating: localized('Google Maps ratings', 'Google Maps-beoordelingen', 'Google-Maps-Bewertungen', 'Google 地图评分'),
  programme: localized('Check the latest opening calendar', 'Bekijk de actuele openingstijden', 'Aktuelle Öffnungszeiten prüfen', '查看最新开放安排'),
  prices: localized('Check current prices and ticket options', 'Bekijk actuele prijzen en tickets', 'Aktuelle Preise und Tickets prüfen', '查看最新票价与票种'),
  publicTicket: localized('No ticket for the public outdoor area. Events and facilities may charge separately.', 'Geen ticket voor de openbare buitenruimte. Evenementen en voorzieningen kunnen apart kosten rekenen.', 'Kein Ticket für den öffentlichen Außenbereich. Veranstaltungen und Einrichtungen können extra kosten.', '公共户外区域无需门票，活动或设施可能另收费。'),
  exteriorTicket: localized('Free to view from the public approach. Check separately for activities or access inside.', 'De buitenkant is gratis te zien vanaf de openbare weg. Controleer apart of activiteiten of toegang mogelijk zijn.', 'Die Außenansicht vom öffentlichen Weg ist kostenlos. Prüfe Veranstaltungen und Innenzugang gesondert.', '从公共道路看外观免费。入内或参加活动需另查安排。'),
  eventTicket: localized('The event organiser sets prices and ticket requirements.', 'De organisator bepaalt prijzen en ticketvoorwaarden.', 'Preise und Ticketbedingungen legt der Veranstalter fest.', '活动票价及入场要求由当场主办方公布。'),
  variableTicket: localized('Check the venue for the price and booking requirements on your date.', 'Controleer bij de locatie de prijs en reserveringsvoorwaarden voor jouw datum.', 'Prüfe beim Veranstaltungsort Preise und Buchungsbedingungen für deinen Termin.', '按访问日期向场所查询票价及预约要求。'),
};

const lodging = {
  center: localized('Stay near Grote Markt or the city centre if you want to visit the old town on foot. Choose the station area if an early train matters more.', 'Overnacht bij de Grote Markt of in het centrum voor wandelingen door de oude stad. Kies de stationsbuurt als je vroeg met de trein vertrekt.', 'Für Altstadtspaziergänge bietet sich die Umgebung des Grote Markt an. Bei früher Zugabfahrt ist die Bahnhofsgegend praktischer.', '以老城步行为主，可住大市场或市中心一带。若第二天要赶早班火车，车站附近更方便。'),
  station: localized('Stay around Nijmegen station for rail connections and city buses. Check event-day transport if your visit ends late.', 'Overnacht bij station Nijmegen voor trein en stadsbus. Controleer het vervoer op evenementendagen als je laat terugkomt.', 'Am Bahnhof Nijmegen hast du Anschluss an Bahn und Stadtbus. Prüfe bei später Rückkehr den Verkehr am Veranstaltungstag.', '可住奈梅亨火车站附近，方便换乘火车及市区公交。夜间活动散场前先核对返程。'),
  river: localized('Stay in Nijmegen’s lower town for the city-side riverfront. If cycling on the north bank, consider Lent and confirm the crossing you will use.', 'Overnacht in de Nijmeegse Benedenstad voor de Waalkade. Overweeg Lent als je vooral op de noordoever fietst en controleer je oversteek.', 'Für das stadtseitige Ufer bietet sich die Nijmegener Unterstadt an. Für Radtouren am Nordufer kommt Lent infrage. Prüfe vorher die Querung.', '以市区河岸为主可住奈梅亨下城区。若以北岸骑行为主，可考虑 Lent，并提前确认过河路线。'),
  east: localized('Nijmegen is a base for combining this outing with the old town. Consider Berg en Dal or Groesbeek if you plan several trips into the surrounding hills.', 'Nijmegen is een uitvalsbasis voor deze uitstap en de oude stad. Overweeg Berg en Dal of Groesbeek voor meerdere tochten in de heuvels.', 'Nijmegen eignet sich für diesen Ausflug und die Altstadt. Für mehrere Touren in die Hügel kommen Berg en Dal oder Groesbeek infrage.', '想兼游老城可住奈梅亨。计划连续几天游周边丘陵，可考虑 Berg en Dal 或 Groesbeek。'),
  west: localized('Use Wijchen as a base for the western castle area, or stay by Nijmegen station for wider rail connections. Check the last return service for village stops.', 'Kies Wijchen als uitvalsbasis voor de kastelen in het westen of station Nijmegen voor meer spoorverbindingen. Controleer de laatste terugrit vanaf dorpshaltes.', 'Wijchen bietet sich für die westlichen Burgen an, der Bahnhof Nijmegen für weitere Bahnverbindungen. Prüfe die letzte Rückfahrt von den Dorfhaltestellen.', '以西部城堡为主可住怀亨，需频繁换乘火车可住奈梅亨站附近。到村庄参观前先查末班返程。'),
} as const;

const notices = {
  church: localized('Give services and quiet areas priority. Check whether photography or tower access is permitted before entering.', 'Geef diensten en stilteruimtes voorrang. Controleer of fotograferen of torenbezoek is toegestaan.', 'Nimm Rücksicht auf Gottesdienste und Ruhezonen. Prüfe vorher die Regeln für Fotos und Turmzugang.', '遇礼拜与静默空间请保持安静，入内前核对拍照和登塔安排。'),
  square: localized('Stay on public footways. Markets, deliveries and events can change pedestrian access.', 'Blijf op openbare voetpaden. Markten, leveringen en evenementen kunnen de toegang veranderen.', 'Bleibe auf öffentlichen Gehwegen. Märkte, Lieferverkehr und Veranstaltungen können den Zugang verändern.', '沿公共步行区域通行，市集、装卸和活动期间按现场指引绕行。'),
  exterior: localized('View the building from public ground and respect doors, gates and private courtyards.', 'Bekijk het gebouw vanaf openbaar terrein en respecteer deuren, hekken en privéterreinen.', 'Betrachte das Gebäude vom öffentlichen Raum aus und beachte Türen, Tore und private Höfe.', '在公共道路或步道看外观，遵守门禁和私人庭院边界。'),
  park: localized('Use marked paths. For a riverside visit, check water levels and avoid closed low-lying routes.', 'Volg gemarkeerde paden. Controleer aan de rivier de waterstand en vermijd afgesloten lage routes.', 'Nutze markierte Wege. Prüfe am Fluss den Wasserstand und meide gesperrte tiefe Wege.', '走划定步道。河岸游览前留意水位，遇低处封闭改走开放路线。'),
  museum: localized('Check last admission, photography rules and step-free access with the venue before travelling.', 'Controleer vooraf de laatste toegang, fotoregels en drempelvrije toegang.', 'Prüfe vor der Anreise den letzten Einlass, Fotoregeln und stufenlose Zugänge.', '出发前向场馆核对末次入场、展厅拍摄规则和无台阶入口。'),
  bridge: localized('Keep the bicycle lane clear and use the signed pedestrian approach at both ends.', 'Houd het fietspad vrij en gebruik aan beide kanten de aangegeven voetgangersroute.', 'Halte den Radweg frei und nutze an beiden Enden den ausgeschilderten Fußweg.', '桥上勿占自行车道，两端都从有标识的人行入口进出。'),
  venue: localized('Check the event listing for doors, bag policy and late return transport.', 'Bekijk per evenement de opening van de deuren, het tassenbeleid en vervoer na afloop.', 'Prüfe Einlasszeit, Taschenregeln und Rückfahrt in der Veranstaltungsankündigung.', '以当场公告确认开门时间、包袋规定和散场后的返程。'),
} as const;

export function visitGuide(place: Place, locale: Locale, fallbackHours: string) {
  const entry = facts[place.slug];
  const t = Object.fromEntries(Object.entries(copy).map(([key, value]) => [key, value[locale]])) as Record<keyof typeof copy, string>;
  const kind = place.kind as keyof typeof notices;
  const defaultTicket = {
    park: t.publicTicket, square: t.publicTicket, bridge: t.publicTicket,
    exterior: t.exteriorTicket, venue: t.eventTicket, church: t.variableTicket, museum: t.variableTicket,
  }[kind];
  const price = entry?.price === undefined ? undefined :
    new Intl.NumberFormat(locale, {style: 'currency', currency: 'EUR'}).format(entry.price);
  const priceLabel = entry?.minimumAge
    ? localized('Ages 13+', 'Vanaf 13 jaar', 'Ab 13 Jahren', '13 岁及以上')[locale]
    : localized('Standard adult ticket', 'Regulier volwassenentarief', 'Regulärer Erwachsenenpreis', '标准成人票')[locale];
  const duration = new Intl.NumberFormat(locale, {style: 'unit', unit: 'minute', unitDisplay: 'long'}).format(place.minutes);
  return {
    t, duration,
    hours: entry?.hours?.[locale] ?? fallbackHours,
    hoursUrl: entry?.hoursUrl,
    ticket: price ? `${priceLabel} · ${price}` : entry?.ticket?.[locale] ?? defaultTicket,
    ticketUrl: entry?.ticketUrl,
    lodging: lodging[place.area as keyof typeof lodging][locale],
    notice: notices[kind][locale],
  };
}
