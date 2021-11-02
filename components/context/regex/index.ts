export const emailRegex = new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i)
export const pwRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)

export const domainURLRegex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
export const mentionRegex = /<(\/picode-mention|picode-mention)([^>]*)>/gi
export const imageRegex = /<img((\n|\r|.)*?)>/gim
export const trimRegex = /(src=|")/gi
export const allTagRegex = /(<([^>]+)>)/gi

export const fontTagRegex = /(<([^>]+)>)/gi

export const bTagRegex = /<(\/b|b)([^>]*)>/gi
export const iTagRegex = /<(\/i|i)([^>]*)>/gi
export const sTagRegex = /<(\/s|s)([^>]*)>/gi
