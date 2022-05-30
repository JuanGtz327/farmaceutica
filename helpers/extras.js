const getParsedDate = (date)=>{
    for (let i=0;i<date.length;i++){
        if(date[i]=='T'){
            if(date[i-1]=='M'){
                if(date[i-2]=='G'){
                    return date.substring(3,i-12);
                }
            }
        }         
    }
}

module.exports = {
    getParsedDate,
}