const getFormatedDate = ()=>{
        let now = new Date();
        let day = now.getDate();
        let month = now.getMonth() + 1;
        let year = now.getFullYear();
        let hours = now.getHours().toString().padStart(2, "0");
        let minutes = now.getMinutes().toString().padStart(2, "0");
        let seconds = now.getSeconds().toString().padStart(2, "0");
        let formattedDate = `${year}.${month}.${day}`;
        let formattedTime = `${hours}.${minutes}.${seconds}`;
        return `${formattedDate}-${formattedTime}`;
}

export default getFormatedDate