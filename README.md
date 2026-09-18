# TypeScript MCP Server 보일러플레이트

TypeScript MCP SDK를 활용하여 Model Context Protocol (MCP) 서버를 빠르게 개발할 수 있는 보일러플레이트 프로젝트입니다.

## 📁 프로젝트 구조

```
typescript-mcp-server-boilerplate/
├── app/
│   ├── api/mcp/route.ts  # Streamable HTTP MCP 엔드포인트
│   ├── layout.tsx
│   └── page.tsx
├── src/
│   ├── index.ts          # MCP 도구/리소스/프롬프트 등록
│   ├── image.ts          # Hugging Face 이미지 생성
│   ├── qtime.ts
│   ├── weather.ts
│   └── postcode.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 로컬 실행 (Streamable HTTP)

```bash
npm run dev
```

서버는 `http://localhost:3000/api/mcp` 에서 MCP 클라이언트의 연결을 대기합니다.

### 3. Vercel 배포

이 프로젝트는 Next.js App Router + `mcp-handler` 구조이므로 Vercel에 그대로 배포할 수 있습니다. 배포 후 MCP URL은 다음과 같습니다.

```text
https://<your-project>.vercel.app/api/mcp
```

## 🛠️ 개발 가이드

### MCP 도구(Tool) 추가하기

MCP 서버에 새로운 도구를 추가하려면 `server.tool()` 메서드에 **Zod 스키마를 직접** 정의하여 등록합니다:

```typescript
import { z } from 'zod'

// 계산기 도구 추가
server.tool(
    'calculator',
    {
        operation: z
            .enum(['add', 'subtract', 'multiply', 'divide'])
            .describe('수행할 연산 (add, subtract, multiply, divide)'),
        a: z.number().describe('첫 번째 숫자'),
        b: z.number().describe('두 번째 숫자')
    },
    async ({ operation, a, b }) => {
        // 연산 수행
        let result: number
        switch (operation) {
            case 'add':
                result = a + b
                break
            case 'subtract':
                result = a - b
                break
            case 'multiply':
                result = a * b
                break
            case 'divide':
                if (b === 0) throw new Error('0으로 나눌 수 없습니다')
                result = a / b
                break
            default:
                throw new Error('지원하지 않는 연산입니다')
        }

        const operationSymbols = {
            add: '+',
            subtract: '-',
            multiply: '×',
            divide: '÷'
        } as const

        const operationSymbol =
            operationSymbols[operation as keyof typeof operationSymbols]

        return {
            content: [
                {
                    type: 'text',
                    text: `${a} ${operationSymbol} ${b} = ${result}`
                }
            ]
        }
    }
)
```

#### 더 복잡한 도구 예시

```typescript
// 날씨 정보 조회 도구
server.tool(
    'get_weather',
    {
        city: z.string().describe('날씨를 조회할 도시명'),
        unit: z
            .enum(['celsius', 'fahrenheit'])
            .optional()
            .default('celsius')
            .describe('온도 단위 (기본값: celsius)')
    },
    async ({ city, unit }) => {
        try {
            // 실제 날씨 API 호출 로직 (예시)
            const weatherData = await fetchWeatherData(city, unit)

            return {
                content: [
                    {
                        type: 'text',
                        text: `${city}의 현재 날씨:
온도: ${weatherData.temperature}°${unit === 'celsius' ? 'C' : 'F'}
날씨: ${weatherData.condition}
습도: ${weatherData.humidity}%
풍속: ${weatherData.windSpeed}km/h`
                    }
                ]
            }
        } catch (error) {
            throw new Error(
                `날씨 정보를 가져올 수 없습니다: ${(error as Error).message}`
            )
        }
    }
)

// 도우미 함수
async function fetchWeatherData(city: string, unit: string) {
    // 실제 날씨 API 호출 구현
    // 여기서는 예시 데이터 반환
    return {
        temperature: unit === 'celsius' ? 22 : 72,
        condition: '맑음',
        humidity: 65,
        windSpeed: 12
    }
}
```

### 리소스 추가하기

MCP 서버에 리소스를 추가하여 외부 데이터나 파일에 대한 접근을 제공할 수 있습니다:

