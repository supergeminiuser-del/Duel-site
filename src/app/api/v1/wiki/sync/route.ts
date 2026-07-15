import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    let syncedCounts = { brainrots: 0, traits: 0, mutations: 0 };

    // --- 1. ПАРСИНГ БРЕЙНРОТОВ ---
    try {
      const { data } = await axios.get('https://stealabrainrot.fandom.com/wiki/Brainrots');
      const $ = cheerio.load(data);
      const items: any[] = [];

      $('.article-table tbody tr, .wikitable tbody tr').each((i, el) => {
        const columns = $(el).find('td');
        if (columns.length > 0) {
          const name = $(columns[0]).text().trim() || $(columns[1]).text().trim();
          const incomeText = $(columns[1]).text().trim() || $(columns[2]).text().trim();
          const income = parseFloat(incomeText.replace(/[^0-9.]/g, ''));
          
          if (name && name.length > 1 && !isNaN(income) && income > 0) {
            items.push({ name, baseIncome: income, baseValue: income * 3600 });
          }
        }
      });

      for (const item of items) {
        await prisma.brainrot.upsert({
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

      $('.article-table tbody tr, .wikitable tbody tr').each((i, el) => {
        const columns = $(el).find('td');
        if (columns.length > 0) {
          const name = $(columns[0]).text().trim() || $(columns[1]).text().trim();
          if (name && name.length > 1 && !name.includes('[edit]')) {
            // Ищем множитель в тексте строки (например "x2.5" или "2.5")
            const rowText = $(el).text().toLowerCase();
            const multMatch = rowText.match(/(\d+(\.\d+)?)/);
            const multiplier = multMatch ? parseFloat(multMatch[1]) : 1.0;
            
            items.push({ name, multiplier });
          }
        }
      });

      for (const item of items) {
        await prisma.trait.upsert({
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

      $('.article-table tbody tr, .wikitable tbody tr').each((i, el) => {
        const columns = $(el).find('td');
        if (columns.length > 0) {
          const name = $(columns[0]).text().trim() || $(columns[1]).text().trim();
          if (name && name.length > 1 && !name.includes('[edit]')) {
            const rowText = $(el).text().toLowerCase();
            const multMatch = rowText.match(/(\d+(\.\d+)?)/);
            const multiplier = multMatch ? parseFloat(multMatch[1]) : 1.0;
            
            items.push({ name, multiplier });
          }
        }
      });

      for (const item of items) {
        await prisma.mutation.upsert({
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