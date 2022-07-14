import { useState } from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import { IconChevronUp16 } from '@hashicorp/flight-icons/svg-react/chevron-up-16'
import { IconChevronDown16 } from '@hashicorp/flight-icons/svg-react/chevron-down-16'
import { IconXCircle24 } from '@hashicorp/flight-icons/svg-react/x-circle-24'
import { IconCheckCircleFill24 } from '@hashicorp/flight-icons/svg-react/check-circle-fill-24'
import { PricingTierTableProps } from './types'
import s from './style.module.css'

export default function PricingTierTable({
  columns,
  rows,
}: PricingTierTableProps): React.ReactElement {
  const [collapsedRows, setCollapsedRows] = useState<Array<number>>([])
  const hasColumnHeaders = !!columns && columns.length > 0
  const colLength = rows[0].cells.length

  if (colLength > 5) {
    throw new Error('<TierTable /> only supports up to five tiers')
  }

  function handleCollapseRow(idx: number) {
    if (collapsedRows.includes(idx)) {
      const updatedCollapsedRows = [...collapsedRows]
      const currentCollapsibleRowIdx = updatedCollapsedRows.indexOf(idx)
      updatedCollapsedRows.splice(currentCollapsibleRowIdx, 1)
      setCollapsedRows(updatedCollapsedRows)
    } else {
      setCollapsedRows([...collapsedRows, idx])
    }
  }

  return (
    <div
      className={s.pricingTierTableContainer}
      style={
        {
          '--col-gap': colLength === 2 ? '34px' : '22px',
        } as React.CSSProperties
      }
    >
      <div className={s.table}>
        <table>
          {hasColumnHeaders && (
            <thead>
              <tr>
                {columns.map((col, colIdx) => (
                  <th
                    key={col}
                    scope="col"
                    colSpan={colIdx === 0 && colLength > 3 ? 2 : 1}
                  >
                    {col.length ? (
                      <div className={s.columnHeading}>
                        <span>{col}</span>
                      </div>
                    ) : (
                      <VisuallyHidden>
                        <span>Title Column</span>
                      </VisuallyHidden>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {rows.map(({ header, cells, isCollapsible }, rowIndex) => {
              const rowIsCollapsed = collapsedRows.includes(rowIndex)
              const cellIds = cells.map(
                (cell, idx) => `row-${rowIndex}-cell-${idx}`
              )
              const ariaControls = [...cellIds, `row-${rowIndex}`]
              return (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={`row-${rowIndex}`}>
                  <th scope="row" colSpan={colLength > 3 ? 2 : 1}>
                    {isCollapsible && (
                      <button
                        className={s.icon}
                        onClick={() => handleCollapseRow(rowIndex)}
                        aria-expanded={!rowIsCollapsed}
                        aria-controls={ariaControls.join(' ')}
                      >
                        {rowIsCollapsed ? (
                          <IconChevronUp16 />
                        ) : (
                          <IconChevronDown16 />
                        )}
                      </button>
                    )}
                    <div className={s.rowHeading}>
                      <div className={s.rowHeaderHeading}>{header.heading}</div>
                      {header.content && (
                        <div
                          className={s.rowHeaderContent}
                          id={`row-header-${rowIndex}`}
                          aria-hidden={rowIsCollapsed}
                        >
                          {header.content}
                        </div>
                      )}
                    </div>
                  </th>
                  {cells.map((cell, cellIdx) => {
                    return (
                      <td
                        // eslint-disable-next-line react/no-array-index-key
                        key={`${header.heading}-${cellIdx}`}
                        id={`row-${rowIndex}-cell-${cellIdx}`}
                        aria-hidden={rowIsCollapsed}
                      >
                        {typeof cell == 'boolean' ? (
                          !cell ? (
                            <IconXCircle24 color="var(--wpl-neutral-300)" />
                          ) : (
                            <IconCheckCircleFill24 color="var(--wpl-green-500)" />
                          )
                        ) : (
                          <div className={s.textCell}>
                            {cell.heading && cell.heading}
                            {cell.content && cell.content}
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
