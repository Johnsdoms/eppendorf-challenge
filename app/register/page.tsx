import { RegisterForm } from "@/components/registerForm"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  
export default function Register() {
    return (
        <div className="flex items-center min-h-screen min-w-full">
            <main className="w-2/4 m-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome!</CardTitle>
                        <CardDescription>To continue to the app, please register:</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <RegisterForm />
                    </CardContent>
                </Card>
            </main>
        </div>
       
    )
}