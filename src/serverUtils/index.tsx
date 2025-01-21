import { NextRequest } from "next/server"
import queryString from "query-string"
import { Readable } from "stream"

function parsedQuery(request: NextRequest): any {
  const parsedUrl = new URL(request.nextUrl.toString())
  return queryString.parse(parsedUrl.search)
}

async function parsedBody(request: NextRequest): Promise<any> {
  return await request.json()
}

async function parsedBlob(request: NextRequest): Promise<any> {
  return await request.blob()
}

// Get raw body as string
async function getRawText(request: NextRequest): Promise<string> {
  return await request.text()
}
async function getRawBody(readable: Readable): Promise<Buffer> {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export { parsedBody, parsedQuery, parsedBlob, getRawText, getRawBody }
