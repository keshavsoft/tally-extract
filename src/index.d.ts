/**
 * Tally Extract XML Client
 */

/** Fetches company list from Tally. No inputs required. */
export declare const company: () => Promise<string>;

/** Fetches masters from Tally given a path and company name. */
export declare const masters: (inPath: string, inCompany: string) => Promise<string>;

export interface TallyClient {
    (): Promise<string>;
    company: typeof company;
    masters: typeof masters;
}

declare const defaultExport: TallyClient;

export default defaultExport;
