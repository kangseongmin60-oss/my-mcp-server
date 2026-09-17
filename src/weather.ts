type ApiError = {
    error: string
}

type GeocodePlace = {
    name: string
    latitude: number
    longitude: number
    country?: string
    admin1?: string
    timezone?: string
}

type GeocodeResponse = {
    results?: GeocodePlace[]
    error?: boolean
    reason?: string
}

type WeatherResponse = {
    error?: boolean
    reason?: string
    current?: {
        temperature_2m: number
        apparent_temperature: number
        relative_humidity_2m: number
        weather_code: number
        wind_speed_10m: number
        precipitation: number
    }
    daily?: {
        temperature_2m_max: number[]
        temperature_2m_min: number[]
        weather_code: number[]
    }
}

const WEATHER_CODES: Record<number, string> = {
    0: '맑음',
    1: '대체로 맑음',
    2: '부분적으로 흐림',
    3: '흐림',
    45: '안개',
    48: '착빙 안개',
    51: '약한 이슬비',
    53: '보통 이슬비',
    55: '강한 이슬비',
    56: '약한 어는 이슬비',
    57: '강한 어는 이슬비',
    61: '약한 비',
    63: '보통 비',
    65: '강한 비',
    66: '약한 어는 비',
    67: '강한 어는 비',
    71: '약한 눈',
    73: '보통 눈',
    75: '강한 눈',
    77: '싸락눈',
    80: '약한 소나기',
    81: '보통 소나기',
    82: '강한 소나기',
    85: '약한 눈 소나기',
    86: '강한 눈 소나기',
    95: '뇌우',
    96: '약한 우박을 동반한 뇌우',
    99: '강한 우박을 동반한 뇌우'
}

const describeWeather = (code: number) => WEATHER_CODES[code] ?? `알 수 없음 (코드 ${code})`

const formatCoordinate = (value: number) => value.toFixed(4)

const formatPlace = (place: GeocodePlace) => {
    const area = [place.name, place.admin1, place.country]
        .filter(Boolean)
        .filter((value, index, list) => list.indexOf(value) === index)
        .join(', ')

    const timezone = place.timezone ? `\n시간대: ${place.timezone}` : ''
    return `${area}\n위도 ${formatCoordinate(place.latitude)}, 경도 ${formatCoordinate(place.longitude)}${timezone}`
}

const readJson = async <T>(response: Response): Promise<T | ApiError> => {
    if (!response.ok) {
        return { error: `외부 API 요청에 실패했습니다. (HTTP ${response.status})` }
    }

    try {
        return (await response.json()) as T
    } catch {
        return { error: '외부 API 응답을 해석하지 못했습니다.' }
    }
}

export const geocodeLocation = async (
    query: string,
    count = 1
): Promise<{ text: string } | ApiError> => {
    const name = query.trim()
    if (!name) {
        return { error: '주소나 도시 이름을 입력해 주세요.' }
    }

    const resultCount = Math.min(Math.max(count, 1), 5)
    const url = new URL('https://geocoding-api.open-meteo.com/v1/search')
    url.searchParams.set('name', name)
    url.searchParams.set('count', String(resultCount))
    url.searchParams.set('language', 'ko')

    let response: Response
    try {
        response = await fetch(url)
    } catch {
        return { error: '지오코딩 API에 연결하지 못했습니다.' }
    }

    const data = await readJson<GeocodeResponse>(response)
    if ('error' in data && typeof data.error === 'string') {
        return data
    }

    if (data.error) {
        return { error: data.reason ?? '지오코딩 API에서 오류가 발생했습니다.' }
    }

    const results = data.results ?? []
    if (results.length === 0) {
        return { error: `"${name}"에 해당하는 위치를 찾을 수 없습니다.` }
    }

    const text = results
        .map((place, index) =>
            results.length === 1 ? formatPlace(place) : `${index + 1}. ${formatPlace(place)}`
        )
        .join('\n\n')

    return { text }
}

export const getWeather = async (
    latitude: number,
    longitude: number
): Promise<{ text: string } | ApiError> => {
    if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
        return { error: '위도는 -90에서 90 사이의 숫자여야 합니다.' }
    }
    if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
        return { error: '경도는 -180에서 180 사이의 숫자여야 합니다.' }
    }

    const url = new URL('https://api.open-meteo.com/v1/forecast')
    url.searchParams.set('latitude', String(latitude))
    url.searchParams.set('longitude', String(longitude))
    url.searchParams.set(
        'current',
        'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,precipitation'
    )
    url.searchParams.set(
        'daily',
        'temperature_2m_max,temperature_2m_min,weather_code'
    )
    url.searchParams.set('forecast_days', '1')
    url.searchParams.set('timezone', 'auto')

    let response: Response
    try {
        response = await fetch(url)
    } catch {
        return { error: '날씨 API에 연결하지 못했습니다.' }
    }

    const data = await readJson<WeatherResponse>(response)
    if ('error' in data && typeof data.error === 'string') {
        return data
    }

    if (data.error) {
        return { error: data.reason ?? '날씨 API에서 오류가 발생했습니다.' }
    }

    const current = data.current
    if (!current) {
        return { error: '현재 날씨 정보를 받지 못했습니다.' }
    }

    const max = data.daily?.temperature_2m_max[0]
    const min = data.daily?.temperature_2m_min[0]
    const todayRange =
        typeof max === 'number' && typeof min === 'number'
            ? `\n오늘 최고 ${max}°C / 최저 ${min}°C`
            : ''

    const text = [
        `현재 ${describeWeather(current.weather_code)}, ${current.temperature_2m}°C (체감 ${current.apparent_temperature}°C), 습도 ${current.relative_humidity_2m}%, 풍속 ${current.wind_speed_10m}m/s, 강수량 ${current.precipitation}mm`,
        todayRange.trim(),
        '출처: Open-Meteo'
    ]
        .filter(Boolean)
        .join('\n')

    return { text }
}
