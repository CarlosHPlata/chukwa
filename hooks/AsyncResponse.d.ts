export type AsyncAction = {
  isLoading: boolean,
  error?: string
}

export type AsyncResponse<T> = AsyncAction & {
  data?: T,
}

export type AsyncCallback<T extends unknown[] = []> = AyncAction & {
  callback: (...args: T) => void,
}
