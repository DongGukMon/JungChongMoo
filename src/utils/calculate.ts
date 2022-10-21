interface PaymentTypes {
    participants:string[];
    amount:number;
    payer:string;
}

interface InputDataTypes  {
    wholeParticipants:string[];
    payments:PaymentTypes[];
}



// 전체 paymnets를 분석해 {name:액수} 형태로 각각 얼마를 주거나 받아야하는지 데이터 재구조화
export const normalizeData = (inputData:InputDataTypes) => {
    //+는 받아야할 돈, -는 내야할 돈으로 정의

    const resultObj:{[name:string]:number} = {}
    inputData.wholeParticipants.map((name:string)=>{
        resultObj[name] = 0;
    })
    
    inputData.payments.map((payment:PaymentTypes)=>{
        const {participants,amount,payer} = payment

        resultObj[payer] = resultObj[payer] + Number(amount)
        
        //participants가 0일수 없도록 정산 만들때 제한조건을 두어야함
        //일단 여기서는 그냥 진행
        const amountPerPerson =  amount/participants.length 

        participants.map((name)=>{
            resultObj[name] = resultObj[name] - amountPerPerson
        })
    })


    // const returnArr:(string | number)[][] = Object.keys(normalizeData(inputData)).map((name)=>{
    //     return [name,resultObj[name]]
    // })
    return resultObj
}



export const calculate = (inputData:InputDataTypes) =>{
    const normalizedData = normalizeData(inputData)
    console.log(normalizedData)
}

// interface GroupTypes {
//     id: string;
//     name: string;
//     date: string;
//     participants: string[];
//     payments: string[];
//     totalPayments: number;
//     dateNow: number;
// }
  

// interface PaymentTypes {
//     id: string;
//     name: string;
//     payer: string;
//     amount: string;
//     participants: string[];
//     dateNow: number;
// }

// {
//     id:{
//         id:
//         name:
//         date:
//         payments:{
//             id[]
//         }
//         ...
//     }
// }
  

