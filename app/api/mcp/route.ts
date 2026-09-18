import { createMcpHandler } from 'mcp-handler'
import { registerMcpServer } from '../../../src/index'

const handler = createMcpHandler(
    (server) => {
        registerMcpServer(server)
    },
    {
        serverInfo: {
            name: 'YOUR_SERVER_NAME',
            version: '1.0.0'
        }
    },
    {
        basePath: '/api',
        maxDuration: 60,
        disableSse: true,
        verboseLogs: false
    }
)

export { handler as GET, handler as POST, handler as DELETE }
export const maxDuration = 60
