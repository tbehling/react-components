module.exports = {
  icon: {
    type: 'element',
    description: 'Flight Icon as React element',
  },
  title: {
    type: 'string',
    required: true,
    description: 'Tier name',
  },
  label: {
    type: 'string',
    required: true,
    description: 'Pricing information',
  },
  price: {
    type: 'string',
    required: true,
    description: 'Price detail',
  },
  consumption: {
    type: 'string',
    description: 'Consumption detail',
  },
  description: {
    type: 'string',
    required: true,
    description: 'Detailed description of tier',
  },
  cta: {
    type: 'object',
    description: 'Button or text link call to action',
    properties: {
      url: {
        type: 'string',
        required: true,
      },
      title: {
        type: 'string',
        required: true,
      },
      type: {
        type: 'string',
        options: ['button', 'textLink'],
        default: 'textLink',
      },
      theme: {
        type: 'object',
        properties: {
          variant: {
            type: 'string',
            options: ['primary', 'secondary'],
            default: 'primary',
          },
        },
      },
    },
  },
  supplementaryInfo: {
    type: 'string',
    description: 'Small footer',
  },
  size: {
    type: 'string',
    options: ['xs', 'sm'],
    description:
      'If rendered within a TierCardList, font sizes depend on the amount of cards in list',
    default: 'sm',
  },
}
