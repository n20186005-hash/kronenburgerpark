import places from './nearby-places.json';
import type { Locale } from '@/i18n/routing';

export const nearbyPlaces = places;
export type Place = (typeof nearbyPlaces)[number];

export function placeMap(name: string, address: string) {
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(
    address.startsWith(name) ? address : `${name}, ${address}`
  );
}

export const nearbyCopy = {
  en: {
    title: 'Nearby attractions', intro: 'Explore Nijmegen’s old town and the Waal on foot, then head out to the villages, castles and wooded hills around the city.',
    location: 'Address or approach', operator: 'Visitor information and management', access: 'Opening hours and admission',
    next: 'Combine this visit with', directions: 'Directions from Nijmegen station', transport: 'Getting there', maps: 'Open in Google Maps', reviews: 'Visitor reviews', current: 'See current visitor ratings and reviews on Google Maps.',
    walk: 'Start at Nijmegen station and follow the walking directions to this stop. For a shorter walk, check city buses on your travel date.',
    regional: 'Start at Nijmegen station and check the onward bus or cycle route for your travel date. The map points to the destination or the approach listed here.',
    source: 'Location and background', photo: 'Photo and licence', highlights: 'What to see',
    kinds: { church: 'Church', square: 'Street or square', exterior: 'Historic landmark', park: 'Park or nature area', museum: 'Museum or visitor site', bridge: 'Bridge', venue: 'Event venue' },
    hours: { church: 'Check the church calendar for visitor hours, services and any admission charge.', square: 'Public outdoor space. Street events can affect access.', exterior: 'Use the public approach for exterior views. Interior access depends on the operator.', park: 'Check local signs for closures and any access restrictions.', museum: 'Check current opening days, admission and booking with the venue.', bridge: 'Use the designated public path and check temporary closures.', venue: 'Opening hours and ticket prices depend on the event.' },
  },
  nl: {
    title: 'Bezienswaardigheden in de buurt', intro: 'Ontdek te voet de Nijmeegse binnenstad en de Waal. Ga daarna naar de dorpen, kastelen en beboste heuvels rondom de stad.',
    location: 'Adres of toegang', operator: 'Bezoekersinformatie en beheer', access: 'Openingstijden en entree',
    next: 'Combineer dit bezoek met', directions: 'Route vanaf station Nijmegen', transport: 'Bereikbaarheid', maps: 'Openen in Google Maps', reviews: 'Bezoekersbeoordelingen', current: 'Bekijk actuele bezoekersbeoordelingen en recensies op Google Maps.',
    walk: 'Begin bij station Nijmegen en volg de wandelroute. Bekijk voor een kortere wandeling de stadsbussen op je reisdag.',
    regional: 'Begin bij station Nijmegen en controleer de aansluitende bus- of fietsroute voor je reisdag. De kaart wijst naar de bestemming of de aangegeven toegang.',
    source: 'Locatie en achtergrond', photo: 'Foto en licentie', highlights: 'Wat is er te zien?',
    kinds: { church: 'Kerk', square: 'Straat of plein', exterior: 'Monument', park: 'Park of natuurgebied', museum: 'Museum of bezoekerslocatie', bridge: 'Brug', venue: 'Evenementenlocatie' },
    hours: { church: 'Bekijk de kerkkalender voor bezoektijden, diensten en eventuele toegangsprijzen.', square: 'Openbare buitenruimte. Evenementen kunnen de toegang beperken.', exterior: 'Bekijk de buitenkant vanaf de openbare weg. Toegang tot het interieur hangt af van de beheerder.', park: 'Let ter plaatse op afsluitingen en toegangsregels.', museum: 'Controleer de actuele openingstijden, entree en reservering bij de locatie.', bridge: 'Gebruik het aangegeven openbare pad en let op tijdelijke afsluitingen.', venue: 'Openingstijden en kaartprijzen hangen af van het evenement.' },
  },
  de: {
    title: 'Sehenswürdigkeiten in der Nähe', intro: 'Erkunde die Nijmegener Altstadt und die Waal zu Fuß. Rund um die Stadt warten Dörfer, Burgen und bewaldete Hügel.',
    location: 'Adresse oder Zugang', operator: 'Besucherinformation und Verwaltung', access: 'Öffnungszeiten und Eintritt',
    next: 'Weitere Ziele in der Nähe', directions: 'Route ab Bahnhof Nijmegen', transport: 'Anreise', maps: 'In Google Maps öffnen', reviews: 'Besucherbewertungen', current: 'Aktuelle Bewertungen und Rezensionen findest du in Google Maps.',
    walk: 'Folge ab Bahnhof Nijmegen der Fußroute. Für einen kürzeren Fußweg prüfe die Stadtbusse für deinen Reisetag.',
    regional: 'Prüfe ab Bahnhof Nijmegen die passende Bus- oder Fahrradverbindung für deinen Reisetag. Der Kartenlink zeigt das Ziel oder den angegebenen Zugang.',
    source: 'Ort und Hintergrund', photo: 'Foto und Lizenz', highlights: 'Sehenswert',
    kinds: { church: 'Kirche', square: 'Straße oder Platz', exterior: 'Baudenkmal', park: 'Park oder Naturgebiet', museum: 'Museum oder Ausflugsziel', bridge: 'Brücke', venue: 'Veranstaltungsort' },
    hours: { church: 'Prüfe den Kirchenkalender für Besuchszeiten, Gottesdienste und mögliche Eintrittspreise.', square: 'Öffentlicher Außenraum. Veranstaltungen können den Zugang einschränken.', exterior: 'Die Außenansicht ist vom öffentlichen Weg zugänglich. Der Innenzugang richtet sich nach dem Betreiber.', park: 'Beachte Hinweise zu Sperrungen und Zugangsregeln vor Ort.', museum: 'Prüfe aktuelle Öffnungszeiten, Preise und Buchungsmöglichkeiten beim Anbieter.', bridge: 'Nutze den ausgewiesenen öffentlichen Weg und beachte vorübergehende Sperrungen.', venue: 'Öffnungszeiten und Eintrittspreise richten sich nach dem Programm.' },
  },
  zh: {
    title: '周边景点', intro: '从克罗嫩堡公园步行探索奈梅亨老城和瓦尔河，也可以去城外的村庄、古堡和林地。',
    location: '地址或入口', operator: '访客资讯与管理主体', access: '开放时间与门票',
    next: '可串联游览', directions: '从奈梅亨火车站出发的路线', transport: '交通方式', maps: '在 Google 地图中打开', reviews: '游客评价', current: '可在 Google 地图查看该地点的实时评分与游客评价。',
    walk: '可从奈梅亨火车站按地图步行前往。想少走一段，可查询游览当天的市区公交。',
    regional: '以奈梅亨火车站为出发点，按游览日期查询换乘公交或骑行线路。地图定位至景点或此页注明的入口。',
    source: '地理位置与背景资料', photo: '照片与授权信息', highlights: '游览看点',
    kinds: { church: '教堂', square: '街道或广场', exterior: '历史建筑', park: '公园或自然保护区', museum: '博物馆或参观场所', bridge: '桥梁', venue: '活动场馆' },
    hours: { church: '请查看教堂日程中的开放时间、礼拜安排及门票信息。', square: '公共户外空间，活动期间通行可能调整。', exterior: '可从公共道路看外观，入内安排请向场所核实。', park: '注意现场的步道关闭标识及通行规则。', museum: '出发前向场所查询当天开放时间、票价及预约安排。', bridge: '请走划定的公共通道，留意临时封闭安排。', venue: '开放时间与票价随活动安排而变。' },
  },
} as const;

