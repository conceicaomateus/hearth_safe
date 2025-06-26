import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { usersApi } from "../../../../lib/api/users";

const userSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type UserFormData = z.infer<typeof userSchema>;

export function NewUser() {
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const createUserMutation = useMutation({
    mutationFn: (data: UserFormData) => usersApi.create(data),
    onSuccess: () => {
      toast.success("Usuário criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setShowModal(false);
    },
    onError: () => {
      toast.error("Erro ao criar usuário. Tente novamente.");
    },
  });

  const onSubmit = (data: UserFormData) => {
    createUserMutation.mutate(data);
  };

  return (
    <>
      <button
        className="bg-blue-600 text-white rounded px-4 py-2 font-semibold shadow hover:bg-blue-700 transition"
        onClick={() => setShowModal(true)}
      >
        Novo Usuário
      </button>

      {/* Modal de novo usuário */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-40 z-50">
          <div className="bg-gray-800 rounded-xl p-8 w-full max-w-md relative border border-gray-700 shadow-2xl">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-2">Adicionar Novo Usuário</h3>
            <p className="mb-4 text-gray-400 text-sm">
              Preencha os dados abaixo para criar um novo usuário.
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                placeholder="Nome completo"
                className="rounded bg-gray-900 border border-gray-700 px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                {...register("name")}
              />
              <input
                type="email"
                placeholder="email@exemplo.com"
                className="rounded bg-gray-900 border border-gray-700 px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                {...register("email")}
              />
              <input
                type="password"
                placeholder="Senha"
                className="rounded bg-gray-900 border border-gray-700 px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                {...register("password")}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 font-semibold shadow hover:bg-blue-700 mt-2 transition"
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
