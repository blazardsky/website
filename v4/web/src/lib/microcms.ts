import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

const client = createClient({
    serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: import.meta.env.MICROCMS_API_KEY,
});

type MicroCMSDocument = {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
}

export type MicroImage = {
    url: string;
    height: number;
    width: number;
}

export type Work = MicroCMSDocument & {
    slug: string;
    portfolio: ["technical"] | ["creative"];
    category: string[];
    status: string[];
    type: string;
    start_date: string;
    client: string;
    description: string;
    image: MicroImage;
    gallery?: MicroImage[];
    link?: string;
    notes?: string
};

export type Project = MicroCMSDocument & {
    category: string[];
    status: string[];
    link?: string;
    image?: MicroImage
};

type Response<T> = {
    totalCount: number;
    offset: number;
    limit: number;
    contents: T[];
};

export const getDocuments = async <T>(
    endpoint: string,
    queries?: MicroCMSQueries
) => {
    return await client.getList<T>({ 
        endpoint, queries 
    });
};

export const getDocumentDetail = async <T>(
    endpoint: string,
    contentId: string,
    queries?: MicroCMSQueries
    ) => {
      return await client.getListDetail<T>({
        endpoint,
        contentId,
        queries,
    });
};



// export function slugify(title:string): string {
//     let slug = '';
//     try {
//         slug = title.trim().toLowerCase().replace(/\s/g,'-').replace(/[^a-z0-9\-]/g, '');
//     } catch (e) {
//         console.error(e);
//     }
//     return slug;
// }