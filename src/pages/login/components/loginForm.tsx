import { valibotResolver } from "@hookform/resolvers/valibot";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import * as v from "valibot";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const loginSchema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("Digite seu email."),
    v.email("Digite um email valido.")
  ),
  password: v.pipe(v.string(), v.nonEmpty("Digite sua senha.")),
});

type LoginData = v.InferOutput<typeof loginSchema>;

export const LoginForm = () => {
  const form = useForm<LoginData>({
    resolver: valibotResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { errors, isSubmitting },
  } = form;

  // TODO implement sign in
  const onSubmit = async (values: LoginData) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
        console.log(values);
      }, 2000);
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Entrar</CardTitle>
              <CardDescription>Entre com seu email e senha.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="flex-grow"
                disabled={isSubmitting || Object.keys(errors).length > 0}
              >
                {isSubmitting ? (
                  <>
                    <ReloadIcon className="mr-2 size-4 animate-spin" />
                    Enviando
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};
