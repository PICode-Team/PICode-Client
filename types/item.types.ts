import React from 'react'

export interface IItemDefautlProps {
  className?: string
  style?: React.CSSProperties
  children?: JSX.Element
}

export interface IInputProps {
  value: string | string[] | boolean
  label: string
  placeholder?: string
  isPassword?: boolean
  required?: boolean
  optionList?: {
    name: string
    value: string
  }[]
  id?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: () => void
  onClick?: () => void
  onTextAreaChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

type IButtonColor = 'primary' | 'secondary'

export interface IButtonProps {
  text: string
  color?: IButtonColor
  onClick?: (event: React.MouseEvent<HTMLElement> | React.MouseEvent<HTMLButtonElement>) => void
  disable?: boolean
}

type IModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export interface IModalProps {
  size?: IModalSize
  children?: JSX.Element
  modal: boolean
  title: string
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: any
  hidden?: boolean
}

export interface IModalChildProps {
  title?: string
  handleCloseModal: (event: React.MouseEvent<HTMLElement>) => void
  onSubmit?: () => void
  hidden?: boolean
}