export function nearbyText(locale: string) {
  return nearbyCopy[locale as Locale] ?? nearbyCopy.nl;
}

const walkingRoutes = [
  ['lange-hezelstraat', 'grote-markt', 'de-waag', 'stevenskerk', 'commanderie', 'besiendershuis', 'waalkade'],
  ['marienburgkapel', 'kelfkensbos', 'valkhof-museum', 'valkhofpark', 'sint-nicolaaskapel', 'barbarossa-ruine', 'hunnerpark', 'belvedere', 'de-bastei'],
  ['waalbrug', 'veur-lent', 'spiegelwaal', 'snelbinder', 'de-oversteek'],
  ['keizer-karelplein', 'de-vereeniging', 'stadsschouwburg'],
  ['goffertpark', 'goffertstadion'],
  ['museumpark-orientalis', 'duivelsberg', 'vrijheidsmuseum'],
  ['kasteel-wijchen', 'kasteel-hernen'],
];

export function nearbyConnections(slug: string) {
  const route = walkingRoutes.find((stops) => stops.includes(slug));
  if (!route) return [];
  const index = route.indexOf(slug);
  return route.slice(Math.max(0, index - 1), index + 2)
    .filter((stop) => stop !== slug)
    .flatMap((stop) => nearbyPlaces.filter((place) => place.slug === stop));
}
