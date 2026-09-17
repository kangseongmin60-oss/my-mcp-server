export type TimeLocation = {
    countryKo: string
    countryEn: string
    cityKo: string
    cityEn: string
    timezone: string
    isDefault?: boolean
}

const LOCATIONS: TimeLocation[] = [
    { countryKo: '대한민국', countryEn: 'South Korea', cityKo: '서울', cityEn: 'Seoul', timezone: 'Asia/Seoul', isDefault: true },
    { countryKo: '대한민국', countryEn: 'South Korea', cityKo: '부산', cityEn: 'Busan', timezone: 'Asia/Seoul' },
    { countryKo: '대한민국', countryEn: 'South Korea', cityKo: '인천', cityEn: 'Incheon', timezone: 'Asia/Seoul' },
    { countryKo: '대한민국', countryEn: 'South Korea', cityKo: '대구', cityEn: 'Daegu', timezone: 'Asia/Seoul' },
    { countryKo: '대한민국', countryEn: 'South Korea', cityKo: '대전', cityEn: 'Daejeon', timezone: 'Asia/Seoul' },
    { countryKo: '대한민국', countryEn: 'South Korea', cityKo: '광주', cityEn: 'Gwangju', timezone: 'Asia/Seoul' },
    { countryKo: '대한민국', countryEn: 'South Korea', cityKo: '제주', cityEn: 'Jeju', timezone: 'Asia/Seoul' },
    { countryKo: '북한', countryEn: 'North Korea', cityKo: '평양', cityEn: 'Pyongyang', timezone: 'Asia/Pyongyang', isDefault: true },
    { countryKo: '일본', countryEn: 'Japan', cityKo: '도쿄', cityEn: 'Tokyo', timezone: 'Asia/Tokyo', isDefault: true },
    { countryKo: '일본', countryEn: 'Japan', cityKo: '오사카', cityEn: 'Osaka', timezone: 'Asia/Tokyo' },
    { countryKo: '일본', countryEn: 'Japan', cityKo: '삿포로', cityEn: 'Sapporo', timezone: 'Asia/Tokyo' },
    { countryKo: '일본', countryEn: 'Japan', cityKo: '후쿠오카', cityEn: 'Fukuoka', timezone: 'Asia/Tokyo' },
    { countryKo: '일본', countryEn: 'Japan', cityKo: '나하', cityEn: 'Naha', timezone: 'Asia/Tokyo' },
    { countryKo: '중국', countryEn: 'China', cityKo: '베이징', cityEn: 'Beijing', timezone: 'Asia/Shanghai', isDefault: true },
    { countryKo: '중국', countryEn: 'China', cityKo: '상하이', cityEn: 'Shanghai', timezone: 'Asia/Shanghai' },
    { countryKo: '중국', countryEn: 'China', cityKo: '선전', cityEn: 'Shenzhen', timezone: 'Asia/Shanghai' },
    { countryKo: '중국', countryEn: 'China', cityKo: '청두', cityEn: 'Chengdu', timezone: 'Asia/Shanghai' },
    { countryKo: '중국', countryEn: 'China', cityKo: '우루무치', cityEn: 'Urumqi', timezone: 'Asia/Urumqi' },
    { countryKo: '대만', countryEn: 'Taiwan', cityKo: '타이베이', cityEn: 'Taipei', timezone: 'Asia/Taipei', isDefault: true },
    { countryKo: '홍콩', countryEn: 'Hong Kong', cityKo: '홍콩', cityEn: 'Hong Kong', timezone: 'Asia/Hong_Kong', isDefault: true },
    { countryKo: '싱가포르', countryEn: 'Singapore', cityKo: '싱가포르', cityEn: 'Singapore', timezone: 'Asia/Singapore', isDefault: true },
    { countryKo: '태국', countryEn: 'Thailand', cityKo: '방콕', cityEn: 'Bangkok', timezone: 'Asia/Bangkok', isDefault: true },
    { countryKo: '베트남', countryEn: 'Vietnam', cityKo: '하노이', cityEn: 'Hanoi', timezone: 'Asia/Ho_Chi_Minh', isDefault: true },
    { countryKo: '베트남', countryEn: 'Vietnam', cityKo: '호치민', cityEn: 'Ho Chi Minh', timezone: 'Asia/Ho_Chi_Minh' },
    { countryKo: '말레이시아', countryEn: 'Malaysia', cityKo: '쿠알라룸푸르', cityEn: 'Kuala Lumpur', timezone: 'Asia/Kuala_Lumpur', isDefault: true },
    { countryKo: '인도네시아', countryEn: 'Indonesia', cityKo: '자카르타', cityEn: 'Jakarta', timezone: 'Asia/Jakarta', isDefault: true },
    { countryKo: '인도네시아', countryEn: 'Indonesia', cityKo: '덴파사르', cityEn: 'Denpasar', timezone: 'Asia/Makassar' },
    { countryKo: '필리핀', countryEn: 'Philippines', cityKo: '마닐라', cityEn: 'Manila', timezone: 'Asia/Manila', isDefault: true },
    { countryKo: '인도', countryEn: 'India', cityKo: '뉴델리', cityEn: 'New Delhi', timezone: 'Asia/Kolkata', isDefault: true },
    { countryKo: '인도', countryEn: 'India', cityKo: '뭄바이', cityEn: 'Mumbai', timezone: 'Asia/Kolkata' },
    { countryKo: '인도', countryEn: 'India', cityKo: '벵갈루루', cityEn: 'Bengaluru', timezone: 'Asia/Kolkata' },
    { countryKo: '아랍에미리트', countryEn: 'United Arab Emirates', cityKo: '두바이', cityEn: 'Dubai', timezone: 'Asia/Dubai', isDefault: true },
    { countryKo: '아랍에미리트', countryEn: 'United Arab Emirates', cityKo: '아부다비', cityEn: 'Abu Dhabi', timezone: 'Asia/Dubai' },
    { countryKo: '사우디아라비아', countryEn: 'Saudi Arabia', cityKo: '리야드', cityEn: 'Riyadh', timezone: 'Asia/Riyadh', isDefault: true },
    { countryKo: '카타르', countryEn: 'Qatar', cityKo: '도하', cityEn: 'Doha', timezone: 'Asia/Qatar', isDefault: true },
    { countryKo: '이스라엘', countryEn: 'Israel', cityKo: '예루살렘', cityEn: 'Jerusalem', timezone: 'Asia/Jerusalem', isDefault: true },
    { countryKo: '이스라엘', countryEn: 'Israel', cityKo: '텔아비브', cityEn: 'Tel Aviv', timezone: 'Asia/Jerusalem' },
    { countryKo: '튀르키예', countryEn: 'Turkey', cityKo: '이스탄불', cityEn: 'Istanbul', timezone: 'Europe/Istanbul', isDefault: true },
    { countryKo: '튀르키예', countryEn: 'Turkey', cityKo: '앙카라', cityEn: 'Ankara', timezone: 'Europe/Istanbul' },
    { countryKo: '러시아', countryEn: 'Russia', cityKo: '모스크바', cityEn: 'Moscow', timezone: 'Europe/Moscow', isDefault: true },
    { countryKo: '러시아', countryEn: 'Russia', cityKo: '블라디보스토크', cityEn: 'Vladivostok', timezone: 'Asia/Vladivostok' },
    { countryKo: '러시아', countryEn: 'Russia', cityKo: '노보시비르스크', cityEn: 'Novosibirsk', timezone: 'Asia/Novosibirsk' },
    { countryKo: '미국', countryEn: 'United States', cityKo: '뉴욕', cityEn: 'New York', timezone: 'America/New_York', isDefault: true },
    { countryKo: '미국', countryEn: 'United States', cityKo: '워싱턴', cityEn: 'Washington', timezone: 'America/New_York' },
    { countryKo: '미국', countryEn: 'United States', cityKo: '로스앤젤레스', cityEn: 'Los Angeles', timezone: 'America/Los_Angeles' },
    { countryKo: '미국', countryEn: 'United States', cityKo: '샌프란시스코', cityEn: 'San Francisco', timezone: 'America/Los_Angeles' },
    { countryKo: '미국', countryEn: 'United States', cityKo: '시애틀', cityEn: 'Seattle', timezone: 'America/Los_Angeles' },
    { countryKo: '미국', countryEn: 'United States', cityKo: '시카고', cityEn: 'Chicago', timezone: 'America/Chicago' },
    { countryKo: '미국', countryEn: 'United States', cityKo: '휴스턴', cityEn: 'Houston', timezone: 'America/Chicago' },
    { countryKo: '미국', countryEn: 'United States', cityKo: '덴버', cityEn: 'Denver', timezone: 'America/Denver' },
    { countryKo: '미국', countryEn: 'United States', cityKo: '피닉스', cityEn: 'Phoenix', timezone: 'America/Phoenix' },
    { countryKo: '미국', countryEn: 'United States', cityKo: '호놀룰루', cityEn: 'Honolulu', timezone: 'Pacific/Honolulu' },
    { countryKo: '미국', countryEn: 'United States', cityKo: '앵커리지', cityEn: 'Anchorage', timezone: 'America/Anchorage' },
    { countryKo: '캐나다', countryEn: 'Canada', cityKo: '오타와', cityEn: 'Ottawa', timezone: 'America/Toronto', isDefault: true },
    { countryKo: '캐나다', countryEn: 'Canada', cityKo: '토론토', cityEn: 'Toronto', timezone: 'America/Toronto' },
    { countryKo: '캐나다', countryEn: 'Canada', cityKo: '밴쿠버', cityEn: 'Vancouver', timezone: 'America/Vancouver' },
    { countryKo: '캐나다', countryEn: 'Canada', cityKo: '몬트리올', cityEn: 'Montreal', timezone: 'America/Toronto' },
    { countryKo: '멕시코', countryEn: 'Mexico', cityKo: '멕시코시티', cityEn: 'Mexico City', timezone: 'America/Mexico_City', isDefault: true },
    { countryKo: '브라질', countryEn: 'Brazil', cityKo: '브라질리아', cityEn: 'Brasilia', timezone: 'America/Sao_Paulo', isDefault: true },
    { countryKo: '브라질', countryEn: 'Brazil', cityKo: '상파울루', cityEn: 'Sao Paulo', timezone: 'America/Sao_Paulo' },
    { countryKo: '브라질', countryEn: 'Brazil', cityKo: '리우데자네이루', cityEn: 'Rio de Janeiro', timezone: 'America/Sao_Paulo' },
    { countryKo: '아르헨티나', countryEn: 'Argentina', cityKo: '부에노스아이레스', cityEn: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', isDefault: true },
    { countryKo: '영국', countryEn: 'United Kingdom', cityKo: '런던', cityEn: 'London', timezone: 'Europe/London', isDefault: true },
    { countryKo: '프랑스', countryEn: 'France', cityKo: '파리', cityEn: 'Paris', timezone: 'Europe/Paris', isDefault: true },
    { countryKo: '독일', countryEn: 'Germany', cityKo: '베를린', cityEn: 'Berlin', timezone: 'Europe/Berlin', isDefault: true },
    { countryKo: '독일', countryEn: 'Germany', cityKo: '뮌헨', cityEn: 'Munich', timezone: 'Europe/Berlin' },
    { countryKo: '독일', countryEn: 'Germany', cityKo: '프랑크푸르트', cityEn: 'Frankfurt', timezone: 'Europe/Berlin' },
    { countryKo: '이탈리아', countryEn: 'Italy', cityKo: '로마', cityEn: 'Rome', timezone: 'Europe/Rome', isDefault: true },
    { countryKo: '이탈리아', countryEn: 'Italy', cityKo: '밀라노', cityEn: 'Milan', timezone: 'Europe/Rome' },
    { countryKo: '스페인', countryEn: 'Spain', cityKo: '마드리드', cityEn: 'Madrid', timezone: 'Europe/Madrid', isDefault: true },
    { countryKo: '스페인', countryEn: 'Spain', cityKo: '바르셀로나', cityEn: 'Barcelona', timezone: 'Europe/Madrid' },
    { countryKo: '네덜란드', countryEn: 'Netherlands', cityKo: '암스테르담', cityEn: 'Amsterdam', timezone: 'Europe/Amsterdam', isDefault: true },
    { countryKo: '스위스', countryEn: 'Switzerland', cityKo: '취리히', cityEn: 'Zurich', timezone: 'Europe/Zurich', isDefault: true },
    { countryKo: '스웨덴', countryEn: 'Sweden', cityKo: '스톡홀름', cityEn: 'Stockholm', timezone: 'Europe/Stockholm', isDefault: true },
    { countryKo: '노르웨이', countryEn: 'Norway', cityKo: '오슬로', cityEn: 'Oslo', timezone: 'Europe/Oslo', isDefault: true },
    { countryKo: '핀란드', countryEn: 'Finland', cityKo: '헬싱키', cityEn: 'Helsinki', timezone: 'Europe/Helsinki', isDefault: true },
    { countryKo: '덴마크', countryEn: 'Denmark', cityKo: '코펜하겐', cityEn: 'Copenhagen', timezone: 'Europe/Copenhagen', isDefault: true },
    { countryKo: '폴란드', countryEn: 'Poland', cityKo: '바르샤바', cityEn: 'Warsaw', timezone: 'Europe/Warsaw', isDefault: true },
    { countryKo: '포르투갈', countryEn: 'Portugal', cityKo: '리스본', cityEn: 'Lisbon', timezone: 'Europe/Lisbon', isDefault: true },
    { countryKo: '포르투갈', countryEn: 'Portugal', cityKo: '포르투', cityEn: 'Porto', timezone: 'Europe/Lisbon' },
    { countryKo: '아일랜드', countryEn: 'Ireland', cityKo: '더블린', cityEn: 'Dublin', timezone: 'Europe/Dublin', isDefault: true },
    { countryKo: '그리스', countryEn: 'Greece', cityKo: '아테네', cityEn: 'Athens', timezone: 'Europe/Athens', isDefault: true },
    { countryKo: '오스트리아', countryEn: 'Austria', cityKo: '빈', cityEn: 'Vienna', timezone: 'Europe/Vienna', isDefault: true },
    { countryKo: '체코', countryEn: 'Czechia', cityKo: '프라하', cityEn: 'Prague', timezone: 'Europe/Prague', isDefault: true },
    { countryKo: '우크라이나', countryEn: 'Ukraine', cityKo: '키이우', cityEn: 'Kyiv', timezone: 'Europe/Kyiv', isDefault: true },
    { countryKo: '이집트', countryEn: 'Egypt', cityKo: '카이로', cityEn: 'Cairo', timezone: 'Africa/Cairo', isDefault: true },
    { countryKo: '남아프리카공화국', countryEn: 'South Africa', cityKo: '요하네스버그', cityEn: 'Johannesburg', timezone: 'Africa/Johannesburg', isDefault: true },
    { countryKo: '남아프리카공화국', countryEn: 'South Africa', cityKo: '케이프타운', cityEn: 'Cape Town', timezone: 'Africa/Johannesburg' },
    { countryKo: '케냐', countryEn: 'Kenya', cityKo: '나이로비', cityEn: 'Nairobi', timezone: 'Africa/Nairobi', isDefault: true },
    { countryKo: '나이지리아', countryEn: 'Nigeria', cityKo: '라고스', cityEn: 'Lagos', timezone: 'Africa/Lagos', isDefault: true },
    { countryKo: '호주', countryEn: 'Australia', cityKo: '캔버라', cityEn: 'Canberra', timezone: 'Australia/Sydney', isDefault: true },
    { countryKo: '호주', countryEn: 'Australia', cityKo: '시드니', cityEn: 'Sydney', timezone: 'Australia/Sydney' },
    { countryKo: '호주', countryEn: 'Australia', cityKo: '멜버른', cityEn: 'Melbourne', timezone: 'Australia/Melbourne' },
    { countryKo: '호주', countryEn: 'Australia', cityKo: '브리즈번', cityEn: 'Brisbane', timezone: 'Australia/Brisbane' },
    { countryKo: '호주', countryEn: 'Australia', cityKo: '퍼스', cityEn: 'Perth', timezone: 'Australia/Perth' },
    { countryKo: '호주', countryEn: 'Australia', cityKo: '애들레이드', cityEn: 'Adelaide', timezone: 'Australia/Adelaide' },
    { countryKo: '뉴질랜드', countryEn: 'New Zealand', cityKo: '웰링턴', cityEn: 'Wellington', timezone: 'Pacific/Auckland', isDefault: true },
    { countryKo: '뉴질랜드', countryEn: 'New Zealand', cityKo: '오클랜드', cityEn: 'Auckland', timezone: 'Pacific/Auckland' }
]

const COUNTRY_ALIASES: Record<string, string[]> = {
    대한민국: ['한국', '남한', 'korea', 'southkorea', 'south korea', 'kr', 'republicofkorea'],
    북한: ['조선', 'northkorea', 'north korea', 'dprk', 'kp'],
    일본: ['japan', 'jp', '니혼', '닛폰'],
    중국: ['china', 'cn', 'prc'],
    대만: ['taiwan', 'tw', '타이완'],
    홍콩: ['hongkong', 'hong kong', 'hk'],
    싱가포르: ['singapore', 'sg', '싱가폴'],
    태국: ['thailand', 'th'],
    베트남: ['vietnam', 'vn'],
    말레이시아: ['malaysia', 'my'],
    인도네시아: ['indonesia', 'id'],
    필리핀: ['philippines', 'ph'],
    인도: ['india', 'in'],
    아랍에미리트: ['uae', 'unitedarabemirates', '에미레이트'],
    사우디아라비아: ['saudi', 'saudiarabia', '사우디'],
    카타르: ['qatar'],
    이스라엘: ['israel'],
    튀르키예: ['turkey', 'turkiye', '터키'],
    러시아: ['russia', 'ru'],
    미국: ['usa', 'us', 'america', 'unitedstates', 'united states'],
    캐나다: ['canada', 'ca'],
    멕시코: ['mexico', 'mx'],
    브라질: ['brazil', 'br'],
    아르헨티나: ['argentina'],
    영국: ['uk', 'unitedkingdom', 'united kingdom', 'britain', 'england', 'gb'],
    프랑스: ['france', 'fr'],
    독일: ['germany', 'de'],
    이탈리아: ['italy', 'it'],
    스페인: ['spain', 'es'],
    네덜란드: ['netherlands', 'holland', 'nl'],
    스위스: ['switzerland', 'ch'],
    스웨덴: ['sweden', 'se'],
    노르웨이: ['norway', 'no'],
    핀란드: ['finland', 'fi'],
    덴마크: ['denmark', 'dk'],
    폴란드: ['poland', 'pl'],
    포르투갈: ['portugal', 'pt'],
    아일랜드: ['ireland', 'ie'],
    그리스: ['greece', 'gr'],
    오스트리아: ['austria', 'at'],
    체코: ['czechia', 'czech', 'czechrepublic'],
    우크라이나: ['ukraine', 'ua'],
    이집트: ['egypt', 'eg'],
    남아프리카공화국: ['southafrica', 'south africa', 'za'],
    케냐: ['kenya', 'ke'],
    나이지리아: ['nigeria', 'ng'],
    호주: ['australia', 'au', '오스트레일리아'],
    뉴질랜드: ['newzealand', 'new zealand', 'nz']
}

const CITY_ALIASES: Record<string, string[]> = {
    서울: ['seoul', '서울시'],
    부산: ['busan', 'pusan'],
    인천: ['incheon'],
    대구: ['daegu', 'taegu'],
    대전: ['daejeon', 'taejon'],
    광주: ['gwangju'],
    제주: ['jeju', 'jejuisland'],
    평양: ['pyongyang'],
    도쿄: ['tokyo', '동경'],
    오사카: ['osaka'],
    삿포로: ['sapporo'],
    후쿠오카: ['fukuoka'],
    나하: ['naha', '오키나와', 'okinawa'],
    베이징: ['beijing', '북경'],
    상하이: ['shanghai', '상해'],
    선전: ['shenzhen'],
    청두: ['chengdu'],
    우루무치: ['urumqi', 'urunqi'],
    타이베이: ['taipei', '타이페이'],
    홍콩: ['hongkong'],
    싱가포르: ['singapore', '싱가폴'],
    방콕: ['bangkok'],
    하노이: ['hanoi'],
    호치민: ['hochiminh', 'hochiminhcity', '사이공', 'saigon'],
    쿠알라룸푸르: ['kualalumpur', 'kl'],
    자카르타: ['jakarta'],
    덴파사르: ['denpasar', '발리', 'bali'],
    마닐라: ['manila'],
    뉴델리: ['newdelhi', 'delhi', '델리'],
    뭄바이: ['mumbai', '봄베이', 'bombay'],
    벵갈루루: ['bengaluru', 'bangalore', '뱅갈로르'],
    두바이: ['dubai'],
    아부다비: ['abudhabi'],
    리야드: ['riyadh'],
    도하: ['doha'],
    예루살렘: ['jerusalem'],
    텔아비브: ['telaviv'],
    이스탄불: ['istanbul'],
    앙카라: ['ankara'],
    모스크바: ['moscow'],
    블라디보스토크: ['vladivostok'],
    노보시비르스크: ['novosibirsk'],
    뉴욕: ['newyork', 'nyc', 'newyorkcity'],
    워싱턴: ['washington', 'washingtondc', 'dc'],
    로스앤젤레스: ['losangeles', 'la'],
    샌프란시스코: ['sanfrancisco', 'sf'],
    시애틀: ['seattle'],
    시카고: ['chicago'],
    휴스턴: ['houston'],
    덴버: ['denver'],
    피닉스: ['phoenix'],
    호놀룰루: ['honolulu', '하와이', 'hawaii'],
    앵커리지: ['anchorage', '알래스카', 'alaska'],
    오타와: ['ottawa'],
    토론토: ['toronto'],
    밴쿠버: ['vancouver'],
    몬트리올: ['montreal'],
    멕시코시티: ['mexicocity'],
    브라질리아: ['brasilia'],
    상파울루: ['saopaulo'],
    리우데자네이루: ['riodejaneiro', 'rio'],
    부에노스아이레스: ['buenosaires'],
    런던: ['london'],
    파리: ['paris'],
    베를린: ['berlin'],
    뮌헨: ['munich', 'munchen'],
    프랑크푸르트: ['frankfurt'],
    로마: ['rome'],
    밀라노: ['milan', 'milano'],
    마드리드: ['madrid'],
    바르셀로나: ['barcelona'],
    암스테르담: ['amsterdam'],
    취리히: ['zurich'],
    스톡홀름: ['stockholm'],
    오슬로: ['oslo'],
    헬싱키: ['helsinki'],
    코펜하겐: ['copenhagen'],
    바르샤바: ['warsaw'],
    리스본: ['lisbon'],
    포르투: ['porto', 'oporto'],
    더블린: ['dublin'],
    아테네: ['athens'],
    빈: ['vienna', '비엔나'],
    프라하: ['prague'],
    키이우: ['kyiv', 'kiev', '키예프'],
    카이로: ['cairo'],
    요하네스버그: ['johannesburg'],
    케이프타운: ['capetown'],
    나이로비: ['nairobi'],
    라고스: ['lagos'],
    캔버라: ['canberra'],
    시드니: ['sydney'],
    멜버른: ['melbourne'],
    브리즈번: ['brisbane'],
    퍼스: ['perth'],
    애들레이드: ['adelaide'],
    웰링턴: ['wellington'],
    오클랜드: ['auckland']
}

const normalize = (value: string) =>
    value
        .trim()
        .toLowerCase()
        .replace(/[\s._-]/g, '')
        .replace(/시$/, '')

const matchesName = (query: string, names: string[]) => {
    const normalizedQuery = normalize(query)
    return names.some((name) => normalize(name) === normalizedQuery)
}

const countryNames = (location: TimeLocation) => [
    location.countryKo,
    location.countryEn,
    ...(COUNTRY_ALIASES[location.countryKo] ?? [])
]

const cityNames = (location: TimeLocation) => [
    location.cityKo,
    location.cityEn,
    ...(CITY_ALIASES[location.cityKo] ?? [])
]

const unique = (values: string[]) => [...new Set(values)]

export const lookupLocation = (
    country?: string,
    city?: string
): TimeLocation | { error: string } => {
    if (!country && !city) {
        return { error: '나라 또는 도시 이름을 입력해 주세요.' }
    }

    const byCountry = country
        ? LOCATIONS.filter((location) => matchesName(country, countryNames(location)))
        : LOCATIONS

    if (country && byCountry.length === 0) {
        return { error: `"${country}"에 해당하는 나라를 찾을 수 없습니다.` }
    }

    if (!city) {
        const defaultLocation = byCountry.find((location) => location.isDefault) ?? byCountry[0]
        return defaultLocation
    }

    const byCity = byCountry.filter((location) =>
        matchesName(city, cityNames(location))
    )

    if (byCity.length === 1) {
        return byCity[0]
    }

    if (byCity.length > 1) {
        const countries = unique(byCity.map((location) => location.countryKo)).join(', ')
        return {
            error: `"${city}" 도시가 여러 나라에 있습니다. 나라를 함께 입력해 주세요. (${countries})`
        }
    }

    if (country) {
        const cities = unique(byCountry.map((location) => location.cityKo)).join(', ')
        return {
            error: `"${country}"에서 "${city}" 도시를 찾을 수 없습니다. 사용 가능한 도시: ${cities}`
        }
    }

    return { error: `"${city}"에 해당하는 도시를 찾을 수 없습니다.` }
}

export const formatLocalTime = (location: TimeLocation) => {
    const now = new Date()
    const formatted = new Intl.DateTimeFormat('ko-KR', {
        timeZone: location.timezone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'shortOffset'
    }).format(now)

    return `${location.countryKo} ${location.cityKo}의 현재 시각은 ${formatted}입니다.`
}
