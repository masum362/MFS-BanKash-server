const homePage = (req ,res ) =>{
    console.log('home page called');
    res.send("welcome to home page");
}


export {homePage}