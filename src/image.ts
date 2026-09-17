import { InferenceClient } from '@huggingface/inference'

type ApiError = {
    error: string
}

type GeneratedImage = {
    data: string
    mimeType: string
    model: string
}

const DEFAULT_MODEL = 'black-forest-labs/FLUX.1-schnell'
const MAX_PROMPT_LENGTH = 2_000

const getToken = () => process.env.HF_TOKEN?.trim() ?? ''

const sniffMimeType = (bytes: Buffer, contentType: string) => {
    const headerType = contentType.split(';')[0]?.trim()
    if (headerType?.startsWith('image/')) {
        return headerType
    }
    if (bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
        return 'image/png'
    }
    if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
        return 'image/jpeg'
    }
    if (
        bytes.length >= 12 &&
        bytes.subarray(0, 4).toString('ascii') === 'RIFF' &&
        bytes.subarray(8, 12).toString('ascii') === 'WEBP'
    ) {
        return 'image/webp'
    }
    return 'image/png'
}

const toUserError = (error: unknown) => {
    const message = error instanceof Error ? error.message : String(error)
    if (/401|403|unauthorized|forbidden|invalid token/i.test(message)) {
        return 'Hugging Face 토큰이 없거나 Inference Providers 권한이 없습니다. 토큰 설정에서 Make calls to Inference Providers를 허용해 주세요.'
    }
    if (/402|payment|credits|quota/i.test(message)) {
        return 'Hugging Face Inference 크레딧이 부족합니다. huggingface.co 계정에서 크레딧을 확인해 주세요.'
    }
    return message || '이미지 생성에 실패했습니다.'
}

export const generateImage = async (
    prompt: string,
    model = DEFAULT_MODEL
): Promise<GeneratedImage | ApiError> => {
    const token = getToken()
    if (!token) {
        return {
            error: 'HF_TOKEN 환경 변수가 없습니다. .cursor/mcp.json의 env에 Hugging Face 토큰을 넣어 주세요.'
        }
    }

    const trimmedPrompt = prompt.trim()
    if (!trimmedPrompt) {
        return { error: '이미지 설명을 입력해 주세요.' }
    }
    if (trimmedPrompt.length > MAX_PROMPT_LENGTH) {
        return { error: `프롬프트는 ${MAX_PROMPT_LENGTH}자 이하여야 합니다.` }
    }

    const selectedModel = model.trim() || DEFAULT_MODEL
    const client = new InferenceClient(token)

    try {
        const blob = await client.textToImage(
            {
                provider: 'auto',
                model: selectedModel,
                inputs: trimmedPrompt,
                parameters: {
                    num_inference_steps: selectedModel.includes('schnell') ? 4 : 28
                }
            },
            { outputType: 'blob' }
        )

        const bytes = Buffer.from(await blob.arrayBuffer())
        if (bytes.length === 0) {
            return { error: '이미지 데이터가 비어 있습니다. 다른 프롬프트로 다시 시도해 주세요.' }
        }

        return {
            data: bytes.toString('base64'),
            mimeType: sniffMimeType(bytes, blob.type),
            model: selectedModel
        }
    } catch (error) {
        return { error: toUserError(error) }
    }
}
