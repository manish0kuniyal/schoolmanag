import express, { Request, Response } from 'express';
const app = express();

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

let url:{[key:string]:string}={}

app.post('/url', (req: any, res: any) => {
  const newUrl = req.body.newUrl;
  if (!newUrl) {
      return res.status(400).json({ error: 'URL is required' });
  }
  const mapUrl="https://randomurl.com/"+Math.random().toString(36).substring(7)
  url[mapUrl]=newUrl

  return res.json({ message: 'URL received', givenURL:newUrl ,mapUrl});
});


app.get('/:shortenUrl',(req:any,res:any)=>{
  const shortenUrl=req.params.shortenUrl
  const orignal=url[`https://randomurl.com/${shortenUrl}`]
  if(orignal)
    return res.redirect(orignal)

  else
  return res.status(404).json({error:"url not found"})
})


app.listen(3000, () => {
  console.log('...on port 3000');
});
 