```typescript
// 리소스 등록
server.resource(
    'example-file',
    'file://example.txt',
    {
        name: '예시 텍스트 파일',
        description: '예시 텍스트 파일 설명',
        mimeType: 'text/plain'
    },
    async () => {
        return {
            contents: [
                {
                    uri: 'file://example.txt',
                    mimeType: 'text/plain',
                    text: '예시 파일 내용입니다.'
                }
            ]
        }
    }
)

// 동적 리소스 예시
server.resource(
    'app-settings',
    'config://settings',
    {
        name: '애플리케이션 설정',
        description: '애플리케이션의 현재 설정 정보',
        mimeType: 'application/json'
    },
    async () => {
        const settings = {
            theme: 'dark',
            language: 'ko-KR',
            notifications: true,
            lastUpdated: new Date().toISOString()
        }

        return {
            contents: [
                {
                    uri: 'config://settings',
                    mimeType: 'application/json',
                    text: JSON.stringify(settings, null, 2)
                }
            ]
        }
    }
)
```

## 📦 주요 의존성

- **@modelcontextprotocol/sdk**: MCP 프로토콜 구현을 위한 공식 SDK
- **mcp-handler**: Next.js/Vercel용 Streamable HTTP 어댑터
- **next**: Vercel 배포를 위한 App Router
- **zod**: TypeScript 우선 스키마 검증 라이브러리
- **typescript**: TypeScript 컴파일러

## 🔧 스크립트

- `npm run dev`: Next.js 개발 서버 실행
- `npm run build`: Vercel/프로덕션용 Next.js 빌드
- `npm run start`: 프로덕션 서버 실행

## 📋 사용 예시

### 완전한 서버 예시

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

// 서버 생성
const server = new McpServer({
    name: 'my-mcp-server',
    version: '1.0.0',
    capabilities: {
        tools: {},
        resources: {}
    }
})

// 간단한 인사 도구
server.tool(
    'greet',
    {
        name: z.string().describe('인사할 사람의 이름'),
        language: z
            .enum(['ko', 'en'])
            .optional()
            .default('ko')
            .describe('인사 언어 (기본값: ko)')
    },
    async ({ name, language }) => {
        const greeting =
            language === 'ko' ? `안녕하세요, ${name}님!` : `Hello, ${name}!`

        return {
            content: [
                {
                    type: 'text',
                    text: greeting
                }
            ]
        }
    }
)

// 시스템 정보 리소스
server.resource(
    'system-info',
    'system://info',
    {
        name: '시스템 정보',
        description: '서버의 현재 상태 및 시스템 정보',
        mimeType: 'application/json'
    },
    async () => {
        const systemInfo = {
            server: 'my-mcp-server',
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        }

        return {
            contents: [
                {
                    uri: 'system://info',
                    mimeType: 'application/json',
                    text: JSON.stringify(systemInfo, null, 2)
                }
            ]
        }
    }
)

// 서버 시작
async function main() {
    const transport = new StdioServerTransport()
    await server.connect(transport)
    console.error('MCP 서버가 시작되었습니다')
}

main().catch(console.error)
```

## 🔧 Cursor MCP 연결

개발한 MCP 서버를 Cursor에서 테스트할 수 있습니다.

### 설정 파일 수정

`./.cursor/mcp.json` 파일을 편집합니다:

```json
{
    "mcpServers": {
        "typescript-mcp-server": {
            "url": "http://localhost:3000/api/mcp",
            "headers": {
                "x-hf-token": "YOUR_HF_TOKEN"
            }
        }
    }
}
```

배포 후에는 `url`을 `https://<your-project>.vercel.app/api/mcp` 로 바꾸면 됩니다.

이미지 생성 도구 `generate_image`는 클라이언트 헤더 `x-hf-token`에서 Hugging Face 토큰을 읽습니다. 헤더가 없으면 서버 환경 변수 `HF_TOKEN`을 사용합니다.

> **주의**: 토큰을 git에 커밋하지 마세요. `.cursor/mcp.json`은 `.gitignore`에 포함되어 있습니다.

### 테스트 명령어

Cursor MCP에서 다음과 같이 테스트해볼 수 있습니다:

- "5 더하기 3은 얼마야?" (계산기 도구 테스트)
- "안녕하세요 라고 인사해줘" (인사 도구 테스트)
- 서버 정보 리소스 조회

## 🔗 참고 자료

- [Model Context Protocol 공식 문서](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Node.js MCP 서버 개발 가이드](https://modelcontextprotocol.io/docs/develop/build-server#node)
- [Zod 문서](https://zod.dev/)

## 📄 라이선스

MIT
