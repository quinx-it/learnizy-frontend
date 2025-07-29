import { Heading, Text } from '@/shared/ui/typography';
import React from 'react';

export const HomePage = () => {
  return (
    <React.Fragment>
      {/* text */}
      <div className="space-y-2 bg">
        <Text variant="s">Text: s (12 / 16 / medium)</Text>
        <Text variant="s-bold">Text: s-bold (12 / 14 / bold)</Text>

        <Text variant="m">Text: m (16 / 22 / medium)</Text>
        <Text variant="m-bold">Text: m-bold (16 / 18 / bold)</Text>

        <Text variant="l">Text: l (20 / 27 / medium)</Text>
        <Text variant="l-bold">Text: l-bold (20 / 22 / bold)</Text>
      </div>

      {/* HEADING VARIANTS */}
      <div className="space-y-2">
        <Heading variant="xl">Heading: xl</Heading>
        <Heading variant="2xl">Heading: 2xl</Heading>
        <Heading variant="3xl">Heading: 3xl</Heading>
        <Heading variant="4xl">Heading: 4xl</Heading>
        <Heading variant="5xl">Heading: 5xl</Heading>
        <Heading variant="6xl">Heading: 6xl</Heading>
        <Heading variant="7xl">Heading: 7xl</Heading>

        <Heading variant="xl-bold">Heading: xl-bold</Heading>
        <Heading variant="2xl-bold">Heading: 2xl-bold</Heading>
        <Heading variant="3xl-bold">Heading: 3xl-bold</Heading>
        <Heading variant="4xl-bold">Heading: 4xl-bold</Heading>
        <Heading variant="5xl-bold">Heading: 5xl-bold</Heading>
        <Heading variant="6xl-bold">Heading: 6xl-bold</Heading>
        <Heading variant="7xl-bold">Heading: 7xl-bold</Heading>
      </div>
    </React.Fragment>
  );
};
