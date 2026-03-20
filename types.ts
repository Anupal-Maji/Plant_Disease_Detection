
export interface DetectionResult {
  crop: string;
  disease: string;
  confidence: number;
  description: string;
  treatment: string[];
  preventiveMeasures: string[];
}

export interface HistoryItem extends DetectionResult {
  id: string;
  timestamp: number;
  imageUrl: string;
}

export interface DiseaseInfo {
  name: string;
  crop: string;
  symptoms: string[];
  cause: string;
}
