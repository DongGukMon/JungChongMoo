interface PaymentTypes {
    participants:string[];
    amount:string;
    payer:string;
}

interface InputDataTypes  {
    wholeParticipants:string[];
    payments:PaymentTypes[];
}



export const nomalizeData = (inputData:InputDataTypes) => {
    //+는 받아야할 돈, -는 내야할 돈으로 정의

    const resultObj:{[name:string]:number} = {}
    inputData.wholeParticipants.map((name:string)=>{
        resultObj[name] = 0;
    })
    
    inputData.payments.map((payment:PaymentTypes)=>{
        const {participants,amount,payer} = payment
        
        const payAmount = Number(amount)

        resultObj[payer] = resultObj[payer] + Number(payAmount)
        
        //participants가 0일수 없도록 정산 만들때 제한조건을 두어야함
        //일단 여기서는 그냥 진행
        const amountPerPerson =  payAmount/participants.length 

        participants.map((name)=>{
            resultObj[name] = resultObj[name] - amountPerPerson
        })
    })

    return resultObj
}

export const calculate = (inputData:InputDataTypes) =>{

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
  

