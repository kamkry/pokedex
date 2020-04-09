import React from 'react';
import styled from 'styled-components';
import sun from 'assets/sun.png';
import moon from 'assets/moon.png';

const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.background};
  cursor: pointer;

  opacity: 1;
  :hover {
    opacity: 0.5;
  }
  :focus {
    opacity: 0.2;
    outline: azure;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
`;

const Icon = styled.img<{ show: boolean }>`
  left: -2.3rem;
  top: -2.3rem;
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transform: scale(0.7);
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

interface ThemeSwitchProps {
  checked: boolean;
  toggle: () => void;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ checked, toggle }) => {
  return (
    <div style={{ margin: '1rem' }}>
      <CheckBoxWrapper>
        <Icon src={moon} alt="" show={!checked} />
        <Icon src={sun} alt="" show={checked} />
        <CheckBox
          id="checkbox"
          type="checkbox"
          checked={checked}
          onChange={toggle}
        />
        <CheckBoxLabel htmlFor="checkbox" />
      </CheckBoxWrapper>
    </div>
  );
};

export default ThemeSwitch;
