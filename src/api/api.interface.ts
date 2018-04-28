
export interface IHttpApi {
    getData(): Promise<Array<{ text: string }>>;
}
