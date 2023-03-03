/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { NextApiRequest, NextApiResponse } from 'next';

import request from 'request';
import * as cheerio from 'cheerio';

interface UrlData {
  url: string;
  subUrls?: UrlData[];
}

const siteUrl = 'https://powershifter.com';

export default function crawl (
  _request: NextApiRequest,
  _response: NextApiResponse
) {

  void crawlURL(siteUrl, 2).then((allUrls: UrlData[]) => {
    _response.status(200).json({
      data: allUrls
    });
  });

}

function crawlURL(url: string, depth: number, visited = new Set<string>()): Promise<UrlData[]> {
  
  return new Promise((resolve, reject) => {
    if (visited.has(url) || depth < 0) {
      resolve([]);
      return;
    }

    visited.add(url);

    request(url, (error, response, body) => {
      if (error) {
        console.error(error);
        resolve([]);
        return;
      }

      const $ = cheerio.load(body);

      const pageUrls = $('a[href^="/"]')
        .map((i, el) => $(el).attr('href'))
        .get()
        .filter((href: string) => {
          const isPageUrl = href.match(/\/$/i) || href.match(/\/[^/]*$/i);
          const isInternalUrl = href.startsWith('/') || href.startsWith(siteUrl);
          return isPageUrl && isInternalUrl;
        })
        .map((href: string) => {
          const url = href.startsWith(siteUrl) ? href : siteUrl + href;
          return { url };
        });

      const linkPromises = pageUrls.map((pageUrl: UrlData) => crawlURL(pageUrl.url, depth - 1, visited));
      void Promise.all(linkPromises).then((subUrls: UrlData[][]) => {
        resolve([{ url, subUrls: subUrls.flat() }, ...subUrls.flat()]);
      });
    });
  });
}
