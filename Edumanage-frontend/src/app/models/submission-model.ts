export interface submission {
    submissionId: number;
    student: {
      studentId: number;
      name: string;
      batch: {
        batchId: number;
        batchName: string;
        batchTime: string;
        startDate: string;
        endDate?: string | null; // Optional because endDate is sometimes null
        trainer: {
          trainerId: number;
          name: string;
          email: string;
          phone: string;
          domain: string;
          username: string;
          password: string;
        };
      };
    };
    task: {
      taskId: number;
      taskName: string;
      description: string;
      dueDate: string;
    };
    submissionDate: string;
    code: string;
    feedback: string;
  }
  