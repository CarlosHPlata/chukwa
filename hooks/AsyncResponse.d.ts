export type AsyncAction = {
  isLoading: boolean,
  error?: string
}

export type AsyncResponse<T> = AsyncAction & {
  data?: T,
}
