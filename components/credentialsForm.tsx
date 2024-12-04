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

export interface Credentials {
    email: string;
    password: string;
}

export interface CredentialsInitialValue extends Credentials {
  matchingPasswordConfirmed: boolean
}

interface CredentialsFormProps {
  credentialsInitialValue: CredentialsInitialValue;
  onCredentialsSubmit: (credentials: Credentials) => void;
  onBackClick: (savedCredentials: Partial<CredentialsInitialValue>) => void;
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

export function CredentialsForm({ credentialsInitialValue, onCredentialsSubmit, onBackClick }: CredentialsFormProps) {  
  const form = useForm<z.infer<typeof CredentialsFormSchema>>({
    mode: "onTouched",
    resolver: zodResolver(CredentialsFormSchema),
    defaultValues: {
        email: credentialsInitialValue.email ?? "",
        password: credentialsInitialValue.password ?? "",
        confirmPassword: credentialsInitialValue.matchingPasswordConfirmed ?  credentialsInitialValue.password : "",
    },
  });

  function onSubmit(data: z.infer<typeof CredentialsFormSchema>) {
    onCredentialsSubmit(data);
  }

  function handleBackClick() {
    const dirtyFields = Object.keys(form.formState.dirtyFields) as Array<keyof Credentials | "confirmPassword">;
    
    const validDirtyFields: Partial<CredentialsInitialValue> = {};

    dirtyFields.forEach((field) =>  {
      // if field is dirty but has error, do not save input
      if (!!form.formState.errors[field]) {
        return;
      }

      if (field === "confirmPassword") {
        // only set matchingPasswordConfirmed to true if password is valid
        if (!form.formState.errors.password) {
          validDirtyFields.matchingPasswordConfirmed = true;
        }
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
                <Input type="password" {...field} />
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
        {form.getValues().password && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Confirm Password</FormLabel>
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
          <Button className="min-w-28" type="submit" disabled={!form.formState.isValid}>Register</Button>
          <Button variant="outline" onClick={handleBackClick}>
            <ChevronLeft /> Previous
          </Button>
        </div>
      </form>
    </Form>
  )
}
