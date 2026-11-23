import type { Locale } from '@/i18n/routing';

const editorial = {
  en: {
    about: 'About', advice: 'Tips for your visit',
    route: 'Suggested visit route', viewpoint: 'Where to take photos', faq: 'Frequently asked questions',
    details: 'Basic information', all: 'Browse all nearby attractions',
    arrival: 'Use this arrival point', hoursQuestion: 'Do I need to check opening times or book?',
    management: (name: string) => `Visitor access or site management is handled by ${name}.`,
    strands: {
      besiendershuis: 'Stichting NOX curates the cultural programme at Besiendershuis. Check the foundation’s programme for public events.',
      commanderie: 'De Hemel welcomes visitors to its premises at the Commanderie. Access to other parts of the complex is arranged separately.',
      belvedere: 'Gemeente Nijmegen coordinates public use of the surrounding Hunnerpark. The tower’s interior has separate access arrangements.',
      ooijpolder: 'Staatsbosbeheer manages parts of the nature area. Access rules can vary between the dike, public paths and individual parcels.',
      'veur-lent': 'Gemeente Nijmegen coordinates public use of recreation sites on Veur-Lent. FREE Nature manages grazing in parts of the island.',
      spiegelwaal: 'Rijkswaterstaat oversees navigation in the Spiegelwaal. Follow local signs for access to the banks and paths.',
      waalbrug: 'Rijkswaterstaat maintains the bridge structure and Gemeente Nijmegen manages the road surface.',
    },
  },
  nl: {
    about: 'Over', advice: 'Tips voor je bezoek',
    route: 'Voorgestelde bezoekroute', viewpoint: 'Fotoplekken', faq: 'Veelgestelde vragen',
    details: 'Praktische informatie', all: 'Bekijk alle bezienswaardigheden in de buurt',
    arrival: 'Begin bij dit aankomstpunt', hoursQuestion: 'Moet ik openingstijden controleren of reserveren?',
    management: (name: string) => `${name} verzorgt het beheer of de toegang voor bezoekers.`,
    strands: {
      besiendershuis: 'Stichting NOX verzorgt de culturele programmering van het Besiendershuis. Bekijk de agenda van de stichting voor openbare evenementen.',
      commanderie: 'De Hemel ontvangt bezoekers in zijn deel van de Commanderie. Toegang tot andere delen van het complex wordt apart geregeld.',
      belvedere: 'Gemeente Nijmegen regelt het openbaar gebruik van het omliggende Hunnerpark. Voor een bezoek aan de binnenkant van de toren gelden aparte afspraken.',
      ooijpolder: 'Staatsbosbeheer beheert delen van het natuurgebied. Op de dijk, openbare paden en afzonderlijke percelen kunnen verschillende toegangsregels gelden.',
      'veur-lent': 'Gemeente Nijmegen regelt het openbaar gebruik van recreatielocaties op Veur-Lent. FREE Nature beheert de begrazing op delen van het eiland.',
      spiegelwaal: 'Rijkswaterstaat houdt toezicht op de scheepvaart in de Spiegelwaal. Volg de borden voor toegang tot oevers en paden.',
      waalbrug: 'Rijkswaterstaat onderhoudt de brugconstructie en Gemeente Nijmegen beheert het wegdek.',
    },
  },
  de: {
    about: 'Über', advice: 'Besuchstipps',
    route: 'Vorgeschlagene Besuchsroute', viewpoint: 'Fotostandorte', faq: 'Häufig gestellte Fragen',
    details: 'Praktische Informationen', all: 'Alle Sehenswürdigkeiten in der Nähe ansehen',
    arrival: 'Beginne an diesem Zugangspunkt', hoursQuestion: 'Muss ich Öffnungszeiten prüfen oder reservieren?',
    management: (name: string) => `${name} ist für die Verwaltung oder den Besucherzugang zuständig.`,
    strands: {
      besiendershuis: 'Die Stichting NOX gestaltet das Kulturprogramm im Besiendershuis. Öffentliche Veranstaltungen stehen im Programm der Stiftung.',
      commanderie: 'De Hemel empfängt Besucher in seinen Räumen der Commanderie. Für andere Bereiche der Anlage gelten eigene Zugangsregeln.',
      belvedere: 'Die Stadt Nijmegen regelt die öffentliche Nutzung des umliegenden Hunnerparks. Für den Innenraum des Turms gelten eigene Zugangsregeln.',
      ooijpolder: 'Staatsbosbeheer betreut Teile des Naturgebiets. Am Deich, auf öffentlichen Wegen und auf einzelnen Flächen können unterschiedliche Zugangsregeln gelten.',
      'veur-lent': 'Die Stadt Nijmegen regelt die öffentliche Nutzung der Erholungsflächen auf Veur-Lent. FREE Nature betreut die Beweidung auf Teilen der Insel.',
      spiegelwaal: 'Rijkswaterstaat beaufsichtigt die Schifffahrt auf der Spiegelwaal. Hinweise vor Ort regeln den Zugang zu Ufern und Wegen.',
      waalbrug: 'Rijkswaterstaat unterhält die Brückenkonstruktion. Die Stadt Nijmegen ist für die Fahrbahndecke zuständig.',
    },
  },
  zh: {
    about: '关于', advice: '游览建议',
    route: '建议游览路线', viewpoint: '拍摄机位', faq: '常见问答',
    details: '基础信息', all: '查看全部周边景点',
    arrival: '从这个入口或街段开始', hoursQuestion: '需要提前确认开放时间或预约吗？',
    management: (name: string) => `此处的场地管理或访客接待由 ${name} 负责。`,
    strands: {
      besiendershuis: 'Besiendershuis 的文化活动由 Stichting NOX 策划。公众可通过基金会的活动日程查询开放安排。',
      commanderie: '餐饮场所 De Hemel 负责其在建筑群内的营业场所与访客接待。建筑群内其他空间各有通行安排。',
      belvedere: '塔楼周边 Hunnerpark 的公共使用由奈梅亨市政府管理。塔楼内部的开放另有安排。',
      ooijpolder: '荷兰国家林业局 Staatsbosbeheer 管理这片自然保护区的部分地段。堤顶、公共步道与不同地块的通行规则以现场为准。',
      'veur-lent': '奈梅亨市政府负责岛上公共游憩场地的使用安排，FREE Nature 负责部分区域的放牧管理。',
      spiegelwaal: '分洪水道的航运由荷兰公共工程与水利管理局 Rijkswaterstaat 监管。岸边和步道通行请看现场标识。',
      waalbrug: '桥体由荷兰公共工程与水利管理局 Rijkswaterstaat 维护，桥面道路由奈梅亨市政府管理。',
    },
  },
} as const;

export function nearbyEditorial(locale: Locale) {
  return editorial[locale];
}

export function managementText(locale: Locale, slug: string, operator: string) {
  const copy = nearbyEditorial(locale);
  const strands: Partial<Record<string, string>> = copy.strands;
  const name = operator === 'Gemeente Nijmegen'
    ? { zh: '奈梅亨市政府', en: 'the Municipality of Nijmegen', nl: 'Gemeente Nijmegen', de: 'die Stadt Nijmegen' }[locale]
    : operator;
  return strands[slug] ?? copy.management(name);
}
