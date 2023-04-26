const colors = require('colors');
const prompt = require('prompt-sync')();
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
colors.enable()
console.log("       .__                    .__                              \r\n  ____ |__| ____   _________  |  |   ____ _____ _______  ____  \r\n \/    \\|  |\/ ___\\ \/ ___\\__  \\ |  | _\/ __ \\\\__  \\\\_  __ \\\/    \\ \r\n|   |  \\  \/ \/_\/  > \/_\/  > __ \\|  |_\\  ___\/ \/ __ \\|  | \\\/   |  \\\r\n|___|  \/__\\___  \/\\___  (____  \/____\/\\___  >____  \/__|  |___|  \/\r\n     \\\/  \/_____\/\/_____\/     \\\/          \\\/     \\\/           \\\/ \r\nGNAA International 2023 - Good luck with your exams, gay nigger")
console.log("---------------------------------------")
console.log("⚠️ I RECOMMEND YOU FORK THIS REPLOR GET IT FROM GITHUB FIRST".underline.yellow)
const sub = prompt('[NIGGALEARN] what subject are you studying for nigger: ');


const url = `https://www.google.com/search?q=inurl:https://dynamicpapers.com/+filetype:pdf+'${sub}'+'Edexcel'`;


const dir = path.join(process.cwd(), sub);
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

request(url, function(error, response, html) {
  if (!error && response.statusCode == 200) {
    console.log("preparing to scrape pdfs..")
    const $ = cheerio.load(html);
    const links = $('a');
    $(links).each(function(i, link){
      const href = $(link).attr('href');
      if (href.indexOf(".pdf") !== -1) {
        const fileName = href.substring(href.lastIndexOf("/") + 1, href.indexOf(".pdf") + 4);
        const fileUrl = href.substring(7, href.indexOf("&"));
        const filePath = path.join(dir, fileName);
        request(fileUrl).pipe(fs.createWriteStream(filePath));
        console.log(`pdf scraped`.bgGreen)
      }
    });
  }
  console.log("[NIGGALEARN]: niggalearn has finished scraping exam past papers and mark schemes for studying. check the folders outputted in the repl (it should be named as the subject you scraped for).\n good luck in the exams, gay nigger.")
});
