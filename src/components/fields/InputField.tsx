import { HTMLInputTypeAttribute } from "react"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type TInputFieldProps = {
  form: any
  label?: string
  name: string
  type: HTMLInputTypeAttribute
  placeholder?: string
}

export function InputField({
  form,
  name,
  label,
  placeholder,
  type = "text",
}: TInputFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-medium text-zinc-950 text-sm">
            {label}
          </FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
