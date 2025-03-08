export interface batch {
    batchId: number;
    batchName: string;
    batchTime: string;
    startDate: string;
    endDate: string | null;
    trainer: {
        trainerId: number;
        name: string;
        email: string;
        phone: string;
        domain: string;
        username: string;
        password: string;
    };
    students: {
        studentId: number;
        name: string;
        email: string;
        phone: string;
        username: string;
        password: string;
    }[];
}
