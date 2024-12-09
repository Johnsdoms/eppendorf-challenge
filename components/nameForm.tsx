"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UserNameFormSchema = z.object({
  username: z.string().trim().min(2, {
    message: "Name too short. Must be at least 2 characters long.",
  }),
});

interface NameFormProps {
  nameInitialValue: string
  onNameSubmit: (name: string) => void
}

export function NameForm({ nameInitialValue, onNameSubmit }: NameFormProps) {
  const form = useForm<z.infer<typeof UserNameFormSchema>>({
    mode: "onTouched",
    resolver: zodResolver(UserNameFormSchema),
    defaultValues: {
      username: nameInitialValue ?? "",
    },
  });

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
              <FormLabel className="font-bold">Name</FormLabel>
              <FormControl>
                <Input
                  className={`${!!form.formState.errors.username && "border-red-400 border-2"}`}
                  placeholder="e.g. Jonas"
                  autoComplete="name"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Pick a name that is at least 2 characters long.
              </FormDescription>
              <FormMessage data-test-id="name-message" />
            </FormItem>
          )}
        />
        <div className="flex flex-row-reverse">
          <Button className="min-w-28" type="submit" disabled={!form.formState.isValid}>Next</Button>
        </div>
      </form>
    </Form>
  );
}
