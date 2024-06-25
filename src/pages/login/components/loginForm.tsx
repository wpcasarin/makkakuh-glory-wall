import { valibotResolver } from "@hookform/resolvers/valibot";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import { supabaseClient } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const loginSchema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("Digite seu email."),
    v.email("Digite um email válido.")
  ),
  password: v.pipe(v.string(), v.nonEmpty("Digite sua senha.")),
});

type LoginData = v.InferOutput<typeof loginSchema>;

export const LoginForm = () => {
  const navigate = useNavigate();

  const form = useForm<LoginData>({
    resolver: valibotResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    setError,
    resetField,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (values: LoginData) => {
    // TODO improve error messages
    const { data, error } =
      await supabaseClient.auth.signInWithPassword(values);
    if (error) {
      resetField("password"),
        setError("root.serverError", {
          type: error.name,
          message: error.message,
        });
    }
    if (data.session) navigate("/admin");
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

              {errors.root?.serverError.message && (
                <div
                  className={cn(
                    "flex flex-row items-center rounded-lg border border-destructive px-3 py-3 text-sm text-destructive"
                  )}
                >
                  <ExclamationTriangleIcon className="mr-2 size-4" />
                  {errors.root?.serverError.message}
                </div>
              )}
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                className="flex-grow"
                disabled={
                  (isSubmitting || errors.password || errors.email) && true
                }
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
