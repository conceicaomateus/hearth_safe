import { useState } from "react";
import { toast } from "react-toastify";
import { predictService } from "../../../lib/api/predict";

const initialForm: Record<string, string> = {
  Age: "",
  Sex: "",
  ChestPainType: "",
  RestingBP: "",
  Cholesterol: "",
  FastingBS: "",
  RestingECG: "",
  MaxHR: "",
  ExerciseAngina: "",
  Oldpeak: "",
  ST_Slope: "",
};

export function DocumentationPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<unknown>(null);
  const [error, setError] = useState("");
  const [jsonBody, setJsonBody] = useState<string>(
    JSON.stringify(initialForm, null, 2)
  );
  const [apiKey, setApiKey] = useState("");

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonBody(e.target.value);
  };

  const handlePostmanSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!apiKey) {
      setError("Chave de API é obrigatória.");
      toast.error("Chave de API é obrigatória.");
      return;
    }

    setLoading(true);
    setError("");
    setResponse(null);
    let parsedBody;
    try {
      parsedBody = JSON.parse(jsonBody);
    } catch {
      setError("JSON inválido no corpo da requisição.");
      setLoading(false);
      return;
    }
    try {
      console.log("Enviando requisição:", parsedBody);
      // Chama o serviço de predição

      const res = await predictService(apiKey, parsedBody);
      setResponse(res);
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message);
      else setError("Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-950 text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Documentação da API</h1>
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <section className="flex-1 min-w-[340px] max-w-xl">
            <h2 className="text-2xl font-semibold mb-2">POST /predict</h2>
            <p className="mb-4 text-gray-300">
              Endpoint para predição de doença cardíaca.
            </p>
            <div className="mb-4">
              <h3 className="font-semibold">Exemplo de requisição:</h3>
              <pre className="bg-gray-800 rounded p-4 text-sm overflow-x-auto text-gray-200">
                {`POST /predict
Content-Type: application/json

{
  "Age": 45,
  "Sex": "M",
  "ChestPainType": "ATA",
  "RestingBP": 120,
  "Cholesterol": 220,
  "FastingBS": 0,
  "RestingECG": "Normal",
  "MaxHR": 150,
  "ExerciseAngina": "N",
  "Oldpeak": 1.2,
  "ST_Slope": "Up"
}`}
              </pre>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Exemplo de resposta:</h3>
              <pre className="bg-gray-800 rounded p-4 text-sm overflow-x-auto text-gray-200">
                {`{
  "prediction": 1,
  "message": "Você tem doença cardíaca."
}`}
              </pre>
            </div>
          </section>

          <section className="flex-1 min-w-[340px] max-w-xl">
            <h2 className="text-xl font-semibold mb-4">Testar rota /predict</h2>
            <form className="space-y-4" onSubmit={handlePostmanSubmit}>
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <span className="bg-blue-700 text-white px-3 py-1 rounded font-mono text-sm">
                  POST
                </span>
                <span className="font-mono text-sm bg-gray-800 px-3 py-1 rounded border border-gray-700">
                  /predict
                </span>
              </div>
              <div className="mb-2">
                <label className="font-semibold text-gray-300">Headers</label>
                <div className="flex flex-col md:flex-row gap-2 mt-1">
                  <span className="font-mono text-xs bg-gray-800 px-2 py-1 rounded border border-gray-700">
                    Content-Type: application/json
                  </span>
                  <span className="font-mono text-xs bg-gray-800 px-2 py-1 rounded border border-gray-700">
                    API_KEY:{" "}
                    <input
                      type="text"
                      className="bg-gray-800 text-gray-100 rounded w-full md:w-auto"
                      placeholder="Sua chave de API aqui"
                      value={apiKey}
                      onChange={handleApiKeyChange}
                    />
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <label className="font-semibold text-gray-300 mb-1 block">
                  Body (JSON)
                </label>
                <textarea
                  className="w-full min-h-[320px] font-mono text-sm bg-gray-800 border border-gray-700 rounded p-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={jsonBody}
                  onChange={handleJsonChange}
                  required
                />
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded px-6 py-2 font-semibold shadow hover:bg-blue-700 transition"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </form>
            {response && typeof response === "object" && response !== null ? (
              <div className="mt-4">
                <label className="font-semibold text-gray-300 mb-1 block">
                  Resposta
                </label>
                <pre className="bg-gray-800 rounded p-4 text-green-300 text-sm overflow-x-auto">
                  {JSON.stringify(response as object, null, 2)}
                </pre>
              </div>
            ) : null}
            {error && (
              <div className="mt-4 bg-red-900 rounded p-4 text-red-200">
                Erro: {error}
              </div>
            )}
          </section>
        </div>
        <div className="hidden lg:block border-l border-gray-800 mx-4 self-stretch" />
      </div>
    </div>
  );
}
