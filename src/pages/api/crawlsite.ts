/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import * as cheerio from 'cheerio';

const visited = new Set();
const sitemap = {};
const startUrl = 'https://powershifter.com';


export default async function crawlSite (
  _request: NextApiRequest,
  _response: NextApiResponse
) {
  
  const allUrls = await crawl(startUrl);
  _response.status(200).json({
    data: allUrls
  });
}

async function crawl(url: any) {
  if (visited.has(url)) {
    return;
  }
  
  visited.add(url);
  
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Add the current URL to the sitemap
    sitemap[url] = true;
    
    // Find all links on the page and crawl them
    $('a').each((i, link) => {
      const href = $(link).attr('href');
      if (href && href.startsWith('http') && !visited.has(href)) {
        void crawl(href);
      }
    });
  } catch (error) {
    console.error(`Error crawling ${url}: ${error}`);
  }
}

