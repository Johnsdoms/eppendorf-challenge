"use client"
import { NameForm } from "@/components/nameForm"
import { CredentialsForm, CredentialsSubmitPayload } from "@/components/credentialsForm"
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

    function handleCredentialsSubmit(submittedCredentials: CredentialsSubmitPayload) {
      setNewUser({ ...newUser, ...submittedCredentials });
    }

    function handleBackClick() {
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
                    {formStep === 0 && <NameForm onNameSubmit={handleNameSubmit} />}
                    {formStep === 1  && <CredentialsForm onCredentialsSubmit={handleCredentialsSubmit} onBackClick={handleBackClick} />}
                    </CardContent>
                </Card>
            </main>
        </div>
       
    )
}