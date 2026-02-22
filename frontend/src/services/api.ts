// API service for communicating with the backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export interface AnalysisResponse {
  text: string
  status: string
}

export interface AnalysisError {
  error: string
  message: string
}

/**
 * Analyzes a financial query using the AI agent backend
 * @param message - The user's financial query (e.g., "Should I buy NVDA?")
 * @returns Promise with the AI analysis response
 */
export async function analyzeQuery(message: string): Promise<AnalysisResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.detail || `API request failed with status ${response.status}`,
      )
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An unexpected error occurred while analyzing the query')
  }
}

/**
 * Checks the health status of the backend API
 * @returns Promise with health status
 */
export async function checkHealth(): Promise<{
  status: string
  timestamp: number
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`)
    if (!response.ok) {
      throw new Error('Health check failed')
    }
    return await response.json()
  } catch (error) {
    throw new Error('Backend is not available')
  }
}
