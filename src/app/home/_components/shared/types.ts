import { SettingsPopoverProps } from "./settings.popover"
import { Dataset } from "../../_lib"

export type FormValues<
  T extends Record<string, string>,
  K extends keyof T,
> = Parameters<SettingsPopoverProps<T, K>["onSubmit"]>[number]

export type RefetchFnContext = {
  today: Date
}

export type RefetchFn<T extends Record<string, string>, K extends keyof T> = (
  context: RefetchFnContext,
  values: FormValues<T, K>,
) => Promise<Dataset<T[K]>>
