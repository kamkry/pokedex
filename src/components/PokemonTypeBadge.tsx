import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const Badge = styled.img`
  image-rendering: pixelated;
  transform: scale(1.75);
  padding: 0 1.5rem;
`;
interface PokemonTypeBadgeProps {
  name: string;
}

const PokemonTypeBadge: React.FC<PokemonTypeBadgeProps> = ({ name }) => {
  const [image, setImage] = useState();

  const loadImage = useCallback(async () => {
    const { default: img } = await import(`assets/types/${name}.png`);
    setImage(img);
  }, [name]);

  useEffect(() => {
    loadImage();
  }, [loadImage]);
  return <Badge src={image} alt={name} title={name} />;
};

export default PokemonTypeBadge;
