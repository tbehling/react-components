const featuresProps = {
  features: {
    type: 'array',
    properties: [
      {
        type: 'object',
        properties: {
          heading: {
            type: 'string',
            required: true,
          },
          footnote: {
            type: 'string',
          },
          content: {
            type: 'object',
            required: true,
            description: 'Tabs or Table. See below',
          },
        },
      },
    ],
  },
  contentRef: {
    type: 'ref',
    description:
      'Passed down to <thead> in the table of the first features section. If within a tab, it will only be applied in the currently active tab',
  },
}

const tabsProps = {
  tabs: {
    type: 'array',
    properties: [
      {
        type: 'object',
        properties: {
          label: {
            type: 'object',
            required: true,
            properties: {
              icon: {
                type: 'React.ReactNode',
                required: true,
                description: 'Icon displayed in tab',
              },
              heading: {
                type: 'string',
                description: 'Tab name',
                required: true,
              },
            },
          },
          content: {
            type: 'object',
            required: true,
            properties: {
              table: {
                type: 'table',
                required: true,
                description: 'See Table Props below',
              },
            },
          },
        },
      },
    ],
  },
}

const tableProps = {
  columns: {
    type: 'array',
    description:
      "Array of strings used for the column headers. If you want the first column header to be blank, use an empty string in the 0 index (['', 'Col 1', 'Col 2']). This is recommended",
  },
  rows: {
    type: 'array',
    required: true,
    properties: [
      {
        type: 'object',
        properties: {
          header: {
            type: 'object',
            required: true,
            properties: {
              heading: {
                type: 'string',
                description: '',
                required: true,
              },
              content: {
                type: 'string',
                description: '',
              },
            },
          },
          isCollapsible: {
            type: 'boolean',
            description: 'Controls collapsibility of row',
            default: false,
          },
          cells: {
            type: 'array',
            description: 'Array of objects or boolean items',
            required: true,
            properties: [
              {
                type: 'TextCell | boolean',
                required: true,
                description:
                  'If boolean, check or x-circle flight icon will be rendered. Otherwise, text will be displayed. See TextCell Props below',
              },
            ],
          },
        },
      },
    ],
  },
}

const textCellProps = {
  heading: {
    type: 'string (html string)',
    required: true,
  },
  content: {
    type: 'string (html string)',
  },
}

module.exports = {
  featuresProps,
  tabsProps,
  tableProps,
  textCellProps,
}
