import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { usersApi } from "../../../../lib/api/users";
import type { User } from "../../../../types/user";

export function RemoveUserButton({ user }: { user: User }) {
  const queryClient = useQueryClient();

  const removeUserMutation = useMutation({
    mutationFn: () => usersApi.remove(user.id),
    onSuccess: () => {
      toast.success("Usuário removido com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Erro ao remover usuário. Tente novamente.");
    },
  });

  const handle = async () => {
    removeUserMutation.mutate();
  };

  return (
    <button
      className="bg-red-800 text-white px-3 py-1 rounded hover:bg-red-700 transition border border-red-900"
      onClick={handle}
    >
      Excluir
    </button>
  );
}
