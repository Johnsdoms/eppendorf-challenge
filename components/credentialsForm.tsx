"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { ChevronLeft, Eye, EyeOff } from "lucide-react"
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
import { useState } from "react"

export interface Credentials {
    email: string;
    password: string;
}


interface CredentialsFormProps {
  credentialsInitialValue: Credentials;
  onCredentialsSubmit: (credentials: Credentials) => void;
  onBackClick: (savedCredentials: Partial<Credentials>) => void;
}

const PasswordSchema = z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/\d/, { message: 'Password must contain at least one number.' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {message: "Password must contain at least one special character."});

const CredentialsFormSchema = z.object({
  email: z.string().min(1, { message: "Required"}).email({ message: "Invalid email address." }),
  password: PasswordSchema,
  });

export function CredentialsForm({ credentialsInitialValue, onCredentialsSubmit, onBackClick }: CredentialsFormProps) {  
  const form = useForm<z.infer<typeof CredentialsFormSchema>>({
    mode: "onTouched",
    resolver: zodResolver(CredentialsFormSchema),
    defaultValues: {
        email: credentialsInitialValue.email ?? "",
        password: credentialsInitialValue.password ?? "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
 };

  function onSubmit(data: z.infer<typeof CredentialsFormSchema>) {
    onCredentialsSubmit(data);
  }

  function handleBackClick() {
    const dirtyFields = Object.keys(form.formState.dirtyFields) as Array<keyof Credentials>;
    
    const validDirtyFields: Partial<Credentials> = {};

    dirtyFields.forEach((field) =>  {
      // if field is dirty but has error, do not save input
      if (!!form.formState.errors[field]) {
        return;
      }

      validDirtyFields[field] =  form.getValues(field);
    });

    onBackClick(validDirtyFields);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Email</FormLabel>
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
              <FormLabel className="font-bold">Password</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input type={showPassword ? "text" : "password"} {...field} />
                    <Toggle variant="outline" onClick={toggleShowPassword}>
                      {!showPassword ? <Eye /> : <EyeOff />}
                    </Toggle>
                  </div>
                </FormControl>
              <FormDescription>
                Check password requirements
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="pl-1 underline">here</TooltipTrigger>
                      <TooltipContent>
                        <p>Password must fullfill following criteria:</p>
                        <ul className="list-disc ps-4">
                          <li>At least 8 characters long</li>
                          <li>At least one lowercase character</li>
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
        <div className="flex flex-row-reverse gap-4">
          <Button className="min-w-28" type="submit" disabled={!form.formState.isValid}>Register</Button>
          <Button variant="outline" onClick={handleBackClick}>
            <ChevronLeft /> Previous
          </Button>
        </div>
      </form>
    </Form>
  )
}
