import React from 'react'
import styled from 'styled-components'

interface CheckboxProps {
  isChecked: boolean;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox = ({isChecked, label, onChange}: CheckboxProps) => (
  <>
    <StyledCheckbox 
      type="checkbox"
      name={label}
      id={label}
      checked={isChecked}
      onChange={onChange}
    />
    <label htmlFor={label}>{label}</label>
  </>
)

export default Checkbox

const StyledCheckbox = styled.input`
`