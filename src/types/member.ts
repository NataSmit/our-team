export type Member = {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}

export type ServerData = {
  data: Member[],
  total: number
}

export type ServerError = null | string | undefined;