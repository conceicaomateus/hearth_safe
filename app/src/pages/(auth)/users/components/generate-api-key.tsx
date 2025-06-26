import { toast } from "react-toastify";
import { usersApi } from "../../../../lib/api/users";
import type { User } from "../../../../types/user";

export function GenerateApiKeyButton({ user }: { user: User }) {
  const generate = async () => {
    try {
      console.log("Gerando API Key para o usuário:", user.id);

      const apiKey = await usersApi.generateApiKey(user.id);
      navigator.clipboard.writeText(apiKey);
      toast.success("API Key gerada e copiada para a área de transferência!");
    } catch {
      toast.error("Erro ao gerar API Key. Tente novamente.");
    }
  };

  return (
    <button
      className="bg-gray-700 text-gray-100 px-3 py-1 rounded hover:bg-gray-600 transition border border-gray-600"
      onClick={generate}
    >
      Gerar Api Key
    </button>
  );
}
