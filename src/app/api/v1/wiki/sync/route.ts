import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    const { data } = await axios.get('https://steal-a-brainrot.fandom.com/wiki/Brainrots');
    const $ = cheerio.load(data);
    
    const itemsToUpsert: any[] = [];

    // Сначала синхронно собираем данные со страницы
    $('.article-table tbody tr').each((i, el) => {
      const name = $(el).find('td:nth-child(2)').text().trim();
      const incomeText = $(el).find('td:nth-child(3)').text().trim();
      const rarity = $(el).find('td:nth-child(4)').text().trim();
      
      const income = parseFloat(incomeText.replace(/[^0-9.]/g, ''));

      if (name && !isNaN(income)) {
        itemsToUpsert.push({
          name,
          baseIncome: income,
          rarity: rarity || 'Unknown',
          baseValue: income * 3600
        });
      }
    });

    // Теперь асинхронно сохраняем их в базу данных
    for (const item of itemsToUpsert) {
      await prisma.brainrot.upsert({
        where: { name: item.name },
        update: { 
          baseIncome: item.baseIncome, 
          rarity: item.rarity,
          baseValue: item.baseValue
        },
        create: {
          name: item.name,
          baseIncome: item.baseIncome,
          baseValue: item.baseValue,
          rarity: item.rarity,
          category: 'Parsed',
          imageUrl: `/images/${item.name.toLowerCase().replace(/ /g, '-')}.jpg`
        }
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Wiki sync complete. Updated ${itemsToUpsert.length} brainrots.`
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}