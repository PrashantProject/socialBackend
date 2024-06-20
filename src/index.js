import express from "express";

const app = express();

app.get('/',(req, res)=>{
    return res.send('enter in app');
})


const port=8000;

app.listen(port,()=>{
    console.log('app start')
})