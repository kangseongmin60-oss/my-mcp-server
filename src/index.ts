import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { formatLocalTime, lookupLocation } from './qtime.js'
import { geocodeLocation, getWeather } from './weather.js'
import { lookupPostcode } from './postcode.js'
import { generateImage } from './image.js'

// Create server instance
const server = new McpServer({
    name: 'YOUR_SERVER_NAME',
    version: '1.0.0'
})

server.registerTool(
    'greet',
    {
        description: '이름과 언어를 입력하면 인사말을 반환합니다.',
        inputSchema: z.object({
            name: z.string().describe('인사할 사람의 이름'),
            language: z
                .enum(['ko', 'en'])
                .optional()
                .default('en')
                .describe('인사 언어 (기본값: en)')
        }),
        outputSchema: z.object({
            content: z
                .array(
                    z.object({
                        type: z.literal('text'),
                        text: z.string().describe('인사말')
                    })
                )
                .describe('인사말')
        })
    },
    async ({ name, language }) => {
        const greeting =
            language === 'ko'
                ? `안녕하세요, ${name}님!`
                : `Hey there, ${name}! 👋 Nice to meet you!`

        return {
            content: [
                {
                    type: 'text' as const,
                    text: greeting
                }
            ],
            structuredContent: {
                content: [
                    {
                        type: 'text' as const,
                        text: greeting
                    }
                ]
            }
        }
    }
)

const operatorSchema = z
    .enum(['+', '-', '*', '/'])
    .describe('연산자 (+: 덧셈, -: 뺄셈, *: 곱셈, /: 나눗셈)')

const applyOperator = (
    left: number,
    operator: '+' | '-' | '*' | '/',
    right: number
): number | { error: string } => {
    if (operator === '/' && right === 0) {
        return { error: '0으로 나눌 수 없습니다.' }
    }

    switch (operator) {
        case '+':
            return left + right
        case '-':
            return left - right
        case '*':
            return left * right
        case '/':
            return left / right
    }
}

const isMultiplyOrDivide = (operator: '+' | '-' | '*' | '/') =>
    operator === '*' || operator === '/'

server.registerTool(
    'calculator',
    {
        description:
            '세 개의 숫자와 두 개의 연산자를 입력받아 계산 결과를 반환합니다. 곱셈과 나눗셈을 덧셈과 뺄셈보다 먼저 계산합니다.',
        inputSchema: z.object({
            a: z.number().describe('첫 번째 숫자'),
            operator1: operatorSchema.describe('첫 번째와 두 번째 숫자 사이의 연산자'),
            b: z.number().describe('두 번째 숫자'),
            operator2: operatorSchema.describe('두 번째와 세 번째 숫자 사이의 연산자'),
            c: z.number().describe('세 번째 숫자')
        }),
        outputSchema: z.object({
            content: z
                .array(
                    z.object({
                        type: z.literal('text'),
                        text: z.string().describe('계산 결과')
                    })
                )
                .describe('계산 결과')
        })
    },
    async ({ a, operator1, b, operator2, c }) => {
        const textContent = (text: string) => ({
            content: [
                {
                    type: 'text' as const,
                    text
                }
            ],
            structuredContent: {
                content: [
                    {
                        type: 'text' as const,
                        text
                    }
                ]
            }
        })

        const expression = `${a} ${operator1} ${b} ${operator2} ${c}`

        let result: number | { error: string }

        if (!isMultiplyOrDivide(operator1) && isMultiplyOrDivide(operator2)) {
            const right = applyOperator(b, operator2, c)
            if (typeof right === 'object') {
                return {
                    isError: true,
                    ...textContent(right.error)
                }
            }
            result = applyOperator(a, operator1, right)
        } else {
            const left = applyOperator(a, operator1, b)
            if (typeof left === 'object') {
                return {
                    isError: true,
                    ...textContent(left.error)
                }
            }
            result = applyOperator(left, operator2, c)
        }

        if (typeof result === 'object') {
            return {
                isError: true,
                ...textContent(result.error)
            }
        }

        return textContent(`${expression} = ${result}`)
    }
)

