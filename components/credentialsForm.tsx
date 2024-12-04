"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"

export interface CredentialsSubmitPayload {
    email: string;
    password: string;
}

interface CredentialsFormProps {
  onCredentialsSubmit: (credentials: CredentialsSubmitPayload) => void;
  onBackClick: () => void;
}


// at least one uppercase letter, one lowercase letter, one number and one special character
const passwordComplexityValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d@$!%*?&]+$/
);

const CredentialsFormSchema = z.object({
  email: z.string().min(1, { message: "Required"}).email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" })
    .regex(passwordComplexityValidation, { 
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    }),
  confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "The passwords must match.",
    path: ["confirmPassword"], // This sets which field the error is attached to
  });

export function CredentialsForm({ onCredentialsSubmit, onBackClick }: CredentialsFormProps) {  
  const form = useForm<z.infer<typeof CredentialsFormSchema>>({
    resolver: zodResolver(CredentialsFormSchema),
    defaultValues: {
        email: "",
        password: "",
        confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof CredentialsFormSchema>) {
    onCredentialsSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="e.g. me@me.com" {...field} />
              </FormControl>
              <FormDescription>
                Enter a valid email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Check password requirements
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="pl-1 underline"> here</TooltipTrigger>
                      <TooltipContent>
                        <p>Password must fullfill following criteria:</p>
                        <ul className="list-disc ps-4">
                          <li>At least 8 characters long</li>
                          <li>At least one lowecase character</li>
                          <li>At least one uppercase character</li>
                          <li>At least one special character</li>
                          <li>At least one number</li>
                        </ul>
                      </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues().password && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>
                  Reenter password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex flex-row-reverse gap-4">
          <Button className="min-w-28" type="submit">Register</Button>
          <Button variant="outline" onClick={onBackClick}>
            <ChevronLeft /> Previous
          </Button>
        </div>
      </form>
    </Form>
  )
}
