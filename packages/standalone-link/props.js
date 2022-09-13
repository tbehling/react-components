module.exports = {
  appearance: {
    type: 'string',
    description: 'Display on light or dark backgrounds.',
    options: ['light', 'dark'],
  },
  children: {
    description: 'The text that appears inside the link.',
    type: 'string',
    control: { type: 'text' },
    testValue: 'Call-to-action',
    required: true,
  },
  href: {
    description: 'The url destination.',
    type: 'string',
    required: true,
  },
  variant: {
    description: 'The link color.',
    type: 'string',
    options: ['primary', 'secondary', 'tertiary'],
    required: false,
  },
  onClick: {
    description:
      'Optional onClick handler which is called when the link is clicked.',
    type: 'function',
    require: false,
  },
}
