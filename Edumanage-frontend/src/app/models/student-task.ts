export interface TaskAssignment {
    id: number;
    student: {
        studentId: number;
        name: string;
        phone: string;
    };
    batch: {
        batchId: number;
        batchName: string;
    };
    task: {
        taskId: number;
        taskName: string;
        description: string;
    };
    trainer: {
        trainerId: number;
        name: string;
    };
    grade: string | null;
}
