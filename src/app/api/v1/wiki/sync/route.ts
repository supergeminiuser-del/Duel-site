import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    const db = prisma as any;
    let syncedCounts = { brainrots: 0, traits: 0, mutations: 0 };

    // --- 1. ПАРСИНГ БРЕЙНРОТОВ ---
    try {
      const { data } = await axios.get('https://stealabrainrot.fandom.com/wiki/Brainrots');
      const $ = cheerio.load(data);
      const items: any[] = [];

      // Ищем все строки во всех таблицах
      $('table tr').each((i, el) => {
        const columns = $(el).find('td');
        if (columns.length >= 2) {
          const name = $(columns[0]).text().trim().replace(/\[.*?\]/g, '');
          const incomeText = $(columns[1]).text().trim();
          const income = parseFloat(incomeText.replace(/[^0-9.]/g, ''));
          
          if (name && name.length > 1 && !isNaN(income) && income > 0) {
            // Проверяем, чтобы имя не было дублем
            if (!items.find(x => x.name === name)) {
              items.push({ name, baseIncome: income, baseValue: income * 3600 });
            }
          }
        }
      });

      for (const item of items) {
        await db.brainrot.upsert({
          where: { name: item.name },
          update: { baseIncome: item.baseIncome, baseValue: item.baseValue },
          create: { ...item, rarity: 'Unknown', category: 'Wiki', imageUrl: '' }
        });
      }
      syncedCounts.brainrots = items.length;
    } catch (e) { console.error("Brainrot parse error", e); }

    // --- 2. ПАРСИНГ ТРЕЙТОВ ---
    try {
      const { data } = await axios.get('https://stealabrainrot.fandom.com/wiki/Traits');
      const $ = cheerio.load(data);
      const items: any[] = [];

      $('table tr').each((i, el) => {
        const columns = $(el).find('td');
        if (columns.length >= 2) {
          const name = $(columns[0]).text().trim().replace(/\[.*?\]/g, '');
          if (name && name.length > 1 && name.toLowerCase() !== 'name') {
            const rowText = $(el).text().toLowerCase();
            const multMatch = rowText.match(/(\d+(\.\d+)?)/);
            const multiplier = multMatch ? parseFloat(multMatch[1]) : 1.0;
            
            if (!items.find(x => x.name === name)) {
              items.push({ name, multiplier });
            }
          }
        }
      });

      for (const item of items) {
        await db.trait.upsert({
          where: { name: item.name },
          update: { multiplier: item.multiplier },
          create: { ...item, category: 'Wiki' }
        });
      }
      syncedCounts.traits = items.length;
    } catch (e) { console.error("Traits parse error", e); }

    // --- 3. ПАРСИНГ МУТАЦИЙ ---
    try {
      const { data } = await axios.get('https://stealabrainrot.fandom.com/wiki/Mutations');
      const $ = cheerio.load(data);
      const items: any[] = [];

      $('table tr').each((i, el) => {
        const columns = $(el).find('td');
        if (columns.length >= 2) {
          const name = $(columns[0]).text().trim().replace(/\[.*?\]/g, '');
          if (name && name.length > 1 && name.toLowerCase() !== 'name') {
            const rowText = $(el).text().toLowerCase();
            const multMatch = rowText.match(/(\d+(\.\d+)?)/);
            const multiplier = multMatch ? parseFloat(multMatch[1]) : 1.0;
            
            if (!items.find(x => x.name === name)) {
              items.push({ name, multiplier });
            }
          }
        }
      });

      for (const item of items) {
        await db.mutation.upsert({
          where: { name: item.name },
          update: { multiplier: item.multiplier },
          create: { ...item, spawnChance: 0.01 }
        });
      }
      syncedCounts.mutations = items.length;
    } catch (e) { console.error("Mutations parse error", e); }

    return NextResponse.json({ 
      success: true, 
      message: `Wiki sync complete! Synced: ${syncedCounts.brainrots} Brainrots, ${syncedCounts.traits} Traits, ${syncedCounts.mutations} Mutations.`
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}