import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

interface TokenResponse {
  access: string;
  refresh: string;
}

interface SubmissionResponse {
  id: number;
  user: number;
  code: string;
  language: string;
  created_at: string;
}

interface AnalysisResult{
  line: number;
  type: string;
  message: string;
  symbol: string;
}

interface AnalysisResponse {
  results: AnalysisResult[];
}

export async function login(
  username: string,
  password: string
): Promise<TokenResponse> {
  const response = await api.post<TokenResponse>("token/", {
    username,
    password,
  });
  return response.data;
}

export async function submitCode(
  token: string,
  code: string,
  language: string
): Promise<SubmissionResponse> {
  const response = await api.post<SubmissionResponse>(
    "submit-code/",
    { code, language },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
}

export async function analyzeCode(
  token: string,
  code: string,
  language: string
): Promise<AnalysisResponse> {
  const response = await api.post<AnalysisResponse>(
    'analyze/',
    { code, language },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}
