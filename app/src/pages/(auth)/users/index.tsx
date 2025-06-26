import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "../../../components/ui/card";
import { ADMIN_ID } from "../../../constants/user";
import { usersApi } from "../../../lib/api/users";
import { GenerateApiKeyButton } from "./components/generate-api-key";
import { NewUser } from "./components/new-user";
import { RemoveUserButton } from "./components/remove-user";

export function UsersPage() {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => usersApi.load(),
  });

  return (
    <div className="flex flex-col gap-6 bg-gray-950 text-gray-100 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gerenciamento de Usuários</h2>
        <NewUser />
      </div>
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-0">
          <table className="min-w-full divide-y divide-gray-800">
            <thead>
              <tr className="bg-gray-900">
                <th className="px-4 py-2 text-left font-semibold">ID</th>
                <th className="px-4 py-2 text-left font-semibold">Nome</th>
                <th className="px-4 py-2 text-left font-semibold">Email</th>
                <th className="px-4 py-2 text-left font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-800 hover:bg-gray-800 transition"
                >
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 flex gap-2">
                    {user.id !== ADMIN_ID && (
                      <>
                        <GenerateApiKeyButton user={user} />
                        <RemoveUserButton user={user} />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
