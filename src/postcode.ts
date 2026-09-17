type ApiError = {
    error: string
}

type NominatimAddress = {
    postcode?: string
    country_code?: string
}

type NominatimResult = {
    display_name?: string
    address?: NominatimAddress
}

const USER_AGENT = 'typescript-mcp-server/1.0'

const formatMatch = (result: NominatimResult) => {
    const postcode = result.address?.postcode
    const address = result.display_name ?? '주소 정보 없음'
    return `우편번호 ${postcode}\n${address}`
}

export const lookupPostcode = async (
    address: string,
    count = 1
): Promise<{ text: string } | ApiError> => {
    const query = address.trim()
    if (!query) {
        return { error: '대한민국 주소를 입력해 주세요.' }
    }

    const resultCount = Math.min(Math.max(count, 1), 5)
    const url = new URL('https://nominatim.openstreetmap.org/search')
    url.searchParams.set('q', query)
    url.searchParams.set('format', 'json')
    url.searchParams.set('addressdetails', '1')
    url.searchParams.set('countrycodes', 'kr')
    url.searchParams.set('limit', String(resultCount))
    url.searchParams.set('accept-language', 'ko')

    let response: Response
    try {
        response = await fetch(url, {
            headers: {
                'User-Agent': USER_AGENT,
                Accept: 'application/json'
            }
        })
    } catch {
        return { error: '우편번호 조회 API에 연결하지 못했습니다.' }
    }

    if (!response.ok) {
        return { error: `외부 API 요청에 실패했습니다. (HTTP ${response.status})` }
    }

    let results: NominatimResult[]
    try {
        results = (await response.json()) as NominatimResult[]
    } catch {
        return { error: '외부 API 응답을 해석하지 못했습니다.' }
    }

    if (!Array.isArray(results) || results.length === 0) {
        return { error: `"${query}"에 해당하는 대한민국 주소를 찾을 수 없습니다.` }
    }

    const withPostcode = results.filter((result) => result.address?.postcode)
    if (withPostcode.length === 0) {
        return {
            error: `"${query}" 주소는 찾았지만 우편번호 정보가 없습니다.`
        }
    }

    const text = withPostcode
        .map((result, index) =>
            withPostcode.length === 1
                ? formatMatch(result)
                : `${index + 1}. ${formatMatch(result)}`
        )
        .join('\n\n')

    return { text }
}
