import { css } from '@emotion/react';

export const flexBox = (
  direction = 'row',
  justify = 'center',
  align = 'center'
) => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
`;

export const absoluteCenter = () => css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
