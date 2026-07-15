import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    // 1. Идем на вики Steal a Brainrot
    const { data } = await axios.get('https://steal-a-brainrot.fandom.com/wiki/Brainrots');
    const $ = cheerio.load(data);
    
    let updatedCount = 0;

    // 2. Ищем таблицу с предметами (класс может меняться, берем основную таблицу)
    $('.article-table tbody tr').each(async (i, el) => {
      const name = $(el).find('td:nth-child(2)').text().trim();
      const incomeText = $(el).find('td:nth-child(3)').text().trim();
      const rarity = $(el).find('td:nth-child(4)').text().trim();
      
      // Парсим цифры из текста (например "125,000" -> 125000)
      const income = parseFloat(incomeText.replace(/[^0-9.]/g, ''));

      if (name && !isNaN(income)) {
        // 3. Обновляем или создаем запись в БД
        await prisma.brainrot.upsert({
          where: { name },
          update: { 
            baseIncome: income, 
            rarity: rarity || 'Unknown',
            baseValue: income * 3600
          },
          create: {
            name,
            baseIncome: income,
            baseValue: income * 3600,
            rarity: rarity || 'Unknown',
            category: 'Parsed',
            imageUrl: `/images/${name.toLowerCase().replace(/ /g, '-')}.jpg`
          }
        });
        updatedCount++;
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: `Wiki sync complete. Updated ${updatedCount} brainrots.`
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}