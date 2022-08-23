import { useState } from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import { IconXCircle24 } from '@hashicorp/flight-icons/svg-react/x-circle-24'
import { IconCheckCircleFill24 } from '@hashicorp/flight-icons/svg-react/check-circle-fill-24'
import { IconChevronUp16 } from '@hashicorp/flight-icons/svg-react/chevron-up-16'
import { IconChevronDown16 } from '@hashicorp/flight-icons/svg-react/chevron-down-16'
import { TableComponentProps } from '../../types'
import s from './style.module.css'

export default function PricingTierTable({
  columns,
  rows,
  colHeaderRef,
  tableRef,
}: TableComponentProps): React.ReactElement {
  const [collapsedRows, setCollapsedRows] = useState<Array<number>>([])
  const hasColumnHeaders = !!columns && columns.length > 0
  const colLength = rows[0].cells.length

  if (colLength > 5) {
    throw new Error('<PricingTierTable /> only supports up to five tiers')
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
    <>
      <div
        className={s.pricingTable}
        style={
          {
            '--col-gap': colLength === 2 ? '34px' : '22px',
          } as React.CSSProperties
        }
      >
        <div className={s.table}>
          <table>
            {hasColumnHeaders && (
              <thead ref={colHeaderRef}>
                <tr>
                  {columns.map((col, colIdx) => (
                    <th
                      key={col}
                      scope="col"
                      colSpan={colIdx === 0 && colLength > 3 ? 2 : 1}
                    >
                      {col.length ? (
                        <div className={s.colHeaderText}>
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
            <tbody ref={tableRef}>
              {rows.map(({ header, cells, isCollapsible }, rowIdx) => {
                const cellIds = cells.map(
                  (cell, idx) => `row-${rowIdx}-cell-${idx}`
                )
                const ariaControls = [...cellIds, `row-${rowIdx}`]
                const rowIsCollapsed = collapsedRows.includes(rowIdx)

                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr key={`row-${rowIdx}`}>
                    <th
                      scope="row"
                      colSpan={colLength > 3 ? 2 : 1}
                      className={s.rowHeader}
                    >
                      {isCollapsible && (
                        <button
                          className={s.icon}
                          aria-controls={ariaControls.join(' ')}
                          aria-expanded="false"
                          aria-label="toggle row content"
                          onClick={() => handleCollapseRow(rowIdx)}
                        >
                          {rowIsCollapsed ? (
                            <IconChevronUp16 />
                          ) : (
                            <IconChevronDown16 />
                          )}
                        </button>
                      )}
                      <div className={s.rowHeaderText}>
                        <div
                          className={s.rowHeading}
                          dangerouslySetInnerHTML={{ __html: header.heading }}
                        />
                        {header.content && (
                          <div
                            id={`row-${rowIdx}`}
                            aria-hidden={rowIsCollapsed}
                            className={s.rowContent}
                            dangerouslySetInnerHTML={{ __html: header.content }}
                          />
                        )}
                      </div>
                    </th>
                    {cells.map((cell, cellIdx) => {
                      return (
                        <td
                          // eslint-disable-next-line react/no-array-index-key
                          key={`row-${rowIdx}-cell-${cellIdx}`}
                          className={s.cell}
                        >
                          {typeof cell == 'boolean' ? (
                            <div className={s.booleanCell}>
                              {!cell ? (
                                <IconXCircle24 color="var(--wpl-neutral-300)" />
                              ) : (
                                <IconCheckCircleFill24 color="var(--wpl-green-500)" />
                              )}
                            </div>
                          ) : (
                            <div>
                              <div
                                className={s.cellHeading}
                                dangerouslySetInnerHTML={{
                                  __html: cell.heading,
                                }}
                              />
                              {cell.content && (
                                <div
                                  id={`row-${rowIdx}-cell-${cellIdx}`}
                                  className={s.cellContent}
                                  aria-hidden={rowIsCollapsed}
                                  dangerouslySetInnerHTML={{
                                    __html: cell.content,
                                  }}
                                />
                              )}
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
    </>
  )
}
