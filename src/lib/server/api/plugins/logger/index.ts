import { REQUEST_ID_HEADER } from "../request-id"
import { performance } from "node:perf_hooks"
import { Plugin } from "graphql-yoga"

export type LoggerParams = {
  enabled: boolean
}

export function withLogger(params: LoggerParams): Plugin {
  if (!params.enabled) {
    return {}
  }

  return {
    onRequest(payload) {
      const requestID = payload.request.headers.get(REQUEST_ID_HEADER)
      if (requestID != null) {
        performance.mark(requestID)
      }
    },
    onParams(payload) {
      const requestID = payload.request.headers.get(REQUEST_ID_HEADER)
      if (requestID != null) {
        console.log(
          `\x1b[36m[${requestID}]\x1b[0m => \x1b[32m${JSON.stringify(payload.params)}\x1b[0m`,
        )
      }
    },
    onResultProcess(payload) {
      const requestID = payload.request.headers.get(REQUEST_ID_HEADER)
      if (requestID != null) {
        const m = performance.measure(requestID, requestID)
        const d = m.duration.toString().concat("ms")
        const { result: r } = payload
        console.log(
          `\x1b[36m[${requestID}]\x1b[0m <= \x1b[35m${JSON.stringify({ duration: d, result: r })}\x1b[0m`,
        )
      }
    },
    onResponse: (payload) => {
      const requestID = payload.request.headers.get(REQUEST_ID_HEADER)
      if (requestID != null) {
        performance.clearMeasures(requestID)
        performance.clearMarks(requestID)
      }
    },
  }
}
