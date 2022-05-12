import React from 'react';

import * as S from './styles';

// import { Container } from './styles';

const Button: React.FC = (): JSX.Element => {
  return (
    <S.Container>
      <S.TitleButton>Button</S.TitleButton>
    </S.Container>
  );
};

export default Button;
