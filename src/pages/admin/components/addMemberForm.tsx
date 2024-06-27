import { valibotResolver } from "@hookform/resolvers/valibot";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import * as v from "valibot";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@components/ui";
import { supabaseClient } from "@lib/supabase";
import { cn } from "@lib/utils";

const addMemberSchema = v.object({
  name: v.pipe(
    v.string(),
    v.nonEmpty("Não pode estar vazio."),
    v.minLength(3, "Nome deve conter 3 caracteres ou mais.")
  ),
  description: v.pipe(
    v.string(),
    v.nonEmpty("Não pode estar vazio."),
    v.minLength(10, "Descrição deve conter 10 caracteres ou mais.")
  ),
  picture_url: v.optional(v.string()),
  rank: v.string(),
  file: v.pipe(
    v.instance(FileList),
    v.check((input) => input.length > 0, "Selecione uma imagem.")
  ),
});

type AddMemberData = v.InferOutput<typeof addMemberSchema>;

const AddMemberForm = () => {
  const form = useForm<AddMemberData>({
    resolver: valibotResolver(addMemberSchema),
    defaultValues: {
      name: "",
      description: "",
      picture_url: "",
      rank: "1",
    },
  });

  const {
    setError,
    formState: { errors, isSubmitting },
  } = form;
  // TODO improve feedback
  const onSubmit = async (formData: AddMemberData) => {
    const { file, ...values } = formData;
    const pic = file[0];
    // validation
    const allowedTypes = ["image/jpeg"];
    const maxSize = 256 * 1024;

    if (!allowedTypes.includes(pic.type)) {
      setError("file", { type: "mime", message: "Apenas arquivos .jpeg" });
      return;
    }
    if (pic.size > maxSize) {
      setError("file", {
        type: "size",
        message: "Tamanho máximo permitido: 256kB",
      });
      return;
    }

    const imgName = `${nanoid()}.jpeg`;

    const { error } = await supabaseClient.storage
      .from("pictures")
      .upload(imgName, pic);
    if (error) {
      setError("file", { type: error.name, message: error.message });
      return;
    }
    const { data } = supabaseClient.storage
      .from("pictures")
      .getPublicUrl(imgName);
    values.picture_url = data.publicUrl;
    {
      const { error } = await supabaseClient.from("tb_members").insert(values);

      if (error) {
        setError("root.serverError", {
          type: error.name,
          message: error.message,
        });
        return;
      }
    }
    form.reset();
    alert("SUCESSO");
  };
  const fileRef = form.register("file");

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Adicionar membro</CardTitle>
              <CardDescription>Preencha os campos abaixo.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea {...field}></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patente</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Kosho</SelectItem>
                        <SelectItem value="1">Bushi</SelectItem>
                        <SelectItem value="2">Tozama</SelectItem>
                        <SelectItem value="3">Jozai</SelectItem>
                        <SelectItem value="4">Shinpan</SelectItem>
                        <SelectItem value="5">Dai Shinpan 1</SelectItem>
                        <SelectItem value="6">Dai Shinpan 2</SelectItem>
                        <SelectItem value="7">Dai Shinpan 3</SelectItem>
                        <SelectItem value="8">Dai Shinpan 4</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormLabel>Foto</FormLabel>
                    <FormControl>
                      <Input
                        id="file"
                        type="file"
                        placeholder="Selecione uma imagem"
                        {...fileRef}
                      />
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
                  (isSubmitting || errors.name || errors.description) && true
                }
              >
                {isSubmitting ? (
                  <>
                    <ReloadIcon className="mr-2 size-4 animate-spin" />
                    Enviando
                  </>
                ) : (
                  "Finalizar"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};

export { AddMemberForm };
