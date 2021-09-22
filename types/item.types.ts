import React from 'react'

export interface IItemDefautlProps {
  className?: string
  style?: React.CSSProperties
}

export interface IInputProps {
  value: string | boolean
  label: string
  placeholder?: string
  isPassword?: boolean
  optionList?: {
    name: string
    value: string
  }[]
  onChange?: () => void
}

type IButtonColor = 'primary' | 'secondary'

export interface IButtonProps {
  text: string
  color?: IButtonColor
  onClick?: (event: React.MouseEvent<HTMLElement> | React.MouseEvent<HTMLButtonElement>) => void
}

type IModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export interface IModalProps {
  size?: IModalSize
  children?: JSX.Element
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: () => void
}
