import { check } from "k6"
import http from "k6/http"

export const options = {
  vus: 20,
  duration: "20s",
  thresholds: {
    http_req_duration: [{
      threshold: "p(95)<200",
      abortOnFail: true,
      delayAbortEval: "10s"
    }]
  }
}

export default function () {
  let response = http.get("https://api.escuelajs.co/api/v1/products")

  check(response, {
    "Duration is less than 500ms": (r) => r.timings.duration < 500
  })
}