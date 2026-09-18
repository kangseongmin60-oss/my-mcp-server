export default function Home() {
    return (
        <main>
            <h1>MCP Server</h1>
            <p>
                Streamable HTTP endpoint: <code>/api/mcp</code>
            </p>
            <p>
                이미지 생성은 클라이언트 헤더 <code>x-hf-token</code>으로 Hugging Face
                토큰을 전달하세요.
            </p>
        </main>
    )
}
