export type LastRettelingResponse = {
  id: number;
  userId: number;
  courseId: number;
  moduleId: number;
  lessonId: number;
  lessonSequenceOrder: number;
  moduleSequenceOrder: number;
  attemptNo: number;
  fileUrl: string;
  transcriptText: string;
  durationSec: number;
  status: VoiceNoteStatus;
  createdAt: string;
  updatedAt: string;
  failedReason: string | null;
};

export enum VoiceNoteStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  READY = 'READY',
  FAILED = 'FAILED',
}
