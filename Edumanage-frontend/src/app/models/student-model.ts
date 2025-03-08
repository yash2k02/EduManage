export interface student{
    phone: any;
    studentId:number,
    name:string,
    email:string,
    batch:{
        batchId:number,
        batchName:string,
        trainer:{
            trainerId:number,
            name:string
        }
    },
    username:string,
    password:string
}