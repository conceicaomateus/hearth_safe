import { useQuery } from "@tanstack/react-query";
import { Activity, CheckCircle, Clock, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { requestsApi } from "../../../lib/api/requests";

export function HomePage() {
  const { data: stats } = useQuery({
    queryKey: ["requests-stats"],
    queryFn: requestsApi.stats,
  });
  const { data: requests } = useQuery({
    queryKey: ["requests"],
    queryFn: requestsApi.load,
  });

  return (
    <div className="space-y-6 bg-gray-950 text-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">
              Total de Requisições
            </CardTitle>
            <Activity className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">
              Requisições Bem-sucedidas
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {stats?.success}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">
              Requisições com Erro
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.error}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">
              Tempo Médio de Resposta
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {stats?.avgTime.toFixed(2)}ms
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-200">Atividade Recente</CardTitle>
          <CardDescription className="text-gray-400">
            Últimas requisições feitas à API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests && requests?.length > 0 ? (
              requests?.map((request, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-gray-800 pb-2"
                >
                  <div>
                    <p className="font-medium text-gray-100">POST /predict</p>
                    <p className="text-sm text-gray-400">
                      {new Date(request.date).toLocaleString()}
                    </p>
                  </div>
                  <div
                    className={`rounded-full px-2 py-1 text-xs font-semibold border ${
                      request.status !== "404 Not Found"
                        ? "bg-green-700/20 text-green-300 border-green-700"
                        : "bg-red-700/20 text-red-300 border-red-700"
                    }`}
                  >
                    {request.status}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center py-4">
                <p className="text-gray-400">
                  Nenhuma requisição recente encontrada.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