server.registerTool(
    'Qtime',
    {
        description:
            '나라와 도시를 입력하면 해당 지역의 현재 시각을 반환합니다. 도시가 없으면 그 나라의 대표 도시 시각을 알려줍니다.',
        inputSchema: z.object({
            country: z
                .string()
                .optional()
                .describe('나라 이름 (예: 대한민국, Japan, USA)'),
            city: z
                .string()
                .optional()
                .describe('도시 이름 (예: 서울, New York, London)')
        }),
        outputSchema: z.object({
            content: z
                .array(
                    z.object({
                        type: z.literal('text'),
                        text: z.string().describe('현재 시각')
                    })
                )
                .describe('현재 시각')
        })
    },
    async ({ country, city }) => {
        const textContent = (text: string) => ({
            content: [
                {
                    type: 'text' as const,
                    text
                }
            ],
            structuredContent: {
                content: [
                    {
                        type: 'text' as const,
                        text
                    }
                ]
            }
        })

        const location = lookupLocation(country, city)
        if ('error' in location) {
            return {
                isError: true,
                ...textContent(location.error)
            }
        }

        return textContent(formatLocalTime(location))
    }
)

server.registerTool(
    'geocode',
    {
        description:
            '주소나 도시 이름을 위도, 경도 좌표로 변환합니다. 날씨를 조회하기 전에 이 도구로 좌표를 얻은 뒤 get_weather에 넘기세요.',
        inputSchema: z.object({
            query: z
                .string()
                .describe('주소, 도시 이름 또는 우편번호 (예: 서울, Lisbon, 10001)'),
            count: z
                .number()
                .int()
                .min(1)
                .max(5)
                .optional()
                .default(1)
                .describe('반환할 후보 개수 (기본값 1, 최대 5)')
        }),
        outputSchema: z.object({
            content: z
                .array(
                    z.object({
                        type: z.literal('text'),
                        text: z.string().describe('좌표 정보')
                    })
                )
                .describe('좌표 정보')
        })
    },
    async ({ query, count }) => {
        const textContent = (text: string) => ({
            content: [
                {
                    type: 'text' as const,
                    text
                }
            ],
            structuredContent: {
                content: [
                    {
                        type: 'text' as const,
                        text
                    }
                ]
            }
        })

        const result = await geocodeLocation(query, count)
        if ('error' in result) {
            return {
                isError: true,
                ...textContent(result.error)
            }
        }

        return textContent(result.text)
    }
)

server.registerTool(
    'get_weather',
    {
        description:
            '위도와 경도로 현재 날씨와 오늘 최고/최저 기온을 조회합니다. 좌표는 geocode 도구로 먼저 받으세요.',
        inputSchema: z.object({
            latitude: z.number().describe('위도 (geocode 결과의 latitude)'),
            longitude: z.number().describe('경도 (geocode 결과의 longitude)')
        }),
        outputSchema: z.object({
            content: z
                .array(
                    z.object({
                        type: z.literal('text'),
                        text: z.string().describe('날씨 정보')
                    })
                )
                .describe('날씨 정보')
        })
    },
    async ({ latitude, longitude }) => {
        const textContent = (text: string) => ({
            content: [
                {
                    type: 'text' as const,
                    text
                }
            ],
            structuredContent: {
                content: [
                    {
                        type: 'text' as const,
                        text
                    }
                ]
            }
        })

        const result = await getWeather(latitude, longitude)
        if ('error' in result) {
            return {
                isError: true,
                ...textContent(result.error)
            }
        }

        return textContent(result.text)
    }
)

