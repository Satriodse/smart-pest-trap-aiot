import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
  type CreatePestInput,
  type PestRecord,
  PestRecordSchema,
} from "../types/pest";

// Simulasi Database Memori Sementara agar data yang ditambahkan bisa tersimpan
let mockDatabase: PestRecord[] = [
  {
    id: "1-uuid",
    species: "Wereng Coklat",
    count: 120,
    location: "Sektor A",
    detectedAt: "10:45 AM",
  },
  {
    id: "2-uuid",
    species: "Penggerek Batang",
    count: 94,
    location: "Sektor B",
    detectedAt: "11:15 AM",
  },
];

const fetchPestLogs = async (): Promise<PestRecord[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Mengembalikan data dari mockDatabase yang sudah diperbarui
  return z.array(PestRecordSchema).parse(mockDatabase);
};

const addPestLog = async (input: CreatePestInput): Promise<PestRecord> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const newRecord: PestRecord = {
    id: Date.now().toString(),
    ...input,
    detectedAt: new Date().toLocaleTimeString(),
  };

  // Masukkan data baru ke paling atas array database sementara
  mockDatabase = [newRecord, ...mockDatabase];

  return PestRecordSchema.parse(newRecord);
};

export const PEST_QUERY_KEY = ["pest-logs"];

export const usePestsQuery = () => {
  return useQuery({
    queryKey: PEST_QUERY_KEY,
    queryFn: fetchPestLogs,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
  });
};

export const useAddPestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPestLog,
    onSuccess: () => {
      // Menginvalidasi cache agar TanStack Query otomatis mengambil ulang dari mockDatabase terbaru
      queryClient.invalidateQueries({ queryKey: PEST_QUERY_KEY });
    },
  });
};
