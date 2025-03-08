export interface attendance {
    attendanceId: number,
    student: {
        studentId: number,
        name: string
    },
    batch: {
        batchId: number,
        batchName: string,
        trainer: {
            trainerId: number,
            name: string
            email: string,
            phone: string ,
            domain: string ,
            username: string,
            password: string 
        },
        students: 
            {
                studentId: number,
                name:string ,
                email:string ,
                phone:string ,
                username:string ,
                password:string 
            }[]
        },
    date: string,
    status: string
}