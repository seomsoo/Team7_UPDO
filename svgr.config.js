/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('@svgr/core').Config} */
module.exports = {
  typescript: true,
  // IMPORTANT: disable icon transform so SVGR doesn't force width/height="1em"
  icon: false,
  ref: false,
  titleProp: false,
  expandProps: 'end',
  svgProps: { role: 'img' },

  // Normalize solid colors to currentColor (optional)
  replaceAttrValues: {
    '#000': 'currentColor',
    '#000000': 'currentColor',
    '#fff': 'currentColor',
    '#FFFFFF': 'currentColor',
  },

  prettier: false,

  template(variables, { tpl }) {
    const t = require('@babel/types');
    const { componentName, jsx } = variables;

    jsx.openingElement.attributes = jsx.openingElement.attributes.filter(
      attr =>
        !(
          t.isJSXAttribute(attr) &&
          t.isJSXIdentifier(attr.name) &&
          (attr.name.name === 'width' || attr.name.name === 'height')
        ),
    );

    jsx.openingElement.attributes = [
      t.jSXSpreadAttribute(t.identifier('props')),
      t.jSXAttribute(t.jSXIdentifier('width'), t.jSXExpressionContainer(t.identifier('size'))),
      t.jSXAttribute(t.jSXIdentifier('height'), t.jSXExpressionContainer(t.identifier('size'))),
      ...jsx.openingElement.attributes,
    ];

    return tpl`
      import * as React from 'react';
      import type { SVGProps } from 'react';

      export type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

      const ${componentName} = ({ size = 24, ...props }: IconProps) => (
        ${jsx}
      );

      export default ${componentName};
    `;
  },
};
