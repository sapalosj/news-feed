const getCurrentDate = () : string => {
    var today : Date = new Date();
    var dd : string = String(today.getDate()).padStart(2, '0');
    var mm : string  = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
}

export const DateHelper =  {
    getCurrentDate
}