server.registerTool(
    'get_postcode',
    {
        description:
            '대한민국 주소를 입력하면 우편번호를 반환합니다. 도로명, 지번, 건물명을 사용할 수 있습니다.',
        inputSchema: z.object({
            address: z
                .string()
                .describe('대한민국 주소 (예: 주부토로 246, 서울특별시 중구 세종대로 110)'),
            count: z
                .number()
                .int()
                .min(1)
                .max(5)
                .optional()
                .default(1)
                .describe('반환할 후보 개수 (기본값 1, 최대 5)')
        }),
        outputSchema: z.object({
            content: z
                .array(
                    z.object({
                        type: z.literal('text'),
                        text: z.string().describe('우편번호')
                    })
                )
                .describe('우편번호')
        })
    },
    async ({ address, count }) => {
        const textContent = (text: string) => ({
            content: [
                {
                    type: 'text' as const,
                    text
                }
            ],
            structuredContent: {
                content: [
                    {
                        type: 'text' as const,
                        text
                    }
                ]
            }
        })

        const result = await lookupPostcode(address, count)
        if ('error' in result) {
            return {
                isError: true,
                ...textContent(result.error)
            }
        }

        return textContent(result.text)
    }
)

server.registerTool(
    'generate_image',
    {
        description:
            '텍스트 프롬프트로 이미지를 생성합니다. Hugging Face Inference Providers(FLUX.1-schnell)를 사용합니다.',
        inputSchema: z.object({
            prompt: z
                .string()
                .describe('생성할 이미지 설명 (예: a cat sitting on a windowsill at sunset)'),
            model: z
                .string()
                .optional()
                .default('black-forest-labs/FLUX.1-schnell')
                .describe('Hugging Face 모델 ID (기본값: black-forest-labs/FLUX.1-schnell)')
        })
    },
    async ({ prompt, model }) => {
        const textContent = (text: string, isError = false) => ({
            isError,
            content: [
                {
                    type: 'text' as const,
                    text
                }
            ]
        })

        const result = await generateImage(prompt, model)
        if ('error' in result) {
            return textContent(result.error, true)
        }

        return {
            content: [
                {
                    type: 'text' as const,
                    text: `"${prompt.trim()}" 이미지를 ${result.model}로 생성했습니다.`
                },
                {
                    type: 'image' as const,
                    data: result.data,
                    mimeType: result.mimeType
                }
            ]
        }
    }
)

const SERVER_INFO_URI = 'config://server-info'

const fakeServerInfo = {
    name: 'YOUR_SERVER_NAME',
    version: '1.0.0',
    status: 'healthy',
    environment: 'development',
    hostname: 'mcp-lab-01.internal',
    region: 'ap-northeast-2',
    datacenter: 'seoul-mock-1',
    transport: 'stdio',
    protocol: 'MCP',
    startedAt: '2026-09-17T06:00:00Z',
    uptimeSeconds: 42_600,
    capabilities: {
        tools: true,
        resources: true,
        prompts: true
    },
    tools: [
        { name: 'greet', category: 'utility', description: '이름과 언어로 인사말 생성' },
        { name: 'calculator', category: 'utility', description: '세 숫자 사칙연산' },
        { name: 'Qtime', category: 'datetime', description: '나라/도시 현재 시각 조회' },
        { name: 'geocode', category: 'geo', description: '주소를 위경도로 변환' },
        { name: 'get_weather', category: 'geo', description: '좌표 기반 날씨 조회' },
        { name: 'get_postcode', category: 'geo', description: '대한민국 주소 우편번호 조회' },
        { name: 'generate_image', category: 'media', description: '텍스트 프롬프트로 이미지 생성' }
    ],
    resources: [
        {
            name: 'server-info',
            uri: SERVER_INFO_URI,
            description: '가짜 서버 구성/상태 정보'
        }
    ],
    prompts: [
        {
            name: 'code_review',
            description: '코드를 단계적으로 상세 리뷰하는 절차적 프롬프트'
        }
    ],
    limits: {
        maxConcurrentRequests: 8,
        timeoutMs: 30_000,
        weatherCacheTtlSeconds: 300
    },
    notes: '데모용 가짜 서버 메타데이터입니다. 실제 인프라 상태와는 무관합니다.'
}

server.registerResource(
    'server-info',
    SERVER_INFO_URI,
    {
        title: '서버 구성 정보',
        description: '이 MCP 서버의 구성, 상태, 등록된 도구 목록을 담은 가짜 메타데이터입니다.',
        mimeType: 'application/json'
    },
    async (uri) => ({
        contents: [
            {
                uri: uri.href,
                mimeType: 'application/json',
                text: JSON.stringify(fakeServerInfo, null, 2)
            }
        ]
    })
)

