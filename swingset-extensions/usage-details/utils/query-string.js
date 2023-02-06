/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

function qs(params) {
  return Object.keys(params)
    .map((key) => {
      const [k, v] = [key, params[key]].map(encodeURIComponent)
      return `${k}=${v}`
    })
    .join('&')
}

export default qs
