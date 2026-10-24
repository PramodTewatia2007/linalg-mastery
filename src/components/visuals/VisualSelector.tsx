import React from 'react';
import { Vector3DVisualizer } from './Vector3DVisualizer';
import { Subspace3DVisualizer } from './Subspace3DVisualizer';
import { BasisDimension3DVisualizer } from './BasisDimension3DVisualizer';
import { Transformation3DVisualizer } from './Transformation3DVisualizer';
import { BilinearFormVisualizer } from './BilinearFormVisualizer';
import { Coordinate2DVisualizer } from './Coordinate2DVisualizer';
import { Topic } from '../../types';

interface VisualSelectorProps {
  topic: Topic;
}

export const VisualSelector: React.FC<VisualSelectorProps> = ({ topic }) => {
  switch (topic.visualType) {
    case 'vectors':
      return <Vector3DVisualizer />;
    case 'subspaces':
      return <Subspace3DVisualizer />;
    case 'basis':
      return <BasisDimension3DVisualizer />;
    case 'transformations':
    case 'matrix-rep':
    case 'transpose':
    case 'canonical-forms':
      return <Transformation3DVisualizer />;
    case 'dual-space':
    case 'adjoints':
      return <Coordinate2DVisualizer />;
    case 'bilinear-forms':
    case 'quadratic-forms':
    case 'skew-symmetric':
      return <BilinearFormVisualizer />;
    default:
      return <Vector3DVisualizer />;
  }
};