server.registerPrompt(
    'code_review',
    {
        title: '코드 리뷰',
        description:
            '코드를 입력받아 언어와 관계없이 단계적으로 상세 리뷰하는 절차적 프롬프트입니다.',
        argsSchema: {
            code: z.string().describe('리뷰할 코드'),
            context: z
                .string()
                .optional()
                .describe('코드의 목적, 제약, 호출 맥락 등 추가 정보 (선택)'),
            focus: z
                .string()
                .optional()
                .describe('특히 보고 싶은 관점. 예: 보안, 성능, 가독성 (선택)')
        }
    },
    async ({ code, context, focus }) => {
        const extraSections = [
            context?.trim()
                ? `## 추가 맥락\n${context.trim()}`
                : '',
            focus?.trim()
                ? `## 특별히 집중할 관점\n아래 절차는 모두 수행하되, 이 관점의 근거와 권고를 더 깊게 다루세요.\n${focus.trim()}`
                : ''
        ]
            .filter(Boolean)
            .join('\n\n')

        return {
            description: '언어 무관 단계적 코드 리뷰',
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `당신은 시니어 코드 리뷰어입니다. 프로그래밍 언어가 무엇이든 같은 절차로 코드를 상세히 검토하세요.
전체 파일을 다시 쓰지 마세요. 아래 단계를 순서대로 수행하고, 해당 없는 단계만 "해당 없음"과 이유를 적고 넘어가세요.
코드에 없는 파일, API, 동작을 지어내지 마세요. 정보가 부족하면 가정이라고 밝히세요.
언어를 단정하지 말고, 코드 증거로 추론하세요. 다른 언어의 스타일을 강요하지 마세요.
각 지적은 짧은 코드 인용 또는 위치(함수명, 대략적 줄)로 근거를 남기세요.

${extraSections ? `${extraSections}\n\n` : ''}## 리뷰 대상 코드
----- BEGIN CODE -----
${code}
----- END CODE -----

## 절차

### 1. 언어와 표면 구조
- 언어, 런타임, 모듈/패키지 체계를 코드 증거로 추론하세요.
- 공개 API, 진입점, 타입, 부수 효과, I/O, 동시성 지점을 목록으로 적으세요.

### 2. 의도 파악
- 이 코드가 하려는 일을 3~6개 불릿으로 재진술하세요.
- 코드에 명시되지 않은 가정을 따로 적으세요.

### 3. 제어 흐름과 데이터 흐름
- 정상 경로를 한 번 끝까지 따라가세요.
- 분기, 루프, 조기 반환, 예외/에러 경로를 각각 추적하세요.
- 데이터가 어디서 만들어지고, 어떻게 변환되며, 어디서 끝나는지 적으세요.

### 4. 정확성
- 논리 오류, 경계값, null/undefined/nil, 레이스, 잘못된 상태 전이를 찾으세요.
- 에러 처리가 빠지거나 삼켜지는 지점을 표시하세요.
- 빈 입력, 최댓값, 잘못된 입력 같은 엣지 케이스를 점검하세요.

### 5. 안전과 보안
- 주입, 경로 조작, 시크릿 노출, 위험한 역직렬화, 권한 누락을 확인하세요.
- 리소스 누수와 제한 없는 입력도 확인하세요.

### 6. 성능
- 시간/공간 복잡도, 불필요한 복사, N+1, 블로킹, 과한 할당을 적으세요.

### 7. 설계와 유지보수
- 이름, 응집도, 중복, 테스트 용이성, API 모양을 평가하세요.
- 이 언어의 관용구에 맞는지 보되, 취향 차이는 낮게 매기세요.

### 8. 이슈 목록
각 이슈를 다음 형식으로 적으세요.
- 심각도: blocker | major | minor | nit
- 위치
- 왜 문제인지
- 구체적인 수정 방향

### 9. 요약
- 전반적 평가
- 잘된 점
- 우선 조치 최대 5개`
                    }
                }
            ]
        }
    }
)

server
    .connect(new StdioServerTransport())
    .catch(console.error)
    .then(() => {
        console.error('MCP server started')
    })
