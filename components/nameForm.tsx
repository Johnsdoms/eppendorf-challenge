"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const UserNameFormSchema = z.object({
  username: z.string().trim().min(2, {
    message: "Name too short. Must be at least 2 characters long.",
  }),
})

export function NameForm({onNameSubmit}: { onNameSubmit: (name: string) => void }) {
  const form = useForm<z.infer<typeof UserNameFormSchema>>({
    resolver: zodResolver(UserNameFormSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(data: z.infer<typeof UserNameFormSchema>) {
    onNameSubmit(data.username);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Jonas" {...field} />
              </FormControl>
              <FormDescription>
                Pick a name that is at least 2 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row-reverse">
          <Button className="min-w-28" type="submit" disabled={!form.formState.isValid}>Next</Button>
        </div>
      </form>
    </Form>
  )
}
