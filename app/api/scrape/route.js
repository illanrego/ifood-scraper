// app/api/scrape/route.js
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request) {
  const { url } = await request.json(); // Extract URL from the request body
  
  if (!url) {
    return NextResponse.json({ error: 'URL não inserida' }, { status: 400 });
  }

  try {
    const browser = await puppeteer.launch({ headless: true});
    const page = await browser.newPage();

    await page.goto(url, {
          waitUntil: 'networkidle2',
    });    

  // Extrair produtos e detalhes

	const produtos = await page.evaluate(() => {
             const items = [];
             document.querySelectorAll('li').forEach((element, index) => {
                 const name = element.querySelector('h3') ? element.querySelector('h3').textContent.trim() : '';
                 const description = element.querySelector('span.dish-card__details') ? element.querySelector('span.dish-card__details').textContent.trim() : '';
 
                 const price = element.querySelector('span.dish-card__price--discount')
                     ? element.querySelector('span.dish-card__price--discount').textContent.trim()
                     : (element.querySelector('span.dish-card__price')
                         ? element.querySelector('span.dish-card__price').textContent.trim()
                         : '');
 
                 if (name && price) {
                     items.push({
                         index: index + 1,
                         name,
                         description,
                         price,
                     });
                 }
             });
             return items;
         });

    await browser.close();

    return NextResponse.json({ produtos });
  } catch (error) {
    console.log("Erro fetching produtos: ", error);
    return NextResponse.json({ error: 'Error fetching produtos' }, { status: 500 });
  }
}

