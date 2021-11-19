
const puppeteer = require('puppeteer');
const fs = require('fs');



(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.imdb.com/chart/top/?ref_=nv_mv_250');
  const listFilmes = await page.evaluate(()=>{
        const nodelist = document.querySelectorAll('tbody tr td a img')
        const listArray = [...nodelist]
        const list = listArray.map(({alt,src})=>({
            alt,
            src
        }))
        
       
        return list
  })



  fs.writeFile("imdb.json", JSON.stringify(listFilmes, null,2), err =>{
      if(err) throw new Error('something went wrong')

      console.log("well done")
  })
  await browser.close();
})();