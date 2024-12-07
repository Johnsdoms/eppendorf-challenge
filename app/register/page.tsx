"use client"
import { NameForm } from "@/components/nameForm"
import { CredentialsForm } from "@/components/credentialsForm"
import type { Credentials } from "@/components/credentialsForm"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useMemo, useState } from "react";

interface RegisterUserState {
    username: string;
    email: string;
    password: string;
  }
  
export default function Register() {
  const [formStep, setFormStep] = useState<1 | 0>(0);

    const [newUser, setNewUser] = useState<RegisterUserState>({
        username: "",
        email: "",
        password: "",
    });

    function handleNameSubmit(submittedName: string ) {
        setNewUser({ ...newUser, username: submittedName });
        setFormStep(1);
    }

    function handleCredentialsSubmit(submittedCredentials: Credentials) {
      setNewUser({ ...newUser, ...submittedCredentials });
    }

    function handleBackClick(savedCredentials: Partial<Credentials>) {
        setNewUser({ ...newUser, ...savedCredentials });
        setFormStep(0);
    }

    const cardTitle = useMemo(() => {
        if (!newUser.username) {
          return "Welcome!";
        } else {
            return `Welcome ${newUser.username}! 👋`;
        }
      }, [newUser.username]);

    console.log("newUser", newUser)

    return (
        <div className="flex items-center min-h-screen min-w-full">
            <main className="w-2/4 m-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>{cardTitle}</CardTitle>
                        <CardDescription>To continue to the app, please register:</CardDescription>
                    </CardHeader>
                    <CardContent>
                    {formStep === 0 && <NameForm nameInitialValue={newUser.username} onNameSubmit={handleNameSubmit} />}
                    {formStep === 1  && 
                      <CredentialsForm 
                        credentialsInitialValue={{email: newUser.email, password: newUser.password}} 
                        onCredentialsSubmit={handleCredentialsSubmit} 
                        onBackClick={handleBackClick} />}
                    </CardContent>
                </Card>
            </main>
        </div>
       
    )
}