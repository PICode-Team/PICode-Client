type IMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface IFetchData {
  method: IMethodType
  body?: string
  headers: { [key: string]: string }
}

export async function fetchSet(url: string, method: IMethodType, headers: boolean, body?: string | any) {
  const fetchOption: IFetchData = {
    method: method,
    headers:
      headers === true
        ? {
            'Content-Type': 'application/json',
          }
        : {},
    body: body,
  }

  return await fetch(`/api${url}`, fetchOption)
}
