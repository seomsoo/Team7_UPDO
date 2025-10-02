import React, { useEffect, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta = {
  title: 'Design System/Tokens/Colors',
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj;

type SolidToken = { label: string; varName: string };
type GradientToken = { label: string; className: string };

function useComputedColor(cssVar: string) {
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    const el = document.createElement('div');
    el.style.setProperty('background', `var(${cssVar})`);
    document.body.appendChild(el);
    const bg = getComputedStyle(el).backgroundColor;
    document.body.removeChild(el);
    setValue(bg);
  }, [cssVar]);
  return value;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="space-y-4">
    <h3 className="section-title">{title}</h3>
    {children}
  </section>
);

const Swatch: React.FC<{ token: SolidToken }> = ({ token }) => {
  const computed = useComputedColor(token.varName);
  return (
    <div className="space-y-2">
      <div
        className="w-full h-16 rounded-md border border-[color:var(--color-gray-200)]"
        style={{ background: `var(${token.varName})` }}
      />
      <div className="caption text-[var(--color-secondary)]">{token.label}</div>
      <div className="caption text-[var(--color-gray-600)]">{token.varName}</div>
      <div className="caption text-[var(--color-gray-500)]">{computed}</div>
    </div>
  );
};

const GradSwatch: React.FC<{ token: GradientToken }> = ({ token }) => (
  <div className="space-y-2">
    <div
      className={`w-full h-16 rounded-md border border-[color:var(--color-gray-200)] ${token.className}`}
    />
    <div className="caption text-[var(--color-secondary)]">{token.label}</div>
    <div className="caption text-[var(--color-gray-600)]">{token.className}</div>
  </div>
);

export const All: Story = {
  render: () => {
    const brand = [
      { label: 'Purple 50', varName: '--color-purple-50' },
      { label: 'Purple 100', varName: '--color-purple-100' },
      { label: 'Purple 150', varName: '--color-purple-150' },
      { label: 'Purple 200', varName: '--color-purple-200' },
      { label: 'Purple 250', varName: '--color-purple-250' },
      { label: 'Purple 300', varName: '--color-purple-300' },
      { label: 'Purple 350', varName: '--color-purple-350' },
      { label: 'Purple 400', varName: '--color-purple-400' },
      { label: 'Purple 450', varName: '--color-purple-450' },
      { label: 'Purple 500', varName: '--color-purple-500' },
      { label: 'Purple 550', varName: '--color-purple-550' },
      { label: 'Purple 600', varName: '--color-purple-600' },
      { label: 'Purple 650', varName: '--color-purple-650' },
      { label: 'Purple 700', varName: '--color-purple-700' },
    ] satisfies SolidToken[];

    const accents = [
      { label: 'Mint 100', varName: '--color-mint-100' },
      { label: 'Mint 500', varName: '--color-mint-500' },
      { label: 'Mint 600', varName: '--color-mint-600' },
      { label: 'Pink 100', varName: '--color-pink-100' },
      { label: 'Pink 500', varName: '--color-pink-500' },
      { label: 'Pink 600', varName: '--color-pink-600' },
      { label: 'Yellow 100', varName: '--color-yellow-100' },
      { label: 'Yellow 500', varName: '--color-yellow-500' },
      { label: 'Yellow 600', varName: '--color-yellow-600' },
      { label: 'Blue 100', varName: '--color-blue-100' },
      { label: 'Blue 500', varName: '--color-blue-500' },
      { label: 'Blue 600', varName: '--color-blue-600' },
    ] satisfies SolidToken[];

    const gray = [
      { label: 'Gray 50', varName: '--color-gray-50' },
      { label: 'Gray 100', varName: '--color-gray-100' },
      { label: 'Gray 200', varName: '--color-gray-200' },
      { label: 'Gray 300', varName: '--color-gray-300' },
      { label: 'Gray 400', varName: '--color-gray-400' },
      { label: 'Gray 500', varName: '--color-gray-500' },
      { label: 'Gray 600', varName: '--color-gray-600' },
      { label: 'Gray 700', varName: '--color-gray-700' },
      { label: 'Gray 800', varName: '--color-gray-800' },
      { label: 'Gray 900', varName: '--color-gray-900' },
    ] satisfies SolidToken[];

    const status: SolidToken[] = [{ label: 'Red 500', varName: '--color-red-500' }];

    const surfaces: SolidToken[] = [
      { label: 'Canvas', varName: '--canvas' },
      { label: 'Surface', varName: '--surface' },
    ];

    const semantic: SolidToken[] = [
      { label: 'Text / Body', varName: '--color-body' },
      { label: 'Text / Subtle', varName: '--color-subtle' },
      { label: 'Text / Secondary', varName: '--color-secondary' },
      { label: 'Disabled / BG', varName: '--color-disabled-1' },
      { label: 'Disabled / Text', varName: '--color-disabled-2' },
      { label: 'Disabled / Control', varName: '--color-disabled-3' },
      { label: 'Primary', varName: '--color-primary' },
      { label: 'Primary Hover', varName: '--color-primary-hover' },
      { label: 'Primary Active', varName: '--color-primary-active' },
    ];

    const gradients: GradientToken[] = [
      { label: 'grad-100', className: 'bg-grad-100' },
      { label: 'grad-500', className: 'bg-grad-500' },
      { label: 'grad-600a', className: 'bg-grad-600a' },
      { label: 'grad-600b', className: 'bg-grad-600b' },
      { label: 'grad-600c', className: 'bg-grad-600c' },
    ];

    return (
      <main className="p-8 space-y-10 bg-canvas">
        <Section title="Brand (Purple)">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {brand.map(t => (
              <Swatch key={t.varName} token={t} />
            ))}
          </div>
        </Section>

        <Section title="Accents (Mint / Pink / Yellow / Blue)">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {accents.map(t => (
              <Swatch key={t.varName} token={t} />
            ))}
          </div>
        </Section>

        <Section title="Grayscale">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {gray.map(t => (
              <Swatch key={t.varName} token={t} />
            ))}
          </div>
        </Section>

        <Section title="Semantic / Status">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {semantic.map(t => (
              <Swatch key={t.varName} token={t} />
            ))}
            {status.map(t => (
              <Swatch key={t.varName} token={t} />
            ))}
          </div>
        </Section>

        <Section title="Surfaces">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {surfaces.map(t => (
              <Swatch key={t.varName} token={t} />
            ))}
          </div>
        </Section>

        <Section title="Gradients">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {gradients.map(t => (
              <GradSwatch key={t.className} token={t} />
            ))}
          </div>
        </Section>
      </main>
    );
  },
};
