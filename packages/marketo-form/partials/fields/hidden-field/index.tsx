/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import type { MarketoFormHiddenField } from '../../../types'

const HiddenField = ({ field }: { field: MarketoFormHiddenField }) => {
  const { register, setValue, formState } = useFormContext()

  useEffect(() => {
    if (field.autoFill && field.autoFill.valueFrom === 'query') {
      const searchParams = new URLSearchParams(window.location.search)
      if (searchParams.has(field.autoFill.parameterName)) {
        setValue(field.id, searchParams.get(field.autoFill.parameterName))
      }
    } else if (field.autoFill && field.autoFill.valueFrom === 'default') {
      setValue(field.id, field.autoFill.value)
    } else if (
      formState.defaultValues &&
      field.id in formState.defaultValues &&
      formState.defaultValues[field.id]
    ) {
      setValue(field.id, formState.defaultValues[field.id])
    }
  }, [field, setValue, formState])

  return <input type="hidden" {...register(field.id)} />
}

export default HiddenField
