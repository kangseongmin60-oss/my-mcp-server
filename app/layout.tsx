import type { ReactNode } from 'react'

export const metadata = {
    title: 'MCP Server',
    description: 'Streamable HTTP MCP server'
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ko">
            <body>{children}</body>
        </html>
    )
}
