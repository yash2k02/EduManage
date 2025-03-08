// export interface trainer{
//   trainerId:number,
//   name:string,
//   email:string,
//   phone:number,
//   domain:string,
//   username:string,
//   password:string
// }

export interface trainer{
  trainerId: number,
  name: string,
  email: string,
  phone: string,
  domain: string,
  username: string,
  password: string,
  batches:
      {
          batchId: number,
          batchName: string,
          batchTime: string,
          startDate: string,
          endDate: string,
          students:
              {
                  studentId: number,
                  name: string,
                  email: string,
                  phone:string,
                  username: string,
                  password:string
              }[];
}[];
}