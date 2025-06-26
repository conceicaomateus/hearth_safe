import { api } from "../api";

export interface PredictRequest {
  Age: number;
  Sex: string;
  ChestPainType: string;
  RestingBP: number;
  Cholesterol: number;
  FastingBS: number;
  RestingECG: string;
  MaxHR: number;
  ExerciseAngina: string;
  Oldpeak: number;
  ST_Slope: string;
}

export const predictService = async (apiKey: string, body: PredictRequest) => {
  const response = await api.post<{
    prediction: number;
    message: string;
  }>(
    "/predict",
    { ...body },
    {
      headers: {
        API_KEY: apiKey,
      },
    }
  );

  return response.data;
};
